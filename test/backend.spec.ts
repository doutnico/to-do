import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

test.describe("tests back-end", () => {
  let prisma: PrismaClient;

  const DESCRIPTION: string = "test unit";

  test.beforeEach(async () => {
    prisma = new PrismaClient();
  });

  test.afterEach(async () => {
    await prisma.$disconnect();
  });

  test("create update and delete task in database", async () => {
    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION },
    });
    expect(createTask.description).toBe(DESCRIPTION);

    const updateTask = await prisma.task.update({
      where: { id: createTask.id },
      data: { done: true },
    });
    expect(updateTask.done).toBe(true);

    const deleteTask = await prisma.task.delete({
      where: { id: updateTask.id },
    });
    expect(deleteTask.id).toBe(createTask.id);
  });

  test("get all tasks", async ({ request }) => {
    const res = await request.get("/api/task");
    expect(res.ok()).toBeTruthy();

    const tasks = await res.json();
    expect(Array.isArray(tasks)).toBeTruthy();
  });

  test("create task", async ({ request }) => {
    const res = await request.post("/api/task", {
      data: { description: DESCRIPTION },
    });
    expect(res.ok()).toBeTruthy();

    const task = await res.json();
    expect(task.description).toBe(DESCRIPTION);

    const deleteTask = await prisma.task.delete({ where: { id: task.id } });
    expect(task.id).toBe(deleteTask.id);
  });

  test("delete task", async ({ request }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    const res = await request.delete(`/api/task/${createTask.id}`);
    expect(res.ok()).toBeTruthy();

    const task = await res.json();
    expect(task.id).toBe(createTask.id);
    expect(task.description).toBe(DESCRIPTION_TASK);
  });

  test("update task", async ({ request }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    const res = await request.patch(`/api/task/${createTask.id}`, {
      data: { done: true },
    });
    expect(res.ok()).toBeTruthy();

    const task = await res.json();
    expect(task.id).toBe(createTask.id);
    expect(task.done).toBe(true);
  });
});

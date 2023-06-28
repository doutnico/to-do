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
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    const response = await request.get("/api/task");

    await prisma.task.delete({ where: { id: createTask.id } });

    const tasks = await response.json();
    expect(tasks.length).toBeGreaterThanOrEqual(1);
  });

  test("create task", async ({ request }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const response = await request.post("/api/task", {
      data: { description: DESCRIPTION_TASK },
    });

    const findTask = await prisma.task.findFirst({
      where: { description: DESCRIPTION_TASK },
    });
    await prisma.task.delete({ where: { id: findTask?.id } });

    const task = await response.json();
    expect(task.id).toBe(findTask?.id);
    expect(task.description).toBe(DESCRIPTION_TASK);
  });

  test("delete task", async ({ request }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    const response = await request.delete(`/api/task/${createTask.id}`);

    const findTask = await prisma.task.findUnique({
      where: { id: createTask.id },
    });
    if (findTask) await prisma.task.delete({ where: { id: createTask.id } });

    const task = await response.json();
    expect(task.id).toBe(createTask.id);
    expect(task.description).toBe(DESCRIPTION_TASK);
  });

  test("update task", async ({ request }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    const response = await request.patch(`/api/task/${createTask.id}`, {
      data: { done: true },
    });

    await prisma.task.delete({ where: { id: createTask.id } });

    const task = await response.json();
    expect(task.id).toBe(createTask.id);
    expect(task.done).toBe(true);
  });
});

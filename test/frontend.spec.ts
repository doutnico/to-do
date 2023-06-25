import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

test.describe("tests front-end", () => {
  let prisma: PrismaClient;

  const DESCRIPTION: string = "test unit";

  test.beforeEach(async () => {
    prisma = new PrismaClient();
  });

  test.afterEach(async () => {
    await prisma.$disconnect();
  });

  test("create task", async ({ page }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    await page.goto("/");

    await page.fill('input[type="text"]', DESCRIPTION_TASK);
    await page.click("button");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const findTask = await prisma.task.findFirst({
      where: { description: DESCRIPTION_TASK },
    });

    await prisma.task.delete({ where: { id: findTask?.id } });
    expect(findTask?.description).toBe(DESCRIPTION_TASK);
  });

  test("delete task", async ({ page }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const MORE_SELECTOR = "div.group-hover\\:hidden.text-gray-700";
    const BUTTON_SELECTOR =
      "div.hidden.group-hover\\:block.group-hover\\:text-red-400";

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    await page.goto("/", { waitUntil: "networkidle" });

    await page.waitForSelector("div.bg-zinc-100");
    const taskCards = await page.$$("div.bg-zinc-100");
    for (const card of taskCards) {
      const taskName = await card.$eval("p.grow", (el) => el.textContent);
      if (taskName === DESCRIPTION_TASK) {
        const moreButton = await card.$(MORE_SELECTOR);
        if (moreButton) {
          await moreButton.hover();
          const deleteButton = await card.$(BUTTON_SELECTOR);
          if (deleteButton) await deleteButton.click();
        }
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const findTask = await prisma.task.findUnique({
      where: { id: createTask.id },
    });
    expect(findTask).toBe(null);
  });

  test("update task", async ({ page }) => {
    const CURRENT_DATE: string = new Date().getTime().toString();
    const DESCRIPTION_TASK = `${DESCRIPTION} - ${CURRENT_DATE}`;

    const CHECK_SELECTOR = 'input[type="checkbox"]';

    const createTask = await prisma.task.create({
      data: { description: DESCRIPTION_TASK },
    });

    await page.goto("/", { waitUntil: "networkidle" });

    await page.waitForSelector("div.bg-zinc-100");
    const taskCards = await page.$$("div.bg-zinc-100");
    for (const card of taskCards) {
      const taskName = await card.$eval("p.grow", (el) => el.textContent);
      if (taskName === DESCRIPTION_TASK) {
        const checkBox = await card.$(CHECK_SELECTOR);
        if (checkBox) await checkBox.click();
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const findTask = await prisma.task.findUnique({
      where: { id: createTask.id },
    });
    expect(findTask?.done).toBe(true);
  });
});

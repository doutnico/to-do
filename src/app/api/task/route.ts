import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

/// 2 - Crie o metodo GET que retona todas as task

/**/
export async function GET(request: Request) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}
/**/

/// 3 - Crie o metodo POST que cria uma task

/**/
export async function POST(request: Request) {
  const { description } = await request.json();

  const task = await prisma.task.create({
    data: { description },
  });
  return NextResponse.json(task);
}
/**/

import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

/*
  2 - Crie uma API com método GET que deve retornar
  todas as tarefas cadastradas no banco de dados.
*/

export async function GET(request: Request) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

/*
  3 - Crie uma API com método POST que receberá o parâmetro
  da descrição da tarefa no corpo da requisição. Em seguida
  cadastre no banco de dados e retorne na resposta da API.
*/

export async function POST(request: Request) {
  const { description } = await request.json();

  const task = await prisma.task.create({
    data: { description },
  });
  return NextResponse.json(task);
}

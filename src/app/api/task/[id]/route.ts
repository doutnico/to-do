import prisma from "@/server/prisma";
import { NextResponse } from "next/server";

/*
  4 - Crie uma API com método PATCH que receberá o ID da tarefa
  no parâmetro da URL. No corpo da requisição, deverá receber
  o valor "done", que será atualizado no banco de dados e
  retornando na reposta da API.
*/

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { done } = await request.json();

  const task = await prisma.task.update({
    where: { id: parseInt(params.id) },
    data: { done },
  });
  return NextResponse.json(task);
}

/*
  5 - Crie uma API com método DELETE que receberá o ID da tarefa
  no parâmetro da URL. Deletar a tarefa no banco de dados onde
  o id for o mesmo recebido da URL.
*/

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(task);
}

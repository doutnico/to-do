import { Task } from "@prisma/client";
import { useState } from "react";

export default function CreateTask({ setTask }: { setTask: Function }) {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (description) {
      /*
        7 - Faça uma request para cadastrar uma tarefa,
        passando a descrição no corpo da requisição. Após
        receber os dado, atualize a listagem na tela.
      */

      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setTask((task: Task[]) => [data, ...task]);
    }
  };

  return (
    <form>
      <div className="space-y-2 flex flex-col items-center">
        <h1 className="text-zinc-900 text-left w-full px-1">
          Escrever lista de tarefas
        </h1>
        <div className="space-x-4 flex">
          <input
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            type="text"
            placeholder="Escreva aqui..."
            className="shadow rounded-md px-2 text-gray-700"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="shadow rounded-md bg-blue-400 py-1 px-3 text-zinc-50"
          >
            Criar
          </button>
        </div>
      </div>
    </form>
  );
}

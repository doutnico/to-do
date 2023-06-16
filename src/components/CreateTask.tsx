"use client";

import { useState } from "react";

export default function CreateTask() {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (description) {
      /// 5 - Faça um request com o método POST passando a descrição no body.

      /**/
      await fetch("http://localhost:3000/api/task", {
        method: "POST",
        body: JSON.stringify({ description }),
      });
      /**/

      // await fetch(" ... ");
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
            onClick={() => handleSubmit()}
            className="shadow rounded-md bg-blue-400 py-1 px-3 text-zinc-50"
          >
            Criar
          </button>
        </div>
      </div>
    </form>
  );
}

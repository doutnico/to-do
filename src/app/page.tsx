"use client";

import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import CardTask from "@/components/CardTask";
import CreateTask from "@/components/CreateTask";

export default function Page() {
  const [task, setTask] = useState<Task[]>();

  const getAllTask = async () => {
    /*
      6 - Faça uma requisição buscando todas as tarefas
      cadastradas no banco de dados. Após obter todos os
      dados, atualize a listagem para exibir na tela.
    */

    const res = await fetch("http://localhost:3000/api/task", {
      cache: "no-store",
    });
    const data = await res.json();
    setTask(data);
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <main className="min-h-screen max-w-screen bg-zinc-100">
      <nav className="bg-blue-400 py-4 shadow-md flex justify-center">
        <h1 className="text-2xl font-extrabold text-white">To Do</h1>
      </nav>
      <div className="flex flex-col items-center p-8 space-y-8">
        <div className="shadow rounded py-5 px-8 bg-zinc-50 w-96">
          <CreateTask setTask={setTask}></CreateTask>
        </div>
        <div className="shadow rounded py-5 px-8 bg-zinc-50 w-96">
          <div className="space-y-2 flex flex-col">
            {task?.map((item) => (
              <CardTask
                id={item.id}
                title={item.description}
                done={item.done}
                setTask={setTask}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

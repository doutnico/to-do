import CardTask from "@/components/CardTask";
import CreateTask from "@/components/CreateTask";
import { Task } from "@prisma/client";

export default async function Page() {
  /// 4 - Faça um fetch que pega todas as task do banco de dados.

  /**/
  const res = await fetch("http://localhost:3000/api/task", {
    cache: "no-store",
  });
  /**/

  // const res = await fetch(" ... ");
  const data: Task[] = await res.json();

  return (
    <main className="min-h-screen max-w-screen bg-zinc-100">
      <nav className="bg-blue-400 py-4 shadow-md flex justify-center">
        <h1 className="text-2xl font-extrabold text-white">To Do</h1>
      </nav>
      <div className="flex flex-col items-center p-8 space-y-8">
        <div className="shadow rounded py-5 px-8 bg-zinc-50 w-96">
          <CreateTask></CreateTask>
        </div>
        <div className="shadow rounded py-5 px-8 bg-zinc-50 w-96">
          <div className="space-y-2 flex flex-col">
            {data?.map((item, index) => (
              <CardTask id={index + 1} title={item.description} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

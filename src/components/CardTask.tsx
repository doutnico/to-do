import { Task } from "@prisma/client";

export default function Card({
  id,
  title,
  done,
  setTask,
}: {
  id: number;
  title: string;
  done: boolean;
  setTask: Function;
}) {
  const onDelete = async () => {
    /*
      7 - Atualize a listagem removendo a tarefa
      selecionada e faça uma requisição passando o
      id do mesmo na URL para deletá-lo.
    */

    setTask((task: Task[]) => task.filter((e) => e.id !== id));
    await fetch(`http://localhost:3000/api/task/${id}`, { method: "DELETE" });
  };

  const toggle = async () => {
    /*
      8 - Atualize a listagem invertendo o status da
      tarefa selecionada. Faça uma requisição passando
      no corpo da requisição o parâmetro "done" contendo
      o novo status e na URL o id para atualizá-la.
    */

    setTask((task: Task[]) =>
      task.map((e) => (e.id === id ? { ...e, done: !e.done } : e))
    );
    await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: !done }),
    });
  };

  return (
    <div className="bg-zinc-100 rounded-md shadow-sm py-2 px-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 me-2"
          checked={done}
          onClick={toggle}
        />
        <p
          className={`grow ${
            done ? "line-through text-zinc-400" : "text-gray-700"
          }`}
        >
          {title}
        </p>
        <button className="group w-6">
          <div className="group-hover:hidden text-gray-700">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              ></path>
            </svg>
          </div>
          <div
            className="hidden group-hover:block group-hover:text-red-400"
            onClick={onDelete}
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

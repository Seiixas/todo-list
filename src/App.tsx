import { ChangeEvent, useEffect, useState } from "react";
import { PlusCircle, Trash } from "phosphor-react";
import { v4 } from "uuid";
import { useSnackbar } from "notistack";

import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";
import { Input } from "./components/Input/Input";

import "./global.css";
import styles from "./App.module.css";

import { TTodo } from "./types/TTodo";

function App() {
  const [todos, setTodos] = useState<TTodo[]>(setTodosInState);
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const allTodosCount = todos.length;
  const allTodosCompleted = todos.filter((todo) => todo.done).length;

  function setTodosInState(): TTodo[] | [] {
    const todosInLocalStorage = localStorage.getItem("todos");

    return todosInLocalStorage ? JSON.parse(todosInLocalStorage) : [];
  }

  function saveInLocalStorage(key: string, todos: TTodo[]) {
    localStorage.setItem(key, JSON.stringify(todos));
  }

  useEffect(() => {
    saveInLocalStorage("todos", todos);
  }, [todos]);

  function handleCreateTodo() {
    if (newTodoDescription === "")
      return enqueueSnackbar("Digite a descricao da tarefa!", {
        variant: "error",
      });

    const newTodo: TTodo = {
      id: v4(),
      description: newTodoDescription,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setNewTodoDescription("");

    localStorage.setItem("todos", JSON.stringify(todos));

    enqueueSnackbar("Tarefa criada com sucesso!", { variant: "success" });
  }

  function handleDeleteTodo(id: string) {
    const todosWithoutDeletedOne = todos.filter((todo) => todo.id !== id);

    setTodos(todosWithoutDeletedOne);
  }

  function handleChangeTodoStatus(id: string) {
    const todosUpdated = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        return todo;
      }

      return todo;
    });

    setTodos(todosUpdated);
  }

  function handleChangeTodoDescriptionInput(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setNewTodoDescription(event.target.value);
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <div className={styles.formWrapper}>
          <Input
            placeholder="Adicione uma nova tarefa"
            onChange={handleChangeTodoDescriptionInput}
            value={newTodoDescription}
          />
          <Button onClick={handleCreateTodo}>
            Criar <PlusCircle size={20} />
          </Button>
        </div>
        <section>
          <header>
            <p className={styles.tasksCreated}>
              Tarefas criadas <span>{allTodosCount}</span>
            </p>
            <p className={styles.tasksProgress}>
              Concluidas{" "}
              <span>
                {allTodosCompleted} de {allTodosCount}
              </span>
            </p>
          </header>
          {todos.map((todo) => (
            <article key={todo.id} className={styles.todo}>
              <div>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onClick={() => handleChangeTodoStatus(todo.id)}
                  />
                </div>

                {todo.done ? (
                  <p className={styles.todoDoneDescription}>
                    {todo.description}
                  </p>
                ) : (
                  <p>{todo.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                title="Deletar comentario"
              >
                <Trash size={20} />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;

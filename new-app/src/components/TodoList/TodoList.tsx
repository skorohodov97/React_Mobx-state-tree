import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TodoStoreInstance, ITodo } from "../../store/todoStore"; // Используем именованный импорт
import "./TodoList.css";

const TodoList: React.FC = observer(() => {
  useEffect(() => {
    TodoStoreInstance.fetchTodos(); // Обращаемся к TodoStoreInstance, а не todoStore
  }, []);

  const deleteTodo = async (id: number) => {
    await TodoStoreInstance.deleteTodo(id);
  };

  const toggleTodoCompleted = async (id: number, completed: boolean) => {
    await TodoStoreInstance.toggleTodoCompleted(id, completed);
  };

  return (
    <div className="todo-list">
      {TodoStoreInstance.status === "pending" && <p>Loading...</p>}
      {TodoStoreInstance.status === "error" && (
        <p className="text-danger">Error fetching todos.</p>
      )}
      {TodoStoreInstance.status === "success" && (
        <ul className="ul-items">
          {TodoStoreInstance.todos.map((todo: ITodo) => (
            <div key={todo.id} className="contener">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompleted(todo.id, todo.completed)}
              />
              <li className="todo-item">
                <span>{todo.title}</span>
                <div className="todo-buttons">
                  <button
                    className="btnDelete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
});

export default TodoList;

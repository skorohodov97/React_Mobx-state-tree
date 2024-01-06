import { observer } from "mobx-react-lite";
import { TodoStoreInstance } from "../../store/todoStore"; // Используйте именованный экспорт
import { useState } from "react";
import './TodoForm.css';

const TodoForm: React.FC = observer(() => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim() === "") {
      // Проверка на пустое значение
      return;
    }
    TodoStoreInstance.addTodo(newTodoTitle); // Обновите эту строку
    setNewTodoTitle("");
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        className="input-text"
        placeholder="Enter  title"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button className="add-todo" onClick={addTodo}>
        Add 
      </button>
    </div>
  );
});

export default TodoForm;

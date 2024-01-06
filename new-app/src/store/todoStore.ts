// todoStore.ts

import { types, flow, Instance, IMSTArray } from 'mobx-state-tree';
import axios from 'axios';
import checkInternet from '../utils/checkInternet';

const Todo = types.model({
  id: types.identifierNumber,
  title: types.string,
  completed: types.boolean,
});

const TodoStore = types
  .model({
    todos: types.array(Todo),
    status: types.optional(
      types.enumeration(["idle", "pending", "success", "error"]),
      "idle"
    ),
  })
  .actions((self) => ({
    fetchTodos: flow(function* () {
      if (checkInternet()) {
        self.status = "pending";
        try {
          const response = yield axios.get(
            "https://jsonplaceholder.typicode.com/todos/"
          );
          self.todos = response.data;
          self.status = "success";
        } catch (error) {
          console.error("Error fetching todos:", error);
          self.status = "error";
        }
      }
    }),

    addTodo: flow(function* (title: string) {
      const newTodo = {
        id: self.todos.length + 1,
        title,
        completed: false,
      };
      self.todos.push(newTodo);
      self.status = "success";
    }),

    toggleTodoCompleted: flow(function* (id: number, completed: boolean) {
      if (checkInternet()) {
        try {
          const response = yield axios.patch(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
              completed: !completed,
            }
          );
          if (response.status === 200) {
            const updatedTodo = response.data;
            const todoIndex = self.todos.findIndex((todo) => todo.id === id);
            if (todoIndex !== -1) {
              self.todos[todoIndex].completed = !self.todos[todoIndex].completed;
              self.status = "success";
              console.log("updatedTodo--" + JSON.stringify(updatedTodo));
            }
          }
        } catch (error) {
          console.error(`Error updating todo ${id} status:`, error);
          self.status = "error";
        }
      }
    }),

    deleteTodo: flow(function* (id: number) {
      if (checkInternet()) {
        try {
          const response = yield axios.delete(
            `https://jsonplaceholder.typicode.com/todos/${id}`
          );
          if (response.status === 200) {
            const updatedTodo = response.data;
            const index = self.todos.findIndex((todo) => todo.id === id);
            if (index !== -1) {
              self.todos.splice(index, 1);
              self.status = "success";
            }
            console.log("updatedTodo--" + JSON.stringify(updatedTodo));
          }
        } catch (error) {
          console.error(`Error updating todo ${id} status:`, error);
          self.status = "error";
        }
      }
    }),
  }));

export const TodoStoreInstance = TodoStore.create({
  todos: [],
});

export type ITodo = Instance<typeof Todo>;
export type ITodoStore = typeof TodoStoreInstance;

// Экспортируем методы
export const { fetchTodos, addTodo, toggleTodoCompleted, deleteTodo } = TodoStoreInstance;

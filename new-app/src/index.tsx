import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import reportWebVitals from "./reportWebVitals";
import { TodoStoreInstance } from "./store/todoStore"; // Используйте именованный экспорт

export const StoreContext = React.createContext({}); // Передайте пустой объект в качестве начального значения

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={{ todoStore: TodoStoreInstance }}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

//Импорт различных зависимостей
import React from "react";
import ReactDOM from "react-dom/client";

//Импорт основного команента
import App from "./App.jsx";

//Главный файл, который выводит все содержимое на экран
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

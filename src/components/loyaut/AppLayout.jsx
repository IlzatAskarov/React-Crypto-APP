//Импорт компонентов
import AppContent from "./AppContent";
import AppHeaader from "./AppHeaader";
import AppSider from "./AppSider";

//Импортируем готовый стеализованный компонент, из библиотеки 'Ant Design' который мы подключили с помощью команды `npm install antd --save`
import { Layout, Spin } from "antd";

//Импорт хуков из react
import { useContext } from "react";

//Импорт переменной "CryptoContext" из файла "crypto-context" где хранится логика для работы с данными
import CryptoContext from "../../context/crypto-context";

//Компонент с основным макетом страницы
export default function AppLayout() {
  //Использование значение loading из переменой контекста "CryptoContext"
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeaader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

//Импорт компонента "AppLoyaut" где лежит основной макет страницы
import AppLayout from "./components/loyaut/AppLayout";

//Импорт функции контекст
import { CryptoContextProvider } from "./context/crypto-context";

//Импортируем основной файл стилей scss
import "./style/main.scss";

//Основной компонент страницы
export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

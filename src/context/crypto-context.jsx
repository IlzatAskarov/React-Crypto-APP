//Импорт хуков из react
import { createContext, useState, useEffect, useContext } from "react";

//Импорт функций где мы получали данные из сервера
import { fakeFetchCrypto, fetchAssets } from "../api";

//Импорт функций утилит
import { percentDifference } from "../utils";

//Константа c контекстом для того чтоб управлять данными
const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

//Компонент-context - здесь будет хранится логика для работы с данными
export function CryptoContextProvider({ children }) {
  //Состояния индикатора загрузки
  const [loading, setLoading] = useState(false);

  //Состояние с информацией тукущего курса и т.д.
  const [crypto, setCrypto] = useState([]);

  //Состояние с информацией той крипто валюты которую мы купили
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      //Данные конкретной манеты
      const coin = result.find((c) => c.id == asset.id);

      //Возвращяем объект с обработанными значениями
      return {
        //Grow - будет определять упала монета или поднялась с времени нашей покупки
        grow: asset.price < coin.price,

        //growPercent - расчитывает в процентах на сколько упала или поднялась наша монета
        growPercent: percentDifference(asset.price, coin.price),

        //totalAmount - сколько в сомах у нас есть в купленной монете
        totalAmount: asset.amount * coin.price,

        //totalProfit - сколько мы зараболи или сколько потеряли
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,

        //name - указывает на названия манеты
        name: coin.name,

        ...asset,
      };
    });
  }

  //Для загрузки данных из нашего "api.js" файла где мы получали данные из сервера
  useEffect(() => {
    //Создали ассинхроную функцию preload
    async function preload() {
      //Присваем значение "true" состоянию "setLoading" для начало загрузки
      setLoading(true);

      //Присваиваем актуальный курс и другую информацию переменной result
      const { result } = await fakeFetchCrypto();

      //Присваиваем данные той крипты которую мы купили переменной assets
      const assets = await fetchAssets();

      //Выводим на экран получаные данные из сервера
      setAssets(mapAssets(assets, result));

      //Присваеваем к состоянию "setCrypto" данные о крипте из переменной result
      setCrypto(result);

      //Завершаем загрузку
      setLoading(false);
    }
    //Вызываем функцию что-б она заработала
    preload();
  }, []);

  //Функция для добавляние новой валюты
  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  //Отображение страницы с помощью "children"
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

//Экспорт константы контекст "CryptoContext"
export default CryptoContext;

//Кастомный хук
export function useCrypto() {
  return useContext(CryptoContext);
}

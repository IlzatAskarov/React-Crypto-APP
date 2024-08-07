//В данном файле мы имулируем запрос на сервер (data.js)

//Импортируем константы с данными крипто валют
import { cryptoAssets, cryptoData } from "./data";

//Функция получения данных из сервера data
export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    //Получаем данные через 2 секунды после запуска страницы
    setTimeout(() => {
      //Получаем данные из константы cryptoAssets
      resolve(cryptoData);
    }, 2000);
  });
}

//Функция получения данных из сервера data
export function fetchAssets() {
  return new Promise((resolve) => {
    //Получаем данные через 2 секунды после запуска страницы
    setTimeout(() => {
      //Получаем данные из константы cryptoAssets
      resolve(cryptoAssets);
    }, 2000);
  });
}

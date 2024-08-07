//Импорт компонентов из библиотеки "ant design"
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";

//Импорт кастомного хука
import { useCrypto } from "../../context/crypto-context";

//Импорт хуков из react
import { useEffect, useState } from "react";

//Импорт компонентов
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

//Стили для шапки
const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

//Компонент шапки страницы
export default function AppHeaader() {
  //Состояния открытия модального окна
  const [modal, setModal] = useState(false);

  //Состояния проверящие нажатие клавиши "/"
  const [select, setSelect] = useState(false);

  //Константа со значениями из переменной
  const { crypto } = useCrypto();

  //Состояния позволяющие отображать название выбранной валюты в модальном окне
  const [coin, setCoin] = useState(null);

  //Состояния вызова боковова меню
  const [drawer, setDrawer] = useState(false);

  //Эффект проверки нажатия на клавишу "/"
  useEffect(() => {
    //Стрелочная функция где мы провереям нажатия на кнопку
    const keypress = (event) => {
      //Если кнопка нажата то мы меняем значение на в событии "setSelect" на true либо false
      if (event.key == "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  //Функция для события нажатия на значение в выподающем меню
  function handleSelect(value) {
    //Проверка на какое именно значение было произведенно нажатия
    setCoin(crypto.find((c) => c.id == value));

    //Отображать модальное окно после нажатия на кнопку
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        value="press / to open"
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

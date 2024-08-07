//Импорт хуков
import { useRef, useState } from "react";

//Импорт компонентов из библиотеки "ant design"
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Result,
} from "antd";

//Импорт кастомного хука
import { useCrypto } from "../context/crypto-context";

//Импорт компонентов
import CoinInfo from "./CoinInfo";

//Константа со значениями которые будут отображатся при валидации формы
const validateMessage = {
  required: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
  number: {
    range: "${label} must be berween ${min} and ${max}",
  },
};

//Компонент бокавого меню
export default function AddAssetForm({ onClose }) {
  //Получаем форму из jsx нашего проекта
  const [form] = Form.useForm();

  //Список всех валют
  const { crypto, addAsset } = useCrypto();

  //События для определения какой именно валютой мы взаимодействуем
  const [coin, setCoin] = useState(null);

  //События проверки была ли нажата кнопка отправки данных на сервер
  const [submitted, setSubmitted] = useState(false);

  const assetRef = useRef();

  //Если кнопка отправки на сервер была нажата то мы отобразим компоннент удачной отправки данных на сервер
  if (submitted) {
    return (
      <Result
        status="success"
        title="new Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  //Проверка - если манета отсутствует, то вызываетмя select где мы можем выбрать манету
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        value="Select coin"
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
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
    );
  }

  //Что будет происходить после нажатия на кнопку отправки формы
  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  //Управление формай диномически, выводим общую стоимость всех купленных монет
  function handleAmountChange(value) {
    const price = form.getFieldValue("price");

    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessage={validateMessage}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}

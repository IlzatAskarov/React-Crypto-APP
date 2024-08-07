//Импорт компонентов из библиотеки "ant design"
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";

//Импорт иконок из библиотеки "ant design"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

//Импорт функций утилит
import { capitalize } from "../../utils";

//Импорт хуков из react
import { useContext } from "react";

//Импорт переменной "CryptoContext" из файла "crypto-context" где хранится логика для работы с данными
import CryptoContext from "../../context/crypto-context";

//Стили бокавой панели
const siderStyle = {
  padding: "1rem",
};

//Компонент бокавой панели
export default function AppSider() {
  //Берем данные из переменной CryptoContext, чтоб вывести их на экран
  const { loading, assets } = useContext(CryptoContext);

  //JSX КОД
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        return (
          //key уникальный ключ для элементов с map
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? "#3f8600" : "#cf1322",
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        );
      })}
    </Layout.Sider>
  );
}

//Импорт компонентов из библиотеки "ant design"
import { Layout, Typography } from "antd";

//Импорт кастомного хука
import { useCrypto } from "../../context/crypto-context";

//Импорт кампонентов
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

//Стили для контентной части
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
};

//Компонент основного контента страницы
export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ textAlign: "left", color: "#fff" }} level={3}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}

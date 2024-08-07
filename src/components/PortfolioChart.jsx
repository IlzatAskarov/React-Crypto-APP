//Базовые компоненты для графика из библиотеки charts.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

//Компонент какой именно график нам нужен из библиотеки
import { Pie } from "react-chartjs-2";

//Импорт кастомного хука
import { useCrypto } from "../context/crypto-context";

//Регестрируем сам компонент и его дополнения
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();

  const data = {
    //Отображения названий крипты
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255,1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}

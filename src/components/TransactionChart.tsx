import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Statistic } from "../apis/models/statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TransactionChartProps = {
  data: Statistic;
};

export function TransactionChart({ data }: TransactionChartProps) {
  const labels = Object.keys(data.by_category);
  const incomeData = labels.map((label) => data.by_category[label].income);
  const expenseData = labels.map((label) => data.by_category[label].expense);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#4ade80",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#f87171",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#000", // teks legend hitam
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return `Rp ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000",
        },
      },
      y: {
        ticks: {
          color: "#000",
        },
      },
    },
  };

  return (
    <div style={{borderRadius: '10px'}} className="shadow-sm p-3 mx-3 mb-3 bg-white text-dark">
      <h5 style={{fontSize: '18px'}} className="mb-3">Ringkasan Transaksi</h5>
      <ul className="mb-4">
        <li>
          <strong>Total Income:</strong> Rp {data.total_income.toLocaleString()}
        </li>
        <li>
          <strong>Total Expense:</strong> Rp{" "}
          {data.total_expense.toLocaleString()}
        </li>
        <li>
          <strong>Balance:</strong> Rp {data.balance.toLocaleString()}
        </li>
      </ul>
      <div style={{ width: "100%", height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

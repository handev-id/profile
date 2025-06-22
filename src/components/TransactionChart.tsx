import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useState } from "react";
import { Statistic } from "../apis/models/statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type TransactionChartProps = {
  data: Statistic;
};

export function TransactionChart({ data }: TransactionChartProps) {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const labels = Object.keys(data.by_category);
  const incomeData = labels.map((label) => data.by_category[label].income);
  const expenseData = labels.map((label) => data.by_category[label].expense);

  const datasets = [
    {
      label: "Income",
      data: incomeData,
      backgroundColor: "#4ade80",
      borderColor: "#4ade80",
      fill: false,
      tension: 0.4,
    },
    {
      label: "Expense",
      data: expenseData,
      backgroundColor: "#f87171",
      borderColor: "#f87171",
      fill: false,
      tension: 0.4,
    },
  ];

  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [data.total_income, data.total_expense],
        backgroundColor: ["#4ade80", "#f87171"],
        hoverOffset: 10,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#000" },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y ?? context.parsed;
            return `Rp ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#000" },
        grid: { color: "#e5e7eb" },
      },
      y: {
        ticks: { color: "#000" },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <div style={{ borderRadius: "10px" }} className="shadow-sm p-3 mx-3 mb-3 bg-white text-dark">
      <h5 style={{ fontSize: "18px" }} className="mb-3">Ringkasan Transaksi</h5>

      {/* Toggle Chart Type */}
      <div className="mb-3">
        <label className="form-label me-2">Tipe Grafik:</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="chartType"
            id="barChart"
            value="bar"
            checked={chartType === "bar"}
            onChange={() => setChartType("bar")}
          />
          <label className="form-check-label" htmlFor="barChart">Bar</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="chartType"
            id="lineChart"
            value="line"
            checked={chartType === "line"}
            onChange={() => setChartType("line")}
          />
          <label className="form-check-label" htmlFor="lineChart">Line</label>
        </div>
      </div>

      {/* Summary */}
      <ul className="mb-4">
        <li><strong>Total Income:</strong> Rp {data.total_income.toLocaleString()}</li>
        <li><strong>Total Expense:</strong> Rp {data.total_expense.toLocaleString()}</li>
        <li><strong>Balance:</strong> Rp {data.balance.toLocaleString()}</li>
      </ul>

      {/* Chart Area */}
      <div style={{ width: "100%", height: "300px" }} className="mb-4">
        {chartType === "bar" ? (
          <Bar data={{ labels, datasets }} options={commonOptions} />
        ) : (
          <Line data={{ labels, datasets }} options={commonOptions} />
        )}
      </div>

      {/* Pie Chart at Bottom */}
      <div style={{ width: "100%", height: "300px" }}>
        <Pie data={pieChartData} options={commonOptions} />
      </div>
    </div>
  );
}

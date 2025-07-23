import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const EbookAccessPieChart = ({ data }) => {
  const counts = data.reduce(
    (acc, book) => {
      if (book.ebook_access === "public") {
        acc.public += 1;
      } else {
        acc.restricted += 1;
      }
      return acc;
    },
    { public: 0, restricted: 0 }
  );

  const chartData = [
    { name: "Public Access", value: counts.public },
    { name: "Restricted", value: counts.restricted },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default EbookAccessPieChart;
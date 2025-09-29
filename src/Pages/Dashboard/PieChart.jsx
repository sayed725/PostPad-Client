import { Cell, PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

const PieChartt = ({stats}) => {
  // custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  //   console.log(stats);
  const chartData = [
    { name: "Users", value: stats?.users },
    { name: "Posts", value: stats?.posts },
    { name: "Comments", value: stats?.comments },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="border-2 shadow-sm border-[#e5e7eb] dark:bg-[#20293d] dark:border-none mt-10  rounded-lg p-5">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        User, Post & Comment Distribution
      </h2>
      <p className={"text-lg tracking-wider font-medium"}>
        A visual representation of users, posts, and comments distribution.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartt;

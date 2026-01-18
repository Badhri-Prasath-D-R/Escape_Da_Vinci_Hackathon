import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineChartData = {
  name: string;
  fake: number;
  real: number;
};

type LineChartProps = {
  data: LineChartData[];
};

const LineChart = ({ data }: LineChartProps) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="fake"
            stroke="#dc2626"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="real"
            stroke="#16a34a"
            strokeWidth={2}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;

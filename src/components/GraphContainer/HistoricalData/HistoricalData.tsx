import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { stringToHex } from "utils";

import { historicalDataByYearMonth } from "./data";

export const HistoricalData = () => <BarGraphByMonth />;

interface IHistoricalBarGraphData {
  year: string;
  deaths: number;
}
const mapMonthlyDeaths = (
  data: (string | number)[][]
): IHistoricalBarGraphData[] => {
  const result: IHistoricalBarGraphData[] = [];

  for (let i = 0; i < data.length; i += 12) {
    const deaths =
      Number(data[i + 0][2]) +
      Number(data[i + 1][2]) +
      Number(data[i + 2][2]) +
      Number(data[i + 3][2]) +
      Number(data[i + 4][2]) +
      Number(data[i + 5][2]) +
      Number(data[i + 6][2]) +
      Number(data[i + 7][2]) +
      Number(data[i + 8][2]) +
      Number(data[i + 9][2]) +
      Number(data[i + 10][2]) +
      Number(data[i + 11][2]);

    result.push({
      year: `${data[i][0]}`,
      deaths,
    });
  }

  return result;
};

const BarGraphByMonth = () => {
  const [formattedData] = useState(mapMonthlyDeaths(historicalDataByYearMonth));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="deaths"
          fill={`#${stringToHex("deaths")}`}
          key={"historical-deaths-bar-deaths"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

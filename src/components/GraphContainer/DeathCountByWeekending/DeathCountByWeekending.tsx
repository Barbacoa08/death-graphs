// data set: https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/muzy-jte6
// API usage info: https://dev.socrata.com/foundry/data.cdc.gov/muzy-jte6

import axios from "axios";
import { useEffect, useState } from "react";
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

import { IWeeklyDeathsByStates } from "types";
import { stringToHex } from "utils";

const baseUrl = "https://data.cdc.gov/resource/muzy-jte6.json";
const wholeUS = "jurisdiction_of_occurrence=United%20States";

export const DeathCountByWeekending = () => {
  const [apiData, setApiData] = useState<IWeeklyDeathsByStates[]>([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}?${wholeUS}`)
      .then((result) => setApiData(result.data))
      .catch((e) => {
        console.error("recieved error:");
        console.error(e);
        setApiData([]);
      });
  }, []);
  return (
    <main>
      {apiData.length ? (
        <StackedBarChartDeathsByWeek data={apiData} />
      ) : (
        "loading..."
      )}
    </main>
  );
};

interface IDeathsWeekendingByYear {
  WeekNumber: string;
  "2019 Deaths"?: number;
  "2020 Deaths"?: number;
}

const mapWeeklyDeathsToChartData = (
  apiData: IWeeklyDeathsByStates[]
): IDeathsWeekendingByYear[] => {
  const weekObject = {};
  apiData.forEach((item) => {
    const weekNumber = ("0" + item.mmwrweek).slice(-2);
    if (!weekObject[weekNumber]) {
      weekObject[weekNumber] = {};
    }

    weekObject[weekNumber][item.mmwryear] = Number(item.all_cause);
  });

  const result: IDeathsWeekendingByYear[] = [];
  Object.keys(weekObject)
    .sort()
    .forEach((weekNumber) => {
      const item: IDeathsWeekendingByYear = {
        WeekNumber: weekNumber,
        "2019 Deaths": weekObject[weekNumber][2019],
        "2020 Deaths": weekObject[weekNumber][2020],
      };

      result.push(item);
    });

  return result;
};
const StackedBarChartDeathsByWeek = ({
  data,
}: {
  data: IWeeklyDeathsByStates[];
}) => {
  const [formattedData, setData] = useState<IDeathsWeekendingByYear[]>([]);
  useEffect(() => {
    const chartData = mapWeeklyDeathsToChartData(data);
    setData(chartData);
  }, [data]);

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
        <XAxis dataKey="WeekNumber" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="2019 Deaths"
          fill={`#${stringToHex("2019 Deaths")}`}
          key="barchart-bar-2019-Deaths"
          stackId="a"
        />
        <Bar
          dataKey="2020 Deaths"
          fill={`#${stringToHex("2020 Deaths")}`}
          key="barchart-bar-2020-Deaths"
          stackId="b"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

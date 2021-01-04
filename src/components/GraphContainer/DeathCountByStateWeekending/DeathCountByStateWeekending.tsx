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

import { IWeeklyDeathsByStates, IWeeklyDeathsChartData } from "types";
import { stringToHex } from "utils";

const baseUrl = "https://data.cdc.gov/resource/muzy-jte6.json";
const urlStates = (selectedStates: string[]) =>
  `$where=jurisdiction_of_occurrence%20in(${selectedStates
    .map((s) => `'${s}'`)
    .join(",")})`;

export const DeathCountByStateWeekending = ({
  chosenStates = ["Minnesota"],
}: {
  chosenStates: string[];
}) => {
  const [apiData, setApiData] = useState<IWeeklyDeathsByStates[]>([]);
  useEffect(() => {
    console.log(chosenStates);
    axios
      .get(`${baseUrl}?${urlStates(chosenStates)}`)
      .then((result) => setApiData(result.data))
      .catch((e) => {
        console.error("recieved error:");
        console.error(e);
        setApiData([]);
      });
  }, [chosenStates]);

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

const mapWeeklyDeathsToChartData = (
  apiData: IWeeklyDeathsByStates[]
): IWeeklyDeathsChartData[] => {
  const weekObject = {};
  apiData.forEach((item) => {
    const yearweek = `${item.mmwryear}-${("0" + item.mmwrweek).slice(-2)}`;
    if (!weekObject[yearweek]) {
      weekObject[yearweek] = { AllDeaths: 0 };
    }

    weekObject[yearweek][item.jurisdiction_of_occurrence] = Number(
      item.all_cause
    );
    weekObject[yearweek].AllDeaths += Number(item.all_cause);
  });

  const result: IWeeklyDeathsChartData[] = [];
  Object.keys(weekObject)
    .sort()
    .forEach((yearweek) => {
      const item = {
        YearWeek: yearweek,
        AllDeaths: weekObject[yearweek].AllDeaths,
      };
      Object.keys(weekObject[yearweek]).forEach((child) => {
        item[child] = weekObject[yearweek][child];
      });

      result.push(item as IWeeklyDeathsChartData);
    });

  return result;
};
const StackedBarChartDeathsByWeek = ({
  data,
}: {
  data: IWeeklyDeathsByStates[];
}) => {
  const [chartBars, setChartBars] = useState<JSX.Element[]>([]);
  const [formattedData, setData] = useState<IWeeklyDeathsChartData[]>([]);
  useEffect(() => {
    const chartData = mapWeeklyDeathsToChartData(data);
    setData(chartData);

    const bars: JSX.Element[] = [];
    Object.keys(chartData[0]).forEach((child) => {
      if (!["YearWeek", "AllDeaths"].includes(child)) {
        bars.push(
          <Bar
            dataKey={child}
            fill={`#${stringToHex(child)}`}
            key={`barchart-bar-${child}`}
            stackId="a"
          />
        );
      }
    });
    setChartBars(bars);
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
        <XAxis dataKey="YearWeek" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {/* <Bar dataKey="AllDeaths" fill="#8884d8" /> */}
        {chartBars}
      </BarChart>
    </ResponsiveContainer>
  );
};

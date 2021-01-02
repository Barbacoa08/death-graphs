// data set: https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/muzy-jte6
// API usage info: https://dev.socrata.com/foundry/data.cdc.gov/muzy-jte6

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { IWeeklyDeathsByStates, IWeeklyDeathsChartData } from "types";

export const DeathCountByState = () => {
  const [apiData, setApiData] = useState<IWeeklyDeathsByStates[]>([]);
  useEffect(() => {
    axios
      .get("https://data.cdc.gov/resource/muzy-jte6.json")
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
  const [formattedData, setData] = useState<IWeeklyDeathsChartData[]>([]);
  useEffect(() => {
    setData(mapWeeklyDeathsToChartData(data));
  }, [data]);

  return (
    <ResponsiveContainer width={500} height={300}>
      <BarChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Alabama" stackId="a" />
        <Bar dataKey="Alaska" stackId="a" />
        <Bar dataKey="Arizona" stackId="a" />
        <Bar dataKey="Arkansas" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

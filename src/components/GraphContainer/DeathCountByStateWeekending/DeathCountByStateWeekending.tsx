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
const urlStates = (selectedStates: string[]) =>
  `$where=jurisdiction_of_occurrence%20in(${selectedStates
    .map((s) => `'${s}'`)
    .join(",")})`;

export const DeathCountByStateWeekending = ({
  chosenStates,
}: {
  chosenStates: string[];
}) => {
  // TODO: memoize API results. We DO NOT want to spam the API if the user is experimenting
  // further note, don't use `useMemo`, as it only memoizes the previous result (singular)
  const [apiData, setApiData] = useState<IWeeklyDeathsByStates[]>([]);
  useEffect(() => {
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

interface IWeeklyDeathsByStateYear extends Record<string, string> {
  YearWeek: string;
}

const mapWeeklyDeathsToChartData = (
  apiData: IWeeklyDeathsByStates[]
): IWeeklyDeathsByStateYear[] => {
  const weekObject = {};
  apiData.forEach((item) => {
    const yearweek = ("0" + item.mmwrweek).slice(-2);
    if (!weekObject[yearweek]) {
      weekObject[yearweek] = {};
    }

    weekObject[yearweek][
      `${item.jurisdiction_of_occurrence}-${item.mmwryear}`
    ] = Number(item.all_cause) || undefined;
  });

  const result: IWeeklyDeathsByStateYear[] = [];
  Object.keys(weekObject)
    .sort()
    .forEach((yearweek) => {
      const item = {
        YearWeek: yearweek,
      };
      Object.keys(weekObject[yearweek]).forEach((child) => {
        item[child] = weekObject[yearweek][child];
      });

      result.push(item as IWeeklyDeathsByStateYear);
    });

  return result;
};
const StackedBarChartDeathsByWeek = ({
  data,
}: {
  data: IWeeklyDeathsByStates[];
}) => {
  const [chartBars, setChartBars] = useState<JSX.Element[]>([]);
  const [formattedData, setData] = useState<IWeeklyDeathsByStateYear[]>([]);
  useEffect(() => {
    const chartData = mapWeeklyDeathsToChartData(data);
    setData(chartData);

    const bars: JSX.Element[] = [];
    Object.keys(chartData[0]).forEach((child) => {
      if (!["YearWeek"].includes(child)) {
        const [, year] = child.split("-");
        bars.push(
          <Bar
            dataKey={child}
            fill={`#${stringToHex(child)}`}
            key={`barchart-bar-${child}`}
            stackId={year === "2019" ? "a" : "b"}
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
        {chartBars}
      </BarChart>
    </ResponsiveContainer>
  );
};

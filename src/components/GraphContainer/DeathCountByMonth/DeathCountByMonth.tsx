import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { IMonthlyDeathsChartData, IStateAndNationalDeathCounts } from "types";

const baseUrl = "https://data.cdc.gov/resource/hmz2-vwda.json";
const wholeUS = "state=UNITED%20STATES";
const numberOfDeaths = "indicator=Number%20of%20Deaths";
const periodMonthly = "period=Monthly";

export const DeathCountByMonth = () => {
  const [data, setData] = useState<IStateAndNationalDeathCounts[]>([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}?${wholeUS}&${numberOfDeaths}&${periodMonthly}`)
      .then((result) => setData(result.data))
      .catch((e) => {
        console.error("recieved error:");
        console.error(e);
        setData([]);
      });
  }, []);

  // useMemo to get `indicator`, and possibly `state`
  // hardcode `year`/`month`/`period`
  return <>{data.length ? <LineChartByYear data={data} /> : "loading..."}</>;
};

const formatChartData = (
  data: IStateAndNationalDeathCounts[]
): IMonthlyDeathsChartData[] => {
  const monthObject = {
    January: { 2019: undefined, 2020: undefined },
    February: { 2019: undefined, 2020: undefined },
    March: { 2019: undefined, 2020: undefined },
    April: { 2019: undefined, 2020: undefined },
    May: { 2019: undefined, 2020: undefined },
    June: { 2019: undefined, 2020: undefined },
    July: { 2019: undefined, 2020: undefined },
    August: { 2019: undefined, 2020: undefined },
    September: { 2019: undefined, 2020: undefined },
    October: { 2019: undefined, 2020: undefined },
    November: { 2019: undefined, 2020: undefined },
    December: { 2019: undefined, 2020: undefined },
  };
  data.forEach(
    (item) => (monthObject[item.month][item.year] = item.data_value)
  );

  return [
    {
      Month: "January",
      "2019 Deaths": monthObject.January[2019],
      "2020 Deaths": monthObject.January[2020],
    },
    {
      Month: "February",
      "2019 Deaths": monthObject.February[2019],
      "2020 Deaths": monthObject.February[2020],
    },
    {
      Month: "March",
      "2019 Deaths": monthObject.March[2019],
      "2020 Deaths": monthObject.March[2020],
    },
    {
      Month: "April",
      "2019 Deaths": monthObject.April[2019],
      "2020 Deaths": monthObject.April[2020],
    },
    {
      Month: "May",
      "2019 Deaths": monthObject.May[2019],
      "2020 Deaths": monthObject.May[2020],
    },
    {
      Month: "June",
      "2019 Deaths": monthObject.June[2019],
      "2020 Deaths": monthObject.June[2020],
    },
    {
      Month: "July",
      "2019 Deaths": monthObject.July[2019],
      "2020 Deaths": monthObject.July[2020],
    },
    {
      Month: "August",
      "2019 Deaths": monthObject.August[2019],
      "2020 Deaths": monthObject.August[2020],
    },
    {
      Month: "September",
      "2019 Deaths": monthObject.September[2019],
      "2020 Deaths": monthObject.September[2020],
    },
    {
      Month: "October",
      "2019 Deaths": monthObject.October[2019],
      "2020 Deaths": monthObject.October[2020],
    },
    {
      Month: "November",
      "2019 Deaths": monthObject.November[2019],
      "2020 Deaths": monthObject.November[2020],
    },
    {
      Month: "December",
      "2019 Deaths": monthObject.December[2019],
      "2020 Deaths": monthObject.December[2020],
    },
  ];
};
const LineChartByYear = ({
  data,
}: {
  data: IStateAndNationalDeathCounts[];
}) => {
  const [formattedData, setData] = useState<IMonthlyDeathsChartData[]>([]);
  useEffect(() => {
    setData(formatChartData(data));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" />
        <YAxis type="number" domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line dataKey="2019 Deaths" stroke="#8884d8" />
        <Line dataKey="2020 Deaths" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

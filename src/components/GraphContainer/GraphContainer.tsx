import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// data source: https://dev.socrata.com/foundry/data.cdc.gov/hmz2-vwda
const baseUrl = "https://data.cdc.gov/resource/hmz2-vwda.json";
const wholeUS = "state=UNITED%20STATES";
const numberOfDeaths = "indicator=Number%20of%20Deaths";
const periodMonthly = "period=Monthly";

interface ICDCData {
  // eslint-disable-next-line camelcase
  data_value: number;
  indicator: string;
  month: string;
  period: string;
  state: string;
  year: string;
}

export const GraphContainer = () => {
  const [data, setData] = useState<ICDCData[]>([]);
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
  return (
    <main>
      {/* {JSON.stringify(data)} */}
      {data.length ? <LineChartByYear data={data} /> : "loading..."}
    </main>
  );
};

interface IChartFormattedData {
  Month: string;
  "2019 Deaths"?: number;
  "2020 Deaths"?: number;
}
const formatChartData = (data: ICDCData[]): IChartFormattedData[] => {
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
const LineChartByYear = ({ data }: { data: ICDCData[] }) => {
  const [formattedData, setData] = useState<IChartFormattedData[]>([]);
  useEffect(() => {
    setData(formatChartData(data));
  }, [data]);

  return (
    <LineChart
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
      <XAxis dataKey="Month" />
      <YAxis />
      <Tooltip />
      <Legend margin={{ top: 15 }} />
      <Line dataKey="2019 Deaths" stroke="#8884d8" />
      <Line dataKey="2020 Deaths" stroke="#82ca9d" />
    </LineChart>
  );
};

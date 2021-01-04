import { CalendarMonths } from "./shared";

export interface IMonthlyDeathsChartData {
  Month: CalendarMonths;
  "2019 Deaths"?: number;
  "2020 Deaths"?: number;
}

export interface IWeeklyDeathsChartData {
  YearWeek: string;
  AllDeaths: number;

  // states (TODO: logic could/should be better, use `type USState`?)
  Alabama: string;
  Alaska: string;
  Arizona: string;
  Arkansas: string;
  California: string;
  Colorado: string;
  Connecticut: string;
  Delaware: string;
  Florida: string;
  Georgia: string;
  Hawaii: string;
  Idaho: string;
  Illinois: string;
  Indiana: string;
  Iowa: string;
  Kansas: string;
  Kentucky: string;
  Louisiana: string;
  Maine: string;
  Maryland: string;
  Massachusetts: string;
  Michigan: string;
  Minnesota: string;
  Mississippi: string;
  Missouri: string;
  Montana: string;
  Nebraska: string;
  Nevada: string;
  "New Hampshire": string;
  "New Jersey": string;
  "New Mexico": string;
  "New York": string;
  "North Carolina": string;
  "North Dakota": string;
  Ohio: string;
  Oklahoma: string;
  Oregon: string;
  Pennsylvania: string;
  "Rhode Island": string;
  "South Carolina": string;
  "South Dakota": string;
  Tennessee: string;
  Texas: string;
  Utah: string;
  Vermont: string;
  Virginia: string;
  Washington: string;
  "West Virginia": string;
  Wisconsin: string;
  Wyoming: string;
}

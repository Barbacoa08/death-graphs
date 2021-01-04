/* eslint-disable camelcase */

export interface IWeeklyDeathsByStates {
  jurisdiction_of_occurrence: string;
  mmwryear: string;
  mmwrweek: string;
  week_ending_date: string;
  all_cause: number;
  natural_cause: number;
  septicemia_a40_a41: number;
  malignant_neoplasms_c00_c97: number;
  diabetes_mellitus_e10_e14: number;
  alzheimer_disease_g30: number;
  influenza_and_pneumonia_j09_j18: number;
  chronic_lower_respiratory: number;
  other_diseases_of_respiratory: number;
  nephritis_nephrotic_syndrome: number;
  symptoms_signs_and_abnormal: number;
  diseases_of_heart_i00_i09: number;
  cerebrovascular_diseases: number;
  covid_19_u071_multiple_cause_of_death: number;
  covid_19_u071_underlying_cause_of_death: number;
}

export interface IStateAndNationalDeathCounts {
  data_value: number;
  indicator: string;
  month: string;
  period: string;
  state: string;
  year: string;
}

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
} from "@material-ui/core";
import { ChangeEvent, useCallback, useState } from "react";

import { USStateList } from "types/shared";

import { DeathCountByMonth } from "./DeathCountByMonth";
import { DeathCountByStateWeekending } from "./DeathCountByStateWeekending";
import { DeathCountByWeekending } from "./DeathCountByWeekending";
import { HistoricalData } from "./HistoricalData";

const useStyles = makeStyles(() => ({
  header: {
    marginBottom: 0,
  },
  section: {
    marginBottom: 20,
  },
}));

export const GraphContainer = () => {
  const { header, section } = useStyles();
  const [chosenStates, setChosenState] = useState<string[]>([]);
  const handleStateSelection = useCallback(
    (e: ChangeEvent<HTMLInputElement>, c: boolean) => {
      const clickedState = e.target.name;
      if (c === true) {
        setChosenState([...chosenStates, clickedState]);
      } else {
        setChosenState(chosenStates.filter((s) => s !== clickedState));
      }
    },
    [chosenStates]
  );

  const stateList = USStateList.map(
    (s): JSX.Element => (
      <FormControlLabel
        control={<Checkbox onChange={handleStateSelection} name={s} />}
        key={`state-checkbox-${s}`}
        label={s}
      />
    )
  );

  return (
    <main style={{ minWidth: 800, width: "50%" }}>
      <h2 className={header}>Deaths in the entirety of the US</h2>
      <section className={section}>
        <aside>
          Data for the following graphs provided by the CDC{" "}
          <a href="https://dev.socrata.com/foundry/data.cdc.gov/hmz2-vwda">
            through this API
          </a>
        </aside>
        <aside>
          Details about the API{" "}
          <a href="https://data.cdc.gov/NCHS/VSRR-State-and-National-Provisional-Counts-for-Liv/hmz2-vwda">
            can be found here
          </a>
        </aside>
      </section>

      <label>2019 {"->"} 2020 by month</label>
      <section>
        <DeathCountByMonth />
      </section>

      <div style={{ margin: "10px 0" }}>&nbsp;</div>

      <label>2019 {"->"} 2020 by weekending</label>
      <section>
        <DeathCountByWeekending />
      </section>

      <h2 className={header}>Deaths by State in the US</h2>
      <section className={section}>
        <aside>
          Data for the following graphs provided by the CDC{" "}
          <a href="https://dev.socrata.com/foundry/data.cdc.gov/muzy-jte6">
            through this API
          </a>
        </aside>
        <aside>
          Details about the API{" "}
          <a href="https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/muzy-jte6">
            can be found here
          </a>
        </aside>
      </section>

      <label>2019 {"->"} 2020 by weekending</label>
      <section>
        <DeathCountByStateWeekending chosenStates={chosenStates} />
      </section>

      <FormControl component="fieldset" error={false} required>
        <FormLabel>Select 1 or more States to see their data.</FormLabel>
        <FormGroup
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          {stateList}
        </FormGroup>
      </FormControl>

      <h2 className={header}>Historical Deaths in the US by year</h2>
      <section className={section}>
        <aside>
          Data for the following graphs provided by the CDC{" "}
          <a href="https://wonder.cdc.gov/controller/saved/D76/D99F863">
            as found here
          </a>
        </aside>
      </section>

      <label>1999 {"->"} 2019</label>
      <section>
        <HistoricalData />
      </section>
    </main>
  );
};

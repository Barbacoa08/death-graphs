import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { ChangeEvent, useCallback, useState } from "react";

import { USStateList } from "types/shared";

import { DeathCountByMonth } from "./DeathCountByMonth";
import { DeathCountByStateWeekending } from "./DeathCountByStateWeekending";
import { DeathCountByWeekending } from "./DeathCountByWeekending";

export const GraphContainer = () => {
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
      <h2>Deaths in the entirety of the US</h2>

      <label>2019 {"->"} 2020 by month</label>
      <section>
        <DeathCountByMonth />
      </section>

      <div style={{ margin: "10px 0" }}>&nbsp;</div>

      <label>2019 {"->"} 2020 by weekending</label>
      <section>
        <DeathCountByWeekending />
      </section>

      <h2>Deaths by State in the US</h2>

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

      {/**
       * TODO: <HistoricalData />
       */}
    </main>
  );
};

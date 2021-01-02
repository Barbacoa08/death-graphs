import { GraphContainer } from "components";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        A free-to-use app for tracking death number as provided by the CDC
      </header>

      <main>
        <p>
          <a href="https://github.com/Barbacoa08/death-graphs">Open Sourced</a>
        </p>
        <p>
          Data provided by the CDC{" "}
          <a href="https://dev.socrata.com/foundry/data.cdc.gov/hmz2-vwda">
            through this API
          </a>
        </p>
      </main>

      <GraphContainer />
    </div>
  );
}

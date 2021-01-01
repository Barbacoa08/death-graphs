import { GraphContainer } from "components";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        Presented as a free-to-use app for tracking death number as provided by
        the CDC
      </header>

      <GraphContainer />
    </div>
  );
}

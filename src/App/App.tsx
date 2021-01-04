import { GraphContainer } from "components";

import "./App.css";

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        This is a free-to-use app for tracking death numbers provided by the CDC
      </header>

      <main>
        <p>
          You can find all of the source code{" "}
          <a href="https://github.com/Barbacoa08/death-graphs">
            for this app here
          </a>
        </p>
      </main>

      <GraphContainer />
    </div>
  );
}

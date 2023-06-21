import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";

import Map from "./components/Map-ML";

const App = () => {
  return (
    <>
      <div className="right">
        <h1>Dev Map</h1>
      </div>
      <Map />
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

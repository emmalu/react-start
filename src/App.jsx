import { createRoot } from "react-dom/client";

import Item from "./components/Item";

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <Item name="Item 1" type="A Type" />
      <Item name="Item 2" type="B Type" />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

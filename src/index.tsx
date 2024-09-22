import { useState } from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";

import SimpleSelect from "./components/SimpleSelect";

import "./index.css";

interface HighlightedItem {
  id: number;
  name: string;
}

const Root = () => {
  const [selectedItems, setSelectedItems] = useState<HighlightedItem[]>([]);

  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>
      </div>
      <div className="Root__content">
        <div>{selectedItems.length} items selected:</div>
        <br />
        <div>
          {selectedItems.map((e) => (
            <div key={e.id}>{e.name}</div>
          ))}
        </div>
      </div>
      <div className="Root__separator" />

      {/* TODO: Insert your component below */}
      <div className="Root__select">PUT THE COMPONENT HERE</div>
      <SimpleSelect 
        highlightedItems={selectedItems}
        setHighlightedItems={setSelectedItems}
      />
    </div>
  );
};

console.log(data);

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);

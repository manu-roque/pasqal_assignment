import { useState } from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";

import SimpleSelect from "./components/SimpleSelect";
import TagSelect from "./components/TagSelect";

import "./index.css";
import FilteredSelect from "./components/FilteredSelect";

interface HighlightedItem {
  id: number;
  name: string;
}

interface HighlightedTagItem {
  id: number;
  name: string;
}

interface HighlightedFilteredItem {
  id: number;
  name: string;
}


const Root = () => {
  const [selectedItems, setSelectedItems] = useState<HighlightedItem[]>([]);
  const [tagItems, setTagItems] = useState<HighlightedTagItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<HighlightedFilteredItem[]>([]);

  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>
      </div>
      <div className="Root__content">
        <div>simple items selected: {selectedItems.length}</div>
        <div>tag items selected: {tagItems.length}</div>
        <div>filtered items selected: {filteredItems.length}</div>

        <br />
        <div>
          Simple Select: 
          {selectedItems.map((e) => (
            <div key={e.id}>{e.name}</div>
          ))}
          <br/>
          Tag Select: 
          {tagItems.map((e) => (
            <div key={e.id}>{e.name}</div>
          ))}
          <br/>
          Filtered Select: 
          {filteredItems.map((e) => (
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

      <TagSelect 
        highlightedTagItems={tagItems}
        setHighlightedTagItems={setTagItems}
      />

      <FilteredSelect 
        highlightedFilteredItems={filteredItems}
        setHighlightedFilteredItems={setFilteredItems}
      />
    </div>
  );
};

console.log(data);

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);

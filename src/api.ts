import data from "./data.json";

export interface Item {
  id: number;
  label: string;
  parentId?: number;
}

/**
 * make an "API call" to get the data filtered by label.
 * @param {string} [label] - Filter on the item labels.
 * @return {Itemp[]} The list of items matching the filter if any
 */
export const getData = (label?: string): Item[] => {
  return label
    ? data.filter((d) => d.label.toLowerCase().includes(label.toLowerCase()))
    : data;
};

// Filter all data sets by these columns
import {filterAllUndefined} from "@/utils/filterAllUndefined";

const allowedColumns = [
  'ChartItemCollection',
  'EdgeSets'
];

export const filterColumns = (results) => {
  // Loop through the available data sets
  return results.map(result => {

    // Loop over each object from an endPoint
    return Object.entries(result).map(column => {

        // Check if the key doesn't match one of the allowed columns
        if(allowedColumns.includes(column[0])) {
          // Delete the label
          delete column[0];

          // Return all entries that are not undefined
          return column.filter(filterAllUndefined);
        }

    }).filter(filterAllUndefined);
  });
};

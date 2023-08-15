import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOpertions() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-dsc", label: "Sort by (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price name(low first)" },
          { value: "regularPrice-dsc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low first)" },
          { value: "maxCapacity-dsc", label: "Sort by Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

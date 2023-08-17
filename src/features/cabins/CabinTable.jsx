import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

/**
 * Renders a table of cabins with filtering options.
 *
 * The CabinTable component fetches cabin data from an API using the useQuery hook from the @tanstack/react-query library.
 * The fetched data is then filtered based on a search parameter and rendered as rows in the table.
 * The component also includes functionality for deleting and duplicating cabins.
 *
 * @returns {JSX.Element} The rendered CabinTable component.
 */
export default function CabinTable() {
  const [searchParams] = useSearchParams();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  //filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
      break;
  }

  //sort
  const sortValue = searchParams.get("sortBy") || "sortDate-asc";

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedcabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header rolw="row" as header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price </div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedcabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {cabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table>
    </Menus>
  );
}

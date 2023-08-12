import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import CabinTableOpertions from "../features/cabins/CabinTableOpertions";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOpertions />
      </Row>
      <Row>
        <AddCabin />
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CableTableOperations from '../features/cabins/CableTableOperations';

function Cabins() {
  // showForm;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CableTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

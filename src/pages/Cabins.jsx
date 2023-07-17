import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useState } from 'react';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  // showForm;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          variation={!showForm ? 'primary' : 'danger'}
          onClick={() => setShowForm((show) => !show)}
        >
          {!showForm ? 'Add new cabin' : 'Close form'}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

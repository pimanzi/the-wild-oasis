import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinFormModal from '../features/cabins/CabinFormModal';
import Filter from '../ui/Filter';
import SortBy from '../ui/SortBy';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter
          filterField="discount"
          options={[
            { label: 'All', value: 'all' },
            { label: 'No Discount', value: 'no-discount' },
            { label: 'With Discount', value: 'with-discount' },
          ]}
        ></Filter>

        <SortBy
          options={[
            { value: 'name-asc', label: 'Sort by name(A-Z)' },
            { value: 'name-desc', label: 'Sort by name(Z-A)' },
            { value: 'regularPrice-asc', label: 'Sort by price(low first)' },
            { value: 'regularPrice-desc', label: 'Sort by price(high first)' },
            { value: 'maxCapacity-asc', label: 'Sort by capacity(low first)' },
            {
              value: 'maxCapacity-desc',
              label: 'Sort by capacity(high first)',
            },
          ]}
        ></SortBy>
      </Row>

      <Row>
        <CabinTable />
        <CabinFormModal></CabinFormModal>
      </Row>
    </>
  );
}

export default Cabins;

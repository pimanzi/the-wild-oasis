import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { lastBookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    lastStays,
    isLoading: isLoading2,
    confirmedstays,
    filterDays,
  } = useRecentStays();
  const { cabins, isLoading } = useCabins();
  if (isLoading2 || isLoading1 || isLoading) return <Spinner></Spinner>;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={lastBookings}
        confirmedStays={confirmedstays}
        numDays={filterDays}
        cabinsCount={cabins.length}
      ></Stats>
      <TodayActivity></TodayActivity>
      <DurationChart confirmedStays={confirmedstays}></DurationChart>
      <SalesChart bookings={lastBookings} numDays={filterDays}></SalesChart>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

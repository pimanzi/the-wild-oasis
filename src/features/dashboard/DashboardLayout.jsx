import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { lastBookings, isLoading1 } = useRecentBookings();
  const { lastStays, isLoading2 } = useRecentStays();

  if (isLoading2 || isLoading1) return <Spinner></Spinner>;
  console.log(lastBookings);
  console.log(lastStays);
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Activity</div>
      <div>Chart of sales</div>
      <div>Chart a lot</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

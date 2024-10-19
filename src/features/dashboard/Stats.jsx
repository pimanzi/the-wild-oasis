import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, cabinsCount, numDays }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalCheckIns = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((arr, cur) => arr + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(totalSales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={totalCheckIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + '%' || 'loading'}
        color="yellow"
      />
    </>
  );
}

export default Stats;

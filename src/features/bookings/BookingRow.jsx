import styled from 'styled-components';
import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

import { format, isToday } from 'date-fns';
import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiEye,
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import useCheckout from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deletebooking, isDeleting } = useDeleteBooking();
  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Toogle id={bookingId}></Menus.Toogle>

      <Modal>
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye></HiEye>}
            onClick={() => navigate(`/booking/${bookingId}`)}
          >
            <span>See details</span>
          </Menus.Button>

          {status === 'unconfirmed' && (
            <Menus.Button
              icon={<HiArrowDownOnSquare></HiArrowDownOnSquare>}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              <span>Check in </span>
            </Menus.Button>
          )}

          {status === 'checked-in' && (
            <Menus.Button
              icon={<HiArrowUpOnSquare></HiArrowUpOnSquare>}
              onClick={() => checkout(bookingId)}
            >
              <span>Check Out </span>
            </Menus.Button>
          )}
          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash></HiTrash>}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window opensName="delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={() => {
              deletebooking(bookingId);
            }}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

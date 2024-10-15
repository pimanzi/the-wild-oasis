import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';

import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import BookingDataBox from '../bookings/BookingDataBox';

import { useBooking } from '../bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import useCheckin from './useCheckin';

import styled from 'styled-components';

// import { useSettings } from 'features/settings/useSettings';

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  // const [addBreakfast, setAddBreakfast] = useState(false);

  const { Booking: booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  // const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // const optionalBreakfastPrice =
  //   numNights * settings.breakfastPrice * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId);

    // if (addBreakfast)
    //   checkin({
    //     bookingId,
    //     breakfast: {
    //       hasBreakfast: true,
    //       extrasPrice: optionalBreakfastPrice,
    //       totalPrice: totalPrice + optionalBreakfastPrice,
    //     },
    //   });
    // else checkin({ bookingId, breakfast: {} });
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )} */}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {/* {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast)`} */}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

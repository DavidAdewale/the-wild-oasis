import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from '../check-in-out/useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  // const status = 'checked-in';
  const { isLoading, booking } = useBooking();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;

  // console.log(booking);

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === 'unconfirmed' && (
            <Button
              variation="primary"
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check in
            </Button>
          )}
          {status === 'checked-in' && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(id)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeletingBooking}
            onConfirm={() => {
              deleteBooking(id, {
                onSettled: () => navigate(-1),
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;

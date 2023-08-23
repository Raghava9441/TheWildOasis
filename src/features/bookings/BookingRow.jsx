import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
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
  font-family: "Sono";
  font-weight: 500;
`;
/*
In summary, the BookingRow component renders a row in a table for displaying booking information. It includes details about the cabin, guest, booking dates, status, and options 
to view, check in, check out, or delete the booking. The component utilizes styled components for styling, and it employs mutation hooks for performing actions like checking out
and deleting bookings. The Menus component seems to be involved in rendering an options menu. The Modal component appears to be used to provide a confirmation modal for deleting a booking.
*/

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
    // Mapping of booking statuses to tag colors
    const statusToTagName = {
        "unconfirmed": "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    // Mutation hook for checking out a booking
    const { isLoading: isCheckingOut, mutate: CheckOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-out', }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                query: ["bookings"]
            })
            toast.success(`Booking # ${data?.id} successfully checked out`);
        },
        onError: (error) => toast.error("there was an error while checking out")
    })

    // Mutation hook for deleting a booking
    const { isLoading: isDeleting, mutate: Delete } = useMutation({
        mutationFn: (bookingId) => deleteBooking(bookingId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                query: ["bookings"]
            })
            toast.success(`Booking # ${data?.id} deleted successfully `);
        },
        onError: (error) => toast.error("there was an error while Deleting Booking")
    })

    return (
        <Table.Row>
            <Modal>
                <Cabin>{cabinName}</Cabin>

                <Stacked>
                    <span>{guestName}</span>
                    <span>{email}</span>
                </Stacked>

                <Stacked>
                    <span>
                        {isToday(new Date(startDate))
                            ? "Today"
                            : formatDistanceFromNow(startDate)}{" "}
                        &rarr; {numNights} night stay
                    </span>
                    <span>
                        {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                        {format(new Date(endDate), "MMM dd yyyy")}
                    </span>
                </Stacked>

                <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

                <Amount>{formatCurrency(totalPrice)}</Amount>

                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            See Details
                        </Menus.Button>
                        {
                            status === "unconfirmed" && <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() => navigate(`/checkin/${bookingId}`)}
                            >
                                Check In
                            </Menus.Button>
                        }
                        {
                            status === "checked-in" && <Menus.Button
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => CheckOut(bookingId)}
                                disabled={isCheckingOut}
                            >
                                Check Out
                            </Menus.Button>
                        }
                        <Modal.Open opens={"delete"}>
                            <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>
                <Modal.Window name={"delete"}>
                    <ConfirmDelete resourceName={"Booking"} onConfirm={() => { Delete(bookingId) }} />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;

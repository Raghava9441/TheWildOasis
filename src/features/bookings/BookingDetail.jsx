import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { deleteBooking, getBooking } from "../../services/apiBookings";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

/**
 * React component that displays the details of a booking and allows the user to check-in or check-out the booking.
 *
 * @component
 * @example
 * return (
 *   <BookingDetail />
 * )
 */
function BookingDetail() {
    const queryClient = useQueryClient();

    // Initialize navigation and move back functions
    const navigate = useNavigate()
    const moveBack = useMoveBack();

    // Define a mapping of booking statuses to tag colors
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    // Extract bookingId from URL params
    const { bookingId } = useParams()

    // Fetch booking data using a query
    const {
        isLoading,
        data: bookingData,
        error,
    } = useQuery({
        queryKey: ["booking"],
        queryFn: () => getBooking(bookingId),
    });
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
            // Invalidate the bookings query and show success message
            queryClient.invalidateQueries({
                query: ["bookings"]
            })
            toast.success(`Booking # ${data?.id} deleted successfully `);
        },
        onError: (error) => toast.error("there was an error while Deleting Booking")
    })

    // Show loading spinner while data is loading
    if (isLoading) return <Spinner />

    // Show error message if there's an error
    if (error) return <div>Error: {error.message}</div>;

    const { status, id: bookingid } = bookingData

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking {bookingid}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={bookingData} />

            <ButtonGroup>
                <Modal>
                    {
                        status === "unconfirmed" && <Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check In
                        </Button>
                    }
                    {
                        status === "checked-in" && <Button
                            icon={<HiArrowUpOnSquare />}
                            onClick={() => CheckOut(bookingId)}
                            disabled={isCheckingOut}
                        >
                            Check Out
                        </Button>
                    }
                    <Modal.Open opens={"delete"}><Button variation="danger">Delete</Button></Modal.Open>
                    <Modal.Window name={"delete"}>
                        <ConfirmDelete resourceName={"Booking"} onConfirm={() => { Delete(bookingId, { onSettled: () => navigate(-1) }) }} disabled={isDeleting} />
                    </Modal.Window>
                </Modal>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

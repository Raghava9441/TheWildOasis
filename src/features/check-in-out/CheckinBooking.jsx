import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { getBooking, updateBooking } from "../../services/apiBookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { toast } from "react-hot-toast";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const [confirmPaid, setconfirmPaid] = useState(false)
    const [addBreakfast, setAddBreakfast] = useState(false)
    const { isLoading: isSettingLoading, error: settingsError, settings } = useSettings();

    const moveBack = useMoveBack();

    const { bookingId: Id } = useParams()

    const {
        isLoading,
        data: bookingData,
        error,
    } = useQuery({
        queryKey: ["booking"],
        queryFn: () => getBooking(Id),
    });

    useEffect(() => {
        setconfirmPaid(bookingData?.isPaid || false)
    }, [bookingData])


    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = bookingData;


    const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
        mutationFn: () => updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                query: ["bookings"]
            })
            toast.success(`Booking # ${data?.id} successfully checked in`);
            navigate("/")
        },
        onError: (error) => toast.error("there was an error while checking in")
    })

    if (isLoading || isSettingLoading) return <Spinner />

    if (error) return <div>Error: {error.message}</div>;

    const optionalBreakfastPrice = settings?.breakfastPrice * numGuests * numNights
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={bookingData} />

            {!hasBreakfast && <Box>
                <Checkbox
                    checked={addBreakfast}
                    disabled={addBreakfast}
                    onChange={() => { setAddBreakfast((add) => !add); setconfirmPaid(false); }}
                    id="breakfast">
                    want to add the breakfast for {formatCurrency(optionalBreakfastPrice)}?
                </Checkbox>
            </Box>}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    disabled={confirmPaid}
                    onChange={() => setconfirmPaid((confirm) => !confirmPaid)}
                    id="confirm">
                    i confirm that {guests.fullName} has paid the total amount {!optionalBreakfastPrice
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakfastPrice)}(${formatCurrency(totalPrice)}+${formatCurrency(optionalBreakfastPrice)})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={checkin} disabled={!confirmPaid} isLoading={isCheckingIn}>Check in booking #{bookingId}</Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

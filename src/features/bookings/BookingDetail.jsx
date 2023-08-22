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
import { getBooking } from "../../services/apiBookings";
import { HiArrowDownOnSquare } from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate()
    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    const { bookingId } = useParams()


    const {
        isLoading,
        data: bookingData,
        error,
    } = useQuery({
        queryKey: ["booking"],
        queryFn: () => getBooking(bookingId),
    });

    if (isLoading) return <Spinner />

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
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
                {
                    status === "unconfirmed" && <Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                        Check In
                    </Button>
                }
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

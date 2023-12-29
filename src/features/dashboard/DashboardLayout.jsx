import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from 'react'
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

function DashboardLayout() {

  const { bookings, isLoading } = useRecentBookings()
  const { stays, confirmmedStays, isLoading: loading2 } = useRecentStays()

  if (isLoading || loading2) return <Spinner />
  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>todays activity</div>
      <div>chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
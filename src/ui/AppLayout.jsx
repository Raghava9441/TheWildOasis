import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { styled } from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns:26rem 1fr;
    grid-template-rows:auto 1fr;
`

const Main = styled.main`
    background-color:solid var(--color-grey-50);
    padding:8rem 4.8rem 6.4rem 
`
const Container = styled.div`
    max-width:120rem;
    margin:0 auto;
    display: flex;
    flex-direction:column;
    gap:3.2rem;
`
export default function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <SideBar />
            <Main>
                <Container>
                    <Outlet />

                </Container>
            </Main>
        </StyledAppLayout>
    )
}


import { styled } from "styled-components"
import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from "../data/Uploader"
const StyledSidebar = styled.aside`
    background-color:solid var(--color-grey-0);
    padding:1.2rem 4.8rem;
    border-bottom:1px solid var(--color-grey-100);
    grid-row:1/-1;
    display: flex;
    flex-direction:column;
    gap:3.2rem;
`

export default function SideBar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            <Uploader />
        </StyledSidebar>
    )
}

import {Container,Nav, Navbar as NavbarBs} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export function Navbar(){
    return <NavbarBs>
        <Container className='bg-white shadow-sm mb-3'>
            <Nav>

            <Nav.Link to = '/' as = {NavLink}>
                Home
            </Nav.Link>
            <Nav.Link to = '/store' as = {NavLink}>
                Store
            </Nav.Link>
            <Nav.Link to = '/about' as = {NavLink}>
                About
            </Nav.Link>
            </Nav>
        </Container>
    </NavbarBs>
}
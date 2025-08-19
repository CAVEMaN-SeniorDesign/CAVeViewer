import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function Header({params}) {
    return (
            <Navbar key="false" expand="false" className="header" variant="dark" style={{padding: '0 2em',}}>
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Brand>
                    <a href="/" className='logopic'><img src="/images/CAVEMAN_Logo_Gray_Transparent.png" alt="CAVEMAN Logo" className="d-inline-block logopic" /></a>
                    <h1 className="d-none d-md-inline-block align-bottom">{params.page_title}</h1>
                </Navbar.Brand>
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="start"
                className="offcanvassection"
                variant="dark"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    <a href="/" className='logopic'><img src="/images/CAVEMAN_Logo_Gray_Transparent.png" alt="CAVEMAN Logo" className="d-inline-block logopic" /></a>
                    <h1 className="d-inline-block align-bottom">CAVEMAN</h1>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown
                    title="Design Process" className="headerdropdown" variant="dark" data-bs-theme="dark">
                        <NavDropdown.Item className="text-white navitemhover" href="/process/">Main</NavDropdown.Item>
                        <NavDropdown.Item className="text-white navitemhover" href="/process/#ideas">Ideation & Outreach</NavDropdown.Item>
                        <NavDropdown.Item className="text-white navitemhover" href="/process/">Main</NavDropdown.Item>
                        <NavDropdown.Item className="text-white navitemhover" href="/process/">Main</NavDropdown.Item>
                        <NavDropdown.Item className="text-white navitemhover" href="/process/">Main</NavDropdown.Item>
                        <NavDropdown.Item className="text-white navitemhover" href="/process/">Main</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/maps/">Maps</Nav.Link>
                    <Nav.Link href="/contact/">Contact</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
    );
}

export default Header;

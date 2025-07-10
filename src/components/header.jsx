import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export function Header({params}) {
    return (
            <Navbar key="false" expand="false" className="header" variant="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Brand>
                    <a href="/" className='logopic'><img src="/images/CAVEMAN_Logo_Gray_Transparent.png" alt="CAVEMAN Logo" className="d-inline-block logopic" /></a>
                    <h1 className="d-inline-block align-bottom">{params.page_title}</h1>
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
                    <Nav.Link href="/mechdesign/">Mechanical Design</Nav.Link>
                    <Nav.Link href="/hw/">Hardware</Nav.Link>
                    <Nav.Link href="/embedded/">Low Level Control</Nav.Link>
                    <Nav.Link href="#/ros/">High Level Navigation</Nav.Link>
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

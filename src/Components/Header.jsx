import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header({ theme }) {
    return (
        <>
            <header>
                <Navbar bg={theme} variant={theme} expand="lg">
                    <Container>
                        <Link to="/">
                            <Navbar.Brand>Accueil</Navbar.Brand>
                        </Link>
                        <Nav className="me-auto">
                            <Link to="/*" className="nav-link">
                                404
                            </Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header

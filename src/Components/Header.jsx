import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header({ theme }) {
    const navigate = useNavigate()

    const disconnect = () => {
        window.localStorage.removeItem('username')
        navigate('/login')
    }

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
                        <Nav>
                            {window.localStorage.getItem('username') === null && (
                                <Link to="/login" className="nav-link">
                                    Connexion
                                </Link>
                            )}

                            {window.localStorage.getItem('username') !== null && (
                                <>
                                    <NavDropdown title={<FontAwesomeIcon icon={['fas', 'cog']} />}>
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={disconnect}>Déconnexion</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header

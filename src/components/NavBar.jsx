import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ coins, theme }) {
    const navigate = useNavigate()

    const disconnect = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            {coins !== null && (
                <Navbar bg={theme} expand="lg" variant={theme}>
                    <Container>
                        <Link to="/">
                            <Navbar.Brand>Accueil</Navbar.Brand>
                        </Link>
                        <Nav className="me-auto">
                            <Link to="/leagues" className="nav-link">
                                Ligues
                            </Link>
                            <Link to="/teams/1" className="nav-link">
                                Équipes
                            </Link>
                            <Link to="/players" className="nav-link">
                                Joueurs
                            </Link>
                        </Nav>
                        <Nav className="flex-row">
                            <Navbar.Text>{coins} Jetons</Navbar.Text>
                            <NavDropdown className="mx-1" title={<FontAwesomeIcon icon={['fas', 'cog']} />}>
                                <NavDropdown.Item>Profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={disconnect}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            )}
        </>
    )
}

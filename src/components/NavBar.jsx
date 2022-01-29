import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Redirect from './Redirect'
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
            <Redirect />
            <Navbar bg={theme} expand="lg" variant={theme}>
                <Container>
                    <Link to="/">
                        <Navbar.Brand>Accueil</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Link to="/leagues" className="nav-link">
                            Ligues
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
        </>
    )
}

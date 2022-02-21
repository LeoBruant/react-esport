import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ mobas, theme, user }) {
    const game = window.location.href.split('/')[4]

    const navigate = useNavigate()

    const disconnect = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        navigate('/login')
        window.location.reload()
    }

    return (
        <>
            {user !== null && (
                <Navbar bg={theme} expand="lg" variant={theme}>
                    <Container>
                        <Link to={'/matches/' + game}>
                            <Navbar.Brand>
                                <FontAwesomeIcon icon={['fab', 'react']} /> Matchs
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Collapse id="collapse" className="justify-content-end">
                            <Nav className="me-auto">
                                <Link to={'/leagues/' + game + '/1'} className="nav-link">
                                    Ligues
                                </Link>
                                <Link to={'/teams/' + game + '/1'} className="nav-link">
                                    Équipes
                                </Link>
                                <Link to={'/players/' + game + '/1'} className="nav-link">
                                    Joueurs
                                </Link>
                                {mobas.includes(game) && (
                                    <Link to={'/characters/' + game + '/1'} className="nav-link">
                                        Personnages
                                    </Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Toggle aria-controls="collapse" />
                        <Nav className="flex-row">
                            <Navbar.Text className="mx-1">
                                {user.username} ({user.coins} Jetons)
                            </Navbar.Text>
                            <NavDropdown className="mx-1" title={<FontAwesomeIcon icon={['fas', 'cog']} />}>
                                <NavDropdown.Item onClick={disconnect}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            )}
        </>
    )
}

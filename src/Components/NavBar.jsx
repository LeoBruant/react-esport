import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Redirect from './Redirect'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavBar({ userCoins, theme }) {
    const navigate = useNavigate()

    const [coins, setCoins] = useState(0)

    React.useEffect(() => {
        if (userCoins === undefined) {
            axios.get('http://localhost:3004/users?loginToken=' + window.localStorage.getItem('token')).then(({ data }) => {
                setCoins(data[0].coins)
            })
        }
    }, [userCoins])

    const disconnect = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        navigate('/login')
    }

    return (
        <>
            <Redirect />
            <Navbar bg={theme} variant={theme} expand="lg">
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
                        <Navbar.Text>{userCoins !== undefined ? userCoins : coins} Jetons</Navbar.Text>
                        <NavDropdown title={<FontAwesomeIcon icon={['fas', 'cog']} className="mx-1" />}>
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

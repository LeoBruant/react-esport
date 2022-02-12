import { useState } from 'react'
import axios from 'axios'
import { Form, Container, Button } from 'react-bootstrap'
import { Style } from '../style/Login'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ getUser }) {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [errorMessages, setErrorMessages] = useState({
        username: '',
        password: ''
    })

    const handleInput = (field, value) => {
        // Remove error message

        if (errorMessages[field] !== '') {
            setErrorMessages((oldErrorMessages) => {
                return {
                    ...oldErrorMessages,
                    [field]: ''
                }
            })
        }

        // Update form

        setForm((oldForm) => {
            return {
                ...oldForm,
                [field]: value
            }
        })
    }

    const submit = (e) => {
        e.preventDefault()

        // Check if all fields are filled

        let filled = true

        Object.entries(form).forEach((entry) => {
            if (entry[1] === '') {
                if (filled) {
                    filled = false
                }

                setErrorMessages((oldErrorMessages) => {
                    return {
                        ...oldErrorMessages,
                        [entry[0]]: 'Veuillez remplir ce champ'
                    }
                })
            }
        })

        // Continue verification

        if (filled) {
            axios.get('http://localhost:3004/users').then(({ data }) => {
                // Check if username exists

                data.forEach(({ id, loginToken, password, username }) => {
                    if (username === form.username) {
                        if (password === form.password) {
                            window.localStorage.setItem('id', id)
                            window.localStorage.setItem('token', loginToken)

                            getUser()
                            navigate('/')
                        } else {
                            setErrorMessages((oldErrorMessages) => {
                                return {
                                    ...oldErrorMessages,
                                    password: 'Mot de passe invalide'
                                }
                            })
                        }
                    } else {
                        setErrorMessages((oldErrorMessages) => {
                            return {
                                ...oldErrorMessages,
                                username: "Cet utilisateur n'existe pas"
                            }
                        })
                    }
                })
            })
        }
    }

    return (
        <Style>
            <title>Paris e-sportifs | Connexion</title>
            <header className="header">
                <h1>Connexion</h1>
            </header>
            <Container className="main col-sm-6 col-md-5 col-lg-4 col-xl-3">
                <Form className="form" onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control
                            type="text"
                            className={`${errorMessages.username !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('username', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.username}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            className={`${errorMessages.password !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('password', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.password}</p>
                    </Form.Group>

                    <Button className="submit" variant="success" type="submit">
                        Connexion
                    </Button>
                </Form>
                <p className="registration">
                    Pas de compte ? Inscrivez-vous <Link to="/registration">Ici</Link>
                </p>
            </Container>
        </Style>
    )
}

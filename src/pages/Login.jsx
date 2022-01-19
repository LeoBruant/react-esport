import { useState } from 'react'
import api from '../components/api'
import { Form, Container, Button } from 'react-bootstrap'
import { Style } from './style/Login'
import { Link } from 'react-router-dom'

export default function Login() {
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
            setErrorMessages({
                ...errorMessages,
                [field]: ''
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
                filled = false

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
            let exists = false

            api.get('/users').then(({ data }) => {
                // Check if username exists

                data.every(({ username, password }) => {
                    if (username === form.username) {
                        if (password === form.password) {
                            alert('Success')
                            return false
                        } else {
                            setErrorMessages((oldErrorMessages) => {
                                return {
                                    ...oldErrorMessages,
                                    password: 'Mot de passe invalide'
                                }
                            })
                            return false
                        }
                    } else {
                        setErrorMessages((oldErrorMessages) => {
                            return {
                                ...oldErrorMessages,
                                username: "Cet utilisateur n'existe pas"
                            }
                        })
                        return false
                    }
                })
            })
        }
    }

    return (
        <Style>
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
                    Pas de compte ? Inscrivez-vous <Link to="/Registration">Ici</Link>
                </p>
            </Container>
        </Style>
    )
}

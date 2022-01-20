import { useState } from 'react'
import api from '../components/api'
import { v4 as uuidv4 } from 'uuid'
import { Form, Container, Button } from 'react-bootstrap'
import { Style } from '../style/Registration'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Registration() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        passwordRepeat: ''
    })
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        username: '',
        password: '',
        passwordRepeat: ''
    })
    const [usernameTakenMessage, setUsernameTakenMessage] = useState('')
    const [wrongPasswordMessage, setWrongPasswordMessage] = useState('')

    const handleInput = (field, value) => {
        // Remove error message

        if (field === 'username' && usernameTakenMessage !== '') {
            setUsernameTakenMessage('')
        } else if (field === 'password' && wrongPasswordMessage !== '') {
            setWrongPasswordMessage('')
        } else if (errorMessages[field] !== '') {
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
            // Check if passwords are the same

            if (form.password !== form.passwordRepeat) {
                setWrongPasswordMessage('Les mots de passe ne correspondent pas')
            }

            // Continue verification
            else {
                let exists = false

                api.get('/users')
                    .then(({ data }) => {
                        // Check if username exists

                        data.every(({ username }) => {
                            if (username === form.username) {
                                exists = true
                                return false
                            }
                        })
                    })
                    .finally(() => {
                        // Show error message

                        if (exists) {
                            setUsernameTakenMessage("Ce nom d'utilisateur est déjà utilisé")
                        }

                        // Create user
                        else {
                            let request = {
                                id: uuidv4(),
                                email: form.email,
                                name: form.name,
                                username: form.username,
                                password: form.password,
                                coins: 100
                            }

                            api.post('/users', request).then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Votre compte à bien été créé',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                        }
                    })
            }
        }
    }

    return (
        <Style>
            <header className="header">
                <h1>Inscription</h1>
            </header>
            <Container className="main col-sm-6 col-md-5 col-lg-4 col-xl-3">
                <Form className="form" onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Adresse e-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@gmail.com"
                            className={`${errorMessages.email !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('email', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.email}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control
                            type="text"
                            className={`${errorMessages.email !== '' || usernameTakenMessage !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('username', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.username}</p>
                        <p className="error-message">{usernameTakenMessage}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            className={`${errorMessages.email !== '' || wrongPasswordMessage !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('password', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.password}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Répéter le mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            className={`${errorMessages.email !== '' || wrongPasswordMessage !== '' ? 'input-error' : ''}`}
                            onInput={(e) => handleInput('passwordRepeat', e.target.value)}
                        />
                        <p className="error-message">{errorMessages.passwordRepeat}</p>
                        <p className="error-message">{wrongPasswordMessage}</p>
                    </Form.Group>

                    <Button className="submit" variant="success" type="submit">
                        Inscription
                    </Button>
                </Form>
                <p className="login">
                    Déja inscrit ? Connectez-vous <Link to="/login">Ici</Link>
                </p>
            </Container>
        </Style>
    )
}

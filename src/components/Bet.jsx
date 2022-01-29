import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Bet({ getBets, getUser, hideBet, matchBet, user }) {
    const [errorMessages, setErrorMessages] = useState({
        coins: '',
        winner: ''
    })

    const [form, setForm] = useState({
        coins: '',
        winner: ''
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
                filled = false

                setErrorMessages((oldErrorMessages) => {
                    return {
                        ...oldErrorMessages,
                        [entry[0]]: 'Veuillez remplir ce champ'
                    }
                })
            }
        })

        // Check if all fields are filled

        if (filled) {
            let bet = {
                coins: parseInt(form.coins),
                ended: false,
                matchId: matchBet.id,
                userId: parseInt(localStorage.id),
                winner: parseInt(form.winner)
            }

            // Check if coins are less than 1

            if (bet.coins < 1) {
                setErrorMessages((oldErrorMessages) => {
                    return {
                        ...oldErrorMessages,
                        coins: 'Vous devez miser un moins 1 jeton'
                    }
                })
            }

            // Check if coins are more than the user has
            else if (bet.coins > user.coins) {
                setErrorMessages((oldErrorMessages) => {
                    return {
                        ...oldErrorMessages,
                        coins: "Vous n'avez pas assez de jetons"
                    }
                })
            }

            // Create bet
            else {
                axios
                    .all([
                        // Update coins

                        axios
                            .patch('http://localhost:3004/users/' + localStorage.id, {
                                coins: user.coins - bet.coins
                            })
                            .then(() => {
                                getUser()
                            }),

                        // Update bets

                        axios.post('http://localhost:3004/bets', bet).then(() => {
                            getBets()
                        })
                    ])

                    // Show confirmation

                    .then(() => {
                        hideBet()

                        Swal.fire({
                            icon: 'success',
                            title: 'Votre pari a bien été effectué',
                            confirmButtonColor: '#157347',
                            timer: 1000
                        })
                    })
            }
        }
    }

    return (
        <Modal show={matchBet.id !== null}>
            <Form className="d-flex justify-content-center flex-column" onSubmit={submit}>
                <Modal.Header closeButton onHide={hideBet} className="justify-content-center">
                    <Modal.Title>{matchBet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center pb-5">Parier sur le gagnant</h4>
                    <Form.Group className="d-flex justify-content-center">
                        <Form.Check
                            className={`${errorMessages.winner !== '' ? 'input-error' : ''}`}
                            inline
                            label={matchBet.opponents[0].opponent.name}
                            name="opponents"
                            onInput={(e) => handleInput('winner', e.target.value)}
                            type="radio"
                            value={matchBet.opponents[0].opponent.id}
                        />
                        <Form.Check
                            className={`${errorMessages.winner !== '' ? 'input-error' : ''}`}
                            inline
                            label={matchBet.opponents[1].opponent.name}
                            name="opponents"
                            onInput={(e) => handleInput('winner', e.target.value)}
                            type="radio"
                            value={matchBet.opponents[1].opponent.id}
                        />
                    </Form.Group>
                    <p className="error-message mb-4">{errorMessages.winner}</p>
                    <Form.Group className="d-flex justify-content-center align-items-center">
                        <Form.Label>Jetons : ({user.coins} max)</Form.Label>
                        <Form.Control
                            className={`${errorMessages.coins !== '' ? 'input-error mx-2' : 'mx-2'}`}
                            min={1}
                            max={user.coins}
                            onInput={(e) => handleInput('coins', e.target.value)}
                            style={{ width: '7.5rem' }}
                            type="number"
                        />
                    </Form.Group>
                    <p className="error-message">{errorMessages.coins}</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button type="submit" variant="success">
                        Valider
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

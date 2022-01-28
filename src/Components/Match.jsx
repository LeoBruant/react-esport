import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import noImage from '../assets/images/no-image.jpg'

export default function Match({
    begin_at,
    bet,
    end_at,
    getBets,
    getUser,
    id,
    matchType,
    name,
    opponents,
    results,
    showBet,
    stream,
    user,
    winner
}) {
    const [betStatus, setBetStatus] = useState(null)

    const checkBet = useCallback(() => {
        // Check if match is passed and has a bet

        if (matchType[0] === 'passed' && bet !== undefined) {
            let coins = 0

            // Set if bet is won or lost

            if (winner.id === bet.winner) {
                setBetStatus(true)
                coins += bet.coins * 2
            } else {
                setBetStatus(false)
            }

            // Update

            axios.get('http://localhost:3004/bets/' + bet.id).then(({ data }) => {
                // Check if bet has ended

                if (!data.ended) {
                    // Update bets

                    axios.patch('http://localhost:3004/bets/' + bet.id, { ended: true }).then(() => {
                        getBets()
                    })

                    // Update coins if bet is won

                    if (betStatus === true) {
                        axios
                            .patch('http://localhost:3004/users/' + localStorage.id, {
                                coins: user.coins + coins
                            })
                            .then(() => {
                                getUser()
                            })
                    }
                }
            })
        }
    }, [bet, betStatus, getBets, getUser, matchType, user, winner])

    React.useEffect(() => {
        checkBet()
    }, [checkBet])

    const cancelBet = () => {
        // Show popup

        Swal.fire({
            icon: 'question',
            title: "Êtes-vous sûr d'annuler ce pari ?",
            confirmButtonColor: '#bb2d3b',
            confirmButtonText: 'Oui',
            showCancelButton: true,
            cancelButtonText: 'Non'
        })

            // Update database

            .then((result) => {
                if (result.isConfirmed) {
                    axios.patch('http://localhost:3004/users/' + localStorage.id, {
                        coins: user.coins + bet.coins
                    })
                    axios.delete('http://localhost:3004/bets/' + bet.id).then(() => {
                        // Update

                        getBets()
                        getUser()

                        // Show confirmation

                        Swal.fire({
                            icon: 'success',
                            title: 'Pari annulé',
                            confirmButtonColor: '#157347',
                            timer: 1000
                        })
                    })
                }
            })
    }

    const getMatchBorder = () => {
        if (betStatus === true) {
            return { border: '2px solid #0d0' }
        } else if (betStatus === false) {
            return { border: '2px solid #d00' }
        } else {
            return { borderBottom: '2px solid #ddd' }
        }
    }

    return (
        <div className="p-4 match" style={getMatchBorder()}>
            <div className="text-center pb-3">
                <p className="m-0 text-capitalize">début : {moment(begin_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                <p className="m-0 text-capitalize">fin : {end_at !== null ? moment(end_at).format('DD/MM/YYYY HH:mm:ss') : '-'}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center flex-column">
                    <h4 className="text-center">{opponents[0] !== undefined ? opponents[0].opponent.acronym : 'Unknown'}</h4>
                    <img
                        className="mt-3"
                        src={opponents[0] !== undefined ? opponents[0].opponent.image_url : noImage}
                        alt={opponents[0] !== undefined ? opponents[0].opponent.name + ' image' : 'no image'}
                        style={{ width: '100px', height: '100px' }}
                    ></img>
                </div>
                {matchType[0] === 'upcoming' && (
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="m-0" style={{ fontSize: '2.25rem' }}>
                            vs
                        </p>
                        {bet !== undefined && (
                            <Button onClick={cancelBet} variant="danger" className="d-block mx-auto mt-3">
                                Annuler
                            </Button>
                        )}
                        {bet === undefined && opponents[0] !== undefined && opponents[1] !== undefined && (
                            <Button onClick={() => showBet(id, name, opponents)} variant="success" className="d-block mx-auto mt-3">
                                Parier
                            </Button>
                        )}
                    </div>
                )}
                {matchType[0] !== 'upcoming' && (
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="m-0" style={{ fontSize: '2.25rem' }}>
                            {results[0].score + ' - ' + results[1].score}
                        </p>

                        {matchType[0] === 'running' && (
                            <Button href={stream} target="_blank" variant="primary" className="d-block mx-auto mt-3">
                                Visionner
                            </Button>
                        )}
                    </div>
                )}
                <div>
                    <h4 className="text-center">{opponents[1] !== undefined ? opponents[1].opponent.acronym : 'Unknown'}</h4>
                    <img
                        className="mt-3"
                        src={opponents[1] !== undefined ? opponents[1].opponent.image_url : noImage}
                        alt={opponents[1] !== undefined ? opponents[1].opponent.name + ' image' : 'no image'}
                        style={{ width: '100px', height: '100px' }}
                    ></img>
                </div>
            </div>
        </div>
    )
}

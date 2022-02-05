import axios from 'axios'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import noImage from '../assets/images/no-image.jpg'
import React, { useCallback, useState } from 'react'
import Swal from 'sweetalert2'

export default function Match({
    bet,
    bets,
    getBets,
    getUser,
    match: { begin_at, end_at, id, name, opponents, results, official_stream_url, winner },
    matchType,
    showBet,
    user
}) {
    const [betStatus, setBetStatus] = useState(null)

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

    const getMatchBorder = () => {
        if (betStatus === true) {
            return { border: '2px solid #0d0' }
        } else if (betStatus === false) {
            return { border: '2px solid #d00' }
        } else {
            return { borderBottom: '2px solid #ddd' }
        }
    }

    React.useEffect(() => {
        checkBet()
    }, [checkBet])

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
                        alt={opponents[0] !== undefined ? opponents[0].opponent.name + ' image' : 'no image'}
                        className="mt-3"
                        src={
                            opponents[0] !== undefined && opponents[0].opponent.image_url !== null
                                ? opponents[0].opponent.image_url
                                : noImage
                        }
                        style={{ width: '100px', maxHeight: '100px' }}
                        title={opponents[0] !== undefined ? opponents[0].opponent.name : ''}
                    ></img>
                </div>
                {matchType[0] === 'upcoming' && (
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="m-0" style={{ fontSize: '2.25rem' }}>
                            vs
                        </p>
                        {bet !== undefined && (
                            <Button className="d-block mx-auto mt-3" onClick={cancelBet} variant="danger">
                                Annuler
                            </Button>
                        )}
                        {bet === undefined && opponents[0] !== undefined && opponents[1] !== undefined && (
                            <Button className="d-block mx-auto mt-3" onClick={() => showBet(id, name, opponents)} variant="success">
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
                            <Button className="d-block mx-auto mt-3" href={official_stream_url} target="_blank" variant="primary">
                                Visionner
                            </Button>
                        )}
                    </div>
                )}
                <div>
                    <h4 className="text-center">{opponents[1] !== undefined ? opponents[1].opponent.acronym : 'Unknown'}</h4>
                    <img
                        alt={opponents[1] !== undefined ? opponents[1].opponent.name + ' image' : 'no image'}
                        className="mt-3"
                        src={
                            opponents[1] !== undefined && opponents[1].opponent.image_url !== null
                                ? opponents[1].opponent.image_url
                                : noImage
                        }
                        style={{ width: '100px', height: '100px' }}
                        title={opponents[1] !== undefined ? opponents[1].opponent.name : ''}
                    ></img>
                </div>
            </div>
            <p className="text-center m-0">
                {bets.length === 0 ? 'Aucun' : bets.length} pari{bets.length > 1 ? 's' : ''}
            </p>
        </div>
    )
}

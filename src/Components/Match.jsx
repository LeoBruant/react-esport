import moment from 'moment'
import { Button } from 'react-bootstrap'

export default function Match({ begin_at, end_at, id, matchType, name, opponents, results, showBet, stream }) {
    return (
        <div className="py-3" style={{ borderBottom: '2px solid #000' }}>
            <div className="text-center pb-3">
                <p className="m-0 text-capitalize">début : {moment(begin_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                <p className="m-0 text-capitalize">fin : {end_at !== null ? moment(end_at).format('DD/MM/YYYY HH:mm:ss') : '-'}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center flex-column">
                    <h4 className="text-center">{opponents[0].opponent.acronym}</h4>
                    <img
                        className="mt-3"
                        src={opponents[0].opponent.image_url}
                        alt={opponents[0].opponent.name + ' image'}
                        style={{ maxWidth: '100px', height: '100px' }}
                    ></img>
                </div>
                {matchType[0] === 'upcoming' && (
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="m-0" style={{ fontSize: '2.25rem' }}>
                            vs
                        </p>
                        <Button onClick={() => showBet(id, name, opponents)} variant="success" className="d-block mx-auto mt-3">
                            Parier
                        </Button>
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
                    <h4 className="text-center">{opponents[1].opponent.acronym}</h4>
                    <img
                        className="mt-3"
                        src={opponents[1].opponent.image_url}
                        alt={opponents[1].opponent.name + ' image'}
                        style={{ maxWidth: '100px', height: '100px' }}
                    ></img>
                </div>
            </div>
        </div>
    )
}

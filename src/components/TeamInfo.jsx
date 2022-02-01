import { Modal } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'

export default function TeamInfo({ hideTeam, team: { id, location, name, players } }) {
    return (
        <Modal show={id !== null}>
            <Modal.Header closeButton onHide={hideTeam}>
                <Modal.Title>
                    {name + ' '}
                    {location !== null && location !== '' ? (
                        <span className={'fi fi-' + location.toLowerCase()} title={location}></span>
                    ) : (
                        'Inconnu'
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="m-0 text-center">Joueurs :</h4>
                <div className="overflow-auto" style={{ height: '450px' }}>
                    {players.map(({ age, first_name, hometown, id, image_url, last_name, name, nationality, role }) => (
                        <div className="py-5 px-2" key={id} style={{ borderBottom: '2px solid #ddd' }}>
                            <p className="text-center" style={{ fontSize: '1.25rem' }}>
                                {name} ({first_name} {last_name})
                            </p>
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <p>Age : {age !== null ? age : 'Inconnu'}</p>
                                    <p>
                                        Nationnalité :{' '}
                                        {nationality !== null ? (
                                            <span
                                                className={'fi fi-' + nationality.toLowerCase()}
                                                title={hometown !== null ? hometown : nationality}
                                            ></span>
                                        ) : (
                                            'Inconnue'
                                        )}
                                    </p>
                                    <p className="m-0">Role : {role !== null ? role : 'Inconnu'}</p>
                                </div>
                                <img alt={name + ' image'} className="col-6" src={image_url !== null ? image_url : noImage} />
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

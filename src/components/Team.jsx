import { Modal } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'

export default function Team({ hideTeam, team: { location, name, players } }) {
    return (
        <Modal show={true}>
            <Modal.Header closeButton onHide={hideTeam}>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="py-3 text-center">Pays : {location}</h4>
                <h4 className="m-0 pt-3 text-center">Joueurs :</h4>
                <div className="overflow-auto" style={{ height: '450px' }}>
                    {players.map(({ age, first_name, hometown, image_url, last_name, name, nationality, role }) => (
                        <div className="py-4 px-2" style={{ borderBottom: '2px solid #ddd' }}>
                            <p className="text-center" style={{ fontSize: '1.25rem' }}>
                                {name} ({first_name} {last_name})
                            </p>
                            <div className="d-flex align-items-center">
                                <div className="col-6">
                                    <p>Age : {age !== null ? age : 'Inconnu'}</p>
                                    <p>Lieu de résidence : {hometown !== null ? hometown : 'Inconnu'}</p>
                                    <p>Nationnalité : {nationality !== null ? nationality : 'Inconnue'}</p>
                                    <p className="m-0">Role : {role}</p>
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

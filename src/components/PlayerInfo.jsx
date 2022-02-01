import { Modal } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'

export default function TeamInfo({ hidePlayer, player: { first_name, hometown, id, image_url, last_name, name, nationality, role } }) {
    return (
        <Modal show={id !== null}>
            <Modal.Header closeButton onHide={hidePlayer}>
                <Modal.Title>
                    {name} ({first_name} {last_name})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="d-flex align-items-center p-2">
                        <div className="col-6">
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
            </Modal.Body>
        </Modal>
    )
}

import { Modal } from 'react-bootstrap'
import noImage from '../assets/images/no-image.jpg'
import React from 'react'

export default class PlayerInfo extends React.Component {
    render() {
        return (
            <Modal show={this.props.player.id !== null}>
                <Modal.Header closeButton onHide={this.props.hidePlayer}>
                    <Modal.Title>
                        {this.props.player.name} ({this.props.player.first_name} {this.props.player.last_name})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="d-flex align-items-center p-2">
                            <div className="col-6">
                                <p>
                                    Nationnalité :{' '}
                                    {this.props.player.nationality !== null && this.props.player.nationality !== undefined ? (
                                        <span
                                            className={'fi fi-' + this.props.player.nationality.toLowerCase()}
                                            title={
                                                this.props.player.hometown !== null
                                                    ? this.props.player.hometown
                                                    : this.props.player.nationality
                                            }
                                        ></span>
                                    ) : (
                                        'Inconnue'
                                    )}
                                </p>
                                <p className="m-0">Role : {this.props.player.role !== null ? this.props.player.role : 'Inconnu'}</p>
                            </div>
                            <img
                                alt={this.props.player.name + ' image'}
                                className="col-6"
                                src={
                                    this.props.image_url !== null && this.props.image_url !== undefined
                                        ? this.props.player.image_url
                                        : noImage
                                }
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

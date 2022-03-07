import noImage from '../assets/images/no-image.jpg'
import React from 'react'

export default class Character extends React.Component {
    render() {
        return (
            <div
                className="element p-4 d-flex flex-column my-2"
                style={{ height: '250px', width: '250px', border: '2px solid transparent', borderRadius: '0.25rem' }}
            >
                <p className="text-center" style={{ fontSize: '1.25rem' }}>
                    {this.props.localized_name !== undefined ? this.props.localized_name : this.props.name}
                </p>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <img
                        alt={this.props.name + ' image'}
                        className="mw-100"
                        src={this.props.image_url !== null ? this.props.image_url : noImage}
                        style={{ maxHeight: '150px' }}
                    ></img>
                </div>
            </div>
        )
    }
}

import live from '../assets/images/live.png'
import noImage from '../assets/images/no-image.jpg'
import React from 'react'

export default class Team extends React.Component {
    render() {
        return (
            <div
                className="element d-flex flex-column p-4 my-2 mx-auto"
                onClick={() => this.props.showTeam(this.props.id)}
                style={{ height: '250px', width: '250px', border: '2px solid transparent', borderRadius: '0.25rem' }}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <p className="name text-center m-0" style={{ fontSize: '1.25rem' }}>
                        {this.props.acronym !== null ? this.props.acronym : this.props.name}
                    </p>
                    {this.props.match[0] !== undefined && (
                        <a href={this.props.match[0].official_stream_url} target="_blank" rel="noreferrer">
                            <img alt="live" className="mx-1" src={live} style={{ height: '3.5rem' }} />
                        </a>
                    )}
                </div>
                <div className="h-100 d-flex justify-content-center align-items-center">
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

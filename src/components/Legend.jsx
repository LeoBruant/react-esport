import React from 'react'

export default class Legend extends React.Component {
    render() {
        return (
            <div className="mx-auto col-12 col-md-10 col-lg-8 col-xl-6 d-flex justify-content-between">
                {this.props.legend.map(({ color, label }) => (
                    <div className="d-flex align-items-center justify-content-center" key={label} style={{ width: 'inherit' }}>
                        <div className="col-1" style={{ border: '2px solid' + color, height: '15px' }}></div>
                        <p className="mx-1 my-0">{label}</p>
                    </div>
                ))}
            </div>
        )
    }
}

import GameSelect from './GameSelect'
import React from 'react'
import Search from './Search'

export default class Header extends React.Component {
    render() {
        return (
            <header className="header container pt-2">
                <div className="d-flex justify-content-between">
                    <GameSelect games={this.props.games} />
                    <Search />
                </div>
                <h1 className="text-center m-0 py-5" style={{ fontSize: '3.5rem' }}>
                    {this.props.title} {this.props.game}
                </h1>
            </header>
        )
    }
}

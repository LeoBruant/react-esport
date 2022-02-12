import GameSelect from './GameSelect'
import Search from './Search'

export default function Header({ game, games, title }) {
    return (
        <header className="header container pt-2">
            <div className="d-flex justify-content-between">
                <GameSelect games={games} />
                <Search />
            </div>
            <h1 className="text-center m-0 py-5" style={{ fontSize: '3.5rem' }}>
                {title} {game}
            </h1>
        </header>
    )
}

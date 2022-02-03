import GameSelect from '../components/GameSelect'

export default function ListHeader({ game, games, title }) {
    return (
        <header className="header container">
            <GameSelect games={games} />
            <h1 className="text-center m-0 py-5" style={{ fontSize: '3.5rem' }}>
                {title} {game}
            </h1>
        </header>
    )
}

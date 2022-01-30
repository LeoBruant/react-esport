import React, { useCallback, useState } from 'react'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Teams.js'
import { Spinner } from 'react-bootstrap'
import live from '../assets/images/live.png'
import noImage from '../assets/images/no-image.jpg'
import Team from '../components/Team'

export default function Teams() {
    const [counter, setCounter] = useState(0)
    const [matches, setMatches] = useState({})
    const [team, setTeam] = useState(null)
    const [teams, setTeams] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const getMatches = useCallback(() => {
        pandascore.get('lol/matches/running?per_page=100').then(({ data }) => {
            teams.forEach(({ id }) => {
                let match = data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)

                if (match.length !== 0) {
                    setMatches((oldMatches) => {
                        return {
                            ...oldMatches,
                            [id]: data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)
                        }
                    })
                }
            })
        })
    }, [teams])

    const getTeams = useCallback(() => {
        pandascore
            .get('lol/teams?per_page=100')
            .then(({ data }) => {
                setTeams(data)
            })
            .then(() => {
                getMatches()
            })
            .then(() => {
                if (counter === 0) {
                    setIsLoaded(true)
                }

                setCounter(counter + 1)
            })
    }, [counter, getMatches])

    const hideTeam = () => {
        setTeam(null)
    }

    const showTeam = (location, name, players) => {
        setTeam({
            location,
            name,
            players
        })
    }

    React.useEffect(() => {
        if (counter === 0) {
            getTeams()
        }

        setTimeout(() => {
            getTeams()
        }, 60000)
    }, [counter, getTeams])

    return (
        <>
            <Style>
                <header className="header">
                    <h1 className="title">Équipes LoL</h1>
                </header>
                {!isLoaded && <Spinner animation="border" className="spinner" />}
                {isLoaded && (
                    <main className="main container">
                        <div className="teams">
                            {teams.map(({ acronym, id, image_url, location, name, players }) => (
                                <div className="team" key={id} onClick={() => showTeam(location, name, players)}>
                                    <div className="name-container">
                                        <p className="name">{acronym !== null ? acronym : name}</p>
                                        {matches[id] !== undefined && (
                                            <a href={matches[id].official_stream_url}>
                                                <img alt="live" className="live" src={live} />
                                            </a>
                                        )}
                                    </div>

                                    <div className="image-container">
                                        <img className="image" src={image_url !== null ? image_url : noImage} alt={name + ' image'}></img>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                )}
            </Style>
            {team !== null && <Team className="modal" hideTeam={hideTeam} team={team} />}
        </>
    )
}

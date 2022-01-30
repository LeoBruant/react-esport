import React, { useCallback, useState } from 'react'
import pandascore from '../components/Pandascore'
import { Style } from '../style/Teams.js'
import { Spinner } from 'react-bootstrap'
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
                setMatches((oldMatches) => {
                    return {
                        ...oldMatches,
                        [id]: data.filter(({ opponents }) => opponents[0].opponent.id === id || opponents[1].opponent.id === id)
                    }
                })
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
    }, [getMatches])

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
                            {teams.map(({ acronym, id, image_url, location, name, players, url }) => (
                                <div className="team" key={id} onClick={() => showTeam(location, name, players)}>
                                    <p className="name">{acronym !== null ? acronym : name}</p>
                                    <div className="image-container">
                                        <a href={url} target="_blank" rel="noreferrer">
                                            <img
                                                className="image"
                                                src={image_url !== null ? image_url : noImage}
                                                alt={name + ' image'}
                                            ></img>
                                        </a>
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

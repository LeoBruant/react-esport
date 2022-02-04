import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect({ basePath, game }) {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (localStorage.token === undefined || localStorage.id === undefined) {
            navigate('/login')
        }

        if (basePath) {
            navigate('/matches/' + game)
        }
    }, [navigate])

    return null
}

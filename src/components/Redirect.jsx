import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (localStorage.token === undefined || localStorage.id === undefined) {
            navigate('/login')
        }
    }, [navigate])

    return null
}

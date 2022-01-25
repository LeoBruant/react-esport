import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Redirect() {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (window.localStorage.getItem('token') === null) {
            navigate('/login')
        }
    }, [])

    return null
}

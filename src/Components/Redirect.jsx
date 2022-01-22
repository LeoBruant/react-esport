import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Redirect() {
    const navigate = useNavigate()

    const redirect = () => {
        if (window.localStorage.getItem('username') === null) {
            navigate('/login')
        }
    }

    React.useEffect(() => {
        redirect()
    }, [])

    return null
}

import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect({ basePath, game }) {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (window.location.href.split('/')[3] !== 'login' && window.location.href.split('/')[3] !== 'registration') {
            if (localStorage.token === undefined || localStorage.id === undefined) {
                navigate('/login')
            }

            axios.get('http://localhost:3004/users?id=' + localStorage.id + '&loginToken=' + localStorage.token).then(({ data }) => {
                if (data.length === 0) {
                    localStorage.removeItem('id')
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            })

            if (basePath) {
                navigate('/matches/' + game)
            }
        }
    }, [basePath, game, navigate])

    return null
}

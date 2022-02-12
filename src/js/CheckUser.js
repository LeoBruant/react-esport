import axios from 'axios'

export default function CheckUser(navigate, method) {
    axios.get('http://localhost:3004/users?id=' + localStorage.id + '&loginToken=' + localStorage.token).then(({ data }) => {
        if (data.length === 0) {
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            navigate('/login')
        } else {
            method()
        }
    })
}

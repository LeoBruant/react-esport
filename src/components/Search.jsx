import { Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function Search() {
    const navigate = useNavigate()

    const { game } = useParams()

    const [search, setSearch] = useState('')

    const input = (value) => {
        setSearch(value)

        if (value === '') {
            navigate('/' + window.location.href.split('/')[3] + '/' + game + (window.location.href.split('/')[3] !== 'matches' ? '/1' : ''))
        }
    }

    const submit = (e) => {
        e.preventDefault()
        navigate(
            '/' +
                window.location.href.split('/')[3] +
                '/' +
                game +
                (window.location.href.split('/')[3] !== 'matches' ? '/1' : '') +
                (search !== '' ? '?search=' + search : '')
        )
    }

    return (
        <Form className="col-6 col-sm-4 col-md-3 col-xl-2 d-flex" onSubmit={(e) => submit(e)}>
            <Form.Control className="mx-2" onInput={(e) => input(e.target.value)} placeholder="Recherche" type="text" />
            <Button type="submit">
                <FontAwesomeIcon icon={['fas', 'search']} />
            </Button>
        </Form>
    )
}

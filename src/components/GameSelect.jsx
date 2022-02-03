import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function GameSelect({ games }) {
    const navigate = useNavigate()

    return (
        <Form className="col-6 col-sm-4 col-md-3 col-xl-2 mt-2">
            <Form.Select
                onChange={(e) =>
                    navigate(
                        '/' +
                            window.location.href.split('/')[3] +
                            '/' +
                            e.target.value +
                            (window.location.href.split('/')[3] !== 'matches' ? '/1' : '')
                    )
                }
                value={window.location.href.split('/')[4]}
            >
                {Object.entries(games).map((game) => (
                    <option key={game[0]} value={game[0]}>
                        {game[1]}
                    </option>
                ))}
            </Form.Select>
        </Form>
    )
}

import { Button, Form, Modal } from 'react-bootstrap'

export default function Bet({ hideBet, matchBet }) {
    return (
        <Modal show={matchBet.id !== null}>
            <Modal.Header closeButton onHide={hideBet} className="justify-content-center">
                <Modal.Title>{matchBet.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex justify-content-center flex-column">
                    <h5 className="text-center py-3">Choisir un gagnant</h5>
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Check inline label={matchBet.opponents[0].opponent.name} name="opponents" type="radio" />
                        <Form.Check inline label={matchBet.opponents[1].opponent.name} name="opponents" type="radio" />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                        <Form.Label>Jetons :</Form.Label>
                        <Form.Control type="number" min={1} max={100} className="mx-2" style={{ width: '5rem' }} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="danger" onClick={hideBet}>
                    Annuler
                </Button>
                <Button variant="success" onClick={hideBet}>
                    Valider
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

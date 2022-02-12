import axios from 'axios'
import CheckUser from './CheckUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import noImage from '../assets/images/no-image.jpg'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function League({ favourite, getFavourites, id, image_url, name, url }) {
    const navigate = useNavigate()

    const add = () => {
        let request = {
            leagueId: id,
            userId: localStorage.id
        }

        axios.post('http://localhost:3004/favourites', request).then(() => {
            getFavourites()

            Swal.fire({
                icon: 'success',
                title: name + ' a bien été ajoutée en favoris',
                confirmButtonColor: '#157347',
                timer: 1500
            })
        })
    }

    const remove = () => {
        axios.delete('http://localhost:3004/favourites/' + favourite.id).then(() => {
            getFavourites()
        })
    }

    const toggle = () => {
        if (favourite === null) {
            CheckUser(navigate, add)
        } else {
            CheckUser(navigate, remove)
        }
    }

    return (
        <div
            className="element p-4 d-flex flex-column my-2"
            style={{ height: '250px', width: '250px', border: '2px solid transparent', borderRadius: '0.25rem' }}
        >
            <p className="text-center" style={{ fontSize: '1.25rem' }}>
                {name}{' '}
                {favourite !== null && (
                    <FontAwesomeIcon icon={['fas', 'star']} onClick={toggle} style={{ color: '#0b5ed7', fontSize: '2rem' }} />
                )}
                {favourite === null && (
                    <FontAwesomeIcon icon={['far', 'star']} onClick={toggle} style={{ color: '#0b5ed7', fontSize: '1.5rem' }} />
                )}
            </p>
            <div className="d-flex justify-content-center align-items-center h-100">
                <a href={url} rel="noreferrer" target="_blank">
                    <img
                        alt={name + ' image'}
                        className="mw-100"
                        src={image_url !== null ? image_url : noImage}
                        style={{ maxHeight: '150px' }}
                    ></img>
                </a>
            </div>
        </div>
    )
}

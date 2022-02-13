import noImage from '../assets/images/no-image.jpg'

export default function Character({ id, image_url, localized_name, name, showCharacter }) {
    return (
        <div
            className="element p-4 d-flex flex-column my-2"
            onClick={() => showCharacter(id)}
            style={{ height: '250px', width: '250px', border: '2px solid transparent', borderRadius: '0.25rem' }}
        >
            <p className="text-center" style={{ fontSize: '1.25rem' }}>
                {localized_name !== undefined ? localized_name : name}
            </p>
            <div className="d-flex justify-content-center align-items-center h-100">
                <img
                    alt={name + ' image'}
                    className="mw-100"
                    src={image_url !== null ? image_url : noImage}
                    style={{ maxHeight: '150px' }}
                ></img>
            </div>
        </div>
    )
}

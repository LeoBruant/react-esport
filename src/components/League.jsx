import noImage from '../assets/images/no-image.jpg'

export default function League({ image_url, name, url }) {
    return (
        <div className="p-4 d-flex flex-column my-2" style={{ height: '250px', width: '250px' }}>
            <p className="text-center" style={{ fontSize: '1.25rem' }}>
                {name}
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

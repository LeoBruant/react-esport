import live from '../assets/images/live.png'
import noImage from '../assets/images/no-image.jpg'

export default function Team({ acronym, image_url, match, name }) {
    return (
        <div
            className="team d-flex flex-column p-4 my-2 mx-auto"
            style={{ height: '250px', width: '250px', border: '2px solid transparent', borderRadius: '0.25rem' }}
        >
            <div className=" d-flex justify-content-center align-items-center">
                <p className="name text-center m-0" style={{ fontSize: '1.25rem' }}>
                    {acronym !== null ? acronym : name}
                </p>
                {match !== null && (
                    <a href={match.official_stream_url}>
                        <img alt="live" className="mx-1" src={live} style={{ height: '3.5rem' }} />
                    </a>
                )}
            </div>
            <div className="h-100 d-flex justify-content-center align-items-center">
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

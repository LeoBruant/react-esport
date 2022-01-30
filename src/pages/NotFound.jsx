import { Style } from '../style/NotFound.js'

export default function NotFound() {
    return (
        <Style style={{ height: 'calc(100vh - ' + document.querySelector('nav').offsetHeight + 'px)' }}>
            <div className="body">
                <div title="404" className="text">
                    404
                </div>
            </div>
        </Style>
    )
}

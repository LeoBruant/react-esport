import { Style } from '../style/NotFound.js'
import NavBar from '../components/NavBar'

export default function NotFound() {
    return (
        <Style>
            <NavBar theme="dark" />
            <div className="body">
                <div title="404" className="text">
                    404
                </div>
            </div>
        </Style>
    )
}

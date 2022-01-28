import { Style } from '../style/NotFound.js'
import NavBar from '../components/NavBar'

export default function NotFound({ coins }) {
    return (
        <Style>
            <NavBar coins={coins} theme="dark" />
            <div className="body">
                <div title="404" className="text">
                    404
                </div>
            </div>
        </Style>
    )
}

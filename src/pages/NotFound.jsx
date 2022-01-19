import { Style } from './style/NotFound.js'
import Header from '../components/Header'

export default function NotFound() {
    return (
        <Style>
            <Header theme="dark" />
            <div className="body">
                <div title="404" className="text">
                    404
                </div>
            </div>
        </Style>
    )
}

import { Style } from './style/Home.js'
import Header from '../Components/Header'

export default function Home() {
    return (
        <Style>
            <Header theme="light" />
            <main className="main">
                <h1 className="title">Accueil</h1>
            </main>
        </Style>
    )
}

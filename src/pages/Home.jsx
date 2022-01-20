import { Style } from '../style/Home.js'
import Header from '../components/Header'
import Redirect from '../components/Redirect'

export default function Home() {
    return (
        <>
            <Redirect />
            <Header theme="light" />
            <Style>
                <main className="main">
                    <h1 className="title">Accueil</h1>
                </main>
            </Style>
        </>
    )
}

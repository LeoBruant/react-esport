import Header from '../Components/Header'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <Header />
            <h1>Home</h1>
            <Link to="/azerty">404</Link>
        </>
    )
}

export default Home

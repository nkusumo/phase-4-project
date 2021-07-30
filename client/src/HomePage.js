import {useEffect} from 'react';
import SongCard from './SongCard';

function HomePage() {

    useEffect(() => {
        fetch("http://localhost:3000/songs")
    },[])

    return (
        <>
        </>
    )
}

export default HomePage;
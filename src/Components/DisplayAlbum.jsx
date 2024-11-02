import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, albumsData, songsData } from '../assets/assets';
import { PlayerContext } from './../Context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const { playWithId } = useContext(PlayerContext);

    useEffect(() => {
        const foundAlbum = albumsData.find((item) => item.id === parseInt(id));
        setAlbumData(foundAlbum);
    }, [id]);

    if (!albumData) {
        return <div>Loading...</div>;
    }

    const albumSongs = songsData.filter(song => song.albumId === albumData.id); // Filtruj piosenki dla albumu

    return (
        <div style={{ backgroundColor: albumData.bgColor }}>
            <h1>{albumData.name}</h1>
            <img src={albumData.image} alt={albumData.name} />
            <p>{albumData.desc}</p>
            <div>
                {albumSongs.map(song => (
                    <div key={song.id} onClick={() => playWithId(song.id)}>
                        <h3>{song.name}</h3>
                        <img src={song.image} alt={song.name} />
                        <p>{song.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayAlbum;
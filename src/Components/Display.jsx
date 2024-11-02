import React, { useContext, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets'; // Załaduj dane albumów z lokalnego pliku
import { PlayerContext } from '../Context/PlayerContext';

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum ? location.pathname.split('/').pop() : '';
    const album = albumsData.find((x) => x.id === Number(albumId)); // Zmieniono na id, ponieważ używamy lokalnych danych
    const bgColor = isAlbum && album ? album.bgColor : '#121212';

    useEffect(() => {
        displayRef.current.style.background = isAlbum ? `linear-gradient(${bgColor}, #121212)` : '#121212';
    }, [isAlbum, bgColor]); // Dodano dependencies

    return (
        <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbum album={album} />} />
            </Routes>
        </div>
    );
};

export default Display;

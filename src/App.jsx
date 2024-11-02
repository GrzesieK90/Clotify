import React, { useContext } from 'react'
import Sidebar from './Components/Sidebar'
import Player from './Components/Player'
import Display from './Components/Display'
import { PlayerContext } from './Context/PlayerContext'
import { songsData } from './assets/assets';

const App = () => {

  const {audioRef, track, songsData} = useContext(PlayerContext)

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length !==0 ?
          <>
            <div className='h-[90%] flex'>
              <Sidebar/>
              <Display />
            </div>
            <Player />
          </>
        : null
      }
      <audio src={track?track.file:""} ref={audioRef} preload='auto'></audio>
    </div>
  )
}

export default App
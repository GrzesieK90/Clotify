import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from './../assets/assets.js'; // Importuj songsData z assets.js

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekbar = useRef();

  const [playerStatus, setPlayerStatus] = useState(false);
  const [track, setTrack] = useState(songsData[0]);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });

  useEffect(() => {
    audioRef.current.volume = volume; // Ustawiamy domyślny poziom głośności
  }, []);

  const [volume, setVolume] = useState(0.5); // Domyślny poziom głośności to 1 (maksymalny)

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  }

  const playWithId = async (id) => {
    const selectedTrack = songsData.find(item => item.id === id);
    if (selectedTrack) {
        setTrack(selectedTrack);
        audioRef.current.src = selectedTrack.file; // Ustaw nowe źródło audio
        await audioRef.current.load(); // Załaduj nowe źródło
        await audioRef.current.play().catch(error => {
            console.error('Play error:', error);
        });
        setPlayerStatus(true);
    }
};

  const previous = async () => {
    const currentIndex = songsData.findIndex(item => item.id === track.id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      await audioRef.current.load();
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }

  const next = async () => {
    const currentIndex = songsData.findIndex(item => item.id === track.id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      await audioRef.current.load();
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  }

  const seekSong = (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
  }

  const changeVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value; // Zmieniamy poziom głośności audio
  };

  useEffect(() => {
    const updateTime = () => {
      seekbar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%';
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60)
        }
      });
    };

    audioRef.current.ontimeupdate = updateTime;

    return () => {
      audioRef.current.ontimeupdate = null; // Cleanup
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekbar,
    seekBg,
    track, setTrack,
    playerStatus, setPlayerStatus,
    time, setTime,
    volume, setVolume,
    play, pause,
    playWithId,
    previous, next,
    seekSong,
    changeVolume, // Dodaj zmianę głośności do kontekstu
    songsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

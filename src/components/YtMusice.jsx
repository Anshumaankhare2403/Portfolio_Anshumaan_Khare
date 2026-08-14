import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoChevronDown, IoClose, IoHeartOutline, IoPause, IoPlay, IoRemove, IoSquareOutline, IoVolumeHigh } from "react-icons/io5";

function YtMusice({ onClose, onMinimize, mobile = false }) {
  const [videoId, setVideoId] = useState("jfKfPfyJRdk");
  const [isPlaying, setIsPlaying] = useState(false);
  const [maximized, setMaximized] = useState(true);

  const songs = [
    
    {
      title: "Relaxing Music",
      videoId: "DWcJFNfaw9c",
      image: "https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg",
    },
    {
      title: "Coding Music",
      videoId: "4xDzrJKXOOY",
      image: "https://img.youtube.com/vi/4xDzrJKXOOY/hqdefault.jpg",
    },
    {
      title: "Chill Beats",
      videoId: "5qap5aO4i9A",
      image: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg",
    },
    {
      title: "Study Music",
      videoId: "lTRiuFIWV54",
      image: "https://img.youtube.com/vi/lTRiuFIWV54/hqdefault.jpg",
    },
    {
      title: "Night Drive",
      videoId: "rUxyKA_-grg",
      image: "https://img.youtube.com/vi/rUxyKA_-grg/hqdefault.jpg",
    },
    {
      title: "Deep Focus",
      videoId: "WPni755-Krg",
      image: "https://img.youtube.com/vi/WPni755-Krg/hqdefault.jpg",
    },
    {
      title: "Jazz Cafe",
      videoId: "Dx5qFachd3A",
      image: "https://img.youtube.com/vi/Dx5qFachd3A/hqdefault.jpg",
    },
    {
      title: "Morning Coffee",
      videoId: "HuFYqnbVbzY",
      image: "https://img.youtube.com/vi/HuFYqnbVbzY/hqdefault.jpg",
    },
    {
      title: "Soft Piano",
      videoId: "sF80I-TQiW0",
      image: "https://img.youtube.com/vi/sF80I-TQiW0/hqdefault.jpg",
    },
    {
      title: "Ambient Space",
      videoId: "a0muF8abA6I",
      image: "https://img.youtube.com/vi/a0muF8abA6I/hqdefault.jpg",
    },
    {
      title: "Rain Sounds",
      videoId: "mPZkdNFkNps",
      image: "https://img.youtube.com/vi/mPZkdNFkNps/hqdefault.jpg",
    },
    {
      title: "Focus Flow",
      videoId: "TtkFsfOP9QI",
      image: "https://img.youtube.com/vi/TtkFsfOP9QI/hqdefault.jpg",
    },
    {
      title: "Calm Evening",
      videoId: "7NOSDKb0HlU",
      image: "https://img.youtube.com/vi/7NOSDKb0HlU/hqdefault.jpg",
    },
    {
      title: "Work Vibes",
      videoId: "M5QY2_8704o",
      image: "https://img.youtube.com/vi/M5QY2_8704o/hqdefault.jpg",
    },
    {
      title: "Synthwave",
      videoId: "MVPTGNGiI-4",
      image: "https://img.youtube.com/vi/MVPTGNGiI-4/hqdefault.jpg",
    },
    {
      title: "Late Night Coding",
      videoId: "f02mOEt11OQ",
      image: "https://img.youtube.com/vi/f02mOEt11OQ/hqdefault.jpg",
    },
    {
      title: "Acoustic Chill",
      videoId: "kgx4WGK0oNU",
      image: "https://img.youtube.com/vi/kgx4WGK0oNU/hqdefault.jpg",
    },
    {
      title: "Nature Sounds",
      videoId: "eKFTSSKCzWA",
      image: "https://img.youtube.com/vi/eKFTSSKCzWA/hqdefault.jpg",
    },
    {
      title: "Meditation Music",
      videoId: "inpok4MKVLM",
      image: "https://img.youtube.com/vi/inpok4MKVLM/hqdefault.jpg",
    },
  ];

  if (mobile) {
    return <MobileMusicPlayer songs={songs} videoId={videoId} isPlaying={isPlaying} onClose={onClose} onSelect={(id) => { setVideoId(id); setIsPlaying(true); }} onPlayToggle={() => setIsPlaying((current) => !current)} onPlaybackChange={setIsPlaying} />;
  }

  return (
    <motion.div
      drag={mobile || maximized ? false : true}
      dragMomentum={false}
      initial={mobile ? { opacity: 0, scale: 0.95 } : { x: 0, y: 0, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-30 overflow-hidden border border-white/20 bg-black/20 text-white shadow-2xl backdrop-blur-3xl ${
        mobile
          ? "inset-0 h-[100svh] w-full rounded-none mobile-glass-app"
          : maximized
          ? "inset-0 h-full w-full rounded-none z-50"
          : "left-10 top-10 h-[75vh] w-[75vw] rounded-2xl"
      }`}
    >
      {/* Header */}
      <div className="flex h-10 items-center border-b border-white/10 bg-black/20 px-3 text-white">
        <span className="flex-1 text-sm font-medium">YouTube Music</span>
        <button onClick={onMinimize || onClose} className="p-2 text-white hover:bg-white/10 text-sm" aria-label="Minimize">
          <IoRemove />
        </button>
        <button onClick={() => setMaximized((prev) => !prev)} className="p-2 text-white hover:bg-white/10 text-sm" aria-label={maximized ? "Restore" : "Maximize"}>
          <IoSquareOutline />
        </button>
        <button onClick={onClose} className="p-2 text-white hover:bg-red-600" aria-label="Close">
          <IoClose />
        </button>
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Playlist */}
        <div className="w-28 overflow-y-auto border-r border-white/10 bg-black/20 text-white sm:w-72">
          {songs.map((song) => (
            <button
              key={song.videoId}
              onClick={() => setVideoId(song.videoId)}
              className="flex w-full items-center gap-3 p-3 hover:bg-gray-700/50"
            >
              <img
                src={song.image}
                alt={song.title}
                className="h-14 w-14 rounded object-cover"
              />
              <span className="hidden text-sm font-medium sm:block">{song.title}</span>
            </button>
          ))}
        </div>

        {/* Player */}
        <div className="flex-1">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Music Player"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
}

export default YtMusice;

function MobileMusicPlayer({ songs, videoId, isPlaying, onClose, onSelect, onPlayToggle, onPlaybackChange }) {
  const currentSong = songs.find((song) => song.videoId === videoId) || songs[0];
  const playerRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const sendPlayerCommand = (func, args = []) => {
    playerRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  };

  useEffect(() => {
    if (!playerReady) return;
    sendPlayerCommand(isPlaying ? "playVideo" : "pauseVideo");
  }, [isPlaying, playerReady, videoId]);

  useEffect(() => {
    if (!playerReady) return undefined;

    const pollPlayer = () => {
      sendPlayerCommand("getCurrentTime");
      sendPlayerCommand("getDuration");
    };
    const interval = window.setInterval(pollPlayer, 500);
    pollPlayer();
    return () => window.clearInterval(interval);
  }, [playerReady]);

  useEffect(() => {
    const receivePlayerState = (event) => {
      if (!event.origin.includes("youtube")) return;
      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      const info = data?.info;
      if (typeof info?.currentTime === "number") setCurrentTime(info.currentTime);
      if (typeof info?.duration === "number") setDuration(info.duration);
      if (typeof info?.playerState === "number") onPlaybackChange(info.playerState === 1);
    };

    window.addEventListener("message", receivePlayerState);
    return () => window.removeEventListener("message", receivePlayerState);
  }, [onPlaybackChange]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const seek = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    sendPlayerCommand("seekTo", [nextTime, true]);
  };

  const selectSong = (nextVideoId) => {
    setCurrentTime(0);
    setDuration(0);
    setPlayerReady(false);
    onSelect(nextVideoId);
  };

  return (
    <section className="ios-music-app" aria-label="YouTube Music">
      <header className="ios-music-header">
        <button onClick={onClose} aria-label="Close music"><IoChevronDown /></button>
        <span>NOW PLAYING</span>
        <button aria-label="Volume"><IoVolumeHigh /></button>
      </header>

      <main className="ios-music-main">
        <iframe
          ref={playerRef}
          className="ios-music-engine"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&playsinline=1&autoplay=${isPlaying ? 1 : 0}`}
          title="YouTube Music playback"
          allow="autoplay; encrypted-media"
          onLoad={() => setPlayerReady(true)}
        />
        <div className="ios-music-art"><img src={currentSong.image} alt={`${currentSong.title} cover`} /></div>
        <div className="ios-music-track"><div><h2>{currentSong.title}</h2><p>Anshumaan's focus mix</p></div><button aria-label="Favourite track"><IoHeartOutline /></button></div>
        <input className="ios-music-progress" type="range" min="0" max={duration || 100} value={duration ? currentTime : 0} onChange={seek} aria-label="Track progress" />
        <div className="ios-music-times"><span>{formatTime(currentTime)}</span><strong>{duration ? `${Math.round((currentTime / duration) * 100)}%` : "0%"}</strong><span>{duration ? formatTime(duration) : "0:00"}</span></div>
        <div className="ios-music-controls"><button aria-label="Previous track">|&lt;</button><button className="ios-music-play" onClick={onPlayToggle} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <IoPause /> : <IoPlay />}</button><button aria-label="Next track">&gt;|</button></div>

        <div className="ios-music-queue"><div><h3>Up next</h3><span>{songs.length} tracks</span></div>{songs.slice(0, 5).map((song) => <button key={song.videoId} className={song.videoId === videoId ? "active" : ""} onClick={() => selectSong(song.videoId)}><img src={song.image} alt="" /><span><strong>{song.title}</strong><small>Focus playlist</small></span>{song.videoId === videoId && <IoPlay />}</button>)}</div>
      </main>
    </section>
  );
}

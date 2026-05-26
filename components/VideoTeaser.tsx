"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoTeaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// teaser</div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[0.95]">
            5 seconds of <span className="gradient-text">$NBC.</span>
          </h2>
        </div>

        {/* glow ring wrapper */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-deep via-purple-neon to-purple-deep rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass-strong rounded-3xl overflow-hidden">
            {videoError ? (
              <div className="aspect-video flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-purple-deep/40 to-shade">
                <div className="inline-flex items-center gap-2 bg-purple-deep/40 border border-purple-300/30 rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-purple-neon mb-4">
                  <span className="w-1.5 h-1.5 bg-purple-neon rounded-full animate-pulse-dot" />
                  teaser dropping soon
                </div>
                <div className="font-display text-3xl sm:text-5xl font-bold gradient-text-bright mb-2">$NBC</div>
                <p className="text-sm text-purple-200/60 max-w-sm">
                  The 5-second teaser drops here right before launch.
                </p>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-auto block"
                autoPlay
                loop
                muted
                playsInline
                poster="/logo.jpg"
                onError={() => setVideoError(true)}
              >
                <source src="/teaser.mp4" type="video/mp4" />
                Your browser doesn&apos;t support video.
              </video>
            )}

            {/* controls overlay */}
            {!videoError && (
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "pause" : "play"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-bone hover:bg-purple/20 transition-colors"
                >
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <button
                  onClick={() => setMuted(!muted)}
                  aria-label={muted ? "unmute" : "mute"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-strong flex items-center justify-center text-bone hover:bg-purple/20 transition-colors"
                >
                  {muted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-purple-100/50 text-xs sm:text-sm mt-4 font-mono">
          Share this to tell your friends. Tell your cousins. Hell, tell your cat.
        </p>
      </div>
    </section>
  );
}

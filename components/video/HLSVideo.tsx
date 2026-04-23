'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export const HLSVideo: React.FC<HLSVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch((e) => console.error('HLS Play error:', e));
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari which supports HLS natively
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play().catch((e) => console.error('Native HLS Play error:', e));
        }
      });
    }
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    />
  );
};

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Home() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isEnvelopeOpened) {
      // Play from the start and loop the entire track while the letter is open
      try {
        audio.loop = true;
        audio.currentTime = 0;
        void audio.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    } else {
      // Pause and reset when the envelope is closed
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    }
  }, [isEnvelopeOpened]);

  const openEnvelope = () => {
    setIsEnvelopeOpened(true);
  };

  // Prepare a set of falling emojis with deterministic positions/durations
  const drops = useMemo(() => {
    // emojis requested by the user
    const EMOJIS = [
  "🖕",
  "😂",
  "😭",
  "🔥",
  "😈",
  "🎉",
  "🤝",
  "😹",
  "🤦‍♂️"
];

    const count = 26;
    return Array.from({ length: count }).map((_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      // deterministic-ish layout so they don't jump on re-renders
      const left = `${((i * 41) % 100)}%`;
      const delay = `${(i * 0.28) % 6}s`;
      const duration = `${5 + (i % 6)}s`;
      const size = `${14 + (i % 6) * 6}px`;
      return { emoji, left, delay, duration, size };
    });
  }, []);

  const flapVariants: Variants = {
    closed: { rotateX: 0 },
    opened: { rotateX: -180, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Photo collage configuration with WhatsApp images
  const photos = useMemo(() => [
    { 
      src: '/WhatsApp Image 2025-11-15 at 5.45.28 PM.jpeg',
      rotation: -8,
      x: -120,
      y: -80,
      delay: 1.2,
      scale: 0.85,
    },
    { 
      src: '/WhatsApp Image 2025-11-15 at 5.46.22 PM.jpeg',
      rotation: 12,
      x: 110,
      y: -60,
      delay: 1.5,
      scale: 0.9,
    },
    { 
      src: '/WhatsApp Image 2025-11-15 at 5.47.52 PM.jpeg',
      rotation: -5,
      x: -30,
      y: 20,
      delay: 1.0,
      scale: 1.0,
    },
    { 
      src: '/WhatsApp Image 2025-11-15 at 5.48.06 PM.jpeg',
      rotation: 15,
      x: 130,
      y: 90,
      delay: 1.8,
      scale: 0.88,
    },
    { 
      src: '/WhatsApp Image 2025-11-15 at 5.49.13 PM.jpeg',
      rotation: -12,
      x: -110,
      y: 110,
      delay: 1.3,
      scale: 0.92,
    },
  ], []);

  const photoVariants: Variants = {
    hidden: { top: '350px' },
    visible: {
      top: '25px',
      transition: { duration: 2, ease: 'easeOut', delay: 1 },
    },
  };

  const textVariants: Variants = {
    hidden: { top: '50%', opacity: 0 },
    visible: {
      top: 'calc(50% + 180px)',
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut', delay: 2.8 },
    },
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full font-caveat">
      {/* Falling emoji background (covers full viewport behind everything) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {drops.map((d, idx) => (
          <span
            key={idx}
            className="emoji-fall emoji"
            style={{
              left: d.left,
              animationDelay: d.delay,
              animationDuration: d.duration,
              fontSize: d.size,
            }}
          >
            {d.emoji}
          </span>
        ))}
      </div>

      <div className="relative w-full max-w-2xl mx-auto h-screen">
        {/* Envelope (always visible) */}
        <div
          className="absolute left-1/2 top-1/2 w-full max-w-[550px] aspect-[1.6/1] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={!isEnvelopeOpened ? openEnvelope : undefined}
        >
          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#E3F2FD] rounded-lg shadow-2xl border-4 border-[#BBDEFB]" style={{ overflow: 'visible' }}>
            {/* Bottom pocket flaps */}
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 500 312"
              preserveAspectRatio="none"
              style={{ zIndex: 1 }}
            >
              <polygon points="0,312 0,200 250,280" fill="#B3D9F2" stroke="#90CAF9" strokeWidth="3" />
              <polygon points="500,312 500,200 250,280" fill="#C5E3F6" stroke="#90CAF9" strokeWidth="3" />
              <line x1="0" y1="312" x2="500" y2="312" stroke="#90CAF9" strokeWidth="4" />
            </svg>

            {/* Envelope back panel */}
            <div className="absolute inset-0 bg-[#E3F2FD] rounded-lg border-4 border-[#BBDEFB]" style={{ zIndex: 2 }}></div>

            {/* Envelope Text */}
            <div className="absolute inset-0 flex items-center justify-center pt-20" style={{ zIndex: 3 }}>
              <span className="text-[#8B6F9C] text-4xl md:text-6xl mt-25 font-bold drop-shadow-sm">
                To the weirdest bihari!!
              </span>
            </div>

            {/* Envelope Flap */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              style={{ zIndex: 15, transformOrigin: 'top' }}
              variants={flapVariants}
              initial="closed"
              animate={isEnvelopeOpened ? 'opened' : 'closed'}
            >
              <svg className="absolute top-0 left-0 w-full h-[65%]" viewBox="0 0 500 325" preserveAspectRatio="none">
                <polygon points="0,0 250,325 500,0" fill="#BBDEFB" stroke="#90CAF9" strokeWidth="4" />
              </svg>
              {/* Middle finger - counter-rotates to stay upright */}
              <motion.div 
                className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl z-20"
                animate={isEnvelopeOpened ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                🖕
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Clipping container - only shows what's above envelope */}
        <AnimatePresence>
          {isEnvelopeOpened && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
              style={{
                top: 'calc(50% - 470px)',
                width: '100%',
                maxWidth: '700px',
                height: '500px',
                overflow: 'hidden',
                zIndex: 25
              }}
            >
              {/* Photo collage - scattered polaroids sliding up from envelope */}
              <motion.div
                className="absolute w-full"
                style={{ left: 'calc(50% - 75px)', transform: 'translateX(-50%)' }}
                variants={photoVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative w-full h-[400px] flex items-center justify-center">
                  {photos.map((photo, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute"
                      initial={{ 
                        opacity: 0, 
                        scale: 0.5,
                        rotate: 0,
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: photo.scale,
                        rotate: photo.rotation,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: photo.delay,
                        ease: 'easeOut',
                      }}
                      style={{
                        left: `calc(50% + ${photo.x}px)`,
                        top: `calc(50% + ${photo.y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="bg-white p-2 pb-6 rounded-sm duration-300">
                        <Image
                          src={photo.src}
                          alt={`Memory ${idx + 1}`}
                          width={200}
                          height={200}
                          className="w-[130px] h-[130px] object-cover rounded-sm"
                          priority
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Text sliding down below envelope */}
        <AnimatePresence>
          {isEnvelopeOpened && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 z-20 w-full max-w-[500px]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg w-full py-10 flex items-center justify-center">
                <p className="text-base md:text-xl font-bold text-[#8B6F9C] text-center leading-tight px-2">
                  Happy 16th (17th) Birthday Horlicks 🖕🖕🖕 Stay nonchalant and cool whimsy wtv you cool people do 😎🔥 I ain't good with words so just fill in the rest from how I behave 
                  <br /><br />
                  Cool Boy
                  <br />
                  Aarjav Jain
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background music */}
        <audio ref={audioRef}>
          <source src="/bargad - sufr.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}

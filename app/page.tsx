'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Home() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  const openEnvelope = () => {
    setIsEnvelopeOpened(true);
  };

  const flapVariants: Variants = {
    closed: { rotateX: 0 },
    opened: { rotateX: -180, transition: { duration: 1, ease: 'easeOut' } },
  };

  const photoVariants: Variants = {
    hidden: { top: '350px' },
    visible: {
      top: '35px',
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
      <div className="relative w-full max-w-2xl mx-auto h-screen">
        {/* Envelope (always visible) */}
        <div
          className="absolute left-1/2 top-1/2 w-full max-w-[500px] aspect-[1.6/1] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
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
                Happy Birthday!
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
              {/* Heart - counter-rotates to stay upright */}
              <motion.div 
                className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl z-20"
                animate={isEnvelopeOpened ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                ❤️
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
                top: 'calc(50% - 350px)',
                width: '100%',
                maxWidth: '500px',
                height: '300px',
                overflow: 'hidden',
                zIndex: 25
              }}
            >
              {/* Photo sliding up from envelope seam */}
              <motion.div
                className="absolute left-1/2 w-full max-w-[460px] transform -translate-x-1/2"
                variants={photoVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-white p-3 rounded-lg shadow-2xl">
                  <Image
                    src="/yay.png"
                    alt="Birthday Photo"
                    width={460}
                    height={460}
                    className="w-full h-auto object-cover rounded-md"
                    priority
                  />
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
                <p className="text-base md:text-lg font-bold text-[#8B6F9C] text-center leading-tight px-2">
                  Happiest 18th Sush🫶🏻😋💕…here's to 8 months together and beyond. You are the most precious person in my life and I don't see my future without u. I will love and cherish you forever.🥺♾️🤭
                  <br /><br />
                  With love
                  <br />
                  Your baby💓
                  <br /><br />
                  <span className="text-sm">(PS: you will still be my cute little bby no matter how much u grow up😤)</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

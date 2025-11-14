<template>
  <div class="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full">
    <div class="relative w-full max-w-2xl mx-auto h-screen">
      <!-- Envelope (always visible) -->
      <div class="absolute left-1/2 top-1/2 w-full max-w-[500px] aspect-[1.6/1] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        @click="openEnvelope" ref="envelopeRef">
        <!-- Envelope Body with depth -->
        <div class="relative w-full h-full bg-[#E3F2FD] rounded-lg shadow-2xl border-4 border-[#BBDEFB]"
          style="overflow: visible;">
          
          <!-- Bottom pocket flaps (for depth) -->
          <svg class="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 500 312" preserveAspectRatio="none" style="z-index: 1;">
            <!-- Left bottom flap -->
            <polygon points="0,312 0,200 250,280" fill="#B3D9F2" stroke="#90CAF9" stroke-width="3"/>
            <!-- Right bottom flap -->
            <polygon points="500,312 500,200 250,280" fill="#C5E3F6" stroke="#90CAF9" stroke-width="3"/>
            <!-- Center bottom shadow for depth -->
            <line x1="0" y1="312" x2="500" y2="312" stroke="#90CAF9" stroke-width="4"/>
          </svg>
          
          <!-- Envelope back panel -->
          <div class="absolute inset-0 bg-[#E3F2FD] rounded-lg border-4 border-[#BBDEFB]" style="z-index: 2;"></div>
          
          <!-- Envelope Text (behind flap) -->
          <div class="absolute inset-0 flex items-center justify-center pt-20" style="z-index: 3;">
            <span class="text-[#8B6F9C] text-4xl md:text-6xl font-caveat font-bold drop-shadow-sm">Happy Birthday!</span>
          </div>

          <!-- Envelope Flap (on top) -->
          <div class="absolute top-0 left-0 w-full h-full transform origin-top" style="z-index: 15;"
            :style="{ transform: envelopeFlipStyle, transition: 'transform 1s ease-out' }">
            <!-- Top triangular flap - bigger -->
            <svg class="absolute top-0 left-0 w-full h-[65%]" viewBox="0 0 500 325" preserveAspectRatio="none">
              <polygon points="0,0 250,325 500,0" fill="#BBDEFB" stroke="#90CAF9" stroke-width="4"/>
            </svg>
            <!-- Heart at the tip of triangle -->
            <div class="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-7xl z-20">
              ❤️
            </div>
          </div>
          
        </div>
      </div>

      <!-- Clipping container - only shows what's above envelope -->
      <div v-if="envelopeOpened" class="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        :style="{ top: 'calc(50% - 350px)', width: '100%', maxWidth: '500px', height: '350px', overflow: 'hidden', zIndex: 25 }">
        <!-- Photo sliding up from envelope seam -->
        <div class="absolute left-1/2 w-full max-w-[460px] transform -translate-x-1/2"
          :style="{ top: photoTopRelative, transition: 'top 2s ease-out' }">
          <div class="bg-white p-3 rounded-lg shadow-2xl">
            <img src="/yay.png" alt="Birthday Photo" class="w-full h-auto object-cover rounded-md" />
          </div>
        </div>
      </div>

      <!-- Text sliding down below envelope -->
      <div v-if="envelopeOpened"
        class="absolute left-1/2 transform -translate-x-1/2 z-20"
        :style="{ top: textTop, opacity: textOpacity, transition: 'all 1.5s ease-out' }">
        <p class="text-4xl md:text-5xl font-bold text-[#8B6F9C] text-center font-caveat drop-shadow-lg">
          I love you
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const envelopeOpened = ref(false);
const envelopeFlipStyle = ref('rotateX(0deg)');
const envelopeRef = ref(null);
const photoTopRelative = ref('350px'); // Start from bottom of clipping container (at envelope top edge)
const textTop = ref('50%');
const textOpacity = ref(0);

const openEnvelope = () => {
  if (envelopeOpened.value) return;
  
  // Flip the envelope flap open
  envelopeFlipStyle.value = 'rotateX(-180deg)';
  
  // After flap opens, photo slides up
  setTimeout(() => {
    envelopeOpened.value = true;
    
    // Photo slides up from envelope edge into view
    setTimeout(() => {
      photoTopRelative.value = '70px'; // Slides up to fully visible above envelope
      
      // Text appears below envelope
      setTimeout(() => {
        textTop.value = 'calc(50% + 200px)';
        textOpacity.value = 1;
      }, 800);
    }, 100);
  }, 1000);
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

.font-caveat {
  font-family: 'Caveat', cursive;
}
</style>

<template>
  <div class="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full">
    <div class="relative w-full max-w-2xl mx-auto">
      <!-- For You Card -->
      <div v-show="showInitialCard"
        class="absolute left-1/2 top-1/2 w-full max-w-[700px] aspect-[1.4/1] bg-[#E74C3C] rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transform transition-all duration-500 ease-in-out"
        :class="initialCardClass" @click="startTransition">
        <div class="absolute top-4 right-4 md:size-24 size-16">
          <img src="/stamp.png" alt="Decorative stamp" class="w-full h-full object-contain" />
        </div>
        <span class="text-white text-3xl md:text-5xl font-caveat font-bold">For You</span>
      </div>

      <!-- Question Card -->
      <div v-show="showQuestionCard"
        class="absolute left-1/2 top-1/2 w-full max-w-[500px] aspect-[1.4/1] bg-[#FFB7C5] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out h-[80vh] md:h-[100vh]"
        :class="questionCardClass">
        <h2 class="text-[#E74C3C] text-4xl md:text-5xl font-extrabold mb-20 text-center">
          Will you be my valentine?
        </h2>

        <!-- Buttons Container -->
        <div class="flex flex-col items-center relative">
          <button
            class="px-8 py-3 bg-[#E74C3C] min-w-[7rem] w-[7rem] text-white rounded-lg text-xl hover:bg-[#c0392b] font-extrabold transition-colors duration-300 mb-4"
            @click="handleYes">
            YES!
          </button>

          <button @click="handleNo"
            class="px-8 py-3 bg-white text-[#E74C3C] min-w-[7rem] w-[7rem] font-light rounded-lg text-md hover:bg-gray-100 transition-all duration-300"
            :style="noButtonStyle">
            no
          </button>
        </div>

        <!-- Image at bottom-right corner -->
        <div class="absolute bottom-4 right-4">
          <img src="/justin.png" alt="Justin Image" class="w-[10rem] h-auto rounded-[10%] " />
        </div>
      </div>

      <!-- Yay Card -->
      <div v-show="showYayCard"
        class="absolute left-1/2 z-10 top-1/2 gap-y-10 w-full max-w-[500px] aspect-[1.4/1] bg-[#FFB7C5] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out h-[80vh] md:h-[100vh]"
        :class="questionCardClass" :style="{ opacity: yayOpacity }">
        <!-- Video with padding -->
        <div class="px-5 py-3 pb-0 bg-white rounded-[10%]">
          <video autoplay loop muted class="h-[15rem] md:h-[20rem] rounded-[10%] w-auto object-contain mb-4">
            <source src="/yay.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <span class="text-[#E74C3C] text-3xl md:text-4xl font-extrabold">Kuchu ji, I love you &lt;3</span>
      </div>

      <!-- Popup -->
      <div class="fixed popup-enter inset-0 flex items-center justify-center z-50 pb-8" :class="popupClass">
        <div
          class="bg-white shadow-lg rounded-lg p-6 text-center max-w-[400px] w-full h-[80vh] transform transition-all duration-500 ease-in-out flex flex-col justify-between">
          <img src="/gaybo.jpg" alt="Image" class="h-[60%] mb-4 w-auto mx-auto object-contain rounded-[10%]" />
          <p class="text-2xl text-[#E74C3C] font-bold">I always knew you were a gaybo 😠😠😠!</p>
          <button @click="closePopup"
            class="px-6 py-3 bg-[#E74C3C] text-white rounded-lg mt-4 hover:bg-[#c0392b] transition-colors duration-300">
            I mean yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showInitialCard = ref(true);
const showQuestionCard = ref(false);
const initialCardClass = ref('-translate-x-1/2 -translate-y-1/2 opacity-100');
const questionCardClass = ref('-translate-x-1/2 translate-y-[200%] opacity-0');

const yayOpacity = ref(0);
const showYayCard = ref(false);

const noButtonStyle = ref({
  opacity: 1,
  position: 'relative',
});

const noClickCount = ref(0);
const showPopup = ref(false);
const popupClass = ref('popup-leave');

const startTransition = () => {
  showQuestionCard.value = true;
  setTimeout(() => {
    initialCardClass.value = '-translate-x-1/2 translate-y-[100%] opacity-0';
    questionCardClass.value = '-translate-x-1/2 -translate-y-1/2 opacity-100';
    setTimeout(() => {
      showInitialCard.value = false;
    }, 500);
  }, 50);
};

const handleYes = () => {
  showYayCard.value = true;
  setTimeout(() => {
    yayOpacity.value = 1;
  }, 10);
};

const handleNo = () => {
  noClickCount.value++;

  if (noClickCount.value >= 3) {
    showPopup.value = true;
    popupClass.value = 'popup-enter';  // Slide up the popup and make it visible
  }

  const buttonContainer = document.querySelector('.flex.flex-col.items-center');
  for (let i = 0; i < 5; i++) {
    const yesButton = document.createElement('button');
    yesButton.textContent = 'YES!';
    yesButton.className = 'absolute px-8 py-3 bg-[#E74C3C] text-white rounded-lg text-xl hover:bg-[#c0392b] font-extrabold transition-opacity duration-500 opacity-0';
    yesButton.onclick = handleYes
    const offsetX = (Math.random() - 0.5) * 250;
    const offsetY = (Math.random() + 0.2) * 175;
    yesButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Add button to the container
    buttonContainer.appendChild(yesButton);

    // Trigger opacity transition
    setTimeout(() => {
      yesButton.classList.remove('opacity-0');
      yesButton.classList.add('opacity-100');
    }, 10);
  }
};

const closePopup = () => {
  popupClass.value = 'popup-leave';  // Slide the popup back down and hide it
  setTimeout(() => {
    showPopup.value = false;  // Hide the popup after sliding down
  }, 500);
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

.font-caveat {
  font-family: 'Caveat', cursive;
}

/* Adding transition for opacity */
.transition-opacity {
  transition: opacity 0.5s ease-in-out;
}

.transition-all {
  transition: all 0.5s ease-in-out;
}

.popup-enter {
  transform: translateY(2%);
  opacity: 1;
  transition: transform 1s ease-in-out, opacity 0.5s ease-in-out;
}

.popup-leave {
  transform: translateY(200%);
  opacity: 1;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
</style>

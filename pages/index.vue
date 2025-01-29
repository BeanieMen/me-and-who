<template>
    <div class="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full">
      <div class="relative w-full max-w-2xl mx-auto">
        <!-- For You Card -->
        <div 
          v-show="showInitialCard"
          class="absolute left-1/2 top-1/2 w-full max-w-[700px] aspect-[1.4/1] bg-[#E74C3C] rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transform transition-all duration-500 ease-in-out"
          :class="initialCardClass"
          @click="startTransition"
        >
          <div class="absolute top-4 right-4 md:size-24 size-16">
            <img src="/stamp.png" alt="Decorative stamp" class="w-full h-full object-contain" />
          </div>
          <span class="text-white text-3xl md:text-5xl font-caveat font-bold">For You</span>
        </div>
  
        <!-- Question Card -->
        <div 
          v-show="showQuestionCard"
          class="absolute left-1/2 top-1/2 w-full max-w-[500px] aspect-[1.4/1] bg-[#FFB7C5] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out h-[65vh] md:h-[100vh]" 
          :class="questionCardClass"
        >
          <h2 class="text-[#E74C3C] text-4xl md:text-5xl font-extrabold mb-20 text-center">
            Will you be my valentine?
          </h2>
  
          <!-- Buttons Container -->
          <div class="flex flex-col items-center relative">
            <button 
              class="px-8 py-3 bg-[#E74C3C] min-w-[7rem] w-[7rem] text-white rounded-lg text-xl hover:bg-[#c0392b] font-extrabold transition-colors duration-300 mb-4"
            >
              YES!
            </button>
  
            <button 
              @click="handleNo"
              class="px-8 py-3 bg-white text-[#E74C3C] min-w-[7rem] w-[7rem] font-light rounded-lg text-md hover:bg-gray-100 transition-all duration-300"
              :style="noButtonStyle"
            >
              no
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
  
  const noButtonStyle = ref({
    opacity: 1,
    position: 'relative',
  });
  
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
  
  const handleNo = () => {
    const buttonContainer = document.querySelector('.flex.flex-col.items-center');
    for (let i = 0; i < 5; i++) {
      const yesButton = document.createElement('button');
      yesButton.textContent = 'YES!';
      yesButton.className = 'absolute px-8 py-3 bg-[#E74C3C] text-white rounded-lg text-xl hover:bg-[#c0392b] font-extrabold transition-opacity duration-500 opacity-0';
  
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
  </style>
  
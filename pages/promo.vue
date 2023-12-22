<template>
    <div class="bg-dark">
      <div class="py-4">
        <div class="bg-darklight container mx-auto lg:mx-4 md:mx-4 2xl:mx-4 rounded-md py-3">
          <ul class="flex justify-start mx-4 overflow-x-auto">
            <li v-for="category in categories" :key="category" class="mr-2">
              <button :class="[
                  'inline-block px-4 py-2 text-sm md:text-lg lg:text-lg font-medium leading-5 text-center transition duration-150 ease-in-out',
                  'focus:outline-none',
                  activeCategory === category
                      ? 'border-b-2 border-coco text-coco'
                      : 'text-lightwhite hover:text-coco hover:border-gray-300'
              ]" role="tab" @click="setActiveCategory(category)">
                {{ category }}
              </button>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Promotions List -->
      <div class="p-4">
        <div v-for="promo in filteredPromotions" :key="promo.id" class="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden my-4">
          <img :src="promo.image" class="sm:w-1/3 w-full object-cover" />
          <div class="flex-1 p-4">
            <h3 class="text-xl text-coco font-semibold">
              {{ promo.title }}
            </h3>
            <p class="text-gray-300 text-sm mt-2">
              {{ promo.description }}
            </p>
            <div class="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button @click="openModal(promo)"
                class="bg-gray-600 text-coco px-4 py-2 rounded hover:bg-gray-700 transition duration-300 w-full sm:w-auto">
                More Info
              </button>
              <button @click="Reg_Button()"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-dark p-5 rounded-lg max-w-lg w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-lg font-bold text-coco">{{ selectedPromotion.title }}</h4>
            <button @click="closeModal" class="text-lightwhite">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="text-sm">
            <p class="text-lightwhite">{{ selectedPromotion.description }}</p>
          </div>
          <div class="mt-4 text-right">
            <button @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  
  // Mock categories
  const categories = ['ALL', 'EVENT', 'SLOT', 'LIVE', 'SPORT', 'FISH', 'COCKFT', 'ARCADE', 'PVP'];
  
  // Mock data for promotions
  const promotions = ref([
  {
        id: 1,
        category: 'SLOT',
        title: 'Slot Special Offer',
        description: 'Join our slot games and get free spins.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 2,
        category: 'LIVE',
        title: 'Live Casino Night',
        description: 'Experience our live casino with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 3,
        category: 'SPORT',
        title: 'SPORT',
        description: 'Experience our SPORT with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 4,
        category: 'EVENT',
        title: 'EVENT',
        description: 'Experience our EVENT with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 5,
        category: 'FISH',
        title: 'FISH',
        description: 'Experience our FISH with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 6,
        category: 'COCKFT',
        title: 'COCKFT',
        description: 'Experience our COCKFT with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 7,
        category: 'ARCADE',
        title: 'ARCADE',
        description: 'Experience our ARCADE with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
    {
        id: 8,
        category: 'PVP',
        title: 'PVP',
        description: 'Experience our PVP with a special bonus.',
        image: 'https://www.bk33best88.asia/public/promotion/20230226085358-e154dffc-4964-489e-8b3c-0be98136876a.png',
    },
  ]);
  
  const showModal = ref(false);
  const selectedPromotion = ref(null);
  const activeCategory = ref('ALL');
  
  const setActiveCategory = (category) => {
    activeCategory.value = category;
  };
  
  const openModal = (promo) => {
    selectedPromotion.value = promo;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    selectedPromotion.value = null;
  };
  
  const filteredPromotions = computed(() => {
    return activeCategory.value === 'ALL'
      ? promotions.value
      : promotions.value.filter((promo) => promo.category === activeCategory.value);
  });

// Login Button
const Reg_Button = () => {
  const $loginButton = document.querySelector('#buttonlogin');
  return $loginButton.click();
}
</script>
  
  
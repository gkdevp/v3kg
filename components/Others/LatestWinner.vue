<template>
    <div class="w-full gap-4 m-auto">
        <div class="text-xl font-bold justify-center text-ellipsis flex w-full mb-3 overflow-hidden">Latest winners
        </div>
        <Vue3Marquee direction="reverse" :vertical="true" :duration="80" class="flex rounded-2xl p-2 h-full">
            <div v-for="item in items" :key="item.id" class="flex rounded-2xl p-2 bg-gray-700/[0.4] mb-2 w-80">
                <img :src="item.image" :alt="item.alt" loading="lazy" class="cursor-pointer w-14 h-10 mr-3.5 rounded-xl" />
                <div class="items-center cursor-pointer justify-between flex w-full">
                    <div class="flex-col flex">
                        <div class="text-white text-base font-medium text-ellipsis mx-2 overflow-hidden">{{ item.provider }}
                        </div>
                        <div class="text-slate-300 text-base font-medium text-ellipsis mx-2 overflow-hidden">{{ item.code }}
                        </div>
                    </div>
                    <div class="text-white text-base font-medium mx-2">Rp.{{ formatCurrency(item.price) }}</div>
                </div>
            </div>
        </Vue3Marquee>
    </div>
</template>
<script setup>
import { ref } from 'vue';

// State references
const items = ref([]);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImage() {
  const randomNumber = getRandomNumber(1, 30);
  return `win${randomNumber}.jpg`;
}

function getRandomPrice(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const roundedNumber = Math.floor(randomNumber / 1000) * 1000;
  return roundedNumber.toLocaleString('en-US');
}

function formatCurrency(value) {
  return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

for (let i = 1; i <= 16; i++) {
  items.value.push({
    id: i,
    image: `https://s3.bttmedia.com/hub/b3/games/qg3lutJsuDAkcM4DEiSblZoVq3fQucabKTKL9jyC.gif`,
    alt: 'slot_winner',
    code: `KG${getRandomNumber(0, 999).toString().padStart(3, '0')}XXXX`,
    provider: 'Pragmatic',
    price: getRandomPrice(100000, 15000000),
  });
}
</script>
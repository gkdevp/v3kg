<template >
  <div class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-1 mx-auto py-1 px-1">
    <NuxtLink to="/deposit" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center">
        <nuxt-icon name="icon-deposit" />
        <span>DEPOSIT</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/withdrawal" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center">
        <nuxt-icon name="icon-withdraw" />
        <span>WITHDRAW</span>
      </div>
    </NuxtLink>
    <NuxtLink id="voucherButton" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center">
        <span v-if="Notfystore.newNotif"
          class="bg-yellow-400 w-2 h-2 rounded-full inline-flex"></span>
        <nuxt-icon name="rewards" />
        <span>VOUCHER</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/account" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center">
        <nuxt-icon name="profile" />
        <span>PROFILE</span>
      </div>
    </NuxtLink>
    <NuxtLink to="/history" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center">
        <nuxt-icon name="history" />
        <span>RIWAYAT</span>
      </div>
    </NuxtLink>
    <NuxtLink id="notifyButton" class="overflow-x-auto bg-dark">
      <div class="flex items-center py-2 pl-3 pr-4 rounded justify-center relative">
        <span v-if="Notfystore.newNotif"
          class="bg-yellow-400 w-2 h-2 rounded-full inline-flex"></span>
        <nuxt-icon name="notifications" />
        <span>NOTIFICATION</span>
      </div>
    </NuxtLink>
    <OthersNotifMessage />
    <OthersVoucherMessage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Dropdown } from 'flowbite';
import { useNotfyStore } from '@/store/NotificationStore';
import { useVoucherStore } from '@/store/VoucherStore';

// Assign Variable to Voucher
const Notfystore = useNotfyStore();
const voucherStore = useVoucherStore();

onMounted(() => {
  initializeDropdown('notfiyMenu', 'notifyButton');
  initializeDropdown('voucherMenu', 'voucherButton');
});

function initializeDropdown(menuId, buttonId) {
  const $targetEl = document.getElementById(menuId);
  const $triggerEl = document.getElementById(buttonId);
  const options = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onShow: () => {
      $triggerEl.classList.add('router-link-active');
      Notfystore.newNotif = false;
      Notfystore.fetchNotifications();
      voucherStore.fetchVoucher();
    },
    onHide: () => {
      $triggerEl.classList.remove('router-link-active');
    }
  };

  if ($targetEl && $triggerEl) {
    new Dropdown($targetEl, $triggerEl, options);
  } else {
    console.error(`Elements with IDs ${menuId} or ${buttonId} not found`);
  }
}
</script>

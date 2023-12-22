<template>
    <div class="mx-auto max-w-2xl px-4 lg:px-0">
        <div id="notfiyMenu"
            class="hidden max-w-xs rounded-lg bg-dark bg-opacity-70 backdrop-blur-2xl border z-30 overflow-x-auto scrollbar-hide">
            <div class="right-0 rounded-md shadow-lg overflow-hidden z-20">
                <div class="overflow-y-auto max-h-96">
                    <div v-for="notification in Notfystore.unreadNotifications" class="py-3 rounded-lg shadow-md" :key="notification.id">
                        <div class="flex items-center space-x-4 px-4">
                            <div class="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                                <img v-if="memberStore.profile.preferences?.avatar_url"
                                    :src="memberStore.profile.preferences?.avatar_url" class="object-cover w-full h-full" />
                                <img v-else src="https://kgaming.b-cdn.net/kr/icons/profile.svg" class="object-cover w-full h-full" />
                            </div>
                            <div class="flex-1 py-2">
                                <!-- Time and Remove Button -->
                                <div class="flex justify-between items-center mb-2">
                                    <!-- Time -->
                                    <div class="flex items-center text-sm text-lightwhite">
                                        <nuxt-icon name="timer" class="mr-1" />
                                        {{ relativeTime(notification.create_date, notification.create_time) }}
                                    </div>
                                    <!-- Remove Button -->
                                    <nuxt-icon name="remove" class="cursor-pointer text-lightwhite" @click="deleteNotification(notification.id)" />
                                </div>
                                <!-- Status Notes -->
                                <div class="flex items-center mb-1 justify-center">
                                    <nuxt-icon v-if="notification.payload.note" name="warning" class="text-yellow-300" />
                                    <p class="ml-1 text-sm text-coco">
                                        {{ notification.payload.note }}
                                    </p>
                                </div>
                                <!-- Transaction Type Icon and Text -->
                                <div class="flex items-center mb-1">
                                    <!-- Transaction Type Icon -->
                                    <div class="mr-1">
                                        <nuxt-icon v-if="notification.payload.type === 'deposit'" name="icon-deposit" />
                                        <nuxt-icon v-if="notification.payload.type === 'withdraw'" name="icon-withdraw" />
                                        <nuxt-icon v-if="notification.type === 'bonus'" name="rewards" />
                                        <nuxt-icon v-if="notification.payload.type === 'payment_account'" name="icon-currency" />
                                    </div>
                                    <!-- Transaction Type Text -->
                                    <p class="text-sm font-semibold text-lightwhite">
                                        <span v-if="notification.payload.type === 'deposit' || notification.payload.type === 'withdraw'" class="text-coco">{{ notification.payload.type }}</span>
                                        <span v-if="notification.type === 'bonus'" class="text-coco">Voucher</span>
                                        <span v-if="notification.payload.type === 'payment_account'" class="text-coco">{{ notification.payload.category }}</span>
                                    </p>
                                </div>
                                <!-- Status and Message -->
                                <div class="flex flex-wrap items-center justify-between mb-1">
                                <!-- Amount/Message/Provider ID/Account ID -->
                                <div class="flex-1 min-w-0">
                                    <p v-if="notification.payload.type === 'deposit' || notification.payload.type === 'withdraw'" class="text-sm text-lightwhite truncate mr-2">IDR {{ new Intl.NumberFormat('id-ID').format(notification.payload.amount) }}</p>
                                    <p v-if="notification.type === 'bonus'" class="text-sm text-lightwhite break-all mr-4">{{ notification.message }}</p>  
                                    <p v-if="notification.payload.type === 'payment_account'" class="text-sm text-lightwhite break-all mr-4 truncate uppercase">{{ notification.payload.provider_id }}</p>    
                                    <p v-if="notification.payload.type === 'payment_account'" class="text-sm text-lightwhite break-all truncate">{{ notification.payload.account_id }}</p>
                                </div>

                                <!-- Status -->
                                <div class="flex items-center px-2 bg-gray-700 rounded hover:bg-gray-800">
                                    <!-- Icons -->
                                    <nuxt-icon v-if="notification.payload.status === 'approved' || notification.payload.type === 'issued'" name="approved" class="text-green-500 mr-1" />
                                    <nuxt-icon v-if="notification.payload.status === 'rejected' || notification.payload.type === 'expired'" name="rejected" class="text-red-500 mr-1" />
                                    
                                    <!-- Status Text -->
                                    <p class="text-sm">
                                    <span :class="{
                                        'font-medium text-green-500': notification.payload.status === 'approved',
                                        'font-medium text-red-500': notification.payload.status === 'rejected',
                                    }">{{ notification.payload.status }}</span>
                                    </p>
                                    
                                    <!-- Bonus Text -->
                                    <p v-if="notification.type === 'bonus'" class="text-sm ml-2">
                                    <span :class="{
                                        'font-medium text-green-500': notification.payload.type === 'issued',
                                        'font-medium text-red-500': notification.payload.type === 'expired',
                                    }">{{ notification.payload.type }}</span>
                                    </p>
                                </div>
                                </div>
                                <!-- Copy trx_id Button -->
                                <div class="mt-1" >
                                    <button v-if="notification.payload.type === 'deposit' || notification.payload.type === 'withdraw' || notification.type === 'bonus'" @click="copyToClipboard(notification.payload.trx_id || notification.payload.voucher_id)"
                                            class="px-3 py-1 text-xs font-medium transition-all duration-200 bg-gray-700 rounded hover:bg-gray-800">
                                        {{ copiedTrxIds.includes(notification.payload.trx_id || notification.payload.voucher_id) ? 'Copied' : (notification.payload.trx_id ? 'Copy trx_id' : 'Copy vchr_id') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- No Notification Message -->
                <div v-if="!Notfystore.unreadNotifications.length" class="px-8 py-3 text-sm text-center">
                    No Latest Notifications
                </div>
                <!-- Delete All Button -->
                <div class="flex justify-end bg-darken text-cyan-50">
                    <NuxtLink @click="removeAllNotifications" class="flex items-center my-2 cursor-pointer mx-auto">
                        <nuxt-icon name="delete" />
                        <label class="ml-2 text-sm font-medium text-gray-300 cursor-pointer">Delete All</label>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useNotfyStore } from '@/store/NotificationStore';
import { useMemberStore } from '@/store/MemberStore';

// Assing sotre to variable
const Notfystore = useNotfyStore();
const memberStore = useMemberStore();
const copiedTrxIds = ref([]);

const copyToClipboard = (trxId) => {
    navigator.clipboard.writeText(trxId).then(() => {

        // Mark the transaction ID as copied
        copiedTrxIds.value.push(trxId);

        // After 2 seconds, revert the copied status
        setTimeout(() => {
            const index = copiedTrxIds.value.indexOf(trxId);
            if (index > -1) {
                copiedTrxIds.value.splice(index, 1);
            }
        }, 700);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

// Delete  Notification 
const removeAllNotifications = async () => {
    try {
        // Here, you call `updateNotifications` with `readAll` set to true and without passing an ID
        await Notfystore.updateNotifications(null, true);
        await Notfystore.fetchNotifications();
    } catch (error) {
        console.error('Failed to delete all notifications:', error);
    }
};

// Update Notification 
const deleteNotification = async (id, undefined) => {
    try {
        await Notfystore.updateNotifications(id, undefined); // Assuming true means marking it as read

        await Notfystore.fetchNotifications();

    } catch (error) {
        console.error('Failed to update the notification: ', error);
    }
};

const relativeTime = (date, time) => {
    const notificationTime = new Date(date.split('-').reverse().join('-') + 'T' + time);
    const currentTime = new Date();
    const timeDifference = currentTime - notificationTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return days + 'days ago';
    } else if (hours > 0) {
        return hours + 'hours ago';
    } else if (minutes > 1) {
        return minutes + 'm ago';
    } else {
        return 'just now';
    }
};
</script>

<style scoped>
:deep(.nuxt-icon svg) {
    width: 1.2em;
    height: 1.2em;
}</style>
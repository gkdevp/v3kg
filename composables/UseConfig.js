import { ref, onMounted, onUnmounted } from 'vue';
import { useMemberStore } from '@/store/MemberStore';

export function useConfig() {

    const memberStore = useMemberStore();

    const ablyUrl = ref("{No messages}");

    let eventSource;

    const constructUrl = () => {
        const apiKey = "eED8EA.YHaokQ:fLRgllSBgN-tgGBqQf3j2wZGYVEhD9ln8n-8rCsatfo";
        const channelName = memberStore.profile.prefix + memberStore.profile.username;
        return `https://realtime.ably.io/event-stream?channels=${channelName}&v=1.2&key=${apiKey}`;
    };

    const handleMessage = (event) => {
        try {
            const parsedData = JSON.parse(event.data);
            if (parsedData.data) {
                ablyUrl.value = JSON.parse(parsedData.data);
            }
        } catch (err) {
            console.error("Error parsing the received data:", err);
        }
    };

    onMounted(async () => {

        // Refetch Profile
        await memberStore.GetProfile();

        if (process.client) {
            eventSource = new EventSource(constructUrl());
            eventSource.onmessage = handleMessage;
            eventSource.onerror = (error) => {
                eventSource.close();
            };
        }
    });

    onUnmounted(() => {
        if (eventSource) {
            eventSource.close();
        }
    });

    return {
        ablyUrl
    };
}
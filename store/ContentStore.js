//Stores/contentStore

import { defineStore } from 'pinia';
import fetchAPI from '@/utils/clienAPI';

export const useContentStore = defineStore('content', {
    state: () => ({
        homeSlider: [],
        pageSlider: [],
        soccerFixtures: {
            match: [],
        },
        menuGeneral : [],
        mobileGeneral : [],
        featuredProviders: {
            sports :[],
            live: [],
            cockfight : [],
            pvp : [],
            slot : [],
            fishing : [],
        },
        footerText: [],
    }),

    actions: {
        async fetchContent(key) {
            try {

                // Use the key with the URL
                const data = await fetchAPI(`/components/get?key=${key}`,{ method : 'GET'})

                //Success
                return data.data[0].content;

            } catch (error) {
                throw error;
            }
        },
        
        async getFeaturedProviders() {
            const content = await this.fetchContent("featured-providers-theme.text"); 
            this.featuredProviders.sports = content["sports"];
            this.featuredProviders.live = content["live"];
            this.featuredProviders.cockfight = content["cockfight"];
            this.featuredProviders.pvp = content["pvp"];
            this.featuredProviders.slot = content["slot"];
            this.featuredProviders.fishing = content["fishing"];
            this.featuredProviders.pageConfigs = content["pageConfigs"];
        },  
        
        async getHomeSlider() {
            const content = await this.fetchContent("home-slides-theme.text"); 
            this.homeSlider = content["Home-Slides"];  
            this.pageSlider = content["Page-Slides"]; 
        },

        async getSoccerFixtures() {
            const fetchSoccerData = async () => {
                const response = await fetch('https://f.kgaming.dev/fixture.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            };
        
            const getCurrentDateGMTPlus7 = () => {
                const offset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
                return new Date(new Date().getTime() + offset).toISOString().split('T')[0];
            };
        
            const formatMatchDate = (dateString) => {
                const [day, month, year] = dateString.split('/');
                return `${year}-${month}-${day}`;
            };
        
            const isTodayMatch = (match, currentDate) => formatMatchDate(match.Date) === currentDate;
        
            try {
                const soccerData = await fetchSoccerData();
                const currentDate = getCurrentDateGMTPlus7();
        
                const { last_updated_at, ...matches } = soccerData;
        
                const flattenedMatches = Object.values(matches).flatMap(leagueMatches => 
                    leagueMatches.filter(match => isTodayMatch(match, currentDate)).slice(0, 2)
                );
        
                this.soccerFixtures = { 
                    Match: flattenedMatches,
                    LastUpdate: last_updated_at
                };
        
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        },

        async getMenuGeneral() {
            const content = await this.fetchContent("menu-theme.text"); 
            this.menuGeneral = content["menu-general"]; 
            this.mobileGeneral = content["mobile-general"];
        },

        async getFooterText() {
            const content = await this.fetchContent("footer-theme.text"); 
            this.footerText = content["text"];  
        },

        async getContent() {
            await this.getMenuGeneral();
            await this.getHomeSlider();
            await this.getFeaturedProviders();
            await this.getSoccerFixtures();
            await this.getFooterText();
        }
    }
});
import { defineStore } from 'pinia';

// API URL
const baseURL = 'https://ge-api.kgaming.dev/v1/games/get';
const launchURL = 'https://ge-api.kgaming.dev/v1/games/launch';
const favUrl = 'https://ge-api.kgaming.dev/v1/games/update-favorite';

export const useStoreGames = defineStore('games',{
    state: () => ({
      gameAll :[],
      launchGames : [],
    }),
    actions: {
// Fetch Games
async fetchGameData(provider, category) {
    try {

      const headers = headerAuth();
      const response = await fetch(`${baseURL}?provider=${provider}&category=${category}`, {
        method: 'GET',
        headers: headers,
      });

      const gamesProviderData = await response.json();
      console.log('API Response:', gamesProviderData);

      if (gamesProviderData.error) {
        const ErrorMessage = gamesProviderData.error.message;
        const ErrorMessages = gamesProviderData.error.messages;
        throw {
          message: ErrorMessage,
          messages: ErrorMessages
        };
      }
      // Sucess
      else {
        this.gameAll = gamesProviderData;
        console.log(this.gameAll)
     }
    } catch (error) {
      throw error;
    }
  },

  // Launch Games 
  async launchGameData(launcherGames) {
    try {
      const accessToken = getToken();
      const headers = headerAuth(accessToken);
      const response = await fetch(launchURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          code: launcherGames.code,
          provider: launcherGames.provider,
          exit_url: launcherGames.exit_url,
        }),
      });
  
      const launchGames = await response.json();
      
      if (launchGames.error) {
        const ErrorMessage = launchGames.error.message;
        const ErrorMessages = launchGames.error.messages;
        throw {
          message: ErrorMessage,
          messages: ErrorMessages
        };
      } else {
        return launchGames.data.url; 
      }
    } catch (error) {
      console.error('Error launching game:', error);
      throw error;
    }
  },  

  //Favorite Games 
  async favoriteGameData(favoriteGames) {
    try {
      const accessToken = getToken();
      const headers = headerAuth(accessToken);
      const response = await fetch(favUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          code: favoriteGames.code,
          provider: favoriteGames.provider,
        }),
      });
  
      const launchGames = await response.json();
      
      if (launchGames.error) {
        const ErrorMessage = launchGames.error.message;
        const ErrorMessages = launchGames.error.messages;
        throw {
          message: ErrorMessage,
          messages: ErrorMessages
        };
      } else {
        // success
      }
    } catch (error) {
      console.error('Error launching game:', error);
      throw error;
    }
  },  
}
});
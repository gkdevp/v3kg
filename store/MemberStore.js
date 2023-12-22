import { defineStore } from "pinia";
import fetchAPI from '@/utils/clienAPI';

export const useMemberStore = defineStore("member", {
  state: () => ({
    profile: [],
  }),

  actions: {
    // Fetch Profile
    async GetProfile() {
      try {

        const data = await fetchAPI('/players/profile', { method: 'GET' });

        //success
        this.profile = data.data.profile;

      } catch (error) {
        throw error;
      }
    },

    // Update Prefference

    async UpdatePreferences(newProfile) {
      try {
        await fetchAPI('/players/preferences', {
          method: 'POST',
          body: JSON.stringify({
            name: newProfile.name,
            email: newProfile.email,
            phone_number: newProfile.phone_number,
          }),
        });

      } catch (error) {
        throw error;
      }
    },

    async updateAvatar(newProfile) {
      try {
          await fetchAPI('/players/preferences', {
              method: 'POST',
              body: JSON.stringify({
                avatar: newProfile.avatar,
              })
          });

          this.profile.preferences.avatar_url = newProfile.avatar;

      } catch (error) {
          throw error;
      }
  },

    // Generate Refferal
    async GenerateReferral() {
      try {

        await fetchAPI('/players/ref-code', { method: 'POST' });

      } catch (error) {
        throw error;
      }
    },

    // Reset Password
    async ResetPassword(newPassword, verifyNewPassword) {
      try {
        await fetchAPI('/players/change-password', {
          method: 'POST',
          body: JSON.stringify({
            newPassword: newPassword,
            verifyNewPassword: verifyNewPassword,
          }),
        });

      } catch (error) {
        throw error;
      }
    },
    reset() {
      this.profile= [];
    }
  },
});

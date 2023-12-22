<template>
    <button :disabled="isLoading" @click="onClick" class="btn" :class="buttonClass">
      {{ isLoading ? loadingText : label }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: 'Submit'
      },
      loadingText: {
        type: String,
        default: 'Loading...'
      },
      buttonClass: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any common styles for your button here */
  </style>
  
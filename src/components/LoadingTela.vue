<template>
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-100"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
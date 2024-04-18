<template>
    <transition name="modal" appear>
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white rounded-lg w-1/5 p-6 text-center">
                <div class="w-full text-right">
                    <button @click="closeModal" class=""><i class="fa-solid fa-x"></i></button>
                </div>
                <h2 class="text-lg font-semibold mb-4 roboto-bold">{{ title }}</h2>
                <div v-html="body"></div>
            </div>
        </div>
    </transition>
</template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirma() {
        this.$emit('confirma');
      }
    }
  };
  </script>
  
  <style>
  /* Transição de entrada do modal */
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s;
  }
  .modal-enter, .modal-leave-to {
    opacity: 0;
  }
  </style>
  
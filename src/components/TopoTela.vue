<template>
    <div class="h-32">
        <div class="flex justify-between p-4 h-full">
            <div class="flex items-center h-full ml-20">
                CarTOOLa
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      showDropdown: false,
      nomeUsu: '',
      cpfUsu: '',
      cartorioUsu: ''
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdown() {
      const timer = setTimeout(() => {
        this.showDropdown = false;
      }, 350);
    }
  },
  created() {
    // this.checkCookieUserData();
  },
  watch:{
    $route(){
      // this.checkCookieUserData();
    }
  },
  methods: {
      checkCookieUserData() {
        const userDataExists = document.cookie.includes('userData');
        if (userDataExists) {
          const userDataCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('userData='));
          if (userDataCookie) {
            const userData = JSON.parse(userDataCookie.split('=')[1]);
            this.nomeUsu = userData.nome
            this.cpfUsu = userData.cpf
            this.cartorioUsu = userData.endereco_cartorio
          } else {
            console.log('O cookie "userData" não foi encontrado.');
          }
        } else {
            this.$router.push('/login');
        }
      }   
  }
}
</script>
<style>
</style>
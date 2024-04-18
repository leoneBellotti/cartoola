<template>
    <div class="flex items-center justify-center pt-6 pb-20 bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <!-- <label for="username" class="block font-medium">E-mail:</label> -->
            <input v-model="username" type="text" id="username" name="username" placeholder="Digite seu usuario" class="border-2 w-full mt-1 px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <!-- <label for="password" class="block font-medium">Senha:</label> -->
            <input v-model="password" type="password" id="password" name="password" placeholder="Digite sua senha" class="border-2 w-full mt-1 px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
          </div>
          <button type="submit" class="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Entrar</button>
        </form>
        <div class="mt-3 flex text-nowrap text-red-500" v-if="this.erros" v-for="erro in this.erros">
            {{ erro }}<br>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../services/http.js";
  
  

  export default {
    data() {
      return {
        username: '',
        password: '',
        erros:''
      };
    },
    methods: {
      async login() {
        const user = {
            'username':this.username,
            'password':this.password
        }
        try {
            const {data} = await http.post('/login',user);
            const userData = JSON.stringify(data);
            document.cookie = `userData=${userData}; max-age=900; path=/`;
            this.$router.push('/');
        } catch (error) {
          console.log(error)
            this.erros='';
            if(error?.response?.data){
                this.erros=error?.response?.data;
            }
        }
      }
    }
  }
  </script>
  
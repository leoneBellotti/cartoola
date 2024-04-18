<template>
    <div class="h-14 flex items-center textAzul">
        <div class="ml-24 hand underline flex">
            <router-link to="/">Home</router-link>
            <div v-for="item in itens" :key="item.path">
                <router-link class="ms-6" :to=item.path >
                  <!-- {{ item.name === 'Home' ? 'Infopel' : item.name }} -->
                  {{ item.meta.value === 'Home' ? '' : item.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        itens:[]
      }
    },
    watch:{
      $route(){
        this.itens = this.$route.matched;
        // console.log(this.$route);
      }
    }
};
</script>

<style scoped>
</style>
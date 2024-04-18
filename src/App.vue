<template>
  <div class="flex flex-col bg-white">
    <TopoTela  class="border-b shadow" style="box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.1);" />
    <BreadcrumbTela class="border-b shadow" style="box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.1);" />
    <div class="flex">
      <MenuLateral class="tamanhoMenu" />
      <div class="flex-grow" style="">
        <router-view style="min-height: calc(100vh - 380px); width: calc(100vw - 80px);" class=""></router-view>
      </div>
    </div>
    <RodapeTela />
  </div>
</template>

<script>
  import MenuLateral from './components/MenuLateral.vue';
  import RodapeTela from './components/RodapeTela.vue';
  import TopoTela from './components/TopoTela.vue';
  import BreadcrumbTela from './components/BreadcrumbTela.vue';

  export default {
    components: {
      MenuLateral,
      RodapeTela,
      TopoTela,
      BreadcrumbTela,
    }
  };
</script>

<style scoped>
  .tamanhoMenu{
      width: 80px !important;
  }
</style>
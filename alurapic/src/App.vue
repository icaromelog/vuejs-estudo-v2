<template>
  <div class="corpo">

  <menu-nav :rotas="routes"></menu-nav>

  <transition name="pagina">
    <router-view></router-view>
  </transition>

  </div>
</template>


<script>
  import menuNavegacao from './components/shared/menu-navegacao/MenuNavegacao.vue'
  import { routes } from './routes.js'

  export default {
    components: {
      'menu-nav' : menuNavegacao
    },

    data () {
      return {
        routes
      }
    }
  }
</script>

<style lang="scss">
  .corpo { 
    font-family: Helvetica, sans-serif;
    width: 90%;
    margin: 0 auto;
  }
  .pagina-enter-active {
    transition: all .4s ease;
    transition-delay: .6s;
  }
  .pagina-leave-active {
    transition: all .5s ease-in-out;
  }
  .pagina-enter, .pagina-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>

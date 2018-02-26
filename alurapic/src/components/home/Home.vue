<template>
  <div>
    <h1 class="centralizado">Home</h1>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre por parte do titulo" />
    {{ filtro }}

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" v-bind:key='foto'>  
          <meu-painel :titulo="foto.titulo">
              <imagem-responsiva :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
              <botao 
                tipo="button" 
                rotulo="Remover" 
                :confirmacao="true" 
                @botaoAtivado="remove(foto)"
                estilo="perigo">
              </botao>
          </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue'  

  export default {

    components: {
      'meu-painel' : Painel,
      'imagem-responsiva' : ImagemResponsiva,
      'botao' : Botao 
    },

    data() {
      return {
        filtro: '',
        fotoslist: []
      }
    },

    created() {
      this.$http.get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(fotos => this.fotoslist = fotos, err => console.log(err));
    },

    methods: {
      remove(foto) {
          alert('Remover a foto!' + foto.titulo);
      }
    },

    computed: {

      fotosComfiltro() {
        if (this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
            return this.fotoslist.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotoslist;
        }
      }
    }
  };
</script>

<style lang="scss">
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;

    &-item {
      display: inline-block;
    }
  }

  .filtro {
    font-family: Helvetica, sans-serif;
    display: block;
    width: 100%;
    padding: 20px 10px;
    font-size: 17px;
  }
</style>

<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent='gravaForm()'>
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" v-model.lazy="foto.titulo" autocomplete="off">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" v-model.lazy="foto.url" autocomplete="off">
        <transition name="fade">
          <imagem-responsiva v-if="foto.titulo && foto.url" :url="foto.url" :titulo="foto.titulo" />
        </transition>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" v-model="foto.descricao" autocomplete="off">
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>
    </form>

  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto'

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {

    return {
      foto: new Foto()
    }
  },

  methods: {

    gravaForm() {
      this.$http
        .post('http://localhost:3000/v1/fotos', this.foto)
        .then(() => this.foto = new Foto(), err => console.log(err));
    }
  }
}

</script>

<style scoped>
  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>
    
    <form @submit.prevent='gravaForm()'>
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input data-vv-as="título" v-validate="'required|min:3|max:30'" name="titulo" id="titulo" v-model="foto.titulo" autocomplete="off">
        <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input v-validate="'required|url'" name="url" id="url" v-model="foto.url" autocomplete="off">
          <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
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
        <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>
    </form>

  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';

// Importando classe Foto.
import Foto from '../../domain/foto/Foto'

// Importando classe FotoService.
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {

    return {

      foto: new Foto(),
      id: this.$route.params.id
    }
  },

  methods: {

    gravaForm() {
      
      this.$validator
      .validateAll()
        .then(sucess => {
          if(sucess) {
            this.service
              .cadastra(this.foto)
              .then(() => {
                    if (this.id) this.$router.push({ name: 'home' }); 
                    this.foto = new Foto()
                  }, err => console.log(err));

              // ** Adição utilizando http.
              // this.$http
              //   .post('v1/fotos', this.foto)
              //   .then(() => this.foto = new Foto(), err => console.log(err));
          }
        })
    }
  },

  created() {

    this.service = new FotoService(this.$resource); 

    if (this.id) {
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto);
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
  .erro {
    color: red;
  }
</style>

<template>
  <div>
    <img src="../../assets/logo.png" alt="">
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre por parte do titulo" />
    {{ filtro }}

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" :key='foto'>  
          <meu-painel :titulo="foto.titulo">
              <imagem-responsiva v-meu-transform:scale.animate="1.1" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
              
              <router-link :to="{ name: 'altera', params: { id: foto._id } }">
                <botao tipo="button" rotulo="Alterar"></botao>
              </router-link>
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
  
  // Importou  diretiva. Tem que adicionar na propriedade directives logo abaixo!
  import transform from '../../directives/Transform';

  // Importando classe FotoService.
  import FotoService from '../../domain/foto/FotoService';

  export default {

    components: {
      'meu-painel' : Painel,
      'imagem-responsiva' : ImagemResponsiva,
      'botao' : Botao 
    },

    directives: {
      'meu-transform': transform
    },

    data() {
      return {
        titulo: 'Alurapic',
        mensagem: '',
        filtro: '',
        fotoslist: []
      }
    },

    created() {
      this.service = new FotoService(this.$resource);

      this.service
          .lista()
          .then(fotos => this.fotoslist = fotos, err => this.mensagem = err.message) 

      // ** Requisição utilizando http.
      // this.$http.get('v1/fotos')
      //   .then(res => res.json())
      //   .then(fotos => this.fotoslist = fotos, err => console.log(err));
    },

    methods: {
      remove(foto) {

        this.service
          .apaga(foto._id)
          .then(() => {
              let indice = this.fotoslist.indexOf(foto);
              this.fotoslist.splice(indice, 1);
              this.mensagem = 'Foto removida com sucesso';
            }, err => this.mensagem = err.message)

        // ** Remoção utilizando http.
        //  this.$http
        //   .delete(`v1/fotos/${foto._id}`)
        //   .then(() => {
        //       let indice = this.fotoslist.indexOf(foto);
        //       this.fotoslist.splice(indice, 1);
        //       this.mensagem = 'Foto removida com sucesso';
        //     },
        //     err => {
        //       this.mensagem = "Não foi possível remover a foto";
        //       console.log(err);
        //     } 
        //   )
          
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

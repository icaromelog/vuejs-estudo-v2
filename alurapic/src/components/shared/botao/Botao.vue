<template>
    <button @click="disparaAcao()" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
    export default {
        props: {
            tipo: {
                required: true,
                type: String
            },

            rotulo: {
                required: true,
                type: String
            }, 

            confirmacao: Boolean,
            estilo: String
        },

        methods: {
            disparaAcao() {
                if (this.confirmacao) {
                    if (confirm('Confirma operação?')) {
                        this.$emit('botaoAtivado');                    
                    }
                    return;
                }

                this.$emit('botaoAtivado'); 
            }
        },

        computed: {
            estiloDoBotao() {
                if(this.estilo == 'padrao' || !this.estilo) return 'botao botao-padrao';
                if(this.estilo == 'perigo') return 'botao botao-perigo';                
            }
        }
    }
    
</script>

<style lang="sass" scoped>

    @import './Botao.scss';
    
</style>

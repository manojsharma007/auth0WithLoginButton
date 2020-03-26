<template>
    <div id="app">   
          <nav>
<router-link v-bind:to="'/'">Home</router-link> |
<router-link v-if="!this.$store.state.userIsAuthorized" v-bind:to="'/login'">Login</router-link> |
 <a v-on:click="logout" v-if="this.$store.state.userIsAuthorized" >Logout</a> | 
<router-link v-bind:to="'/secure'">Secure</router-link>


            
            </nav>
          <router-view></router-view>
    </div>
</template>

<script>



    export default {
        name: 'App',
         components: {
                   
        }, 
       
        data(){
            return{
               clientId:  process.env.VUE_APP_AUTHCONFIGDOMAIN
              
               
            }
        },
       
         
        methods:{
            logout: function () {
           this.$store.dispatch('authLogout');
    }
        }   
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>
<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Login</h2>
                       <button v-on:click="login" class="btn btn-primary">Login With Auth0</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'login',
   methods: {
            login(){
              this.$store.dispatch('authLogin');
            }
        }
}
</script>
<style scoped>
    .jumbotron {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    .form-group{
       margin: 15px 7px 13px 11px
    }
</style>
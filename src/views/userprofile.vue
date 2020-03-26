<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <h2>Profile Page</h2>
                      Welcome : {{$store.user.name}}
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'profile',

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
 
</style>
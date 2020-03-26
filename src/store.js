import Vue from 'vue'
import Vuex from 'vuex'
import auth0 from 'auth0-js'
import router from './router'
//import { addLocale } from 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userIsAuthorized:false,
        auth0: new auth0.WebAuth({
            domain: process.env.VUE_APP_AUTHCONFIGDOMAIN,
            clientID: process.env.VUE_APP_AUTHCONFIGCLIENTID,
            // make sure this line is contains the port: 8080
            redirectUri: process.env.VUE_APP_URL+'/callback',
            // we will use the api/v2/ to access the user information as payload
            audience: 'https://' + process.env.VUE_APP_AUTHCONFIGDOMAIN + '/api/v2/', 
            responseType: 'token id_token',
            scope: 'openid profile' // define the scopes you want to use
        }),   
    },
    mutations:{
        setUserIsAuthenticated(state,replacement){
            state.userIsAuthorized=replacement;
        }

    },
    actions:{
        authLogin(context){
           context.state.auth0.authorize();
        },
        auth0HandleAuthentication (context) {
            context.state.auth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify(
                  authResult.expiresIn * 1000 + new Date().getTime()
                )
                // save the tokens locally
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);  
                this.user = authResult.idTokenPayload
                router.replace('/profile');
              } 
              else if (err) {
                alert('login failed. Error #KJN838');
                router.replace('/login');
                console.log(err);
              }
            })
          },
          authLogout(context){
           
              localStorage.removeItem('access_token');
              localStorage.removeItem('id_token');
              localStorage.removeItem('expires_at');
        
              // redirect to auth0 logout to completely log the user out
              context.state.auth0.logout({
                returnTo: process.env.VUE_APP_URL+'/login', // Allowed logout URL listed in dashboard
                clientID: process.env.VUE_APP_AUTHCONFIGCLIENTID, // Your client ID
              })
          }
        
    }
})
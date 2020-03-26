import Vue from 'vue'
import Router from 'vue-router'
import Callback from './views/callback.vue'
import secure from './views/secure.vue'
import login from './views/login.vue'
import home from './views/home.vue'
import profile from './views/userprofile.vue'
import Store from './store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: {requiresAuth: true}
    },
    {
        path: '/secure',
        name: 'secure',
        component: secure,
        meta: {requiresAuth: true}
      },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
})
router.beforeEach( (to,from,next)=>{
  // Allow finishing callback url for logging in
  if(to.matched.some(record=>record.path == "/callback")){
   console.log("router.beforeEach found /callback url");
   Store.dispatch('auth0HandleAuthentication');
   next(false);
 }
 
  // check if user is logged in (start assuming the user is not logged in = false)
  let routerAuthCheck = false;  
  // Verify all the proper access variables are present for proper authorization
  if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at') ){
    console.log('found local storage tokens');
    // Check whether the current time is past the Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = new Date().getTime() < expiresAt;  
  }
 
   // set global ui understanding of authentication
   Store.commit('setUserIsAuthenticated', routerAuthCheck); 
 
   // check if the route to be accessed requires authorizaton
   if (to.matched.some(record => record.meta.requiresAuth)) {
     // Check if user is Authenticated
     if(routerAuthCheck){
       // user is Authenticated - allow access
       next();
     }
     else{
       // user is not authenticated - redirect to login
       router.replace('/login');
     }
     
   }
   // Allow page to load 
   else{
     next();
   }
 });

export default router
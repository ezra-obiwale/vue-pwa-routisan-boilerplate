// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../views/app'
import router from '../routes'
import VueCookie from 'vue-cookie'
import VueDoo from '@ezraobiwale/vue-doo'

Vue.config.productionTip = false;

Vue.use(VueDoo, {
  hello: {
    credentials: {
      facebook: process.env.FACEBOOK_ID,
      twitter: process.env.TWITTER_ID
    },
    options: {
      // oauth_proxy: process.env.OAUTH_PROXY
    }
  },
  http: {
    // axios configuration
    axios: {
      baseUrl: process.env.API_URL,
      headers: {
        Authorization: 'Bearer ' + VueCookie.get('uak'),
        Accept: 'application/json'
      }
    },
    catchAll(resp) {
      alert('catchAll');
      console.error(resp);
    }
  },
  // vuex-persistedstate configuration object
  store: {
    name: process.env.STORE_NAME
  }
});
Vue.use(VueCookie);

Vue.mixin({
  methods: {
    fullUrl(path) {
      return this.env('api_url') + path;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

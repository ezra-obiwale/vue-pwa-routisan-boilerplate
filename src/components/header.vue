<template>
  <div>
    <header class="site-header">
      <div class="top-bar">
        <div class="row">
          <div class="medium-12 columns">
            <!-- Desktop only-->
            <router-link to="/" class="site-home show-for-large top-bar-title" active-class="">
              <div class="">
                <img src="/static/img/global/logo.png" alt="">
              </div>
            </router-link>

            <!-- Tablet & Mobile only-->
            <router-link to="/" class="site-home top-bar-title hide-for-large" active-class="">
              <div class="">
                <img src="/static/img/global/logo.png" alt="">
              </div>
            </router-link>

            <div class="top-bar-left show-for-large">
              <ul class="menu">
                <li class="">
                  <form action="" class="search-in">
                    <div class="input-group">
                      <div class="auto-field-wrap">
                        <input placeholder="Try this... I want..." class="input-group-field" type="search">
                      </div>
                      <div class="input-group-button">
                        <input type="submit" class="button" value="🔍">
                      </div>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
            <div class="top-bar-right">
              <ul class="menu">
                <li class="hide-for-large"><a href="#search" class=""><i class="fa fa-search" aria-hidden="true"></i></a></li>
                <li class="ntags hide-for-large">
                  <a href="#menu">
                    <img src="/static/img/pages/tap.svg" alt="">
                    <span class="">...</span>
                  </a>
                </li>
                <li class="ntags show-for-large">
                  <router-link to="/ninjas">
                    <img src="/static/img/pages/ninja-in.svg" alt="">
                    <span class="hide-for-small-only">Ninjas</span>
                  </router-link>
                </li>
                <li class="ntags show-for-large">
                  <router-link to="/rome">
                    <img src="/static/img/pages/colosseum.svg" alt=""> <span class="hide-for-small-only">Rome</span>
                  </router-link>
                </li>
                <li class="njoin">
                  <router-link to="/login" class="button hide-for-large">
                    JOIN
                    <span class="below">Or Login</span>
                  </router-link>
                  <a href="#" @click.prevent="showLogin" class="button show-for-large">
                    JOIN
                    <span class="below">Or Login</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <login :show="login" @cancel="hideLogin" @loggedIn="hideLogin"></login>
  </div>
</template>

<script>
import Login from "../components/login";

export default {
  data() {
    return {
      login: false
    };
  },
  components: {
    Login
  },
  methods: {
    hideLogin() {
      this.login = false;
    },
    showLogin() {
      this.login = true;
    }
  }
};
</script>

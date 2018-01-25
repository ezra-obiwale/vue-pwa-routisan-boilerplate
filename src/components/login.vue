<template>
  <div ref="login" class="nlogin-wrapper pageslidin" :class="{eg: !show}">
		<div class="pageslidin-header clearfix">
			<a href="#!" class="pageslidin-back" @click.prevent="$emit('cancel')">
				<i class="fa fa-times-circle" aria-hidden="true"></i>
			</a>
		</div>
		<div class="pageslidin-content-wrapper">
			<div class="row small-collapse">
				<div class="small-12 medium-7 columns medium-centered large-5 large-centered">
					<div class="main-first-content">
						<div class="nlogin-main-container">
							<div class="nlogin-image">
								<img src="/static/img/pages/trading.svg" alt="">
							</div>
							<div class="nlogin-header-text">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam aliquid suscipit dolor illo id.
								Officiis, magni accusantium.
							</div>
							<div class="row nshare-wrapper-inner nlogin-share" v-show="!working">
								<div class="large-10 columns large-centered">
									<div>
										<a href="#" class="promote-list-item" @click.prevent="login('facebook')" >
											<div class="promote-list-img">
												<div class="promote-list-img-inner">
													<img src="/static/img/pages/facebook.svg" alt="">
												</div>
											</div>
											<div class="promote-list-content">
												<div class="promote-list-content-inner">
													<div class="content-title">Continue with facebook</div>
													<div class="content-text">We won't post anything without asking</div>
												</div>
											</div>
										</a>
									</div>
									<div>
										<a href="#" class="promote-list-item" @click.prevent="login('twitter')">
											<div class="promote-list-img">
												<div class="promote-list-img-inner">
													<img src="/static/img/pages/twitter.svg" alt="">
												</div>
											</div>
											<div class="promote-list-content">
												<div class="promote-list-content-inner">
													<div class="content-title">Continue with twitter</div>
													<div class="content-text">We won't post anything without asking</div>
												</div>
											</div>
										</a>
									</div>
									<div>
										<a href="#" class="promote-list-item" @click.prevent="login('linkedin')">
											<div class="promote-list-img">
												<div class="promote-list-img-inner">
													<img src="/static/img/pages/linkedin.svg" alt="">
												</div>
											</div>
											<div class="promote-list-content">
												<div class="promote-list-content-inner">
													<div class="content-title">Continue with linkedin</div>
													<div class="content-text">We won't post anything without asking</div>
												</div>
											</div>
										</a>
									</div>
									<div>
										<a href="#" class="promote-list-item" @click.prevent="login('reddit')" >
											<div class="promote-list-img">
												<div class="promote-list-img-inner">
													<img src="/static/img/pages/reddit.svg" alt="">
												</div>
											</div>
											<div class="promote-list-content">
												<div class="promote-list-content-inner">
													<div class="content-title">Continue with reddit</div>
													<div class="content-text ">We won't post anything without asking</div>
												</div>
											</div>
										</a>
									</div>
								</div>
							</div>
              <div class="text-center" v-show="working">
                <loading></loading>
                <p>Logging in with {{ working }}</p>
              </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loading from './loading';

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      working: null
    };
  },
  computed: {
    helloOptions() {
      return {
        twitter: {
          oauth_proxy: this.env("oauth_proxy") + "/twitter"
        }
      };
    }
  },
  components: {
    Loading
  },
  methods: {
    login(network) {
      this.working = network;
      this.hello(network).login(this.helloOptions[network]);
    }
  },
  mounted() {
    this.onHello(auth => {
      this.$http
        .post(this.env("api_url") + "/auth/" + auth.network, {
          token: auth.authResponse.access_token
        })
        .then(resp => {
          this.working = null;
          // save token to cookie
          this.$cookie.set("uak", resp.data.token, {
            expires: resp.data.expires + "s"
          });
          // save expiration date
          this.store("uake", resp.data.expires);
          this.$emit("loggedIn");
        })
        .catch(resp => {
          this.working = null;
        });
    });
  }
};
</script>

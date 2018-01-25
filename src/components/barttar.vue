<template>
  <div class="home-main-content-card">
    <div class="home-main-content-stats" v-if="canShowMore">
      <a href="#" class="home-main-content-stats-close" @click.prevent="cancelMore">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </a>
      <div class="home-main-content-stats-inner nshare-wrapper-inner nshare">
        <template v-if="share">
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="shareTo('facebook')">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/facebook.svg" alt="">
                </div>
              </div>
            </a>
          </div>
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="shareTo('twitter')">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/twitter.svg" alt="">
                </div>
              </div>
            </a>
          </div>
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="shareTo('linkedin')">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/linkedin.svg" alt="">
                </div>
              </div>
            </a>
          </div>
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="shareTo('reddit')">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/reddit.svg" alt="">
                </div>
              </div>
            </a>
          </div>
        </template>
        <template v-else-if="options">
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="showMore('stats')">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/bars-chart.svg" alt="">
                </div>
              </div>
            </a>
          </div>
          <div class="home-main-content-stats-item loadbtn-container">
            <a href="#" class="promote-list-item" @click.prevent="close">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/closed-3.svg" alt="">
                </div>
              </div>
            </a>
          </div>
          <div class="home-main-content-stats-item">
            <a href="#" class="promote-list-item" @click.prevent="expunge">
              <div class="promote-list-img">
                <div class="promote-list-img-inner">
                  <img src="/static/img/pages/delete.svg" alt="">
                </div>
              </div>
            </a>
          </div>
        </template>
        <template v-else-if="stats">
          <div class="home-main-content-stats-item">
            <div class="home-main-content-stats-number">20k</div>
            <div class="home-main-content-stats-title">Interested</div>
          </div>
          <div class="home-main-content-stats-item">
            <div class="home-main-content-stats-number">10k</div>
            <div class="home-main-content-stats-title">Taken</div>
          </div>
        </template>
        <template v-else-if="image">
          <div class="home-main-content-stats-item">
            <img src="/static/img/pages/dante.jpg" alt="">
          </div>
        </template>
      </div>
    </div>
    <div class="clearfix main-content-top">
      <div class="float-left">
        <a href="profile.html" class="main-content-top-img" :data-rep-placeholder-avatar="barttar.user.name" data-rep-background-uimage=""><div class="user-initials-wrapper js-user-initials-wrapper color-17"><div class="user-initials js-user-initials">{{ initials(barttar.user.name) }}</div></div></a>
        <div class="main-content-details">
          <a href="profile.html" class="main-content-user-name">
            <div>
              {{ barttar.user.name }}
            </div>
            <img v-if="userIsNinja(barttar.user)" src="/static/img/pages/boy.svg" alt="">
          </a>
          <!-- new section to include promoted tag-->
          <div class="sub-item main-content-h">
            <div class="main-content-handle">
              @{{ barttar.user.username }}
            </div>
            <div class="badge-cert">
              4.5
            </div>
          </div>
        </div>
      </div>
      <div class="float-right">
        <div class="main-content-time">{{ barttar.created_at }}</div>
      </div>
    </div>
    <div class="mb-10">
      <a href="#post" class="main-content-middle">
        <div v-if="barttar.description" v-html="barttar.description"></div>
        <template v-else>
          <div v-if="barttar.will"><strong>I will</strong> <span v-html="barttar.will"></span></div>
          <div v-if="barttar.want"><strong>I want</strong> <span v-html="barttar.want"></span></div>
        </template>
      </a>
      <div v-if="barttar.keywords" class="keywords-tag">
        <a v-for="keyword in keywords" href="#" class="tags">#{{ keyword }}</a>
      </div>
    </div>
    <div class="clearfix">
      <a href="#" class="main-loc-barter float-left">
        <span class="main-loc-barter-lo">
          <span v-if="barttar.city">{{ barttar.city }}</span>
          <span v-else-if="barttar.state">{{ barttar.state }}</span>
          <span v-if="canShowCountry(barttar)">, {{ barttar.country }}</span>
        </span>
      </a>
      <ul class="float-right main-cat-list">
        <li class="show-case"><a href="#">{{ barttar.category.name }}</a></li>
      </ul>
    </div>
    <div class="clearfix main-content-bottom">
      <div class="float-left" v-if="barttar.isOpen">
        <ul class="menu">
          <li>
            <a href="#" class="like-icon ntags" :data-id="barttar.id" @click.prevent="likeClicked">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"></path>
                <path class="lt" d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1
                  c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"></path>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
              </svg>
              <span v-if="barttar.likes">{{ barttar.likes }}</span>
            </a>
          </li>
          <li>
            <router-link :to="`/messages/barttar/${barttar.id}`" class="msg-btn ntags">
              <img src="/static/img/pages/mail-1.svg" alt="">
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="showMore('share')" :data-id="barttar.id" class="share-btn ntags">
              <img src="/static/img/pages/share.svg" alt="">
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="showMore('options')" :data-id="barttar.id" class="more-btn ntags">
              <img src="/static/img/pages/tap.svg" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="float-right">
        <div class="tag-status" :class="{open: barttar.isOpen, closed: !barttar.isOpen}">
          {{ barttar.isOpen ? 'Active' : 'Closed' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barttar: Object
  },
  data(){
    return {
      more: ''
    };
  },
  computed: {
    canShowMore() {
      return this.more !== '';
    },
    share() {
      return this.more == 'share';
    },
    options() {
      return this.more == 'options';
    },
    image() {
      return this.more == 'image';
    },
    stats() {
      return this.more == 'stats';
    },
  },
  methods: {
    cancelMore() {
      this.more = '';
    },
    canShowCountry(barttar){
      return (barttar.city && barttar.city != 'anywhere')
        || (barttar.state && barttar.state != 'anywhere');
    },
    close() {
      this.$http.get(this.fullUrl('/barttars/' + this.barttar.id + '/close'))
        .then(resp => {
          this.barttar.isOpen = false;
        });
    },
    expunge() {
      this.$http.delete(this.fullUrl('/barttars/' + this.barttar.id))
        .then(resp => {
          this.barttar.likes = resp.likes;
        });
    },
    initials(name) {
      let parts = name.split(' '),
        initial = "";
      parts.forEach(part => {
        initial += part[0].toUpperCase();
      });
      return initial;
    },
    likeClicked() {
      this.$http.get(this.fullUrl('/barttars/' + this.barttar.id + '/like'))
        .then(resp => {
          this.barttar.likes = resp.likes;
        });
    },
    shareTo(which) {
      console.debug('sharing to:', which);
    },
    showMore(which) {
      this.more = which;
    },
    userIsNinja(user) {
      return user.roles.findIndex(role => role.name == 'ninja') != -1;
    }
  }
}
</script>

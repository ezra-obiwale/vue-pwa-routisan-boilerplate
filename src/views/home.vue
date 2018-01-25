<template>
  <div>
    <app-header></app-header>

    <div class="home-wrapper mobile">
      <div class="row">
        <div class="medium-11 columns medium-centered large-8 large-centered">
          <div class="home-top-section">
            <div class="home-header headline letters type" data-rep-text-changer="">
              <span>Freelance barttar for </span>
              <span class="words-wrapper waiting">
                <b class="is-hidden" style="opacity: 1;"><i class="out">l</i><i class="out">e</i><i class="out">a</i><i class="out">n</i><i class="out"> </i><i class="out">e</i><i class="out">n</i><i class="out">t</i><i class="out">r</i><i class="out">e</i><i class="out">p</i><i class="out">r</i><i class="out">e</i><i class="out">n</i><i class="out">e</i><i class="out">u</i><i class="out">r</i><i class="out">s</i><i class="out">.</i></b>
                <b style="opacity: 1;" class="is-visible"><i class="in">s</i><i class="in">t</i><i class="in">a</i><i class="in">r</i><i class="in">t</i><i class="in">u</i><i class="in">p</i><i class="in">s</i><i class="in">.</i></b>
                <b style="opacity: 1;" class="is-hidden"><i class="out">i</i><i class="out">n</i><i class="out">v</i><i class="out">e</i><i class="out">s</i><i class="out">t</i><i class="out">o</i><i class="out">r</i><i class="out">s</i><i class="out">.</i></b>
                <b style="opacity: 1;" class="is-hidden"><i class="out">c</i><i class="out">o</i><i class="out">m</i><i class="out">p</i><i class="out">a</i><i class="out">n</i><i class="out">i</i><i class="out">e</i><i class="out">s</i><i class="out">.</i></b>
                <b style="opacity: 1;" class="is-hidden"><i class="out">y</i><i class="out">o</i><i class="out">u</i><i class="out">.</i></b>
              </span>
            </div>
            <p class="home-content">I've got 2hrs of coding to give, i need someone to help with painting my walls for 2hrs.</p>
            <a href="#" @click.prevent="createBarttar" class="button small createbtn hide-for-small-only">Create Barttar</a>
            <a href="#" @click.prevent="createBarttar" class="button tiny show-for-small-only createbtn">Create Barttar</a>
          </div>
        </div>
      </div>

      <div class="main-content-wrapper">
        <div class="row" :class="{ hide: !barttars.length }">
          <div class="grid" style="position: relative; height: 1060px;">
            <div class="grid-sizer"></div>
            <div class="grid-item" v-for="barttar in barttars" :key="barttar.id" style="position: absolute; left: 50%; top: 530px;">
              <barttar :barttar.sync="barttar"></barttar>
            </div>
          </div>
        </div>
        <div class="row empty-state-wrapper" :class="{hide: barttars.length}">
          <div class="medium-12 text-center">
            <div class="empty-state" v-show="!loading">
              No barttar currently available
            </div>
          </div>
        </div>
        <page-data @data-loaded="gotData" path="/barttars"></page-data>
      </div>
    </div>

  </div>
</template>

<script>
import AppHeader from "../components/header";
import Barttar from "../components/barttar";
import PageData from "../components/page-data";

export default {
  data() {
    return {
      loading: true,
      barttars: [],
      mansory: null,
      login: false
    };
  },
  components: {
    AppHeader,
    Barttar,
    PageData
  },
  methods: {
    createBarttar() {
      // check auth
      // if logged in, go to create barttar page
      // if not, show login modal
    },
    gotData(data) {
      this.set("barttars", this.barttars.concat(data), this);
      this.setupMasonry();
    },
    setupMasonry() {
      // if (this.mansory) {
      //   this.mansory.destroy();
      // }
      imagesLoaded(".grid", () => {
        // activate mansonry grid
        this.mansory = new Masonry(".grid", {
          columnWidth: ".grid-sizer",
          itemSelector: ".grid-item",
          percentPosition: true
        });
      });
    }
  }
};
</script>
<style scoped></style>

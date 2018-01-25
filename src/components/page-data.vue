<template>
  <div class="text-center">
    <button v-show="canLoadMore" class="button small" @click="loadMore">Load More</button>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import Loading from './loading';
export default {
  props: {
    path: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      loading: false,
      meta: {},
    };
  },
  computed: {
    canLoadMore() {
      return !this.loading && this.deepValue('pagination.next_page_url', this.meta, false);
    }
  },
  components: {
    Loading
  },
  methods: {
    loadMore() {
      this.load(this.meta.pagination.next_page_url);
    },
    load(url) {
      this.loading = true;
      this.$http.get(url)
        .then(resp => {
          this.loading = false;
          this.set('meta', resp.meta, this);

          this.$emit('data-loaded', resp.data);
        });
    }
  },
  mounted() {
    this.load(this.fullUrl(this.path));
  }
}
</script>

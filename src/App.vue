<template>
  <div id="app">
    <h1>Public APIs</h1>
    <SearchForm
      :categories="categories"
      :search="search"
      :category="category"
      @update:search="setSearch"
      @update:category="setCategory"
    />
    <ApiTable :apis="paginatedData" />
    <Pagination
      :page="page"
      :pageCount="pageCount"
      @prev-page="prevPage"
      @next-page="nextPage"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import ApiTable from "./components/ApiTable.vue";
import SearchForm from "./components/SearchForm.vue";
import Pagination from "./components/PaginationComponent.vue";

export default {
  name: "app",
  components: {
    ApiTable,
    SearchForm,
    Pagination,
  },
  computed: {
    ...mapState(["search", "category", "page", "perPage", "categories"]),
    ...mapGetters(["paginatedData", "pageCount"]),
  },
  methods: {
    ...mapMutations(["setSearch", "setCategory", "setPage"]),
    prevPage() {
      if (this.page > 1) {
        this.setPage(this.page - 1);
      }
    },
    nextPage() {
      if (this.page < this.pageCount) {
        this.setPage(this.page + 1);
      }
    },
  },
  created() {
    this.$store.dispatch("getApis");
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}
</style>

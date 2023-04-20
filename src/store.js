import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    search: "",
    category: "",
    page: 1,
    perPage: 10,
    apis: [],
    categories: [],
  },
  getters: {
    filteredData(state) {
      return state.apis.filter((api) => {
        return (
          api.API.toLowerCase().includes(state.search.toLowerCase()) &&
          (state.category === "" || api.Category === state.category)
        );
      });
    },
    pageCount(state, getters) {
      return Math.ceil(getters.filteredData.length / state.perPage);
    },
    paginatedData(state, getters) {
      const start = (state.page - 1) * state.perPage;
      const end = start + state.perPage;
      return getters.filteredData.slice(start, end);
    },
  },
  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
    setCategory(state, category) {
      state.category = category;
    },
    setPage(state, page) {
      state.page = page;
    },
    setApis(state, apis) {
      state.apis = apis;
      state.categories = [...new Set(apis.map((api) => api.Category))];
    },
  },
  actions: {
    getApis(context) {
      axios.get("https://api.publicapis.org/entries").then((response) => {
        context.commit("setApis", response.data.entries);
      });
    },
  },
});

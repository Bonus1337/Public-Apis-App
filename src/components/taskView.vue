<template>
  <div id="app">
    <h1>Public APIs</h1>
    <input type="text" v-model="search" placeholder="Search by title" />
    <select v-model="category">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <table>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
        <th>Link</th>
      </tr>
      <tr v-for="api in paginatedData" :key="api.Link">
        <td>{{ api.API }}</td>
        <td>{{ api.Description }}</td>
        <td>{{ api.Category }}</td>
        <td>
          <a :href="api.Link">{{ api.Link }}</a>
        </td>
      </tr>
    </table>
    <button @click="page--" :disabled="page == 1">Prev</button>
    Page {{ page }} of {{ pageCount }}
    <button @click="page++" :disabled="page == pageCount">Next</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      search: "",
      category: "",
      page: 1,
      perPage: 10,
      apis: [],
      categories: [],
    };
  },
  computed: {
    filteredData() {
      return this.apis.filter((api) => {
        return (
          api.API.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.category === "" || api.Category === this.category)
        );
      });
    },
    pageCount() {
      return Math.ceil(this.filteredData.length / this.perPage);
    },
    paginatedData() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    },
  },
  methods: {
    getApis() {
      axios.get("https://api.publicapis.org/entries").then((response) => {
        this.apis = response.data.entries;
        this.categories = [...new Set(this.apis.map((api) => api.Category))];
      });
    },
  },
  created() {
    this.getApis();
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@media screen and (min-width: 600px) {
  table,
  input[type="text"],
  select,
  button {
    width: auto;
  }
}
</style>

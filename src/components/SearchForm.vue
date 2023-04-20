<template>
  <div class="search-form">
    <input
      type="text"
      v-model="search"
      placeholder="Search by title"
      @input="setSearch($event.target.value)"
    />
    <select v-model="category" @change="setCategory($event.target.value)">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "SearchForm",
  computed: {
    ...mapState(["search", "category", "categories"]),
  },
  methods: {
    ...mapMutations(["setSearch", "setCategory"]),
  },
};
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-form > * {
  margin: 0 10px;
}

input[type="text"],
select {
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>

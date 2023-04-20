<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="page == 1">Prev</button>
    Page {{ page }} of {{ pageCount }}
    <button @click="nextPage" :disabled="page == pageCount">Next</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "PaginationComponent",
  computed: {
    ...mapState(["page"]),
    ...mapGetters(["pageCount"]),
  },
  methods: {
    ...mapMutations(["setPage"]),
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
};
</script>

<style scoped>
.pagination {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

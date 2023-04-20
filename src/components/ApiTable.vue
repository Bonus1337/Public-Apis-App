<template>
  <table>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Category</th>
      <th>Link</th>
    </tr>
    <tr v-for="api in apis" :key="api.Link">
      <td>{{ api.API }}</td>
      <td>{{ api.Description }}</td>
      <td>{{ api.Category }}</td>
      <td>
        <a :href="api.Link">{{ api.Link }}</a>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "ApiTable",
  props: {
    apis: Array,
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
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
  background-color: #4caf50;
  color: white;
}

@media screen and (max-width: 600px) {
  table {
    width: 100%;
  }
}
</style>

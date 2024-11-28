<script lang="ts" setup>
import { computed, ref } from "vue"
import { useProductStore } from "../stores/product"

type ProductKey = 'id' | 'name' | 'quantity';
const store = useProductStore()

const sortKey = ref<string | null>(null)
const sortOrder = ref<"asc" | "desc" | null>(null)

const sortedProducts = computed(() => {
  const products = [...store.products]
  if (!sortKey.value) return products

  const key = sortKey.value as ProductKey;
  return products.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA < valB) return sortOrder.value === "asc" ? -1 : 1
    if (valA > valB) return sortOrder.value === "asc" ? 1 : -1
    return 0
  })
})

const totalQuantity = computed(() =>
  store.products.reduce((sum, product) => sum + product.quantity, 0)
)

const toggleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : null
    if (!sortOrder.value) sortKey.value = null
  } else {
    sortKey.value = key
    sortOrder.value = "asc"
  }
}

const onDelete = (id: number) => {
  store.deleteProduct(id)
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th align="left">       
            <button
              @click="toggleSort('name')"
              class="sort-button"
              :class="{ active: sortKey === 'name' }">
              Nazwa produktu
              <img
                v-show="(sortKey === 'name' && sortOrder === 'desc') || sortKey !== 'name'"
                src="../assets/chevron_down.svg"
                alt="Sort descending icon" />
              <img
                v-show="sortKey === 'name' && sortOrder === 'asc'"
                src="../assets/chevron_up.svg"
                alt="Sort ascending icon" />
            </button>
          </th>
          <th width="15%" align="right">
            <button
              @click="toggleSort('quantity')"
              class="sort-button"
              :class="{ active: sortKey === 'quantity' }">
              Ilość
              <img
                v-show="(sortKey === 'quantity' && sortOrder === 'desc') || sortKey !== 'quantity'"
                src="../assets/chevron_down.svg"
                alt="Sort descending icon" />
              <img
                v-show="sortKey === 'quantity' && sortOrder === 'asc'"
                src="../assets/chevron_up.svg"
                alt="Sort ascending icon" />
            </button>
          </th>
          <th width="15%" align="center">Akcje</th>
        </tr>
      </thead>

      <tr v-if="!store.products.length">
        <td colspan="3" align="center">Brak danych</td>
      </tr>
      <tbody v-else>
        <tr v-for="product in sortedProducts" :key="product.id">
          <td colspan="1">{{ product.name }}</td>
          <td colspan="1" align="right">{{ product.quantity }}</td>
          <td colspan="1" align="center">
            <button  @click="onDelete(product.id)" >
              <img src="../assets/edit.svg" alt="Edit icon" />
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="1" align="right">Suma</td>
          <td colspan="1" align="right">{{ totalQuantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
}
table {
  width: 100%;
  max-width: 60rem;
  margin-top: 2rem;
  border-collapse: collapse;
  font-family: inherit;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid red;
}
th {
  font-size: 1rem;
  font-weight: 500;
  background-color: #f6f6f6;
}
td {
  border: 1px solid red;
}

button {
  display: flex;
  align-items: center;
    font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.sort-button img {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sort-button:hover img {
  opacity: 0.5;
}

.sort-button.active img {
  opacity: 1;
}
</style>

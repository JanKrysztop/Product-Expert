<script lang="ts" setup>
import { computed, ref } from "vue"
import { useProductStore } from "../stores/product"
import type { Product } from "../types/product"
import Modal from "./EditModal.vue"

type ProductKey = "id" | "name" | "quantity"
const store = useProductStore()

const sortKey = ref<string | null>(null)
const sortOrder = ref<"asc" | "desc" | null>(null)
const isModalVisible = ref(false)
const currentProduct = ref<Product | null>(null)

const sortedProducts = computed(() => {
  const products = [...store.products]
  if (!sortKey.value) return products

  const key = sortKey.value as ProductKey
  return products.sort((a, b) => {
    const valA = a[key]
    const valB = b[key]

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
    if (key === "name") {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : sortOrder.value === "desc" ? null : "asc"
    } else if (key === "quantity") {
      sortOrder.value = sortOrder.value === "desc" ? "asc" : sortOrder.value === "asc" ? null : "desc"
    }

    if (!sortOrder.value) {
      sortKey.value = null
    }
  } else {
    sortKey.value = key
    sortOrder.value = key === "quantity" ? "desc" : "asc"
  }
}

const openEditModal = (product: Product) => {
  currentProduct.value = { ...product }
  isModalVisible.value = true
}

const saveChanges = (updatedProduct: Product) => {
  if (updatedProduct.id != null) {
    store.updateProduct(updatedProduct.id, updatedProduct)
  }
  isModalVisible.value = false
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
              :class="{ active: sortKey === 'name' }"
              aria-label="Name Sort"
              >
              Nazwa produktu
              <img
                v-show="
                  (sortKey === 'name' && sortOrder === 'desc') ||
                  sortKey !== 'name'
                "
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
              :class="{ active: sortKey === 'quantity' }"
              aria-label="Quantity Sort"
              >
              Ilość
              <img
                v-show="
                  (sortKey === 'quantity' && sortOrder === 'desc') ||
                  sortKey !== 'quantity'
                "
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
            <button class="edit-btn" @click="openEditModal(product)" aria-label="Open Edit">
              <svg alt="Edit icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z"/></svg>
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="1" align="right">Suma</td>
          <td colspan="1" align="right">{{ totalQuantity }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :title="'Edycja Produktu'"
      :initialFormData="currentProduct"
      @close="isModalVisible = false"
      @save="saveChanges" />
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
  margin-bottom: 2rem;
  border-collapse: collapse;
  font-family: inherit;
}

th,
td {
  padding: 0.75rem;
  border: 2px solid #ebebeb;
}
th {
  font-size: 1rem;
  font-weight: 500;
  background-color: #ebebeb;
}
td {
  border: 2px solid #ebebeb;
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

.edit-btn svg:hover {
  fill: #000;
}
</style>

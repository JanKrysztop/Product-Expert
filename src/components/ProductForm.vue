<script setup lang="ts">
import { computed, ref } from "vue"
import { useProductStore } from "../stores/product"

const productStore = useProductStore()

const productName = ref<string>("")
const quantity = ref<number | null>(null)

const isFormValid = computed(
  () => !!productName.value && quantity.value !== null
)

const onSubmit = () => {
  if (!isFormValid.value) {
    console.error("Form is invalid. Please fill in all fields.")
    return
  }

  productStore.addProduct({
    name: productName.value,
    quantity: quantity.value!,
  })

  console.log("New product added", {
    name: productName.value,
    quantity: quantity.value,
  })

  productName.value = ""
  quantity.value = null
}
</script>

<template>
  <div class="form-wrapper">
    <div class="header-container">
      <h2>Dodawanie produktu</h2>
      <h1><span>product</span> expert <img class="logo" src="/logo.svg" /></h1>
    </div>
    <form @submit.prevent="onSubmit" class="product-form">
      <div class="form-group">
        <label for="productName">Nazwa produktu</label>
        <input
          id="productName"
          v-model="productName"
          type="text"
          required
          placeholder="Podaj nazwę produktu" />
      </div>
      <div class="form-group">
        <label for="quantity">Ilość</label>
        <input
          id="quantity"
          v-model="quantity"
          type="number"
          required
          min="1"
          placeholder="Podaj ilość" />
      </div>
      <button type="submit" aria-label="Submit">
        <img class="add-icon" src="../assets/add_box.svg" alt="Add icon" />Dodaj
        nowy produkt
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 100%;
  padding: 1rem;
  color: #fff;
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.product-form {
  display: flex;
  gap: 3rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  color: #000;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
}

button {
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 2.75rem;
  padding: 0.5rem 1.25rem;
  color: #000;
  background-color: #fff200;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
}

button:hover {
  background-color: #fff87f;
}

.add-icon {
  padding-right: 0.5rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h1 {
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  color: #fff200;
}

.logo {
  width: 40px;
  height: 40px;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}

@media (max-width: 768px) {
  .product-form {
    gap: 1rem;
    flex-direction: column;
    width: 100%;
  }

  .form-group {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  button {
    width: 100%;
    margin-top: 2rem;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }

  .logo {
    width: 20px;
    height: 20px;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-self: flex-end;
    order: -1;
  }
}
</style>

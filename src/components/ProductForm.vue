<script setup lang="ts">
import { computed, ref } from "vue"
import { useProductStore } from "../stores/product";

const productStore = useProductStore()

const productName = ref<string>("")
const quantity = ref<number | null>(null)

const isFormValid = computed(
  () => !!productName.value && quantity.value !== null
)

const onSubmit = () => {
  if (!isFormValid.value) {
    console.error("Form is invalid. Please fill in all fields.");
    return;
  }

  productStore.addProduct({
    name: productName.value,
    quantity: quantity.value!,
  });

  console.log("New product added", {
    name: productName.value,
    quantity: quantity.value,
  });

  productName.value = "";
  quantity.value = null;
};


</script>

<template>
  <div class="form-wrapper">
    <h2>Dodawanie produktu</h2>
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
      <button type="submit" :disabled="!isFormValid"> <img style="padding-right: 0.5rem;" src="../assets/add_box.svg" alt="Add icon" />Dodaj nowy produkt</button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 100%;
  padding: 1rem;
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
  color: #fff;
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
  font-size: 1rem;
  color: #000;
  background-color: #fff200;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
}

button:hover {
  background-color: #fff87f;
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
}
</style>

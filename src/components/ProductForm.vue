<script setup lang="ts">
import { ref } from "vue";

const productName = ref<string>("");
const quantity = ref<number | null>(null);
</script>

<template>
  <div class="form-wrapper">
    <h2>Dodawanie produktu</h2>
    <form class="product-form">
      <div class="form-group">
        <label for="productName">Nazwa produktu</label>
        <input
          id="productName"
          v-model="productName"
          type="text"
          required
          placeholder="Podaj nazwę produktu"
        />
      </div>
      <div class="form-group">
        <label for="quantity">Ilość</label>
        <input
          id="quantity"
          v-model="quantity"
          type="number"
          required
          min="1"
          placeholder="Podaj ilość"
        />
      </div>
      <button type="submit">Dodaj nowy produkt</button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  padding: 1rem;
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
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
  font-weight: 600;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  color: #000;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  outline: none;
}

button {
    min-width: 200px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #000;
  background-color: #fff200;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
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

  input{
    width: 100%;
    box-sizing: border-box
  }

  button {
    width: 100%;
  }
}



</style>
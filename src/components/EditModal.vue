<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"
import type { Product, ModalProps } from "../types/product"
import { useProductStore } from "../stores/product"

const props = defineProps<ModalProps>()
const store = useProductStore()

const emit = defineEmits(["close", "save"])
const formData = ref<Product>({
  id: props.initialFormData?.id ?? 0,
  name: props.initialFormData?.name ?? "",
  quantity: props.initialFormData?.quantity ?? 0,
})

const closeModal = () => {
  emit("close")
}

const onDelete = (id: number) => {
  store.deleteProduct(id)
  emit("close")
}

const handleSubmit = () => {
  emit("save", formData.value)
  closeModal()
}
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">
        <img src="../assets/close.svg" alt="Close icon" />
      </button>
      <h2 class="modal-header">{{ title }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="modal-body">
          <div class="form-group">
            <label for="productName">Nazwa produktu</label>
            <input
              id="productName"
              v-model="formData.name"
              type="text"
              required
              placeholder="Podaj nazwę produktu" />
          </div>
          <div class="form-group">
            <label for="quantity">Ilość</label>
            <input
              id="quantity"
              v-model.number="formData.quantity"
              type="number"
              required
              min="1"
              placeholder="Podaj ilość" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn delete"
            @click="onDelete(formData.id)">
            <svg
              class="del-icon"
              alt="Delete Icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000">
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
            Usuń produkt
          </button>
          <button type="submit" class="btn save">
            <img src="../assets/pencil.svg" alt="Edit icon" />
            Aplikuj zmiany
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  width: 700px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #ebebeb;
}

.modal-header {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.modal-body {
  display: flex;
  gap: 3rem;
}

.modal-footer {
  margin-top: 2rem;
  padding: 1.5rem;
  display: flex;
  justify-content: end;
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
  border: 2px solid #ebebeb;
  border-radius: 4px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 2.75rem;
  padding: 0.5rem 1.25rem;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
}

.btn.delete {
  background: #fff;
  border: 2px solid #000;
  color: #000;
  margin-right: 2rem;
}

.btn.delete:hover {
  background: #000;
  border: 2px solid #000;
  color: #fff;
}

.btn.save {
  background-color: #fff200;
  color: #000;
}

.btn.save:hover {
  background-color: #fff87f;
}

.del-icon {
  padding-right: 0.5rem;
}

.btn.delete:hover .del-icon:first-of-type {
  fill: #fff;
}

@media (max-width: 768px) {
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .btn {
    width: 100%;
    margin-top: 1rem;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    box-sizing: border-box;
    padding: 0;
  }

  .del-icon {
    width: 20px;
    height: 20px;
  }

  .btn.save {
    margin-top: 1rem;
    order: -1;
  }
}
</style>

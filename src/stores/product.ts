import { defineStore } from "pinia"
import { Product } from "../types/product"

export const useProductStore = defineStore("productStore", {
  state: (): { products: Product[] } => ({
    products: [],
  }),
  actions: {
    addProduct(product: Omit<Product, 'id'>) {
      this.products.push({ ...product, id: Date.now() })
    },
    deleteProduct(id: number) {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
      } else {
        console.error(`Product with id ${id} not found.`)
      }
    },
    updateProduct(id: number, updatedProduct: Product) {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id }
      } else {
        console.error(`Product with id ${id} not found.`)
      }
    },
  },
})

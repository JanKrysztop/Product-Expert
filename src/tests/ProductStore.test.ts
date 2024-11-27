import { describe, it, expect, beforeEach, vi } from "vitest"
import { useProductStore } from "../stores/product"
import { createPinia, setActivePinia } from "pinia"

describe("Product Store", () => {
  setActivePinia(createPinia())
  const store = useProductStore()

  beforeEach(() => {
    store.$reset()
  })

  it("adds a product correctly", () => {
    store.addProduct({ name: "Test product", quantity: 123 })
    expect(store.products).toHaveLength(1)
    expect(store.products[0]).toMatchObject({
      name: "Test product",
      quantity: 123,
    })
  })

  it("deletes a product correctly", () => {
    store.addProduct({ name: "Product 1", quantity: 1 })
    store.addProduct({ name: "Product 2", quantity: 2 })
    const idToDelete = store.products[0].id

    store.deleteProduct(idToDelete)

    expect(store.products).toHaveLength(1)
    expect(store.products[0].name).toBe("Product 2")
  })

  it("handles non existent product deletion", () => {
    console.error = vi.fn()
    store.deleteProduct(123)
    expect(console.error).toHaveBeenCalledWith("Product with id 123 not found.")
  })

  it("updates a product correctly", () => {
    store.addProduct({ name: "Original Product", quantity: 123 })
    const idToUpdate = store.products[0].id

    store.updateProduct(idToUpdate, {
      name: "Updated Product",
      quantity: 321,
      id: idToUpdate,
    })

    expect(store.products[0]).toMatchObject({
      name: "Updated Product",
      quantity: 321,
    })
  })
  it("handles non existent product deletion", () => {
    console.error = vi.fn()
    store.updateProduct(123, {
      name: "Non-existent Product",
      quantity: 50,
      id: 123,
    })
    expect(console.error).toHaveBeenCalledWith("Product with id 123 not found.")
  })
})

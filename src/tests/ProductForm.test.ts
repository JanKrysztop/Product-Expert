import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import ProductForm from "../components/ProductForm.vue" // Adjust the path as needed
import { useProductStore } from "../stores/product"
import { createPinia, setActivePinia } from "pinia"


describe("ProductForm", () => {
    setActivePinia(createPinia())
    const store = useProductStore()
    
    
    beforeEach(() => {
    store.$reset()
    vi.spyOn(store, 'addProduct')
  })

  it("renders the form correctly", () => {
    const wrapper = mount(ProductForm)
    expect(wrapper.find("form").exists()).toBe(true)
    expect(wrapper.find("input#productName").exists()).toBe(true)
    expect(wrapper.find("input#quantity").exists()).toBe(true)
  })

  it("does not submit the form if fields are invalid", async () => {
    const wrapper = mount(ProductForm)
    await wrapper.find("form").trigger("submit");

    expect(store.addProduct).not.toHaveBeenCalled()
  })

  it("submits the form correctly when fields are valid", async () => {
    const wrapper = mount(ProductForm)
    wrapper.get("input#productName").setValue("Test product")
    wrapper.get("input#quantity").setValue(123)

    await wrapper.find("form").trigger("submit");

    expect(store.addProduct).toHaveBeenCalledWith({
        name: "Test product",
        quantity: 123,
      });  

  })

  it("resets the form fields after a successful submission", async () => {
    const wrapper = mount(ProductForm);
  
    await wrapper.get("input#productName").setValue("Test product");
    await wrapper.get("input#quantity").setValue(123);
  
    await wrapper.find("form").trigger("submit");
  
    expect(wrapper.get("input#productName").element.value).toBe(""); 
    expect(wrapper.get("input#quantity").element.value).toBe("");    
  });
})

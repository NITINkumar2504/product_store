import { create } from "zustand";

const useProductStore = create((set) => ({     // implicit return (object)
    products: [],   // initial value (empty array)
    setProducts: (products) => set({products}),
    createProduct : async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success : false, message : "Please fill all details."}
        }

        const res = await fetch("/api/products", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newProduct) 
        })

        const data = await res.json()
        set((state) => ({products : [...state.products, data.data]}))
        
        return {success : data.success, message : data.message}
    },

    fetchProducts : async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({ products : data.data })
    },
    
    deleteProduct : async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method : 'DELETE',
        })

        const data = await res.json()

        if(!data.success) return {success : data.success, message : data.message}

        // update ui immediately, without reloading site
        // Components that call useProductStore subscribe to the store slice; when set updates products, those components re-render automatically
        set(state => ({products : state.products.filter(product => product._id !== pid)}))

        return {success : data.success, message : data.message}
    },

    updateProduct : async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedProduct)
        })

        const data = await res.json()

        if(!data.success) return {success : data.success, message : data.message}

        set(state => ({products : state.products.map(product => product._id === pid ? data.data : product)}))
        
        return {success : data.success, message : data.message}
    }
}))

export {useProductStore}
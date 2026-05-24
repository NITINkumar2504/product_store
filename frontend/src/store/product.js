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
    }
}))

export {useProductStore}
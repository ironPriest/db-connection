type ProductType = {
    id: number
    title: string
}

const products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProducts(title: string | null | undefined): ProductType[] {
        if (title) {
            let filteredProducts = products.filter(p => p.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },
    findProductById(id: number): ProductType | null {
        let product = products.find(p => p.id === id)
        if (product) {
            return product
        } else {
            return null
        }
    },
    createProduct(title: string): ProductType {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, title: string): boolean {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: number): boolean {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}

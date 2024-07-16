import axios from 'axios';

const baseUrl = 'https://sprint-mission-api.vercel.app/products';

// Get products
export async function getProductList(page=1, pageSize=100, keyword) {
    try {
        const response = await axios.get(baseUrl, {
            params: { page, pageSize, keyword }
        });
        console.log(response.data);
    }catch(error) {
        console.error('Get ProductList Error',error);
    }
}

// Get a product
export async function getProduct(id) {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        console.log(response.data);
    }catch(error) {
        console.error('Get Product Error', error);
    }
}

// Post a product
export async function postProduct(name,  description, price, tags, images) {
    try {
        const response = await axios.post(baseUrl, {
            name,
            description,
            price,
            tags,
            images
        });
        console.log(response.data);
    }catch(error) {
        console.error('Post Product Error', error);
    }
}

// PATCH 메서드를 사용하여 제품 수정하기
export async function patchProduct(id, updates) {
    try {
        const response = await axios.patch(`${baseUrl}/${id}`, updates);
        console.log(response.data);
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

// DELETE 메서드를 사용하여 제품 삭제하기
export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
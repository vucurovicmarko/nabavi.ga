import axios from 'axios';

class ProductService {
    query() {
        return axios.get('products');
    }

    get(category_slug, product_slug) {
        return axios.get(`products/${category_slug}/${product_slug}`);
    }
}

export default new ProductService();

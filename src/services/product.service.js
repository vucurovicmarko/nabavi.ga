import axios from 'axios';

class ProductService {
    query() {
        return axios.get('products');
    }
}

export default new ProductService();

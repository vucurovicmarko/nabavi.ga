import axios from 'axios';

class CategoryService {
    query() {
        return axios.get('categories');
    }

    get(category_slug) {
        return axios.get(`products/${category_slug}`);
    }
}

export default new CategoryService();

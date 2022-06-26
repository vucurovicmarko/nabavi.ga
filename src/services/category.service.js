import axios from 'axios';

class CategoryService {
    query() {
        return axios.get('categories');
    }
}

export default new CategoryService();

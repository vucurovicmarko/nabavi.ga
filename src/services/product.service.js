import axios from "axios";

class ProductService {
  query() {
    return axios.get("products/");
  }

  get(category_slug, product_slug) {
    return axios.get(`products/${category_slug}/${product_slug}/`);
  }

  search(query) {
    return axios.post("products/search/", query);
  }
}

export default new ProductService();

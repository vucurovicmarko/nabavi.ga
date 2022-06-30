import axios from "axios";

class ProductService {
  query() {
    return axios.get("products/");
  }

  get(category_slug, product_slug) {
    return axios.get(`products/${category_slug}/${product_slug}/`);
  }

  search(data) {
    return axios.post("products/search/", data);
  }
}

export default new ProductService();

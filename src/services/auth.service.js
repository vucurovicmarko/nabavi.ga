import axios from "axios";

class AuthService {
  register(data) {
    return axios.post("users/", data);
  }
}

export default new AuthService();

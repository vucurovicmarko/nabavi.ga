export default class Errors {
  constructor() {
    this.errors = {};
  }

  set(errors) {
    this.errors = errors;
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }

    return null;
  }

  getErrors() {
    return Object.keys(this.errors).reduce((memo, error) => {
      memo.push(this.get(error));
      return memo;
    }, []);
  }

  clear(field) {
    delete this.errors[field];
  }

  clearAll() {
    this.errors = {};
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }
}

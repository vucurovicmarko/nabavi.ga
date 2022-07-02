<template>
  <div
    class="bg-gray-50 flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <router-link :to="{ name: 'storefront' }">
            <VLogo></VLogo>
          </router-link>
        </div>

        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registration
        </h2>
      </div>
      <form @submit.prevent="submit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              autocomplete="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Email address (optional)"
              v-model="form.email"
            />
          </div>
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              type="text"
              autocomplete="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              v-model="form.username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              type="password"
              autocomplete="new-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="form.password"
            />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              type="password"
              autocomplete="new-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Confirm password"
              v-model="confirmPassword"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            disabled
          >
            Register
          </button>
        </div>
      </form>
      <div class="flex justify-center">
        <div class="text-sm">
          <router-link
            :to="{ name: 'login' }"
            class="font-medium text-emerald-600 hover:text-emerald-500"
            replace
          >
            Already have an account? Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
      confirmPassword: "",
    };
  },
  computed: {
    passwordConfirmed() {
      return this.form.password === this.confirmPassword;
    },
    requiredFiledsFilled() {
      const { username, password } = this.form;
      return Boolean(username && password);
    },
    validForm() {
      return this.requiredFiledsFilled && this.passwordConfirmed;
    },
  },
  methods: {
    submit() {
      if (!this.validForm) return;

      console.log("submitted");
    },
  },
};
</script>

<style scoped></style>

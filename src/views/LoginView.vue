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
          Login
        </h2>
      </div>

      <form @submit.prevent="submit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              type="text"
              autocomplete="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="form.password"
            />
          </div>
        </div>

        <div>
          <VButton
            type="submit"
            label="Login"
            class="w-full"
            :disabled="!readyToSend"
            :busy="sentAndWaiting"
          ></VButton>
        </div>
      </form>
      <div class="flex justify-center">
        <div class="text-sm">
          <router-link
            :to="{ name: 'register' }"
            class="font-medium text-emerald-600 hover:text-emerald-500"
            replace
          >
            Don't have an account? Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth";

import AuthService from "@/services/auth.service";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      sentAndWaiting: false,
      loginErrorToastId: null,
    };
  },
  computed: {
    requiredFiledsFilled() {
      const { username, password } = this.form;
      return Boolean(username && password);
    },
    readyToSend() {
      return this.requiredFiledsFilled;
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["setAuth", "purgeAuth"]),
    submit() {
      if (!this.readyToSend) return;

      this.sentAndWaiting = true;

      this.purgeAuth();

      AuthService.login(this.form)
        .then(
          ({ data }) => {
            this.setAuth(data.access, data.refresh);
            
            this.$router.push({ name: "storefront" });
          },
          (error) => {
            this.toast.dismiss(this.loginErrorToastId);
            this.loginErrorToastId = this.toast.error(
              error.response.data.detail
            );
          }
        )
        .finally(() => (this.sentAndWaiting = false));
    },
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
};
</script>

<style scoped></style>

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

      <ErrorList v-if="invalidForm" :errors="errors.getErrors()"></ErrorList>

      <form @submit.prevent="submit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              type="text"
              autocomplete="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
              :class="
                errors.get('username')
                  ? 'border-red-300 placeholder-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 z-[1]'
                  : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500'
              "
              placeholder="Username"
              v-model="form.username"
              @input="errors.clear('username')"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              type="password"
              autocomplete="new-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              :class="
                errors.get('password')
                  ? 'border-red-300 placeholder-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 z-[1]'
                  : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500'
              "
              placeholder="Password"
              v-model="form.password"
              @input="errors.clear('password')"
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
          <VButton
            type="submit"
            label="Register"
            class="w-full"
            :disabled="!readyToSend"
            :busy="sentAndWaiting"
          ></VButton>
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
import AuthService from "@/services/auth.service";
import Errors from "@/helpers/Errors";

import { useToast } from "vue-toastification";

import ErrorList from "@/components/ErrorList";

export default {
  name: "RegisterView",
  components: {
    ErrorList,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      confirmPassword: "",
      sentAndWaiting: false,
      errors: new Errors(),
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
    invalidForm() {
      return this.errors.hasErrors();
    },
    readyToSend() {
      return (
        !this.invalidForm && this.requiredFiledsFilled && this.passwordConfirmed
      );
    },
  },
  methods: {
    submit() {
      if (!this.readyToSend) return;

      this.sentAndWaiting = true;

      AuthService.register(this.form)
        .then(
          () => {
            this.toast.success("Account has been successfully created");
            this.$router.push({ name: "storefront" });
          },
          (error) => {
            if (error.response.status === 400) {
              this.errors.set(error.response.data);
            }
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

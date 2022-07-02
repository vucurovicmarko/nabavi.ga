<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="[
      toneClasses,
      sizeClasses,
      { 'cursor-not-allowed opacity-50': disabled },
      { 'cursor-wait hover:opacity-50': busy },
    ]"
    :disabled="isDisabled"
  >
    <span
      v-if="showIcon"
      :class="{ 'order-last': iconPosition === 'trailing' }"
    >
      <svg
        v-if="busy"
        class="animate-spin"
        :class="iconClasses"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <slot v-else name="icon" v-bind="{ iconClasses }"></slot>
    </span>

    <template v-if="iconPosition !== 'only'">
      {{ busy ? busyLabel || label : label }}
    </template>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    label: String,
    busyLabel: String,
    type: {
        type: String,
        default: 'button',
    },
    busy: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tone: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "white"].includes(value);
      },
    },
    size: {
      type: String,
      default: "base",
      validator(value) {
        return ["xs", "sm", "base", "l", "xl"].includes(value);
      },
    },
    iconPosition: {
      type: String,
      default: "leading",
      validator(value) {
        return ["leading", "trailing", "only"].includes(value);
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    circular: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showIcon() {
      return this.$slots.icon || this.busy;
    },
    isDisabled() {
      return this.disabled || this.busy;
    },
    toneClasses() {
      switch (this.tone) {
        case "secondary":
          return `${
            this.isDisabled ? "" : "hover:bg-emerald-200"
          } border-transparent text-emerald-700 bg-emerald-100 focus:ring-emerald-500`;
        case "white":
          return `${
            this.isDisabled ? "" : "hover:bg-gray-50"
          } border-gray-300 shadow-sm text-gray-700 bg-white focus:ring-emerald-500`;
        case "primary":
        default:
          return `${
            this.isDisabled ? "" : "hover:bg-emerald-700"
          } border-transparent shadow-sm text-white bg-emerald-600 focus:ring-emerald-500`;
      }
    },
    sizeClasses() {
      switch (this.size) {
        case "xs":
          return `${this.radiusClasses} ${this.paddingClasses} text-xs`;
        case "sm":
          return `${this.radiusClasses} ${this.paddingClasses} text-sm leading-4`;
        case "l":
        case "xl":
          return `${this.radiusClasses} ${this.paddingClasses} text-base`;
        case "base":
        default:
          return `${this.radiusClasses} ${this.paddingClasses} text-sm`;
      }
    },
    radiusClasses() {
      if (this.rounded || this.circular) {
        return "rounded-full";
      }

      switch (this.size) {
        case "xs":
          return "rounded";
        case "sm":
        case "base":
        case "l":
        case "xl":
        default:
          return "rounded-md";
      }
    },
    paddingClasses() {
      if (this.rounded) {
        switch (this.size) {
          case "xs":
            return "px-3 py-1.5";
          case "sm":
            return "px-3.5 py-2";
          case "base":
            return "px-4 py-2";
          case "l":
            return "px-5 py-2";
          case "xl":
            return "px-6 py-3";
        }
      }

      if (this.circular) {
        switch (this.size) {
          case "xs":
            return "p-1";
          case "sm":
            return "p-1.5";
          case "base":
          case "l":
            return "p-2";
          case "xl":
            return "p-3";
        }
      }

      switch (this.size) {
        case "xs":
          return "px-2.5 py-1.5";
        case "sm":
          return "px-3 py-2";
        case "xl":
          return "px-6 py-3";
        case "base":
        case "l":
        default:
          return "px-4 py-2";
      }
    },
    iconClasses() {
      if (this.iconPosition === "only") {
        return this.iconSize;
      }

      if (this.iconPosition === "leading") {
        switch (this.size) {
          case "sm":
            return `-ml-0.5 mr-2 ${this.iconSize}`;
          case "base":
            return `-ml-1 mr-2 ${this.iconSize}`;
          case "l":
          case "xl":
            return `-ml-1 mr-3 ${this.iconSize}`;
        }
      }

      if (this.iconPosition === "trailing") {
        switch (this.size) {
          case "sm":
            return `-mr-0.5 ml-2 ${this.iconSize}`;
          case "base":
            return `-mr-1 ml-2 ${this.iconSize}`;
          case "l":
          case "xl":
            return `-mr-1 ml-3 ${this.iconSize}`;
        }
      }

      return '';
    },
    iconSize() {
      if (this.iconPosition === "only") {
        switch (this.size) {
          case "xs":
          case "sm":
          case "base":
            return "h-5 w-5";
          case "l":
          case "xl":
            return "h-6 w-6";
        }
      }

      switch (this.size) {
        case "sm":
          return "h-4 w-4";
        case "base":
        case "l":
        case "xl":
          return "h-5 w-5";
      }

      return '';
    },
  },
};
</script>

<style scoped></style>

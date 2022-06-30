// This mixin requires modal components to have

// @before-enter="overlayTransitionLeaveFinished = false"
// @after-leave="overlayTransitionLeaveFinished = true"

// @before-enter="panelTransitionLeaveFinished = false"
// @after-leave="panelTransitionLeaveFinished = true"

// On parent required setting
{/* <SomeComponent
  v-if="someComponentOpen"
  :trigger-show="someComponentOpen"
  @close="someComponentOpen = false"
></SomeComponent> */}

const modal = {
  emits: ["close"],
  props: {
    triggerShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      overlayTransitionLeaveFinished: false,
      panelTransitionLeaveFinished: false,
    };
  },
  watch: {
    transitionLeaveFinished(finished) {
      if (finished === true) this.$emit("close");
    },
  },
  computed: {
    transitionLeaveFinished() {
      return Boolean(
        this.overlayTransitionLeaveFinished && this.panelTransitionLeaveFinished
      );
    },
  },
  created() {
    this.show = this.triggerShow;
  },
  mounted() {
    document.addEventListener("keydown", ({ key }) => {
      if (key === "Escape") this.close();
    });
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};

export default modal;

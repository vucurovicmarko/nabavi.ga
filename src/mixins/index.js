export const redirectIfNotFound = {
    data() {
        return {
            error: false,
        }
    },
    methods: {
        handleError(error) {
            this.error = true;

            if (error.response.status === 404) {
                this.$router.push({name: 'not_found'});
            }
        }
    },
}
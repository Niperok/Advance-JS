Vue.component('error', {
    data() {
        return {
            error: true,
        }
    },
    methods: {
        showError() {
            this.error = !this.error;
        }
    },
    template: `
        <p v-show="error">Ошибка загрузки!</p>
        `
});
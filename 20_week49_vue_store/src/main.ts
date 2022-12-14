import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/router';
import App from './App.vue';

import './scss/common/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

console.log(import.meta.env.BASE_URL);

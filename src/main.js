import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const backURL = `${import.meta.env.VITE_API_URL}`;

window.backURL = backURL;

const app = createApp(App);

app.use(router);

app.mount('#app');



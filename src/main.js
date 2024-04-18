import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import cors from "cors";

const backURL = `${import.meta.env.VITE_API_URL}`;

window.backURL = backURL;

const app = createApp(App);

app.use(cors({
    origin:'https://cartoola.onrender.com/',
    credentials:true
}));

app.use(router);

app.mount('#app');



import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import './assets/common.css';
import mixins from "./mixins";

const app = createApp(App)
// app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$serverUrl = '//localhost:3000';
app.use(router)
app.use(mixins)
app.mount('#app')

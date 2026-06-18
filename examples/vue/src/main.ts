import { createApp } from 'vue';
import App from './App.vue';
import { buildContainer } from './services/container';

buildContainer();

createApp(App).mount('#app');

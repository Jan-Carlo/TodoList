// main.js
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Import the customized Vuetify instance

createApp(App).use(vuetify).mount('#app');

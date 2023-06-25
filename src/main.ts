import './assets/main.css'
import './assets/style/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'ant-design-vue/dist/antd.min.css';
import * as AntD from 'ant-design-vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AntD);

app.mount('#app')

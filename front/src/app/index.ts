import './styles/index.scss'

import { pinia } from './plugins/pinia'
import { router } from './plugins/router'
import { createApp } from 'vue'
import App from './ui/App.vue'

export const app = createApp(App).use(router).use(pinia)

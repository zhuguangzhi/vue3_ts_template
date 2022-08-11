import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import init from './core/use'

const app = createApp(App)
init(app)

app.mount('#app')


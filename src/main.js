import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import 'unfonts.css'
import '@fontsource-variable/oswald'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export * from './modules/user.js'
export * from './modules/consume.js'
export * from './modules/global.js'
export * from './modules/member.js'

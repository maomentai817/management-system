// 将 components 文件夹下的所有组件进行全局化注册
import CardContainer from './modules/CardContainer/CardContainer.vue'
import SwitchButton from './modules/SwitchButton/SwitchButton.vue'
import IconCube from './modules/IconCube/IconCube.vue'
import FilterBox from './modules/FilterBox/FilterBox.vue'
import TableContainer from './modules/TableContainer/TableContainer.vue'
import DrawerContainer from './modules/DrawerContainer/DrawerContainer.vue'
import UglyAvatar from './modules/UglyAvatar/UglyAvatar.vue'

export const componentPlugin = {
  install(app) {
    app.component('CardContainer', CardContainer)
    app.component('SwitchButton', SwitchButton)
    app.component('IconCube', IconCube)
    app.component('FilterBox', FilterBox)
    app.component('TableContainer', TableContainer)
    app.component('DrawerContainer', DrawerContainer)
    app.component('UglyAvatar', UglyAvatar)
  }
}

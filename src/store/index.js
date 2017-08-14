/**
 * @file store index
 * @author KimiXu(xuyujin@banggood.cn)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import appShell from './modules/app-shell'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appShell
  }
})

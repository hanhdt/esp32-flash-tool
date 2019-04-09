/**
 * Copyright (C) 2019 Aromajoin Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Vue from 'vue'
import ESPFirmwareApp from './ESPFirmwareApp.vue'
import router from './plugins/router'
import store from './plugins/store'
import './plugins/bootstrap'
import i18n from './plugins/i18n'
import './components/_globals'
import * as filters from './filters'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

for (const key in filters) {
  Vue.filter(key, filters[key])
}

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(ESPFirmwareApp)
}).$mount('#app')

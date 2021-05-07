import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import VueHead from 'vue-head'


Vue.use(VueRouter)
Vue.use(VueHead)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
import { VBTogglePlugin } from 'bootstrap-vue'
Vue.use(VBTogglePlugin)


const config = {
  baseURL: 'http://localhost:8080/api',
  tenants: {
    'tenant_agent_00': {
      'name': 'CBTravel',
      'logo': '/assets/logos/CBTravel.LOGO.png',
      'style': '/assets/css/simplex.min.css', // MIT Licensed from https://github.com/thomaspark/bootswatch
    },
    'tenant_agent_01': {
      'name': 'Behind The Sofa Flights',
      'logo': '/assets/logos/bts.LOGO.png', // Public Domain, Francis J Field, https://commons.wikimedia.org/wiki/File:Hemisphere_with_Plane_Icon.jpg
      'style': '/assets/css/sketchy.min.css', // MIT Licensed from https://github.com/thomaspark/bootswatch
    }
  }
}

import Router from './Router.vue'
import App from './App.vue'
import Index from './Index.vue'

const router = new VueRouter({
  mode: 'history',

  routes: [
    { path: '/',
      component: Index
    },

    { path: '/tenants/:tenant_id',
      component: App,
      props: { config },
      beforeEnter: (to, from, next) => {
        const valid_tenants = Object.keys(config.tenants)

        if (valid_tenants.includes(to.params.tenant_id)) {
          next()
        } else {
          next('/')
        }
      }
    },

    { path: '*',
      beforeEnter: (to, from, next) => next('/')
    }
  ]
})

const app = new Vue({
  render: h => h(Router),
  router
}).$mount('#app')
<template>
  <div id="app container">
    <div class="container">
      <!-- Tab for each section of the app.
      Each tab contains one Vue Component which comprises that 'page' of the app.
      These components are stored in their corresponding files (e.g: Flights.vue)
      -->
      <b-tabs  v-model="tabIndex" nav-wrapper-class="mb-5">

        <b-tab title="Flights">
          <Flights :user="{username, token}" :cart="cart" @logCtx="logCtx"/>
        </b-tab>

        <b-tab :title="cartTab" :disabled="!token" @click="$refs.cart.update()">
          <Cart :user="{username, token}" ref="cart" :cart="cart" @logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Booked" :disabled="!token" @click="$refs.booked.update()">
          <Booked :user="{username, token}" ref="booked" @logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Hotels" title-item-class="ml-3">
          <Hotels @logCtx="logCtx"/>
        </b-tab>

        <b-tab :title="loginTab" @click="logout" title-item-class="ml-auto">
          <Login v-on:login="login" v-on:logCtx="logCtx"/>
        </b-tab>

      </b-tabs>
    </div>

    <!-- Context Component displays logs for all the database actions performed -->
    <Context ref="ctx"/>

  </div>
</template>

<script>
  import Context from './components/Context.vue'
  import Login   from './components/Login.vue'
  import Flights from './components/Flights.vue'
  import Cart  from './components/Cart.vue'
  import Booked  from './components/Booked.vue'
  import Hotels  from './components/Hotels.vue'
  import axios from 'axios'

  export default {
    name: 'app',
    head: function () {
      return {
        link: [
          { rel: 'stylesheet', href: this.tenantInfo.style }
        ]
      }
    },
    components: {
      Context,
      Login,
      Flights,
      Cart,
      Booked,
      Hotels
    },
    props: {
      config: Object,
    },
    computed: {
      tenantId() { return this.$route.params.tenant_id },
      tenantInfo() { return this.config.tenants[this.tenantId] },
      cartTab() {
        const count = this.cart.length
        return count ? `Cart (${ count })` : "Cart"
      },
      loginTab() { return this.username ? `Logout (${ this.username })` : "Login" },
    },
    provide() {
      return {
        tenantInfo: this.tenantInfo,
        API: {
          callShared: (method, path, ...args)   => this.call(method, this.shared(path), ...args),
          callTenanted: (method, path, ...args) => this.call(method, this.tenanted(path), ...args),
        }
      }
    },
    data() {
      return {
        token: undefined,     // The JWT auth token
        username: undefined,  // The user's ID
        cart: [],           // The user's cart
        tabIndex: 4,          // The tab of the app that's currently open
        context: []           // The logs and debug data from the back-end
      }
    },
    methods: {
      call: function (method, path, ...args) {
        const url = `${ this.config.baseURL }${ path }`

        this.logCtx([`➤ ${ method } ${ path }`, `${ method } to ${ url }`])
        const req = {
          'POST': axios.post,
          'GET': axios.get,
          'PUT': axios.put,
        }[method];

        return req(url, ...args)
          .catch(err => {
            const response = err.response
            this.logCtx([`✘ ${ response.status } from ${ path }`])
            throw response
          })
          .then(response => {
            this.logCtx([`✔️ ${ response.status } from ${ path }`])
            return response
          })
      },
      shared: (path) => `/${path}`,
      tenanted: function (path) {
        return `/tenants/${ this.tenantId }/${ path }`
      },

      // Store the username and token, and advance into the app
      login: function (vals){
        this.token = vals.token
        this.username = vals.user
        this.tabIndex = 0
      },
      // Reset the stored user data & return to login page
      logout: function (){
        this.token = undefined
        this.username = undefined
        this.cart = []
        this.tabIndex = 4
        this.logCtx(['Logged out', 'Front-end discarded authentication token'])
      },
      // Log messages to the context component
      logCtx(ctx){
        console.log(ctx)
        this.$refs["ctx"].logCtx(ctx)
      }
    }
  }
</script>
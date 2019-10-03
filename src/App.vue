<template>
  <div id="app container">
    <!-- Context Component displays logs for all the database actions performed -->
    <Context ref="ctx"/>
    <!-- Tab for each section of the app.
    Each tab contains one Vue Component which comprises that 'page' of the app.
    These components are stored in their corresponding files (e.g: Flights.vue)
    -->
    <div class="container">
      <b-tabs  v-model="tabIndex">

        <b-tab :title="firstTab" @click="logout"> 
          <Login v-on:login="login" v-on:logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Flights">
          <Flights :user="{username, token}" :basket="basket" @logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Basket" :disabled="!token">
          <Basket :user="{username, token}" :basket="basket" @logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Booked" :disabled="!token" @click="$refs.booked.update()">
          <Booked :user="{username, token}" ref="booked" @logCtx="logCtx"/>
        </b-tab>

        <b-tab title="Hotels">
          <Hotels @logCtx="logCtx"/>
        </b-tab>

      </b-tabs>
    </div>
  </div>
</template>

<script>
  import Context from './components/Context.vue'
  import Login   from './components/Login.vue'
  import Flights from './components/Flights.vue'
  import Basket  from './components/Basket.vue'
  import Booked  from './components/Booked.vue'
  import Hotels  from './components/Hotels.vue'
  export default {
    name: 'app',
    components: {
      Context,
      Login,
      Flights,
      Basket,
      Booked,
      Hotels
    },
    data() {
      return {
        token: undefined,     // The JWT auth token
        username: undefined,  // The user's ID
        basket: [],           // The user's basket
        tabIndex: 0,          // The tab of the app that's currently open
        firstTab: 'Login',    // The text for the first tab (Login/Logout)
        context: []           // The logs and debug data from the back-end
      }
    },
    methods: {
      // Store the username and token, and advance into the app
      // Also changes the first tab to a logout button
      login: function (vals){
        this.token = vals.token
        this.username = vals.user
        this.tabIndex = 1
        this.firstTab = 'Logout'
      },
      // Reset the stored user data & return to login page
      logout: function (){
        this.token = undefined
        this.username = undefined
        this.basket = []
        this.tabIndex = 0
        this.firstTab = 'Login'
      },
      // Log messages to the context component
      logCtx(ctx){
        console.log(ctx)
        this.$refs["ctx"].logCtx(ctx)
      }
    }
  }
</script>
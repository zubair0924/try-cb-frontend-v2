<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-sm">
        <!-- Username input -->
        <div class="input-group mt-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Username</span>
          </div>
          <input v-model="username" type="text" class="form-control" aria-describedby="basic-addon1">
        </div>
        <!-- Password input -->
        <div class="input-group mt-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon2">Password</span>
          </div>
          <input v-model="password" type="password" class="form-control" aria-describedby="basic-addon2">
        </div>
        <!-- Error message alert box -->
        <div class="alert alert-danger mt-3" v-if="error_message">
          <strong>Error:</strong> {{error_message}}
        </div>
        <!-- Log in & register buttons -->
        <div class="row mt-3">
          <div class="col-sm">
            <b-button class="w-100" variant="primary" @click="login">Log In</b-button>
          </div>
          <div class="col-sm">
            <b-button class="w-100" variant="outline-primary" @click="register">Register</b-button>
          </div>
        </div>
      </div>
      <!-- Info column -->
      <div class="col-sm container">
        <h1> {{ this.tenantInfo.name }} <img :src="this.tenantInfo.logo" alt="Logo"></h1>
        <p>This is a sample app to demonstrate some of the things Couchbase can do. Create an account, book flights and search hotels while the app displays what's going on behind the scenes.</p>
        <p>You can find documentation for this app at the appropriate page for your preferred SDK:</p>

        <ul class="row list-unstyled">
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/python-sdk/current/sample-app-backend.html" target="_blank">Python</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/java-sdk/current/sample-app-backend.html" target="_blank">Java</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/nodejs-sdk/current/sample-app-backend.html" target="_blank">Javascript</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/dotnet-sdk/current/sample-app-backend.html" target="_blank">.NET</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/go-sdk/current/sample-app-backend.html" target="_blank">Go</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/php-sdk/current/sample-app-backend.html" target="_blank">PHP</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/scala-sdk/current/sample-app-backend.html" target="_blank">Scala</a></li>
          <li class="col-4 text-center p-2"><a href="https://docs.couchbase.com/ruby-sdk/current/sample-app-backend.html" target="_blank">Ruby</a></li>
        </ul>

        <!-- <div class="row mt-auto mx-auto text-center h-auto">
          <div class="col">
            <img src="assets/poweredBy.01.png" alt="Powered by Couchbase, Vue.js">
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "login",
  inject: ['API', 'tenantInfo'],
  data() {
    return {
      username: '',
      password: '',
      error_message: undefined
    }
  },
  methods: {
      login: function() {
        let vm = this // Store a reference to the Vue object for use inside callbacks
        axios.post(this.API.tenanted("user/login"), {
          user: this.username,
          password: md5(this.password)
        }).then(response => {
          // Emit an event so the parent component can log the user in for the whole app
          this.$emit('login',{
            token: response.data.data.token,
            user: this.username
          })
          // Emit an event to log the request's context to the context component
          this.$emit('logCtx',["Authenticated with server; Retrieved token",response.data.context])
        }).catch(error => {
          // User doesn't exist (409?) / auth error (401)
          vm.error_message = (error.response ? error.response.error : error.message) || "Failed to login"
        })
      },

      register: function() {
        let vm = this
        axios.post(this.API.tenanted("user/signup"), {
          user: this.username,
          password: md5(this.password)
        }).then(response => {
          vm.$emit('login',{
            token: response.data.data.token,
            user: this.username
          })
          // Emit an event to log the request's context to the context component
          this.$emit('logCtx', ["Authenticated with server; Assigned token", response.data.context])
        }).catch(error => {
          // User already exists (409)
          vm.error_message = error.response.error || error.message
        })
      }
  }
}
</script>

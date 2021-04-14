<template>
  <div class="container">
		<div class="row mt-3">
      <!-- Input for location search term -->
			<div class="col-md-5 input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Location</span>
        </div>
        <input v-model="location" type="text" class="form-control" placeholder="E.g: London, France" aria-describedby="basic-addon1">
			</div>
      <!-- Input for optional search term (e.g: golf, spacious, etc.) -->
      <div class="col-md-5 input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Search Term</span>
        </div>
        <input v-model="desc" type="text" class="form-control" placeholder="(optional)" aria-describedby="basic-addon1">
			</div>
      <!-- Search button -->
      <div class="col-md mb-3">
        <b-button class="w-100" variant="primary" @click="search">Search</b-button>
			</div>

		</div>

    <div class="row mt-3">
      <div class="col-lg">
        <!-- Results table - generated from :items data -->
        <b-table class="mt-3" :items="hotels" :fields="fields">
          <!-- Composite field to show address as one item -->
          <template slot="address" slot-scope="data">
              {{data.item.address}} <br>
              {{data.item.state ? data.item.state : '' }} <br v-if="data.item.state">
              {{data.item.country}}
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "hotels",
  inject: ['API'],
  data() {
    return {
      fields: ["address", "name", "description"],
      hotels: [],
      desc: '',
      location: ''
    }
  },
  methods:{
    search: async function(){
      let vm = this
      // Search arguments are the user-supplied terms or '*', for match anything
      axios.get(this.API.shared(`hotels/${ this.desc || '*' }/${ this.location || '*' }/`))
        .then(response => {
          vm.hotels.length = 0
          vm.hotels.push(...response.data.data)
          // Emit an event to log the request's context to the context component
          vm.$emit('logCtx',["Searched for hotels matching " +
                              (vm.location ? vm.location : '') +
                              (vm.location && vm.desc ? ' and ' : '') +
                              (vm.desc ? vm.desc : ''),
                            response.data.context])
        })
    }
  }
}
</script>

<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col-lg">
				<!-- Nothing in basket message -->
				<div class="alert alert-primary" v-if="this.$attrs.basket.length == 0 && !error_message">
					<p><strong>You haven't added any flights to your basket yet!</strong></p>
					<p class="mb-0">Try adding some from the flights tab</p>
				</div>

        <!-- Error message alert box -->
        <div class="alert alert-danger mt-3" v-if="error_message">
          <strong>Error:</strong> {{error_message}}
        </div>

        <!-- Results table generated from basket passed in from parent component -->
				<b-table class="mt-3" :items="this.$attrs.basket" :fields="fields">
					<!-- Composite field to show flightpath as one item -->
					<template slot="flightpath" slot-scope="data">
						{{data.item.sourceairport}} -> {{data.item.destinationairport}}
					</template>
					<!-- Embed HTML in the table row for book and cancel buttons -->
					<template slot="actions" slot-scope="row">
						<button class="btn btn-primary btn-sm mr-3" @click="buy(row.item, row.index)">
							<strong>Buy</strong>
						</button>
						<button class="btn btn-danger btn-sm" @click="cancel(row.item, row.index)">
							<strong>X</strong>
						</button>
					</template>

				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {config} from '../main.js'

export default {
  name: "basket",
  data() {
    return {
      // The fields we want to display in the basket table
      fields: ["name", "flight", "date", "flightpath", "actions"],
      error_message: undefined
    }
  },
  methods: {
    // Removes a flight from the user's basket and adds it to their booked flights 
    buy: function(item, index){
      let vm = this
      axios.post(config.baseURL + `user/${ this.$attrs.user.username }/flights`, {
        flights: [item]
      },{
        // JWT token supplied to authorize user
        headers: {'Authorization': "Bearer " + this.$attrs.user.token}
      }).then(response => {
        console.log(response)
        this.$attrs.basket.pop(index)
        // Emit an event to log the request's context to the context component
        vm.$emit('logCtx',["Purchased item from basket", response.data.context])
      }).catch(error => {
        this.error_message = error.response ? error.response.data.failure : error.message
      })
    },
    // Removes a flight from the user's basket
    cancel: function(item, index){
      this.$attrs.basket.pop(index)
    }
  }
}
</script>

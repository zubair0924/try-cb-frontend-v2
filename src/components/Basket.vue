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
				<b-table class="mt-3" :items="this.$attrs.basket" :fields="fields" @update="update">
					<!-- Composite field to show flightpath as one item -->
					<template v-slot:cell(flightpath)="data">
						{{data.item.sourceairport}} -> {{data.item.destinationairport}}
					</template>
					<!-- Embed HTML in the table row for book and cancel buttons -->
					<template v-slot:cell(actions)="row">
						<button class="btn btn-primary btn-sm mr-3" @click="buy(row.index)">
							<strong>Buy</strong>
						</button>
						<button class="btn btn-danger btn-sm" @click="cancel(row.index)">
							<strong>X</strong>
						</button>
					</template>

				</b-table>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: "basket",
  inject: ['API'],
  data() {
    return {
      // The fields we want to display in the basket table
      fields: ["name", "flight", "date", "flightpath", "actions"],
      error_message: undefined
    }
  },
  methods: {
    // Triggered on reopening the Basket tab
    // As there is no synchronisation work to do with backend,
    // we simply emit some Query Details
    update: async function(){
      this.$emit('logCtx', ["Display basket details", "Frontend data managed by Vue"])
    },

    // Removes a flight from the user's basket and adds it to their booked flights
    buy: function(index){
      let vm = this
      this.API.callTenanted('PUT', `user/${ this.$attrs.user.username }/flights`, {
        flights: [this.$attrs.basket.splice(index, 1)[0]]
      },{
        // JWT token supplied to authorize user
        headers: {'Authorization': "Bearer " + this.$attrs.user.token}
      }).then(response => {
        console.log(response)
        // Emit an event to log the request's context to the context component
        vm.$emit('logCtx',["Purchased item from basket", response.data.context])
      }).catch(error => {
        this.error_message = error.response ? error.response.data.failure : error.message
      })
    },
    // Removes a flight from the user's basket
    cancel: function(item, index){
      this.$attrs.basket.pop(index)
      this.$emit('logCtx',["Removed item from basket", "Frontend data managed by Vue"])
    }
  }
}
</script>

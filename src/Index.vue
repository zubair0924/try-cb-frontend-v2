<template>
  <div class="index app container">
    <h1 class="display-1">Try Couchbase</h1>
    <h3>Our multi-tenanted travel sample app</h3>

    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">CB Travel</h5>
            <img src="/assets/logos/CBTravel.LOGO.png" alt="Logo for agent">
            <p class="card-text">Our default tenanted travel agent.</p>
            <a href="/tenants/tenant_agent_00" class="btn btn-primary">Check it out</a>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Behind the Sofa Bookings</h5>
            <img src="/assets/logos/bts.LOGO.png" alt="Logo for agent">
            <p class="card-text">A tenant agent. We have additional styling options here,
                                and you will notice that though Flight and Hotel information are shared with the default agent,
                                the users and flight bookings are completely separated </p>
            <a href="/tenants/tenant_agent_01" class="btn btn-primary">Check it out</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "fallback",
}
</script>

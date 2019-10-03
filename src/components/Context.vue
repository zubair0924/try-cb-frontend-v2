<template>
  <div class="container">
    <div class="row mt-3 mb-4">
      <!-- Traditional log section, lists messages sequentially -->
      <div class="col-lg-7">
        <h3 class="ml-1">Query Log</h3>
        <!-- linebreaks inside tags are to prevent line breaks within the pre element -->
        <pre class="pre-scrollable m-1 p-1 h-100 bg-dark" style="height:200px !important" ref="log"
          ><code class="text-light"
            ><span v-for="(t,index) in ctx" :key="index" @click="(showExtra(index))" :class="{'font-weight-bold': (extraIndex === index)}">{{t.message}}
</span></code></pre>
      </div>
      <!-- Detail pane - Click on a log message to display details here (if there are any) -->
      <div class="col-lg-5">
        <h3 class="ml-1">Query Details</h3>
        <pre class="pre-scrollable m-1 p-1 h-100 bg-dark" style="height:200px !important"><code class="text-light"
          >{{extraIndex !== undefined ? ctx[extraIndex].extra : ''}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>

function formatN1QL(n1ql){
  console.log(n1ql)
  return n1ql.replace(/ ([A-Z]{4,})/g, (match, p1) => "\n" + p1)
}

export default {
  data() {
    return {
      ctx: [],
      extraIndex: undefined
    }
  },
  methods: {
    logCtx(context){
      if(context.length == 1 || !context[1]){
        this.ctx.push({message: context[0]})
      } else {
        console.log(context)
        this.ctx.push({
          message: "• " + context[0],
          extra: context.slice(1).map(formatN1QL).join('\n\n')
        })
      }
      setTimeout(() => {
        this.$refs['log'].scrollTop = this.$refs['log'].scrollHeight
        this.showExtra(this.ctx.length - 1)
        }, 50)
    },
    showExtra: function(x) {
      if(this.ctx[x].extra){
        this.extraIndex = x
      } else {
        this.extraIndex = undefined
      }
    }
  }
}
</script>

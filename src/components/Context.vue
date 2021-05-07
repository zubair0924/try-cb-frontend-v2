<template>
  <div class="accordion w-100" role="tablist" style="margin: 0">
    <b-card no-body class="mb-1" style="margin: 0">
      <b-card-header header-tag="header" role="tab" style="padding: 0">
        <b-button block v-b-toggle.context-accordion variant="primary">
          <div class="row">
            <div class="col text-left" style="margin: 0">
              <span class="when-open">-</span>
              <span class="when-closed">+</span>
              {{ ctx[ctx.length - 1].message }}
            </div>
            <div class="col w-100 text-right" style="margin: 0">
              <span class="when-closed font-italic">(click to view Couchbase details)</span>
            </div>
          </div>
        </b-button>
      </b-card-header>
      <b-collapse id="context-accordion" class="container" accordion="context-accordion" role="tab-panel">
        <div class="row mt-3 mb-4">
          <!-- Traditional log section, lists messages sequentially -->
          <div class="col-lg-7">
            <h3 class="ml-1">Query Log</h3>
            <!-- linebreaks inside tags are to prevent line breaks within the pre element -->
            <pre class="pre-scrollable m-1 p-1 h-100 bg-dark" style="height:200px !important" ref="log"
              ><code class="text-light"
                ><span v-for="(t,index) in ctx"
                  :key="index"
                  @click="(showExtra(index))"
                  :class="{'text-warning': (extraIndex === index)}">{{showMessage(t)}}</span></code></pre>
          </div>
          <!-- Detail pane - Click on a log message to display details here (if there are any) -->
          <div class="col-lg-5">
            <h3 class="ml-1">Query Details</h3>
            <pre class="pre-scrollable m-1 p-1 h-100 bg-dark" style="height:200px !important"><code class="text-light"
              >{{extraIndex !== undefined ? ctx[extraIndex].extra : ''}}</code></pre>
          </div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<style scoped>
  .accordion {
    bottom: 0;
    position: fixed;
    width: 100%;
  }
  .collapsed .when-open,
  .not-collapsed .when-closed {
      display: none;
  }
</style>

<script>

function formatN1QL(n1ql){
  console.log(n1ql)
  return n1ql.replace(/ ([A-Z]{4,})/g, (match, p1) => "\n" + p1)
}

export default {
  data() {
    return {
      ctx: [ {message: "Started..."} ],
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
          message: context[0],
          extra: context.slice(1).map(formatN1QL).join('\n\n')
        })
      }
      setTimeout(() => {
        this.$refs['log'].scrollTop = this.$refs['log'].scrollHeight
        this.showExtra(this.ctx.length - 1)
        }, 50)
    },
    showMessage: t => (t.extra ? "• " : "") + t.message + "\n",
    showExtra: function (x) {
      if(this.ctx[x].extra){
        this.extraIndex = x
      } else {
        this.extraIndex = undefined
      }
    }
  }
}
</script>

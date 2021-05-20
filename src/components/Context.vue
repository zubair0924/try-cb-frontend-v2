<template>
  <div class="accordion w-100 m-0" role="tablist">
    <b-card no-body class="m-0 bg-canary">
      <b-card-header header-tag="header" role="tab" class="p-0">
        <b-button block v-b-toggle.context-accordion variant="primary">
          <div class="row">
            <div class="col text-left">
              <span class="when-open">▽</span>
              <span class="when-closed">▷</span>
              {{ latestCtx.message }}
            </div>
            <div class="col text-right">
              <span class="when-closed font-italic">(click to view Couchbase details)</span>
            </div>
          </div>
        </b-button>
      </b-card-header>
      <b-collapse id="context-accordion" class="container" accordion="context-accordion" role="tab-panel">
        <div class="row mt-3 mb-4">
          <!-- Traditional log section, lists messages sequentially -->
          <div class="col">
            <h3 class="ml-1">Query Log</h3>
            <!-- linebreaks inside tags are to prevent line breaks within the pre element -->
            <pre class="pre-scrollable m-1 ml-2 p-1 bg-dark"
              ref="log"
              ><code class="text-light"
                ><span v-for="(t,index) in ctx"
                  :key="index"
                  class="log-line"
              ><b>{{showMessage(t)}}</b>{{ t.extra ? t.extra + "\n" : '' }}</span></code></pre>
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
  /* canary yellow */
  .bg-canary {
    background-color: #FCF0AD;
  }
  .pre-scrollable {
    height:200px !important;
  }
  .collapsed .when-open,
  .not-collapsed .when-closed {
      display: none;
  }
  .log-line {
    margin-left: 2em;
    display: block;
  }
  .log-line > b {
    margin-left: -2em;
    display: block;
    margin-top: 0.5em;
  }

  .log-line:not(:last-child) {
    color: lightgrey;
  }
</style>

<script>

function formatN1QL(n1ql){
  return n1ql.toString()
    .replace(/ +(ON KEYS|AND|SELECT|WHERE|UNION|FROM|UNNEST|JOIN|ORDER BY)/g,
            (match, p1) => "\n" + p1)
    .replace(/\n+/g, "\n")

}

export default {
  data() {
    return {
      ctx: [ {message: "Started..."} ],
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (_, isJustShown) => {
      if (isJustShown) {
        this.scrollLog()
      }
    })
  },
  computed: {
    latestCtx: function () {
      return this.ctx[this.ctx.length - 1]
    },
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
      this.scrollLog()
    },
    showMessage: t => `• ${ t.message }\n`,
    scrollLog() {
      setTimeout(() => {
        var log = this.$refs.log
        if (log) {
          log.scrollTop = log.scrollHeight
        }
      }, 50)
    }
  }
}
</script>

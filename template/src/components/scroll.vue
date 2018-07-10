<template>
  <div class="simple-scroll" ref="wrapper">
    <slot>

    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

  const DIRECTION_H = "horizontal";
  const DIRECTION_V = "vertical";

  export default {
    props: {
      height: {
        type: String,
        default: 667
      },
      width: {
        type: String,
        default: 175
      },
      probeType: {
        type: Number,
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      startX: {
        type: Number,
        default: 0
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      eventPassthrough: {
        type: String,
        default: ""
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      toScrollY: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this.initScroll();
      }, 20);
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }

        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.direction === DIRECTION_H,
          scrollY: this.direction === DIRECTION_V,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startX: this.startX,
          startY: this.startY,
          freeScroll: this.freeScroll,
          eventPassthrough: this.eventPassthrough
        };

        this.$refs.wrapper.style.height = this.height;
        this.$refs.wrapper.style.width = this.width;
        this.scroll = new BScroll(this.$refs.wrapper, options);

        if (this.listenScroll) {
          this.scroll.on("scroll", pos => {
            this.$emit("scroll", pos);
          });
        }

        if (this.listenBeforeScroll) {
          this.scroll.on("beforeScrollStart", () => {
            this.$emit("beforeScrollStart");
          });
        }

        if (this.pullDownRefresh) {
          console.log("下拉刷新");
          // this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          // console.log('上拉加载')
          this._initPullUpLoad();
        }
        this.scroll.on("scroll", pos => {
          this.toScrollYs = Math.abs(Math.round(pos.y));

          this.$emit("scroll");
        });
      },
      _initPullUpLoad() {
        this.scroll.on("pullUpLoad", () => {
          this.pullUpLoad = true;
          this.$emit("pullUpLoadFun");
        });
      },
      refresh() {
        console.log(this.width)
        this.$refs.wrapper.style.height = this.height;
        this.$refs.wrapper.style.width = this.width;
        this.scroll && this.scroll.refresh();
      },
    },
    watch: {
      toScrollY() {
        this.scroll.scrollTo(0, -this.toScrollY, 300);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .simple-scroll {
    vertical-align: top;
    display: inline-block;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
</style>

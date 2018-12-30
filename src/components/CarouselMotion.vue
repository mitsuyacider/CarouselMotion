<template>
  <canvas id="world" :width=screenWidth :height=screenHeight></canvas>
</template>

<script>
import Lane from '@/js/Lane'

export default {
  props: {
    column: {
      type: Number,
      default: 12
    },
    lineSpace: {
      type: Number,
      default: 5
    },
    // NOTE: This property may be called from storybook
    isDebug: Boolean,
    default: false
  },
  data () {
    return {
      sentenceList: [],
      rootWidth: 0
    }
  },
  computed: {
    context: function () {
      const canvas = this.canvas
      const context = canvas.getContext('2d')
      return context
    },
    canvas () {
      return document.getElementById('world')
    },
    screenWidth () {
      return this.isDebug ? window.innerWidth * 2 : window.screen.width * 2
    },
    screenHeight () {
      return this.isDebug ? window.innerHeight * 2 : window.screen.height * 2
    }
  },
  mounted () {
    this.resetCanvasSize()
    this.createSentences()
    this.loopAnimation()

    // NOTE: Detect change of the view port on StoryBook
    if (this.isDebug) {
      window.addEventListener('resize', this.handleResize)
    }
  },
  methods: {
    resetCanvasSize () {
      const canvas = this.canvas
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      canvas.style.width = String(canvas.width / 2) + 'px'
      canvas.style.height = String(canvas.height / 2) + 'px'
    },
    createSentences () {
      this.sentenceList = []

      const fontSize = Math.floor((this.canvas.width - this.column * this.lineSpace) / this.column)
      // NOTE: Create sentence every 
      for (let i = 0; i < this.column; i++) {
        const x = (fontSize + this.lineSpace) * i
        const sentence = new Lane()
        sentence.position.x = x
        sentence.position.y = 0
        sentence.fontSize = fontSize
        sentence.speed = Math.random() * 1 + 0.1
        sentence.text = 'この作品の評価は高く、多くの鑑賞者から絶賛されています。' + i
        sentence.fillStyle = 'rgb(100, 100, 100)'
        this.sentenceList.push(sentence)
      }
    },
    handleResize () {
      const canvas = this.canvas

      if (canvas && canvas.parentNode && canvas.parentNode.id === 'root') {
        // NOTE: Reset canvas size fit debug window
        this.resetCanvasSize ()
        this.createSentences()
      }
    },
    loopAnimation: function () {
      this.clearCanvas()
      this.injectLanes(this.sentenceList)
      requestAnimationFrame(this.loopAnimation)
    },
    clearCanvas: function () {
      this.context.fillStyle = 'rgb(0, 0, 0)'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    injectLanes (lanes) {
      for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i]
        this.drawLane(lane)
        lane.position.y -= lane.speed
        const wordWidth = this.context.measureText('あ').width

        if (lane.position.y + wordWidth * lane.text.length < 0) {
          lane.position.y = this.screenHeight
        }
      }
    },
    drawLane: function (lane) {
      const fontSize = lane.fontSize
      this.context.font = `${fontSize}px メイリオ`
      this.context.fillStyle = 'rgb(255, 255, 255)'
      const text = lane.text
      const x = lane.position.x
      const y = lane.position.y

      // NOTE: Draw background
      const wordWidth = this.context.measureText('あ').width
      this.context.fillStyle = 'rgb(0, 0, 0)'
      this.context.fillRect(x, y, wordWidth, wordWidth * text.length)

      // NOTE: Set anchor point
      this.context.textBaseline = 'top'

      // NOTE: Draw word(sentence)
      this.context.fillStyle = lane.fillStyle
      const textList = text.split('\n')
      const self = this
      textList.forEach(function (elm, i) {
        Array.prototype.forEach.call(elm, function (ch, j) {
          self.context.fillText(ch, x - wordWidth * i, y + wordWidth * j)
        })
      })
    }
  }
}
</script>

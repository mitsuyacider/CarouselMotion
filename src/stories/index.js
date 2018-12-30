import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs, number } from '@storybook/addon-knobs'

import CarouselMotion from '../components/CarouselMotion.vue'

storiesOf('CarouselWord', module)
  .addDecorator(withKnobs)
  .add('Simple', withNotes(
    `
      column: レーンの数
      lineSpace: 行間
    `
  )(() => {
    const column = number('column', 12)
    const lineSpace = number('lineSpace', 5)

    return {
      components: { CarouselMotion },
      template: `<carousel-motion :column="${column}" :lineSpace="${lineSpace}" :isDebug="${true}" />`
    }
  }))

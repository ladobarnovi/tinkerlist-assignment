<template>
  <transition v-on="on">
    <div v-if="isActive" class="accordion-container">
      <div class="slot">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AccordionContainer',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const on = {
      beforeEnter: el => {
        el.style.height = '0px'
      },
      enter: el => {
        el.style.height = el.querySelector('.slot').clientHeight + 'px'
      },
      afterEnter: el => {
        el.style.height = ''
      },
      beforeLeave: el => {
        el.style.height = el.querySelector('.slot').clientHeight + 'px'
      },
      leave: el => {
        el.style.height = '0px'
      },
      afterLeave: el => {
        el.style.height = ''
      }
    }

    return {
      on
    }
  }
}
</script>

<style scoped lang="scss">
  .accordion-container {
    transition: height 0.3s ease;
    overflow: hidden;
  }
</style>

<template>
  <svg aria-hidden="true" :width="`${size}px`" :height="`${size}px`" :fill="color">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 32
  },
  color: {
    type: String,
    default: '#cdcdcd'
  },
  name: {
    type: String
  }

})
</script>
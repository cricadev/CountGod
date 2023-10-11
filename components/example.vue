<template>
  <div>
    Hello {{ msg }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>



<style></style>

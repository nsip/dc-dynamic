<template>
  <div>
    <p v-for="(r, index) in group" :key="index">{{r}}</p>
  </div>
</template>
<script>
export default {
  props: ['group']
}
</script>

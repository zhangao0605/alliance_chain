<template>
  <div v-if="showContent">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Permission',
    props: {
      name: String
    },
    data () {
      return {
      }
    },
    computed: {
      showContent () {
        let permissionList = this.$store.state.user.permissionList || []
        return permissionList.indexOf(this.name) !== -1
      }
    }
  }
</script>

<style scoped>

</style>

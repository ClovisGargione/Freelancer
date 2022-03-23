<template>
  <div class="row">
      <div class="col mb-2">
        <button type="button" class="btn btn-dark" @click="back()"><font-awesome-icon icon="arrow-left" /></button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'goBack',
  props: {
    route: { type: Object, require: true }
  },
  methods: {
    back () {
      this.$router.push({ name: this.route.name, params: this.route.params })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

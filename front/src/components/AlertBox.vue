<template>
    <b-alert :show="messageProps.dismissCountDown" :variant="messageProps.variant" dismissible @dismissed="messageProps.dismissCountDown=0" @dismiss-count-down="countDownChanged" fade>
        <p v-html="messageProps.message"></p>
        <b-progress
        :variant="messageProps.variant"
        :max="messageProps.dismissSecs"
        :value="messageProps.dismissCountDown"
        height="4px">
        </b-progress>
    </b-alert>
</template>

<script>
export default {
  name: 'alertBox',
  props: {
    messageProps: { type: Object, require: true }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.messageProps.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

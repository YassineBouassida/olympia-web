import Vue from 'vue'

export default () => {
  Vue.filter('turncut', function (value, num) {
    if (value) {
      if (value.length <= num) {
        return value
      } else {
        return value.substring(0, num - 3) + '...'
      }
    } else {
      return ''
    }
  })
}

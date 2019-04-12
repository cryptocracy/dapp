export default {
  filters: {
    capitalize: function (value) {
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  create: function (Vue) {
    Object.keys(this.filters).forEach(function (filter, k) {
      Vue.filter(filter, this.filters[filter])
    }.bind(this))
  }
}

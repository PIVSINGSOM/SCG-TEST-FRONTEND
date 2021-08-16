import Vue from 'vue'
const moment  = require('moment')
function formatCurrency(value) {
  let demical = value.toString().split('.')[1]
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: demical ? demical.length : 2,
  })
  return formatter.format(value)
}
function defaultDateTime(date) {
  if (date) {
    return moment(date).format('YYYY-MM-DD : HH:mm:ss')
  } else {
    return ''
  }
}
Vue.filter('formatCurrency', formatCurrency)
Vue.filter('defaultDateTime', defaultDateTime)

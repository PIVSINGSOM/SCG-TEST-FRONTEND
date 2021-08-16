import { getListStock } from '~/ultils/service'

export const state = () => ({
  listOrder: [],
  amount: 0,
  stockList: [],
})

export const actions = {
  increaseOrder({ commit }, data) {
    commit('updateIncreaseOrder', data)
  },
  decreseOrder({ commit }, data) {
    commit('updateDecreaseOrder', data)
  },
  setEmptyOrder({ commit }) {
    commit('updateEmptyOrder')
  },
  async getStockList({ commit }) {
    try {
      const response = await getListStock()
      commit('updateStockList', response.data)
    } catch (error) {
      console.log('Get stock list error : ', error)
    }
  },
}

export const mutations = {
  addOrder(state, payload) {
    let result = state.listOrder.find((e) => e.id == payload.id)
    if (result === undefined) {
      payload.product.quantity = 1
      payload.product.real_price = parseFloat(payload.product.price) * 1
      state.listOrder.push(payload)
      state.amount = state.amount + parseFloat(payload.product.real_price)
    }
  },

  updateIncreaseOrder(state, id) {
    const { listOrder } = state
    state.listOrder = []
    state.amount = 0
    listOrder.forEach((element) => {
      if (element.id == id) {
        if (element.quantity >= element.product.quantity + 1) {
          element.product.quantity++
          element.product.real_price =
            parseFloat(element.product.price) * element.product.quantity
        }
      }
      state.amount = state.amount + parseFloat(element.product.real_price)
    })
    state.listOrder = listOrder
  },

  updateDecreaseOrder(state, id) {
    const { listOrder } = state
    state.listOrder = []
    state.amount = 0
    listOrder.forEach((element) => {
      if (element.id == id) {
        if (element.product.quantity - 1 > 0) {
          element.product.quantity--
          element.product.real_price =
            parseFloat(element.product.price) * element.product.quantity
        }
      }
      state.amount = state.amount + parseFloat(element.product.real_price)
    })
    state.listOrder = listOrder
  },

  updateEmptyOrder(state) {
    state.listOrder = []
    state.amount = 0
  },

  updateStockList(state, data) {
    state.stockList = data
  },
}

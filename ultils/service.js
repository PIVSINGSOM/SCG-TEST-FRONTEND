import HttpRequest from './api'

const http = new HttpRequest()

export const getListStock = async (params) => {
  const { data } = await http.get('/stock', params)
  return data
}

export const paymentOrder = async (params) => {
  const { data } = await http.post('/payment', params)
  return data
}

export const getListStockByMachine = async (params) => {
  const { data } = await http.get(`/stock/machine/${params}`)
  return data
}

export const getListMachine = async (params) => {
  const { data } = await http.get('/machine')
  return data
}

export const createMachine = async (params) => {
  const { data } = await http.post('/machine', params)
  return data
}

export const increaseStock = async (params) => {
  const { data } = await http.update('/stock', params)
  return data
}

export const getListProduct = async (params) => {
  const { data } = await http.get('/product')
  return data
}

export const createStock = async (params) => {
  const { data } = await http.post('/stock', params)
  return data
}

export const createProduct = async (params) => {
  const { data } = await http.post('/product', params)
  return data
}

export const deleteStockId = async (id) => {
  const { data } = await http.delete(`/stock/${id}`)
  return data
}

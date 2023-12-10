import { request } from './index'

// example
export function getRealData(params: {}) {
  return request('/GetRealData', params, 'post')
}
export function getServerData(params:{}){
  return request('http://localhost:7000/latest',params,'get')
}

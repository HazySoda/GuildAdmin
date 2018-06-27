import _axios from './axios'

// 添加角色
export const addRole = data => _axios.post('/role/add', data)

// 查询角色
export const queryRole = data => _axios.post('/role/queryRole', data)

// 查询首发列表
export const queryFirstPublish = data => _axios.post('/role/queryFirstPublish', data)

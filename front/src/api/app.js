import _axios from './axios'

// 添加角色
export const addRole = data => _axios.post('/role/addRole', data)

// 修改角色
export const updateRole = data => _axios.post('/role/updateRole', data)

// 查询角色
export const queryRole = data => _axios.post('/role/queryRole', data)

// 查询首发列表
export const queryFirstPublish = data => _axios.post('/role/queryFirstPublish', data)

// 添加活动
export const addEvent = data => _axios.post('/event/addEvent', data)

// 查询活动
export const queryEvent = data => _axios.post('/event/queryEvent', data)

// 修改活动
export const updateEvent = data => _axios.post('/event/updateEvent', data)

// 变更活动状态
// export const addEvent = data => _axios.post('/event/', data)

<<<<<<< HEAD
import { axiosPost, axiosGet } from './base'

export default {
  // 员工登录
  login: (params) => {
    return axiosPost('api/bossApi/staff/login', params)
  },
  // 退出登录
  loginOut: (params) => {
    return axiosPost('api/bossApi/staff/login', params)
  },
  // 员工账号集合
  getEmployeeList: (params) => {
    return axiosPost('api/bossApi/staff/list', params)
  },
  // 角色集合
  getRoleList: (params) => {
    return axiosPost('api/bossApi/role/list', params)
  },
  // 角色集合-全部
  getAllRoleList: (params) => {
    return axiosPost('api/bossApi/role/alllist', params)
  },
  // 添加编辑账号
  addOrEditStaff: (params) => {
    return axiosPost('api/bossApi/staff/addoredit', params)
  },
  // 删除账号
  todeleteUser: (params) => {
    return axiosPost('api/bossApi/staff/delete?id=' + params, {})
  },
  // 删除角色
  todeleteRole: (params) => {
    return axiosPost('api/bossApi/role/delete?id=' + params, {})
  },
  // 获取权限集合
  getAllRightList: () => {
    return axiosGet('api/bossApi/right/list')
  },
  // 获取id权限集合
  getIdRightList: (params) => {
    return axiosGet('api/bossApi/right/byroleidgetlist?id=' + params)
  },
  // 新增或者编辑角色
  addOrEditRole: (params) => {
    return axiosPost('api/bossApi/role/addoredit', params)
  },
  // 更改账号密码
  changePwd: (params) => {
    return axiosPost('api/bossApi/staff/updatapwd', params)
  }
}
=======
import { axiosPost, axiosGet } from './base'

export default {
  // 员工登录
  login: (params) => {
    return axiosPost('api/bossApi/staff/login', params)
  },
  // 退出登录
  loginOut: (params) => {
    return axiosPost('api/bossApi/staff/login', params)
  },
  // 员工账号集合
  getEmployeeList: (params) => {
    return axiosPost('api/bossApi/staff/list', params)
  },
  // 角色集合
  getRoleList: (params) => {
    return axiosPost('api/bossApi/role/list', params)
  },
  // 角色集合-全部
  getAllRoleList: (params) => {
    return axiosPost('api/bossApi/role/alllist', params)
  },
  // 添加编辑账号
  addOrEditStaff: (params) => {
    return axiosPost('api/bossApi/staff/addoredit', params)
  },
  // 删除账号
  todeleteUser: (params) => {
    return axiosPost('api/bossApi/staff/delete?id=' + params, {})
  },
  // 删除角色
  todeleteRole: (params) => {
    return axiosPost('api/bossApi/role/delete?id=' + params, {})
  },
  // 获取权限集合
  getAllRightList: () => {
    return axiosGet('api/bossApi/right/list')
  },
  // 获取id权限集合
  getIdRightList: (params) => {
    return axiosGet('api/bossApi/right/byroleidgetlist?id=' + params)
  },
  // 新增或者编辑角色
  addOrEditRole: (params) => {
    return axiosPost('api/bossApi/role/addoredit', params)
  },
  // 更改账号密码
  changePwd: (params) => {
    return axiosPost('api/bossApi/staff/updatapwd', params)
  }
}
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296

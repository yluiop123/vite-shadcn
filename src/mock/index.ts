import groupHandlers from './components/group'
import loginUserHandlers from './login/user'
import systemRoleHandlers from './system/role'
import systemUserHandlers from './system/user'
export default [
    ...loginUserHandlers,
    ...groupHandlers,
    ...systemUserHandlers,
    ...systemRoleHandlers,
]

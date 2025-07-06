import groupHandlers from './components/group'
import userHandlers from './login/user'
import systemHandlers from './system/user'
export default [...userHandlers,...systemHandlers,...groupHandlers]

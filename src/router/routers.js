import Component1 from '../pages/Component1'
import Component2 from '../pages/Component2'

let routes = [
  {
    path: '/',
    component: Component1,
    exact: true,
  },
  {
    path: '/two',
    component: Component2,
  },
  {
    path: '/',
    component: Component1,
    exact: true,
  },
  {
    path: '/two',
    component: Component2,
  },
]

export default routes

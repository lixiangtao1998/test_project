import './index.less'
import './index.css'
import React from 'react'
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'
import routes from './router/routers'
import { Button } from 'antd'
import 'antd/dist/antd.css'

// const sum = (a, b) => {
//   return a + b
// }

// const res = sum(2, 2)
// console.log(res)

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(224)
//   }, 1000)
// })

// promise.then(res => {
//   console.log(res)
// })

ReactDom.render(
  <Router>
    <div>
      <Link to="/">
        <Button type="primary">组件一</Button>
      </Link>
      <Link to="/two">
        <Button type="primary">组件二</Button>
      </Link>
      <Routes>
        {routes.map((value, key) => {
          if (value.exact) {
            return (
              <Route
                exact
                path={value.path}
                element={<value.component />}
                key={key}
              />
            )
          } else {
            return (
              <Route
                path={value.path}
                element={<value.component />}
                key={key}
              ></Route>
            )
          }
        })}
      </Routes>
    </div>
  </Router>,
  document.getElementById('atao')
)

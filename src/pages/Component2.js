import React, { useEffect } from 'react'
import axios from 'axios'

const Component = () => {
  useEffect(() => {
    axios.get('http://172.16.11.10:3000/api/lxt').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div>
      <h3>组件2</h3>
    </div>
  )
}

export default Component

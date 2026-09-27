
import React from 'react'
import {RouterProvider} from 'react-router'
import router from './app.route'
import { Provider } from 'react-redux'
import {appStore} from '../app/app.store'

const App = () => {
  return (
    <>
    <Provider store={appStore}>
    <RouterProvider  router={router} />
    </Provider>
    </>
  )
}

export default App
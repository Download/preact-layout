import { h, render } from 'react'
import AppLayout from './components/App/AppLayout'
import HomePage from './components/HomePage'

render(
  <AppLayout>
    <HomePage />
  </AppLayout>,
  document.getElementById('root')
)

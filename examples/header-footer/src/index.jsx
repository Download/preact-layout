import { h, render } from 'preact'
import { MyLayout } from './components/Layouts'
import HomePage from './components/HomePage'

render(
  <MyLayout>
    <HomePage />
  </MyLayout>,
  document.getElementById('root')
)

import { h, render } from 'preact'
import MyLayout from './components/MyLayout'
import MyComponent from './components/MyComponent'

render(
  <MyLayout>
  	<MyComponent />
  </MyLayout>
	,
  document.getElementById('root')
)


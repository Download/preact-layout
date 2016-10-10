import { h } from 'preact'
import { Header, Footer } from './Layouts'

function HomePage({children}) {return (
	<div>
		<Header>
			<h1>HomePage</h1>
		</Header>

		<p>This is the homepage. Isnt it cool?</p>

		<Footer>
			Thanks for your interest in preact-layout!
		</Footer>
	</div>
)}

export default HomePage

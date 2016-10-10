import { h } from 'preact'
import { Layout, Section } from 'preact-layout'

function Header(){}

function Footer(){}

function MyLayout({children}) {return (
	<Layout>
		<header>
			<Section type={Header}><h1>Default title</h1></Section>
		</header>

		<Section>
			{children}
		</Section>

		<footer>
			<Section type={Footer}>Default footer here!! :)</Section>
		</footer>
	</Layout>
)}

function ReversedLayout({children}) {return (
	<Layout>
		<footer>
			<Section type={Footer}>Default footer here!! :)</Section>
		</footer>

		<Section>
			{children}
		</Section>

		<header>
			<Section type={Header}><h1>Default title</h1></Section>
		</header>
	</Layout>
)}

export {
	Header,
	Footer,
	MyLayout,
	ReversedLayout
}

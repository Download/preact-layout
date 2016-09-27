import { h } from 'preact'
import { Layout, LayoutSection } from 'preact-layout'

function AppLayout({ children, ...props }) {
	return (
		<Layout {...props}>

			<LayoutSection name="Header">
				<h1>My App</h1>
			</LayoutSection>

			<LayoutSection>
				{children}
			</LayoutSection>

			<LayoutSection name="Footer">
				Default footer here!!  :)
			</LayoutSection name="Footer">
		</Layout>
	)
}

export default AppLayout

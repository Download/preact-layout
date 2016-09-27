import { h } from 'preact'
import { Layout, LayoutSection } from 'preact-layout'

function MyLayout({children, ...props}) {
	return (
		<Layout>
			<LayoutSection name="Header" />
			
			<LayoutSection>
				{children}
			</LayoutSection>

			<LayoutSection name="Footer" />
		</Layout>
		)
	}
}

export default MyLayout

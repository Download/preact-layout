import { h } from 'preact'
import { LayoutContribution } from 'preact-layout'

function HomePage({children, ...props}) {
	return (
		<section className="HomePage" {...props}>
			<LayoutContribution name="Header">
				<h1>HomePage</h1>
			</LayoutContribution>

			<p>This is the homepage. Isnt it cool?</p>

			<LayoutContribution name="Footer">
				Thanks for your interest in preact-layout!
			</LayoutContribution>
			}
		</section>
	)
}

Posts.propTypes = {
	posts: PropTypes.array.isRequired
}

export default HomePage

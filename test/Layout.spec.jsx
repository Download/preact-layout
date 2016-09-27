import { h } from 'preact'
import render from 'preact-render-to-string'

import { Layout, Section, Contribution } from '../src'

describe('Layout', () => {
  it('is a function', () => {
    expect(typeof Layout).toBe('function')
  })

	it('works', () => {
		function MyLayout({children, ...props}) {
			return (
				<Layout>
					<Section name="A"><i>A</i></Section>
					<Section name="main">{children}</Section>
					<Section name="B"><i>B</i></Section>
				</Layout>
			)
		}

		const result = render(
			<MyLayout>
				<Contribution name="A"><b>A</b></Contribution>
				<article>main</article>
			</MyLayout>
		)

		console.info(result)

		expect(result).toBe('<div><b>A</b><article>main</article><i>B</i></div>')
  })

})

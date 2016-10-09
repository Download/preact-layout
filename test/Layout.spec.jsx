import { h, Component } from 'preact'
import render from 'preact-render-to-string'
import EventEmitter from 'uevents'

import { Layout, Section, getSections, isContribution, processNode } from '../src'

describe('preact-layout', () => {
  it('exports `Layout`, `Section`, `getSections`, `isContribution` and `processNode`', () => {
    expect(typeof Layout).toBe('function')
		expect(typeof Section).toBe('function')
		expect(typeof getSections).toBe('function')
		expect(typeof isContribution).toBe('function')
		expect(typeof processNode).toBe('function')
  })

	describe('Layout & Section', () => {
		it('allows children from the main section to contribute components to other sections of the layout', () => {
			function Header(){}
			function Footer(){}

			function MyPage(){
				return (
					<div>
						<Header><h1>my page</h1></Header>
						<article>main article</article>
						<Footer>goodbye</Footer>
					</div>
				)
			}

			let result = render(
				<Layout>
					<div>
						<Section type={Header}>
							<b>header</b>
						</Section>

						<Section>
							<MyPage />
						</Section>

						<Section type={Footer}>
							<i>footer</i>
						</Section>
					</div>
				</Layout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			expect(result).toBe('<div><h1>my page</h1><div><article>main article</article></div>goodbye</div>')
		})

		it('allows for the layout to be componentized separately', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children, ...props}) {
				return (
					<Layout>
						<div>
							<Section type={Header}>
								<b>header</b>
							</Section>

							<Section>
								{children}
							</Section>

							<Section type={Footer}>
								<i>footer</i>
							</Section>
						</div>
					</Layout>
				)
			}

			const result = render(
				<MyLayout>
					<Header><h1>my page</h1></Header>
					<article>main article</article>
					<Footer>goodbye</Footer>
				</MyLayout>
			)

			expect(result).toBe('<div><h1>my page</h1><article>main article</article>goodbye</div>')
		})

		it('allows contributions from nested children', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children, ...props}) {return (
				<Layout>
					<div>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>

						<Section>{children}</Section>

						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
					</div>
				</Layout>
			)}

			function MyPage(){
				return (
					<div>
						<Header><h1>my page</h1></Header>
						<article>main article</article>
						<Footer>goodbye</Footer>
					</div>
				)
			}

			let result = render(
				<MyLayout>
					<MyPage />
				</MyLayout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			const expectedResult = `
				<div>
					<header>
						<h1>my page</h1>
					</header>
					<div>
						<article>main article</article>
					</div>
					<footer>
						goodbye
					</footer>
				</div>
			`.replace(/\s+</g, '<').replace(/>\s+/g, '>')

			expect(result).toBe(expectedResult)
		})

		it('recurses 9 levels by default', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children, ...props}) {
				return (
					<Layout>
						<div>
							<Section type={Header}>
								<b>header</b>
							</Section>

							<Section>
								{children}
							</Section>

							<Section type={Footer}>
								<i>footer</i>
							</Section>
						</div>
					</Layout>
				)
			}

			function MyPage(){
				return (
					<div>
						<Header><h1>my page</h1></Header>
						<article>main article</article>
						<Footer>goodbye</Footer>
					</div>
				)
			}

			function Level({children}){
				return <div>{children}</div>
			}

			// 2 levels
			// nested children above tested 1 level deep, this tests 2 levels deep
			let result = render(
				<MyLayout>
					<Level>
						<MyPage />
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 3 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<MyPage />
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 4 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<MyPage />
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 5 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<MyPage />
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 6 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<Level>
										<MyPage />
									</Level>
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 7 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<Level>
										<Level>
											<MyPage />
										</Level>
									</Level>
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 8 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<Level>
										<Level>
											<Level>
												<MyPage />
											</Level>
										</Level>
									</Level>
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 9 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<Level>
										<Level>
											<Level>
												<Level>
													<MyPage />
												</Level>
											</Level>
										</Level>
									</Level>
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 10 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<Level>
								<Level>
									<Level>
										<Level>
											<Level>
												<Level>
													<Level>
														<MyPage />
													</Level>
												</Level>
											</Level>
										</Level>
									</Level>
								</Level>
							</Level>
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).toBe(-1)
		})


		it('allows the recursion depth to be set on the layout', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children, ...props}) {
				return (
					<Layout recurse={2}>
						<div>
							<Section type={Header}>
								<b>header</b>
							</Section>

							<Section>
								{children}
							</Section>

							<Section type={Footer}>
								<i>footer</i>
							</Section>
						</div>
					</Layout>
				)
			}

			function MyPage(){
				return (
					<div>
						<Header><h1>my page</h1></Header>
						<article>main article</article>
						<Footer>goodbye</Footer>
					</div>
				)
			}

			function Level({children}){
				return <div>{children}</div>
			}

			// 2 levels
			// nested children above tested 1 level deep, this tests 2 levels deep
			let result = render(
				<MyLayout>
					<Level>
						<MyPage />
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).not.toBe(-1)

			// 3 levels
			result = render(
				<MyLayout>
					<Level>
						<Level>
							<MyPage />
						</Level>
					</Level>
				</MyLayout>
			)

			expect(result.indexOf('my page')).toBe(-1)
		})

		it('allows contribution functions to be used across multiple layouts', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children, ...props}) {return (
				<Layout>
					<div>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>
						<Section>{children}</Section>
						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
					</div>
				</Layout>
			)}

			function ReversedLayout({children, ...props}) {return (
				<Layout>
					<div>
						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
						<Section>{children}</Section>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>
					</div>
				</Layout>
			)}

			function MyPage(){return (
				<div>
					<Header><h1>my page</h1></Header>
					<article>main article</article>
					<Footer>goodbye</Footer>
				</div>
			)}

			let result = render(
				<MyLayout>
					<MyPage />
				</MyLayout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			const expectedResult = `
				<div>
					<header>
						<h1>my page</h1>
					</header>
					<div>
						<article>main article</article>
					</div>
					<footer>
						goodbye
					</footer>
				</div>
			`.replace(/\s+</g, '<').replace(/>\s+/g, '>')

			expect(result).toBe(expectedResult)

			result = render(
				<ReversedLayout>
					<MyPage />
				</ReversedLayout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			const reversedExpected = `
				<div>
					<footer>
						goodbye
					</footer>
					<div>
						<article>main article</article>
					</div>
					<header>
						<h1>my page</h1>
					</header>
				</div>
			`.replace(/\s+</g, '<').replace(/>\s+/g, '>')

			expect(result).toBe(reversedExpected)
		})

		it('works with component classes as well', () => {
			function Header(){}
			function Footer(){}

			class MyLayout extends Component {
				render({children, ...props}) {return (
					<Layout>
						<div>
							<header>
								<Section type={Header}><b>header</b></Section>
							</header>
							<Section>{children}</Section>
							<footer>
								<Section type={Footer}><i>footer</i></Section>
							</footer>
						</div>
					</Layout>
				)}
			}

			class ReversedLayout extends Component {
				render({children, ...props}) {return (
					<Layout>
						<div>
							<footer>
								<Section type={Footer}><i>footer</i></Section>
							</footer>
							<Section>{children}</Section>
							<header>
								<Section type={Header}><b>header</b></Section>
							</header>
						</div>
					</Layout>
				)}
			}

			class MyPage extends Component {
				render(){return (
					<div>
						<Header><h1>my page</h1></Header>
						<article>main article</article>
						<Footer>goodbye</Footer>
					</div>
				)}
			}

			let result = render(
				<MyLayout>
					<MyPage />
				</MyLayout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			const expectedResult = `
				<div>
					<header>
						<h1>my page</h1>
					</header>
					<div>
						<article>main article</article>
					</div>
					<footer>
						goodbye
					</footer>
				</div>
			`.replace(/\s+</g, '<').replace(/>\s+/g, '>')

			expect(result).toBe(expectedResult)

			result = render(
				<ReversedLayout>
					<MyPage />
				</ReversedLayout>
			)

			// work around preact-render-to-string generating comment
			// nodes for empty (null/undefined) vdom elements. It's
			// a bug according to Jason
			result = result.replace(/<!---->/g, '')

			const reversedExpected = `
				<div>
					<footer>
						goodbye
					</footer>
					<div>
						<article>main article</article>
					</div>
					<header>
						<h1>my page</h1>
					</header>
				</div>
			`.replace(/\s+</g, '<').replace(/>\s+/g, '>')

			expect(result).toBe(reversedExpected)
		})
	})


	describe('getSections(vnode)', () => {
		it('accepts a vnode (or array of vnodes) and returns any sections found in it', () => {
			function Header(){}
			function Footer(){}

			const children = undefined
			const markup = (
				<Layout>
					<div>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>
						<Section>{children}</Section>
						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
					</div>
				</Layout>
			)
			const result = getSections(markup)
			const expected = {
				sections:[
					<Section type={Header}><b>header</b></Section>, 
					<Section type={Footer}><i>footer</i></Section>
				], 
				main: <Section>{children}</Section>
			}
			expect(result).toEqual(expected)
		})

		it('does not render any components found (shallow search)', () => {
			function Header(){}
			function Footer(){}

			function MyLayout({children}) {return (
				<Layout>
					<div>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>
						<Section>{children}</Section>
						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
					</div>
				</Layout>
			)}
			const markup = <MyLayout />
			const result = getSections(markup)
			const expected = {
				sections:[], 
				main: undefined
			}
			expect(result).toEqual(expected)
		})
	})


	describe('isContribution(vnode, sections)', () => {
		it('accepts a single vnode and an array of sections', () => {
			function Header(){}
			const markup = <div />
			const { sections } = getSections(markup)
			const result = isContribution(<Header />, sections)
			const expected = false
			expect(result).toBe(expected)
		})

		it('returns true if the vnode is a contribution for any of the given sections', () => {
			function Header(){}
			function Footer(){}
			const children = undefined
			const markup = (
				<Layout>
					<div>
						<header>
							<Section type={Header}><b>header</b></Section>
						</header>
						<Section>{children}</Section>
						<footer>
							<Section type={Footer}><i>footer</i></Section>
						</footer>
					</div>
				</Layout>
			)
			const { sections } = getSections(markup)
			const result = isContribution(<Header />, sections)
			const expected = true
			expect(result).toBe(expected)
		})
	})
})


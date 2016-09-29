import { h } from 'preact'
import render from 'preact-render-to-string'

import { Layout, Section } from '../src'

describe('preact-layout', () => {
  it('exports Layout and Section', () => {
    expect(typeof Layout).toBe('function')
		expect(typeof Section).toBe('function')
  })

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

		const result = render(
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

		const result = render(
			<MyLayout>
				<MyPage />
			</MyLayout>
		)

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

	it('allows component section functions to be used across multiple layouts', () => {
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

		const result = render(
			<MyLayout>
				<MyPage />
			</MyLayout>
		)

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

		const reversedResult = render(
			<ReversedLayout>
				<MyPage />
			</ReversedLayout>
		)

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

		expect(reversedResult).toBe(reversedExpected)
  })
})

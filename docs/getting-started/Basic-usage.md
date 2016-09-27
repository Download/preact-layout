# Basic Usage

Use `Layout` to create a region which is subdivided in sections. Use `LayoutSection` to create those sections. Each section **must** have a name and one section **must** have the name `main`. The `children`, if any, **must** be added to the `main` section.

Have a look at this example:

```js
function MyLayout({children, ...props}) {
	return (
		<Layout {...props}>
			<LayoutSection name="header" />
			<LayoutSection name="main">{children}</LayoutSection>
			<LayoutSection name="footer" />
		</Layout>
	)
}
```

Much simpler than it sounded right? But here's the cool trick: Any children passed to the `main` section will be rendered before the sections themselves and if the produce `LayoutContribution`s, those contributions will be moved to the correct section based on the name. 

Again have a look at an example:

```js
function HomePage({children, ...props}) {
	return (
		<div>
			<LayoutContribution name="header">
				<h1>This is the homepage!</h1>
			</LayoutContribution>

			<p>And that's how Layout works. It takes the contributions made by the children and shows them in the correct region of the page.</p>

			<LayoutContribution name="footer">
				<p>Thank you for visiting!</p>
			</LayoutContribution>
		</div>
	)
}
```

The magic happens when we combine the layout and the page we just created:

```js
function Website({children, ...props}) {
	return (
		<MyLayout>
			<HomePage />
		</MyLayout>
	)
}

```

The contributions made by HomePage will show up in the correct places!

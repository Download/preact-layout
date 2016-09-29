# Basic Usage

Define *contribution functions* to represent the different sections of your website / app:
```js
function Header(){}
function Footer(){}
```

Then use `Layout` to create a layout which is subdivided in sections. Use `Section`
to create those sections. There should be exactly one main section (not associated
with a contribution function) and any `children` should be rendered inside this main section.
In addition, layouts can have zero or more extra sections, each of which must be
associated with a different contribution function, using the `type`  attribute.

Have a look at this example:

```js
function MyLayout({children}) {
	return (
		<Layout>
			<header>
				<Section type={Header}><h1>Default title</h1></Section>
			</header>

			<Section>{children}</Section>

			<footer>
				<Section type={Footer}><i>Default footer</i></Section>
			</footer>
		</Layout>
	)
}
```

Much simpler than it sounded right? But here's the cool trick: Any children
of the main section will be rendered before the sections themselves and if they
produce *layout contributions*, those contributions will be moved to the correct
section based on the associated contribution function.

Again have a look at an example:

```js
function HomePage({children}) {
	return (
		<div>
			<Header><h1>This is the homepage!</h1></Header>

			<p>And thats how preact-layout works. It takes the contributions made by the
			children and shows them in the correct region of the layout.</p>

			<Footer><p>Thank you for visiting!</p></Footer>
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

`Website` will render this output:

```html
<div>
  <header>
		<h1>This is the homepage!</h1>
	</header>
	<div>
		<p>And thats how preact-layout works. It takes the contributions made by the
		children and shows them in the correct region of the layout.</p>
	</div>
	<footer>
		<p>Thank you for visiting!</p>
	</footer>
</div>
```

Because we separated the layout concerns from the `HomePage` component, we
can easily make an alternative layout and use that instead:

```js
function ReversedLayout({children}) {
	return (
		<Layout>
			<footer>
				<Section type={Footer}><i>Default footer</i></Section>
			</footer>

			<Section>{children}</Section>

			<header>
				<Section type={Header}><h1>Default title</h1></Section>
			</header>
		</Layout>
	)
}
```

Change `Website` to use the alternative layout and you're done:

```js
function Website({children, ...props}) {
	return (
		<ReversedLayout>
			<HomePage />
		</ReversedLayout>
	)
}
```

The contributions made by `HomePage` will automatically land in the correct place:

```html
<div>
	<footer>
		<p>Thank you for visiting!</p>
	</footer>
	<div>
		<p>And thats how preact-layout works. It takes the contributions made by the
		children and shows them in the correct region of the layout.</p>
	</div>
	<header>
		<h1>This is the homepage!</h1>
	</header>
</div>
```


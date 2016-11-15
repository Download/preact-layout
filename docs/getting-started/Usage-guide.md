# Usage Guide

Using preact-layout requires you to:
* Define contribution functions 
* Create a layout referncing these contribution functions 
* Make components that use the contribution functions 
* Learn about caveats

## Define contribution functions 
Define *contribution functions* to represent the different sections 
of your website / app:
```js
function Header(){}
function Footer(){}
```
These functions's don't do anything in and of themselves, but they serve as
symbols that can be used by both layouts and regular components.

## Create a layout
Use `Layout` to create a layout which is subdivided in sections. Use `Section`
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
 

## Make components that use the contribution functions
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
As you can see, in our components, we wrap the content that we want to 
contribute to other sections of the layout in JSX tags created from our
contribution functions. 

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

## Caveats
In the examples above we used stateless functional components. 
But preact-layout can be used with class components just as well:

```js
class HomePage extends Component {
	render({children}) {return (
		<div>
			<Header><h1>This is the homepage!</h1></Header>

			<p>And thats how preact-layout works. It takes the contributions made by the
			children and shows them in the correct region of the layout.</p>

			<Footer><p>Thank you for visiting!</p></Footer>
		</div>
	)}
}
```

This works just as great. But things become a bit more tricky when
we start using *stateful* class components. Consider this example:

```js
class HomePage extends Component {
	state = {text: 'Hello, world!'};

	render({children}, {text}) {return (
		<div>
			<Header><h1>{text}</h1></Header>

			<p>This paragraph is in the main section</p>
			<input value={text} onInput={ this.linkState('text') } />

			<Footer><p>Thank you for visiting!</p></Footer>
		</div>
	)}
}
```

This will render fine and appears to work, until we change the text 
in the input. The changes will not be reflected in the header. The reason
for this is that the children of the `<Header>` tag are actually moved
outside of the `HomePage` component by the layout, so Preact does not 
re-render them in response to state changes. 

The children of the `HomePage` that are not contributed to other sections
will respond to state changes as expected. Also, you are free to  
contribute stateful components. It's just that inside the component 
making the contributions, local state is not accessible in the
contributed sections.

So either make components that contribute markup to the layout stateless,
or take care to only make use of state in the main section of the
component and not in those sections that are contributed to the layout.

The [Preact Layout Kickstart CodePen](http://codepen.io/StijnDeWitt/pen/rrzJEA) actually demonstrates this.

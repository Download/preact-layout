# preact-layout
#### Small and simple layout library for Preact.

[![npm](https://img.shields.io/npm/v/preact-layout.svg)](https://npmjs.com/package/preact-layout)
[![license](https://img.shields.io/npm/l/preact-layout.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/preact-layout.svg)](https://travis-ci.org/Download/preact-layout)
[![greenkeeper](https://img.shields.io/david/Download/preact-layout.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

![preact layout](https://cdn.rawgit.com/download/preact-layout/0.2.0/preact-layout.png)

[Preact](https://preactjs.com/) is beautiful and pure. Literally, because with
Preact we mostly write pure components that take properties and render markup
possibly including child components that we control via their props. Information
flows one way and everything is good.

But what if a component needs to render some data in another section of the page?
In the header for example? Do we really have to make the root component aware of
the title of each page? What if we need something in the footer as well? Or in
some sidebar? We want our components to be able to contribute content to other
sections of the page, even if those sections are higher up the tree...
Is it even possible?

preact-layout does not only make this possible, it makes it **simple**!

## Getting Started
Getting started with preact-layout:
* Play with the [Preact Layout Kickstart](http://codepen.io/StijnDeWitt/pen/rrzJEA?editors=0010) CodePen.
* [Setup](https://download.github.io/preact-layout/docs/getting-started/Setup.html) - Add preact-layout to your project
* [Basic Usage](https://download.github.io/preact-layout/docs/getting-started/Basic-usage.html) - Using Layout, Section and contribution functions
* [Examples](https://download.github.io/preact-layout/docs/getting-started/Examples.html) - Learn by example!

## Why
Preact Layout elegantly solves some common layout challenges you will undoubtedly
encounter when using Preact, due to the hierarchical nature of the component
tree and the one-way data flow. Preact Layout allows you to think out of the box.

### Simple but powerful API
With just 2 components, the API is very simple to learn, yet powerful.
* [Layout](docs/api/Layout.md) to define layouts
* [Section](docs/api/Section.md) to divide the layout into multiple sections

### Lightweight
preact-layout is microscopically small. The sources are just over 2 Kb
and the minified and gzipped distribution file weighs only 1 kB.

### Well documented
A good library needs plenty of good docs. In the case of preact-layout, the
docs are way bigger than the library itself! We have a
[usage guide](https://download.github.io/preact-layout/docs/getting-started/Basic-usage.html),
[API docs](https://download.github.io/preact-layout/docs/api/),
[examples](https://download.github.io/preact-layout/docs/getting-started/Examples.html) and a
[Preact Layout Kickstart](http://codepen.io/StijnDeWitt/pen/rrzJEA?editors=0010) CodePen to learn from.

### Well tested
Good tests ensure not only that the code works, but that it keeps working! We use [Travis
CI](https://travis-ci.org/Download/preact-layout) to test every push to master so we
catch any bugs before they make it into a release.

### Open Source, Open Community
preact-layout is Open Source software with a
[public code repository](https://github.com/download/preact-layout) and
[public issue tracker](https://github.com/download/preact-layout/issues).

## Using preact-layout
* Define contribution functions
* Create a layout
* Use the contribution functions in your components
* Nest the component inside the layout

### Define contribution functions
preact-layout allows you to define [contribution functions](https://download.github.io/preact-layout/docs/api/contribution-functions.html)
that are used as JSX tags that signal that the components contained in those tags
should be contributed to *another section* of the parent layout.

For example, for a simple layout with a header and a footer around some main
content block, we might define these functions:

```js
function Header(){}
function Footer(){}
```

### Create a layout
Create a layout with sections for the Header and Footer:

```js
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
```

### Use the contribution functions in your components
Now, we can build components that use the contribution functions to contribute
components to the related sections of the layout:

```js
function MyPage(){return (
	<div>
		<Header><h1>my page</h1></Header>
		<article>main article</article>
		<Footer>goodbye</Footer>
	</div>
)}
```

### Nest the component inside the layout
Finally, render the component nested within the layout:

```js
render(
	<MyLayout>
		<MyPage />
	</MyLayout>
	,
	document.getElementsByTagName('body')[0]
)
```

This will result in:

```html
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
```
Read more in the [Basic Usage Guide](https://download.github.io/preact-layout/docs/getting-started/Basic-usage.html).

## Component Reference
* [Layout](https://download.github.io/preact-layout/docs/api/Layout.html) - Create layouts using `Layout`
* [Section](https://download.github.io/preact-layout/docs/api/Section.html) - Divide your layout into named `Section`s
* [contribution functions](https://download.github.io/preact-layout/docs/api/contribution-functions.html) - Defining conribution functions

## Performance considerations
When collecting contributions, preact-layout peeks ahead at the elements that
the child components will produce by rendering those child components. The
resulting elements could itself again contain components, which would need to
be rendered as well, leading to recursive rendering that of course comes at a
performance cost. You can tune this cost by setting the
[recurse](https://download.github.io/preact-layout/docs/api/Layout.html#recurse)
attribute on the `Layout` to some positive number. It defaults to `9`.

## Issues
Add an issue in this project's [issue tracker](https://github.com/download/preact-layout/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2016 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.


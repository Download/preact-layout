# preact-layout
#### Small and simple layout library for Preact.

[![npm](https://img.shields.io/npm/v/preact-layout.svg)](https://npmjs.com/package/preact-layout)
[![license](https://img.shields.io/npm/l/preact-layout.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/preact-layout.svg)](https://travis-ci.org/Download/preact-layout)
[![greenkeeper](https://img.shields.io/david/Download/preact-layout.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

![preact layout](https://cdn.rawgit.com/download/preact-layout/0.2.0/preact-layout.png)

**Declaratively contribute components to the parent layout**

[Preact](https://preactjs.com/) is beautiful and pure. Literally, because with
Preact we mostly write pure functions that take properties and render markup,
possibly including child components that we control via their props. Information
flows one way and everything is good.

But I just want to set the title of the page in the header. Do I really have to
make the root component aware of the title of each page? What if I need something
in the footer as well? Or in some sidebar? I want my Page
component to contribute these components to it's parent, without it knowing about
the parent and without the parent component knowing about the Page component...
Is it even possible?

preact-layout does not only make this possible, it makes it **simple**!

## Simple but powerful API
With just 2 components, the API is very simple to learn, yet powerful.
* [Layout](docs/api/Layout.md) to define layouts
* [Section](docs/api/Section.md) to divide the layout into multiple sections

## Define contribution functions
preact-layout allows you to define [contribution functions](docs/api/contribution-functions.md)
that are used as JSX tags that signal that the components contained in those tags
should be contributed to *another section* of the parent layout.

For example, for a simple layout with a header and a footer around some main
content block, we might define these functions:

```js
function Header(){}
function Footer(){}
```

Then, create a layout with Header and Footer sections:

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

You can now change the layout completely separate from the component. As long
as both refer to the same contribution functions `Header` and `Footer`
(which you create and are custom to your app), things will work as expected.

You can reuse those contribution functions across multiple layouts:

```js
function ReversedLayout({children}) {return (
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
```
> Note how `ReversedLayout` also uses `Footer` and `Header` contribution functions

We can now simply render `MyPage` with this new `ReversedLayout` and get a
completely different end result without changing one line of code in the
`MyPage` component:

```js
render(
	<ReversedLayout>
		<MyPage />
	</ReversedLayout>
	,
	document.getElementsByTagName('body')[0]
)
```

Renders:

```html
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
```

## Getting Started
Getting started with preact-layout:
* [Setup](docs/getting-started/Setup.md) - Add preact-layout to your project
* [Basic Usage](docs/getting-started/Basic-usage.md) - Using Layout, Section and contribution functions
* [Examples](docs/getting-started/Examples.md) - Learn by example!

## Component Reference
* [Layout](docs/api/Layout.md) - Create layouts using `Layout`
* [Section](docs/api/Section.md) - Divide your layout into named `Section`s
* [contribution functions](docs/api/contribution-functions.md) - Defining conribution functions

## Performance considerations
When collecting contributions, preact-layout peeks ahead at the elements that
the child components will produce by rendering those child components. The
resulting elements could itself again contain components, which would need to
be rendered as well, leading to recursive rendering that of course comes at a
performance cost. You can tune this cost by setting the `recurse` attribute on
the `Layout` to some positive number. It defaults to `9`.

## Issues
Add an issue in this project's [issue tracker](https://github.com/download/preact-layout/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2016 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.


# Contribution functions

Contribution functions act a bit like ES6 symbols, or 'tagging interfaces' in
Java speak. They don't do anything themselves, but allow a component to interact
with a layout without being tighly coupled with it.

In the most basic scenario, we define the contribution functions right along
our layout and also import them from there in our components:

*Layout.js*
```js
function Header(){}
function Footer(){}

function MyLayout(){
	// use Header and Footer here
}

export {
	Header,
	Footer,
	MyLayout
}
```

*Component.js*
```js
import { Header, Footer } from './Layout'

function MyComponent(){
	// use Header and Footer here
}
```

If our site has many layouts and many components contributing to those
layouts, it will probably pay off to place the contribution functions in a
separate file and reuse them where needed:

*Sections.js*
```js
function Header(){}
function Footer(){}

export {
	Header,
	Footer
}
```

*Layout.js*
```js
import { Header, Footer } from './Sections'

function MyLayout(){
	// use Header and Footer here
}
export {
	MyLayout
}
```

*Component.js*
```js
import { Header, Footer } from './Sections'

function MyComponent(){
	// use Header and Footer here
}
```

## Attributes
### append
When set, any contributions found will be `appended` to any existing
default elements / prior contributions, instead of replacing them (default)

### prepend
When set, any contributions found will be `prepended` before any existing
default elements / prior contributions, instead of replacing them (default)

## Example
*(assuming `Header` is a contribution function)*
```js
function MyComponent(){return (
	<div>
		<Header append>
			<b>This will be appended to the header section instead of replacing it</b>
		</Header>

		<p>Stuff here ends up in the main section</p>
	</div>
)}
```

## See also
* [Layout](Layout.md)
* [Section](Section.md)

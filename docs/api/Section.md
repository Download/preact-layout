# Section

A preact-layout `Section`:
* Defines where components will be rendered within a parent `Layout`
* Has a `type` attribute to associate it with a contribution function, or
* Is a 'main' section (no `type` attribute)

## Attributes
### type
The contribution function this section should be associated with
Optional. Function. Defaults to `undefined`

## Example
```js
<Section type={Header}>
	<i>This markup will be used when no contributions are found</i>
</Section>
```

## See also
* [Layout](Layout.md)
* [contribution functions](contribution-functions.md)

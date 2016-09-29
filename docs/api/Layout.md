# Layout

A preact-layout `Layout`:
* Defines a layout with exactly one 'main' section and zero or more sections that are associated with a contribution function.
* Collects layout *contributions* from the children of the main section and renders those contributions in the associated other sections of the layout
* Recursively renders children of the main section to discover contributions.
* By default recurses 9 levels deep
* Allows the recursion level to be specified as a component attribute

## Attributes

### recurse
The maximum recursion depth. Optional. Number.
Defaults to `9`

## See also
* [Section](Section.md)
* [contribution functions](contribution-functions.md)

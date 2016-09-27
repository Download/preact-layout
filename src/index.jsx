import { h } from 'preact'

function Layout({children, ...props}) {
	let sections = children ? getSections(children) : []
	const main = sections.filter(s => s.attributes && s.attributes.name === 'main')[0]
	sections = sections.filter(s => s !== main)
	if (main && main.children) {
		const rendered = main.nodeName({...main.attributes, children:main.children})
		if (rendered && rendered.children) {
			sections.forEach(s => {
				const contributions = getContributions(rendered.children, s.attributes.name)
				if (contributions.length) {s.children = contributions}
			})
		}
	}
	children = filter(children)
	return children && children.length === 1 ? children[0] : <div>{children}</div>
}

function Section({name, children, ...props}) {
	const filtered = name === 'main' && children
			? children.filter(c => c.nodeName !== Contribution || (c.children && c.children.length))
			: children
	return filtered && filtered.length === 1
			? filtered[0]
			: <div {...props}>{filtered}</div>
}

function Contribution(){return ''}

const
getSections = nodes => get(nodes,
		n => n.nodeName === Section,
		n => [n]
),
getContributions = (nodes, name) => get(nodes,
		n => n.nodeName === Contribution && n.attributes && n.attributes.name === name,
		n => n.children
),
get = (nodes, include, grab) => {
	const results = []
	nodes.forEach(n => {
		if (include(n)) results.push.apply(results, grab(n))
		else if (n.children) results.push.apply(results, get(n.children, include, grab))
	})
	return results
},
filter = (nodes) => {
	var results = []
	nodes && nodes.forEach(n => {
		if (n.nodeName !== Contribution) {
			n.children && (n.children = filter(n.children))
			results.push(n)
		}
	})
	return results
}

export {
  Layout,
  Section,
  Contribution
}

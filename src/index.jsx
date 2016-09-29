import { h } from 'preact'

function Layout({className, recurse, children, ...props}) {
	if (recurse === undefined) recurse = 9
	let sections = getSections(children)
	const main = sections.filter(s => !s.attributes || !s.attributes.type)[0]
	sections = sections.filter(s => s.attributes && s.attributes.type)
	const contributions = {}
	sections.forEach(s => contributions[s.attributes.type] = s.children || [])
	if (main && main.children) {
		main.children = collect(main.children, sections, contributions, recurse)
		sections.forEach(s => {
			let contribution = contributions[s.attributes.type]
			s.children = contributions[s.attributes.type]
		})
	}
	return children && children.length === 1 ? children[0] : (
		<div className={className || 'Layout'}>{children}</div>
	)
}

function Section({type, children, ...props}) {
	return children && (children.length === 1) ? children[0] : (
		<div {...props}>{children}</div>
	)
}

function getSections(nodes) {
	const results = []
	nodes && nodes.forEach(n => {
		if (n.nodeName === Section) results.push(n)
		results.push.apply(results, getSections(n.children))
	})
	return results
}

function collect(nodes, sections, results, recurse) {
	const leftovers = []
	nodes && nodes.forEach(n => {
		if (isContribution(n, sections)) {
			if (! results[n.nodeName]) results[n.nodeName] = []
			const contributions = n.children || []
			if (n.attributes && n.attributes.append) results[n.nodeName].push.apply(results[n.nodeName], contributions)
			else if (n.attributes && n.attributes.prepend) results[n.nodeName].unshift.apply(results[n.nodeName], contributions)
			else results[n.nodeName] = contributions
			return
		}
		if (typeof n.nodeName == 'function' && recurse) {
			n = n.nodeName({...n.attributes, children:n.children})
			recurse--
		}
		leftovers.push(n)
		if (n && n.children) n.children = collect(n.children, sections, results, recurse)
	})
	return leftovers
}

function isContribution(n, sections) {
	const filtered = sections.filter(s => n.nodeName === s.attributes.type)
	return filtered.length > 0
}

export {
  Layout,
  Section,
}

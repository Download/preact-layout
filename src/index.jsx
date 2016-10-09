import { h, Component } from 'preact'

class Layout extends Component {
	render({className, recurse, children, ...props}, context) {
		const { main, sections } = getSections(children)
		processNode(main, sections, { ...context }, recurse)
		return children && children.length === 1 ? children[0] : (
			<div className={className || 'Layout'}>{children}</div>
		)
	}
}

class Section extends Component {
	render ({type, children, ...props}) {
		return children && (children.length === 1) ? children[0] : (
			<div {...props}>{children}</div>
		)
	}
}

function getSections(n, result) {
	if (!result) result = {sections:[]}
	if (n.nodeName === Section) {
		if (n.attributes && n.attributes.type) result.sections.push(n)
		else result.main = n
	}
	const children = Array.isArray(n) ? n : n.children
	children && children.forEach(c => {
		getSections(c, result)
	})
	return result
}

function processNode(node, sections, context, recurse, collectOnly, results) {
	const leftovers = [], postProcess = !results
	context = context || {}
	if (recurse === undefined) recurse = 9
	results = results || {}
	sections.forEach(s => results[s.attributes.type] = results[s.attributes.type] || s.children || [])
	node && node.children && node.children.forEach(n => {
		if (isContribution(n, sections)) {
			if (! results[n.nodeName]) results[n.nodeName] = []
			if (n.attributes && n.attributes.append) results[n.nodeName].push.apply(results[n.nodeName], n.children || [])
			else if (n.attributes && n.attributes.prepend) results[n.nodeName].unshift.apply(results[n.nodeName], n.children || [])
			else results[n.nodeName] = n.children || []
			return
		}
		if (typeof n.nodeName == 'function' && recurse) {
			let props = { ...n.nodeName.defaultProps, ...n.attributes, children:n.children }
			if (n.nodeName.prototype && typeof n.nodeName.prototype.render == 'function') {
				let c = new n.nodeName(props, context);
				c.props = props;
				c.context = context;
				if (c.componentWillMount) c.componentWillMount();
				n = c.render(c.props, c.state, c.context);
				if (c.getChildContext) context = { ...context, ...c.getChildContext() }
			}	
			else n = n.nodeName(props, context)
			recurse--
		}
		leftovers.push(n)
		processNode(n, sections, context, recurse, collectOnly, results)
	})
	if (! collectOnly) {
		if (node.children) node.children = leftovers
		if (postProcess) sections.forEach(s => s.children = results[s.attributes.type])
	}
	return results
}

function isContribution(n, sections) {
	const filtered = sections.filter(s => n.nodeName === s.attributes.type)
	return filtered.length > 0
}


export {
  Layout,
  Section,
	getSections,
	isContribution,
	processNode
}

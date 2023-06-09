// @ts-nocheck
import { h, Component, toChildArray } from 'preact';
function getChildren(node) {
  return ((node || {}).props || {}).children || (node || {}).children;
}

function getComponentType(node) {
  return (node || {}).type || (node || {}).nodeName;
}

function getProps(node) {
  return (node || {}).props || (node || {}).attributes;
}

function getPropsType(node) {
  return (getProps(node) || {}).type;
}

function Layout({ className, recurse, children, ...props }, context) {
  const { main, sections } = getSections(children);
  processNode(main, sections, { ...context }, recurse);
  const arr = toChildArray(children);
  return children && arr.length === 1 ? arr[0] : <div className={className || 'Layout'}>{children}</div>;
}

function Section({ type, children, ...props }, context) {
  const arr = toChildArray(children);
  return children && arr.length === 1 ? arr[0] : <div {...props}>{children}</div>;
}

function getSections(n, result) {
  if (!result) result = { sections: [] };
  if (getComponentType(n) === Section) {
    if (n.props && n.props.type) result.sections.push(n);
    else result.main = n;
  }
  const children = n ? (Array.isArray(n) ? n : getChildren(n)) : undefined;
  children &&
  toChildArray(children).forEach(c => {
    getSections(c, result);
  });
  return result;
}

function processNode(node, sections, context, recurse, collectOnly, results) {
  const leftovers = [],
    postProcess = !results;
  context = context || {};
  if (recurse === undefined) recurse = 9;
  results = results || new Map();
  sections.forEach(s => results.set(s.props.type, results.get(s.props.type) || s.props.children || []));
  getChildren(node) &&
  toChildArray(getChildren(node)).forEach(n => {
    if (isContribution(n, sections)) {
      if (!results.has(n.type)) results.set(n.type, []);
      if (n.props && n.props.append) results.get(n.type).push.apply(results.get(n.type), n.props.children || []);
      else if (n.props && n.props.prepend)
        results.get(n.type).unshift.apply(results.get(n.type), n.props.children || []);
      else results.set(n.type, n.props.children || []);
      return; // continue
    }
    leftovers.push(n);
    if (getComponentType(n) && recurse) {
      let props = { ...n.type.defaultProps, ...n.props, children: n.props.children };
      if (n.type.prototype && typeof n.type.prototype.render == 'function') {
        let rn,
          c = new n.type(props, context);
        c.props = props;
        c.context = context;
        if (c.componentWillMount) c.componentWillMount();
        n = c.render(c.props, c.state, c.context);
        if (c.getChildContext) context = { ...context, ...c.getChildContext() };
      } else if (typeof n.type === 'string') {
        n = h(n.type, props, getChildren(props));
      } else {
        n = n.type(props, context);
      }
      recurse--;
    }
    processNode(n, sections, context, recurse, collectOnly, results);
  });
  if (!collectOnly) {
    if (getChildren(node)) node.props.children = leftovers;
    if (postProcess) sections.forEach(s => (s.props.children = results.get(s.props.type)));
  }
  return results;
}

function isContribution(n, sections) {
  return sections.filter(s => getComponentType(n) === getPropsType(s)).length > 0;
}

export { Layout, Section, getSections, isContribution, processNode };

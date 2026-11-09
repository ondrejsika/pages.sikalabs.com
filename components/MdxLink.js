// Link used for all links in MDX content: external links open in a new tab
export default function MdxLink({ href = '', ...props }) {
  const isExternal = /^https?:\/\//.test(href) && !/^https?:\/\/pages\.sikalabs\.com(\/|$)/.test(href);

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }

  return <a href={href} {...props} />;
}

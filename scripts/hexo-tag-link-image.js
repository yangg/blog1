

// {% image src [title] %}
function imageTagRender(args) {
	let [src, title=""] = args;
	return `
<a href="${src}" title="${title}"><img src="${src}" alt="${title}"/></a>`;
}

hexo.extend.tag.register('link_image', imageTagRender);



// {% codepen slugHash [defaultTab [height]] %}
function codepenTagRender(args) {
	let [slugHash, defaultTab = 'css,result', height = 300] = args;
	return `
<p data-height="${height}" data-theme-id="light"
		data-slug-hash="${slugHash}"
		data-default-tab="${defaultTab}"
		data-user="yangg" data-embed-version="2" data-preview="true" class="codepen"></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>`;
}

hexo.extend.tag.register('codepen', codepenTagRender);

// Open Graph protocol, Twitter card, header, footer
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:url" content="' + location.href + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:title" content="' + document.querySelector("title").textContent + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:description" content="' + document.querySelector('meta[name="description"]').getAttribute("content") + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta name="twitter:card" content="summary" />');
document.querySelector("body").insertAdjacentHTML("afterbegin", "<header></header>");
document.querySelector("body").insertAdjacentHTML("beforeend", "<footer></footer>");
// set id for h2-h6 (if null)
const heads_origin = document.querySelectorAll('section:not([class]) > h2, section:not([class]) > h3, section:not([class]) > h4, section:not([class]) > h5, section:not([class]) > h6');
if (heads_origin && heads_origin.length) {
	const heads_counter = [0, 0, 0, 0, 0];
	heads_origin.forEach(head => {
		switch(head.localName) {
			case "h2":
				++heads_counter[0];
				for (let i = 1; i < 5; i++) {
					heads_counter[i] = 0;
				}
				if (head.getAttribute("id") == null) {
					head.setAttribute("id", "第" + String(heads_counter[0]) + "章");
				}
			break;
			case "h3":
				++heads_counter[1];
				for (let i = 2; i < 5; i++) {
					heads_counter[i] = 0;
				}
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(heads_counter[0])}.${String(heads_counter[1])}`);
				}
			break;
			case "h4":
				++heads_counter[2];
				heads_counter[3] = 0;
				heads_counter[4] = 0;
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(heads_counter[0])}.${String(heads_counter[1])}.${String(heads_counter[2])}`);
				}
			break;
			case "h5":
				++heads_counter[3];
				heads_counter[4] = 0;
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(heads_counter[0])}.${String(heads_counter[1])}.${String(heads_counter[2])}.${String(heads_counter[3])}`);
				}
			break;
			case "h6":
				++heads_counter[4];
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(heads_counter[0])}.${String(heads_counter[1])}.${String(heads_counter[2])}.${String(heads_counter[3])}.${String(heads_counter[4])}`);
				}
			break;
		}
	})
}
// toc-main
const h1_in_hgroup = document.querySelector("main > hgroup:first-child");
if (h1_in_hgroup == null) {
	document.querySelector("main > h1").insertAdjacentHTML("afterend", '<aside id="目次"></aside>');
} else {
	h1_in_hgroup.insertAdjacentHTML("afterend", '<aside id="目次"></aside>');
}
const heads = document.querySelectorAll('section:not([class]) > h2, section:not([class]) > h3, section:not([class]) > h4, section:not([class]) > h5, section:not([class]) > h6');
if (heads && heads.length) {
	let toc = "";
	let head_level_prev = 1;
	let head_level_now = 2;
	heads.forEach(head => {
		switch(head.localName) {
			case "h2":
				head_level_now = 2;
			break;
			case "h3":
				head_level_now = 3;
			break;
			case "h4":
				head_level_now = 4;
			break;
			case "h5":
				head_level_now = 5;
			break;
			case "h6":
				head_level_now = 6;
			break;
		}
		if (head_level_now === head_level_prev + 1) {
			toc += `<ol><li><a href="#${head.getAttribute("id")}">${head.textContent}</a>`;
			++head_level_prev;
		} else {
			while (head_level_now < head_level_prev) {
				--head_level_prev;
				toc += "</li></ol>";
			}
			toc += `</li><li><a href="#${head.getAttribute("id")}">${head.textContent}</a>`;
		} 
	})
	while (head_level_prev == 1) {
		--head_level_prev;
		toc += "</li></ol>";
	}
	document.querySelector("#目次").innerHTML = "<h2>目次</h2>" + toc + "</ol>";
}
// sidebar, link-rendering via another sidebar
const main_wrapper = Object.assign(document.createElement('div'),{id:"main-wrapper"});
const main_content = document.querySelector('main');
main_content.parentNode.insertBefore(main_wrapper, main_content);
main_wrapper.appendChild(main_content);
// document.querySelector("#main-wrapper").insertAdjacentHTML("afterbegin", '<aside id="toc-sidebar"></aside>');
document.querySelector("#main-wrapper").insertAdjacentHTML("beforeend", '<aside id="link-render"></aside>');
document.querySelectorAll("section *:any-link").forEach(link => {
	if (link.getAttribute("href").slice(0,4) != "http") {
		link.addEventListener("click", function(event) {
			event.preventDefault();
			const hash = this.hash.slice(1);
			document.getElementById("link-render").innerHTML = '<button id="delete-link-render" type="button">×</button>';
			if (this.pathname == location.pathname) {
				document.getElementById("link-render").insertAdjacentHTML("beforeend", document.getElementById(decodeURI(hash)).outerHTML);
			} else {
				fetch(this.pathname)
					.then(response => response.text())
					.then((text) => {
						return new DOMParser().parseFromString(text, "text/html");
					})
					.then((dom) => {
						const loaded = dom.getElementById(decodeURI(hash));
						document.getElementById("link-render").appendChild(loaded)
					});
			}
			document.getElementById("delete-link-render").addEventListener("click", function() {
				document.getElementById("link-render").innerHTML = "";
			});
		})
	}
});

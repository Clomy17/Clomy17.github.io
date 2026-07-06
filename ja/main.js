// Open Graph protocol, Twitter card, header, footer
const head = document.querySelector("head")
head.insertAdjacentHTML("beforeend", '<meta property="og:url" content="' + location.href + '" />');
head.insertAdjacentHTML("beforeend", '<meta property="og:title" content="' + document.querySelector("title").textContent + '" />');
head.insertAdjacentHTML("beforeend", '<meta property="og:description" content="' + document.querySelector('meta[name="description"]').getAttribute("content") + '" />');
head.insertAdjacentHTML("beforeend", '<meta name="twitter:card" content="summary" />');
const body = document.querySelector("body")
body.insertAdjacentHTML("afterbegin", "<header></header>");
body.insertAdjacentHTML("beforeend", "<footer></footer>");
// set id for h2-h6 (if null)
const headsOrigin = document.querySelectorAll('section:not([class]) > h2, section:not([class]) > h3, section:not([class]) > h4, section:not([class]) > h5, section:not([class]) > h6');
if (headsOrigin && headsOrigin.length) {
	const headsCounter = [0, 0, 0, 0, 0];
	headsOrigin.forEach(head => {
		switch(head.localName) {
			case "h2":
				++headsCounter[0];
				for (let i = 1; i < 5; i++) {
					headsCounter[i] = 0;
				}
				if (head.getAttribute("id") == null) {
					head.setAttribute("id", "第" + String(headsCounter[0]) + "章");
				}
			break;
			case "h3":
				++headsCounter[1];
				for (let i = 2; i < 5; i++) {
					headsCounter[i] = 0;
				}
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(headsCounter[0])}.${String(headsCounter[1])}`);
				}
			break;
			case "h4":
				++headsCounter[2];
				headsCounter[3] = 0;
				headsCounter[4] = 0;
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(headsCounter[0])}.${String(headsCounter[1])}.${String(headsCounter[2])}`);
				}
			break;
			case "h5":
				++headsCounter[3];
				headsCounter[4] = 0;
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(headsCounter[0])}.${String(headsCounter[1])}.${String(headsCounter[2])}.${String(headsCounter[3])}`);
				}
			break;
			case "h6":
				++headsCounter[4];
				if (head.getAttribute("id") == null) {
					head.setAttribute("id",	`節:${String(headsCounter[0])}.${String(headsCounter[1])}.${String(headsCounter[2])}.${String(headsCounter[3])}.${String(headsCounter[4])}`);
				}
			break;
		}
	})
}
// sidebar, リンク先の小窓
const main = document.querySelector('main');
// toc-main, toc-sidebar
main.insertAdjacentHTML("beforeend", '<style>nav#目次 > ol > li::marker {content: "第"counter(list-item)"章 ";} body { display: grid; column-gap: 24px; grid-template: min-content 1fr min-content / 12.25rem minmax(0,1fr); grid-template-areas: "header header" "sidebar main" "footer footer" } header {grid-area: header;} nav#目次-サイドバー {grid-area: sidebar;} main {grid-area: main; max-height: 100%} footer {grid-area: footer;} nav#目次-サイドバー > * {position: sticky; top: 20px; max-height: calc(100vh); overflow: hidden scroll; a.active {color: #ccc; font-weight: bold;}}</style>');
const h1InHgroup = document.querySelector("main > hgroup:first-child");
if (h1InHgroup == null) {
	document.querySelector("main > h1").insertAdjacentHTML("afterend", '<nav id="目次"></nav>');
} else {
	h1InHgroup.insertAdjacentHTML("afterend", '<nav id="目次"></nav>');
}
main.insertAdjacentHTML("beforebegin", '<nav id="目次-サイドバー"></nav>');
const heads = main.querySelectorAll('section:not([class]) > h2, section:not([class]) > h3, section:not([class]) > h4');
if (heads && heads.length) {
	let tocMain = "";
	let tocSide = "";
	let headLevelPrev = 1;
	let headLevelNow = 2;
	heads.forEach(head => {
		switch(head.localName) {
			case "h2":
				headLevelNow = 2;
			break;
			case "h3":
				headLevelNow = 3;
			break;
			case "h4":
				headLevelNow = 4;
			break;
		}
		if (headLevelNow === headLevelPrev + 1) {
			tocMain += `<ol><li><a href="#${head.getAttribute("id")}">${head.innerHTML}</a>`;
			tocSide += `<ul><li><a href="#${head.getAttribute("id")}" data-target="${head.getAttribute("id")}">${head.innerHTML}</a>`;
			++headLevelPrev;
		} else {
			while (headLevelNow < headLevelPrev) {
				--headLevelPrev;
				tocMain += "</li></ol>";
				tocSide += "</li></ul>";
			}
			tocMain += `</li><li><a href="#${head.getAttribute("id")}">${head.innerHTML}</a>`;
			tocSide += `</li><li><a href="#${head.getAttribute("id")}" data-target="${head.getAttribute("id")}">${head.innerHTML}</a>`;
		} 
	})
	while (headLevelPrev == 1) {
		--headLevelPrev;
		tocMain += "</li></ol>";
		tocSide += "</li></ul>";
	}
	document.getElementById("目次").innerHTML = "<h2>目次</h2>" + tocMain + "</ol>";
	document.getElementById("目次-サイドバー").innerHTML = tocSide + "</ul>";
}
const observerOptions = {
	root: null,
	rootMargin: '0px 0px -80% 0px',
	threshold: 0
}
const toc = document.getElementById('目次-サイドバー');
const tocLinks = toc.querySelectorAll('a');
const observerCallback = (entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			tocLinks.forEach(link => link.classList.remove('active'));
			const activeLink = toc.querySelector(`a[data-target="${entry.target.id}"]`)
			if (activeLink) {
				activeLink.classList.add('active');
			}
		}
	});
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
heads.forEach(heading => observer.observe(heading));
// リンク先の小窓
let linkRenderExist = false;
document.querySelectorAll("main > section *:any-link").forEach(link => {
	if (link.getAttribute("href").slice(0,4) != "http") {
		link.addEventListener("click", function(event) {
			event.preventDefault();
			if (!linkRenderExist) {
				linkRenderExist = true;
				body.insertAdjacentHTML("beforeend", '<aside id="link-render"></aside>');
				head.insertAdjacentHTML("beforeend", '<style>#link-render{ position: fixed; top: 25%; left: 10%; max-height:50%; max-width: max(80%, 1080px); overflow-y: scroll; background-color:#222; border: 1px solid #666; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 1;} #link-render-dragger{cursor: move; text-align: center; background: #444; border-bottom: 1px solid #666; user-select: none;} #delete-link-render {display:inline; margin-right: 10px; float: right; text-align: center; vertical-align: 2px; width: 24px; height: 24px; padding: 0;} #link-render {article.ax { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "公理: "; } } article.dfn { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "定義: "; } } article.prp { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "命題: "; } } article.thm { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "定理: "; } } article.lem { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "補題: "; } } article.cor { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "系: "; } } article.pblm { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "問題: "; } } }</style>');
			}
			const hash = this.hash.slice(1);
			document.getElementById("link-render").innerHTML = '<div id="link-render-dragger">ドラッグして移動<button id="delete-link-render" type="button">×</button></div>';
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
				linkRenderExist = false;
				document.getElementById("link-render").remove()
			});
			const linkRender = document.getElementById("link-render");
			const linkRenderDragger = document.getElementById("link-render-dragger");
			
			let isDragging = false;
			let offsetX = 0;
			let offsetY = 0;
			
			linkRenderDragger.addEventListener("mousedown", (e) => {
				isDragging = true;
				offsetX = e.clientX - linkRender.offsetLeft;
				offsetY = e.clientY - linkRender.offsetTop;
			});
			
			document.addEventListener("mousemove", (e) => {
				if (!isDragging) return;
				const maxX = window.innerWidth - linkRender.offsetWidth;
				const maxY = window.innerHeight - linkRender.offsetHeight;
				linkRender.style.left = Math.min(Math.max(0, e.clientX - offsetX), maxX) + "px";
				linkRender.style.top  = Math.min(Math.max(0, e.clientY - offsetY), maxY) + "px";
			});
			
			document.addEventListener("mouseup", () => {
				isDragging = false;
			});
		})
	}
});

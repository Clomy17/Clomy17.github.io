// Open Graph protocol, Twitter card, header, footer
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:url" content="' + location.href + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:title" content="' + document.querySelector("title").textContent + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta property="og:description" content="' + document.querySelector('meta[name="description"]').getAttribute("content") + '" />');
document.querySelector("head").insertAdjacentHTML("beforeend", '<meta name="twitter:card" content="summary" />');
document.querySelector("body").insertAdjacentHTML("afterbegin", "<header></header>");
document.querySelector("body").insertAdjacentHTML("beforeend", "<footer></footer>");
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
// toc-main
document.querySelector("head").insertAdjacentHTML("beforeend", '<style>aside#目次 > ol > li::marker {content: "第"counter(list-item)"章 ";}</style>');
const h1InHgroup = document.querySelector("main > hgroup:first-child");
if (h1InHgroup == null) {
	document.querySelector("main > h1").insertAdjacentHTML("afterend", '<aside id="目次"></aside>');
} else {
	h1InHgroup.insertAdjacentHTML("afterend", '<aside id="目次"></aside>');
}
const heads = document.querySelectorAll('section:not([class]) > h2, section:not([class]) > h3, section:not([class]) > h4, section:not([class]) > h5, section:not([class]) > h6');
if (heads && heads.length) {
	let toc = "";
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
			toc += `<ol><li><a href="#${head.getAttribute("id")}">${head.innerHTML}</a>`;
			++headLevelPrev;
		} else {
			while (headLevelNow < headLevelPrev) {
				--headLevelPrev;
				toc += "</li></ol>";
			}
			toc += `</li><li><a href="#${head.getAttribute("id")}">${head.innerHTML}</a>`;
		} 
	})
	while (headLevelPrev == 1) {
		--headLevelPrev;
		toc += "</li></ol>";
	}
	document.getElementById("目次").innerHTML = "<h2>目次</h2>" + toc + "</ol>";
}
// sidebar, リンク先の小窓
const mainWrapper = Object.assign(document.createElement('div'),{id:"main-wrapper"});
const mainContent = document.querySelector('main');
mainContent.parentNode.insertBefore(mainWrapper, mainContent);
mainWrapper.appendChild(mainContent);
// document.getElementById("main-wrapper").insertAdjacentHTML("afterbegin", '<aside id="toc-sidebar"></aside>');
let linkRenderExist = false;
document.querySelectorAll("section *:any-link").forEach(link => {
	if (link.getAttribute("href").slice(0,4) != "http") {
		link.addEventListener("click", function(event) {
			event.preventDefault();
			if (!linkRenderExist) {
				linkRenderExist = true;
				const mainWrapperId = document.getElementById("main-wrapper");
				mainWrapperId.insertAdjacentHTML("beforeend", '<aside id="link-render"></aside>');
				document.querySelector("head").insertAdjacentHTML("beforeend", '<style>#link-render{ position: fixed; top: 25%; left: 10%; max-height:50%; max-width: max(80%, 1080px); overflow-y: scroll; background-color:#222; border: 1px solid #666; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 1;} #link-render-dragger{cursor: move; text-align: center; background: #444; border-bottom: 1px solid #666; user-select: none;} #delete-link-render {margin-right: 10px; float: right;} #link-render {article.ax { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "公理: "; } } article.dfn { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "定義: "; } } article.prp { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "命題: "; } } article.thm { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "定理: "; } } article.lem { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "補題: "; } } article.cor { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "系: "; } } article.pblm { h1::before, > h2::before, > h3::before, > h4::before, > h5::before, > h6::before { counter-increment: none; content: "問題: "; } } }</style>');
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

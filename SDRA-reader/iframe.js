let isDarkMode = true;

const IS_FILE = location.protocol === "file:";
/* ================== Inject UI ================== */
document.body.innerHTML += `

<link rel="stylesheet" href="../../main/cta-framework.css">
<link rel="stylesheet" href="../../font-awesome/css/all.min.css">
<script src="../../settings.js"></script>
<div class="header"></div>
<div class="read-actions">
    <div id="read-action-btn"><i class="fa-solid fa-angle-right"></i></div>
    <div id="print-btn"><i class="fa-solid fa-print"></i></div>
    <div id="search-btn"><i class="fa-solid fa-search"></i></div>
    <div id="toc-btn"><i class="fa-solid fa-list"></i></div>
     <div id="zoom-in"> <i class="fa-solid fa-magnifying-glass-plus"></i></div>
                <div id="zoom-out"> <i class="fa-solid fa-magnifying-glass-minus"></i></div>
    <div id="line-height-plus"><i class="fa-solid fa-text-height"></i>+</div>
    <div id="line-height-minus"><i class="fa-solid fa-text-height"></i>-</div>
</div>

<aside class="toc-sidebar" id="toc-sidebar">
    <div class="toc-header">
        <h3>Contents</h3>
        <button class="toc-close-btn" id="toc-close-btn">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <ul id="toc-list"></ul>
</aside>

`;

/* ================== Globals ================== */

let currentLineHeight = 1.6;

const readActions = document.querySelector(".read-actions");
const readActionBtn = document.getElementById("read-action-btn");
const printBtn = document.getElementById("print-btn");
const searchBtn = document.getElementById("search-btn");
const tocBtn = document.getElementById("toc-btn");
const tocSidebar = document.getElementById("toc-sidebar");
const tocCloseBtn = document.getElementById("toc-close-btn");
const tocList = document.getElementById("toc-list");

let tocItemsMap = new Map();

/* ================== Read Actions ================== */
readActionBtn?.addEventListener("click", () => {
    readActions?.classList.toggle("open");
    readActionBtn.classList.toggle("open");
});

/* ================== Theme ================== */
function loadThemeState() {
    if (IS_FILE) {
        isDarkMode
    } else {
        isDarkMode = localStorage.getItem("darkMode") === "true";
    }
}

function renderTheme() {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
}

/* ================== Markdown ================== */
function renderMarkdown() {
    if (typeof marked === "undefined") {
        console.error("marked.js not loaded");
        return;
    }

    document.querySelectorAll(".md").forEach(el => {
        const raw = el.textContent;

        // إزالة المسافات الزائدة من بداية كل سطر
        const cleaned = raw
            .replace(/\t/g, "    ")                 // توحيد tabs
            .split("\n")
            .map(line => line.replace(/^\s{4,}/, "")) // حذف 4+ مسافات
            .join("\n");

        el.innerHTML = marked.parse(cleaned);
    });
}

/* ================== TOC ================== */
function generateTOC() {
    tocList.innerHTML = "";
    tocItemsMap.clear();

    const headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

    headings.forEach((heading, index) => {
        if (!heading.id) heading.id = `heading-${index}`;

        const li = document.createElement("li");
        li.textContent = heading.textContent;
        li.dataset.target = heading.id;

        const level = Number(heading.tagName[1]);
        li.style.paddingLeft = `${(level - 1) * 10}px`;

        li.addEventListener("click", () => {
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        tocList.appendChild(li);
        tocItemsMap.set(heading, li);
    });
}

/* ================== TOC Events ================== */
tocBtn?.addEventListener("click", () => {
    tocSidebar.classList.toggle("open");
    generateTOC();
});

tocCloseBtn?.addEventListener("click", () => {
    tocSidebar.classList.remove("open");
});

/* ================== Print & Search ================== */
printBtn?.addEventListener("click", () => window.print());

searchBtn?.addEventListener("click", () => {
    const query = prompt("Search in page:");
    if (query) window.find(query);
});

/* ================== Line Height ================== */
function changeLineHeight(step) {
    currentLineHeight = Math.max(1.2, Math.min(2.5, currentLineHeight + step));
    document.documentElement.style.setProperty("--read-line-height", currentLineHeight);
}

document.getElementById("line-height-plus")
    ?.addEventListener("click", () => changeLineHeight(0.4));

document.getElementById("line-height-minus")
    ?.addEventListener("click", () => changeLineHeight(-0.4));

const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");

let currentScale = 1;

function changeFontSize(factor) {
  currentScale = Math.max(0.8, Math.min(2, currentScale + factor));
  document.documentElement.style.setProperty('--content-font-size', `${currentScale}rem`);
}

document.getElementById("zoom-in")?.addEventListener("click", () => changeFontSize(0.1));
document.getElementById("zoom-out")?.addEventListener("click", () => changeFontSize(-0.1));

document.addEventListener("click", function (e) {
    const img = e.target.closest(".zoomable-img");
    if (!img) return;

    const overlay = document.createElement("div");
    overlay.className = "image-zoom-overlay";

    const zoomedImg = document.createElement("img");
    zoomedImg.src = img.src;

    const closeBtn = document.createElement("div");
    closeBtn.className = "image-zoom-close";
    closeBtn.innerHTML = "&times;";

    overlay.appendChild(zoomedImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    function closeZoom() {
        overlay.remove();
    }

    overlay.addEventListener("click", closeZoom);
    closeBtn.addEventListener("click", closeZoom);
});

/* ================== Init ================== */
window.addEventListener("DOMContentLoaded", () => {
    renderMarkdown();
    loadThemeState();
    renderTheme();
    generateTOC();
});

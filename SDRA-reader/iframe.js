
const IS_FILE = location.protocol === "file:";


document.body.insertAdjacentHTML('beforeend', `
<link rel="stylesheet" href="../../main/cta-framework.css">
<link rel="stylesheet" href="../../font-awesome/css/all.min.css">
<script src="../../settings.js"></script>

<div class="read-actions">
    <div id="read-action-btn"><i class="fa-solid fa-angle-right"></i></div>
    <div id="print-btn"><i class="fa-solid fa-print"></i></div>
    <div id="search-btn"><i class="fa-solid fa-search"></i></div>
    <div id="toc-btn"><i class="fa-solid fa-list"></i></div>
    <div id="line-height-plus"><i class="fa-solid fa-text-height"></i>+</div>
    <div id="line-height-minus"><i class="fa-solid fa-text-height"></i>-</div>
</div>
`);



const readActions = document.querySelector(".read-actions");
const readActionBtn = document.getElementById("read-action-btn");

function openReadActions() {
    if (readActions) readActions.classList.toggle("open");
    if (readActionBtn) readActionBtn.classList.toggle("open");
}
if (readActionBtn) readActionBtn.addEventListener("click", openReadActions);

// ----- تحميل حالة الوضع الداكن -----
function loadThemeState() {
    if (IS_FILE) {
        isDarkMode
    } else {
        isDarkMode = localStorage.getItem("darkMode") === "true";
    }
}

// ----- عرض الوضع الداكن -----
function renderTheme() {
    document.body.classList.toggle("dark-mode", isDarkMode);

}





window.addEventListener('DOMContentLoaded', () => {
    // ---- تأكد من وجود مكتبة marked ----
    if (typeof marked !== "undefined") {
        const mdElements = document.querySelectorAll('.md');
        mdElements.forEach(el => {
            const markdownText = el.textContent;
            el.innerHTML = marked.parse(markdownText);
        });
    } else {
        console.error("Library 'marked' not loaded yet.");
    }

    // ---- تحميل وعرض الوضع الداكن ----
    loadThemeState();
    renderTheme();

    // ---- إنشاء TOC ----
    generateTOC();
});


const printBtn = document.getElementById("print-btn");

if (printBtn) {
    printBtn.addEventListener("click", () => {
        window.print();
    });
}
const searchBtn = document.getElementById("search-btn");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const query = prompt("Search in page:");
        if (query) {
            window.find(query);
        }
    });
}

document.body.insertAdjacentHTML("beforeend", `
<aside class="toc-sidebar" id="toc-sidebar">
    <div class="toc-header">
        <h3>Contents</h3>
        <button class="toc-close-btn" id="toc-close-btn">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <ul id="toc-list"></ul>
</aside>
`);

const tocBtn = document.getElementById("toc-btn");
const tocSidebar = document.getElementById("toc-sidebar");
const tocList = document.getElementById("toc-list");

let tocItemsMap = new Map();

function generateTOC() {
    tocList.innerHTML = "";
    tocItemsMap.clear();

    const headings = document.querySelectorAll("h1, h2, h3, h4 ,h5 ,h6");

    headings.forEach((heading, index) => {
        // إذا لم يكن للعنوان id، أضف واحد
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        // إنشاء عنصر li للقائمة
        const li = document.createElement("li");
        li.textContent = heading.textContent;
        li.dataset.target = heading.id;

        // تعيين المسافة البادئة حسب مستوى العنوان
        // H1 → 0px, H2 → 10px, H3 → 20px, ... H6 → 50px
        const level = parseInt(heading.tagName.substring(1)); // H1 -> 1, H2 -> 2, ...
        li.style.paddingLeft = `${(level - 1) * 10}px`;

        // عند الضغط على العنصر، انتقل إلى العنوان بسلاسة
        li.addEventListener("click", () => {
            document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        // إضافة العنصر للقائمة
        tocList.appendChild(li);
        tocItemsMap.set(heading, li);
    });


    observeHeadings();
}

if (tocBtn) {
    tocBtn.addEventListener("click", () => {
        tocSidebar.classList.toggle("open");
        generateTOC();
    });
}
const tocCloseBtn = document.getElementById("toc-close-btn");

if (tocCloseBtn) {
    tocCloseBtn.addEventListener("click", () => {
        tocSidebar.classList.remove("open");
    });
}

let currentLineHeight = 1.6;

function changeLineHeight(step) {
    currentLineHeight = Math.max(1.2, Math.min(2.5, currentLineHeight + step));

    document.documentElement.style.setProperty(
        "--read-line-height",
        currentLineHeight
    );
}
document.getElementById("line-height-plus")
    ?.addEventListener("click", () => changeLineHeight(0.4));

document.getElementById("line-height-minus")
    ?.addEventListener("click", () => changeLineHeight(-0.4));

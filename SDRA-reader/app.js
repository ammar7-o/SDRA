
const IS_FILE = location.protocol === "file:";

// ----- المتغيرات العامة -----
const IFRAME = document.getElementById("Iframe");
const SettingsOverlay = document.querySelector(".settings-overlay");
const SettingsBtn = document.querySelector(".settings");
const overlay = document.querySelector(".overlay");
const ToogleTheme = document.querySelector(".toogle-theme");
const readActions = document.querySelector(".read-actions");
const fullScreen = document.getElementById("full-screen");
const readActionBtn = document.getElementById("read-action-btn");
const superFullScreen = document.getElementById("super-full-screen");
const aside = document.querySelector("aside");
const file = document.querySelector(".list a");

const asideBtn = document.querySelector(".aside-btn");
const fontSizeControl = document.querySelector(".font-size-control");
const lineHeightControl = document.querySelector(".line-height-control");
const zoomInBtn = document.querySelector("#zoom-in");
const zoomOutBtn = document.querySelector("#zoom-out");
const printBtn = document.querySelector("#print-btn");
const searchBtn = document.querySelector("#search-btn");
const bookmarksBtn = document.querySelector("#bookmarks-btn");
const tocBtn = document.querySelector("#toc-btn");
const nightModeBtn = document.querySelector("#night-mode-btn");
const readerModeBtn = document.querySelector("#reader-mode-btn");

// ----- تحميل المحتوى داخل iframe -----
function SetIframeSrc(src) {
    if (!src) return;
    const decodedSrc = decodeURIComponent(src);
    const encodedSrc = encodeURIComponent(decodedSrc);
    const newUrl = `${window.location.pathname}?key=${encodedSrc}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    IFRAME.src = decodedSrc;
    openAside()
}

// ----- إعداد الروابط التلقائية -----
function setupAutoLinks() {
    const sidebarLinks = document.querySelectorAll('aside a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('?key=')) {
            const path = href.split('?key=')[1];
            link.setAttribute('href', '#');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                SetIframeSrc(decodeURIComponent(path));
            });
        }
    });
}
// ----- مستمع عام لكل روابط data-src أو href مع ?key= -----
function setupDataSrcLinks() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        // تحقق إذا الرابط يحتوي على data-src
        let src = link.getAttribute('data-src');

        // إذا لا يوجد data-src لكن href يحتوي على ?key= احتفظ بها
        if (!src) {
            const href = link.getAttribute('href');
            if (href && href.includes('?key=')) {
                src = href.split('?key=')[1];
            }
        }

        if (!src) return;

        e.preventDefault();
        SetIframeSrc(decodeURIComponent(src));

        // إذا الرابط داخل sidebar أغلِق الـaside
        if (aside) aside.classList.remove("open");
    });
}

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
    
    if (ToogleTheme) {
        ToogleTheme.innerHTML = isDarkMode
            ? `<i class="fas fa-sun"></i>`
            : `<i class="fas fa-moon"></i>`;
    }
}

// ----- تبديل الوضع الداكن -----
function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (!IS_FILE) localStorage.setItem("darkMode", isDarkMode);
    renderTheme();
}

// ----- فتح/إغلاق إعدادات النافذة المنبثقة -----
function openSettings() {
    if (SettingsOverlay) SettingsOverlay.classList.toggle("open");
    if (overlay) overlay.classList.toggle("open");
}

// ----- فتح/إغلاق قائمة إجراءات القراءة -----
function openReadActions() {
    if (readActions) readActions.classList.toggle("open");
    if (readActionBtn) readActionBtn.classList.toggle("open");
}

// ----- وضع الشاشة الكاملة للـmain -----
function ToogleFullScreen() {
    const main = document.querySelector("main");
    if (!main) return;
    const isActive = main.classList.toggle("fullScreen");
    if (fullScreen) {
        fullScreen.innerHTML = isActive
            ? `<i class="fa-solid fa-compress"></i>`
            : `<i class="fa-solid fa-expand"></i>`;
    }
}

// ----- الشاشة الكاملة الحقيقية -----
function SuperToogleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        if (fullScreen) fullScreen.innerHTML = `<i class="fa-solid fa-compress"></i>`;
    } else {
        document.exitFullscreen();
        if (fullScreen) fullScreen.innerHTML = `<i class="fa-solid fa-expand"></i>`;
    }
}

// ----- عند تحميل الصفحة -----
window.addEventListener('DOMContentLoaded', () => {
    // تحميل محتوى الـiframe إذا كان موجود في الرابط
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) SetIframeSrc(key);

    // إعداد الروابط التلقائية
    setupAutoLinks();

    // تحميل وعرض الوضع الداكن
    loadThemeState();
    renderTheme();
        setupSidebarLinks(); 
    
    // إضافة مستمعي الأحداث للوظائف الإضافية
    initializeReaderFeatures();
});

// ----- دوال الوظائف الإضافية -----
function initializeReaderFeatures() {
    // التحكم في حجم الخط
    if (fontSizeControl) {
        fontSizeControl.addEventListener('change', function() {
            const fontSize = this.value;
            updateIframeStyle(`body { font-size: ${fontSize}px !important; }`);
        });
    }

    // التحكم في تباعد الأسطر
    if (lineHeightControl) {
        lineHeightControl.addEventListener('change', function() {
            const lineHeight = this.value;
            updateIframeStyle(`body { line-height: ${lineHeight} !important; }`);
        });
    }

    // تكبير/تصغير العرض
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            zoomIframe(0.1);
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            zoomIframe(-0.1);
        });
    }

    // الطباعة
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printIframeContent();
        });
    }

    // البحث
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchInIframe();
        });
    }

    // الإشارات المرجعية
    if (bookmarksBtn) {
        bookmarksBtn.addEventListener('click', function() {
            toggleBookmarks();
        });
    }

    // جدول المحتويات
    if (tocBtn) {
        tocBtn.addEventListener('click', function() {
            generateTableOfContents();
        });
    }

    // الوضع الليلي
    if (nightModeBtn) {
        nightModeBtn.addEventListener('click', function() {
            toggleNightMode();
        });
    }

    // وضع القارئ
    if (readerModeBtn) {
        readerModeBtn.addEventListener('click', function() {
            toggleReaderMode();
        });
    }
}

// دالة تحديث نمط iframe
function updateIframeStyle(css) {
    const iframeDoc = IFRAME.contentDocument || IFRAME.contentWindow.document;
    if (iframeDoc) {
        let style = iframeDoc.getElementById('dynamic-style');
        if (!style) {
            style = iframeDoc.createElement('style');
            style.id = 'dynamic-style';
            iframeDoc.head.appendChild(style);
        }
        style.textContent = css;
    }
}

// دالة تكبير/تصغير iframe
function zoomIframe(factor) {
    const currentZoom = parseFloat(IFRAME.style.zoom) || 1;
    const newZoom = Math.max(0.5, Math.min(2, currentZoom + factor));
    IFRAME.style.zoom = newZoom;
}

// دالة طباعة محتوى iframe
function printIframeContent() {
    const iframeDoc = IFRAME.contentWindow;
    iframeDoc.focus();
    iframeDoc.print();
}

// دالة البحث في iframe
function searchInIframe() {
    const searchTerm = prompt("أدخل كلمة البحث:");
    if (searchTerm) {
        const iframeWin = IFRAME.contentWindow;
        iframeWin.find(searchTerm);
    }
}

// دالة الإشارات المرجعية
function toggleBookmarks() {
    alert("ميزة الإشارات المرجعية قيد التطوير");
}

// دالة جدول المحتويات
function generateTableOfContents() {
    const iframeDoc = IFRAME.contentDocument || IFRAME.contentWindow.document;
    if (iframeDoc) {
        const headings = iframeDoc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) {
            let tocHtml = '<div class="toc"><h3>جدول المحتويات</h3><ul>';
            headings.forEach((heading, index) => {
                const level = parseInt(heading.tagName.charAt(1));
                const indent = '  '.repeat(level - 1);
                tocHtml += `${indent}<li><a href="#" data-heading="${index}">${heading.textContent}</a></li>`;
            });
            tocHtml += '</ul></div>';
            
            // إنشاء نافذة منبثقة لجدول المحتويات
            const tocWindow = window.open('', 'TOC', 'width=400,height=600');
            tocWindow.document.write(`
                <html>
                <head>
                    <title>جدول المحتويات</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .toc ul { list-style-type: none; padding-left: 20px; }
                        .toc li { margin: 5px 0; }
                        .toc a { text-decoration: none; color: #2e7d32; display: block; padding: 5px; }
                        .toc a:hover { background-color: #e0e0e0; }
                    </style>
                </head>
                <body>${tocHtml}</body>
                </html>
            `);
            tocWindow.document.close();
        } else {
            alert("لا توجد عناوين في هذه الصفحة");
        }
    }
}

// دالة التبديل إلى الوضع الليلي
function toggleNightMode() {
    const iframeDoc = IFRAME.contentDocument || IFRAME.contentWindow.document;
    if (iframeDoc) {
        const existingStyle = iframeDoc.getElementById('night-mode-style');
        if (existingStyle) {
            existingStyle.remove();
        } else {
            const nightModeStyle = iframeDoc.createElement('style');
            nightModeStyle.id = 'night-mode-style';
            nightModeStyle.textContent = `
                body, * {
                    background-color: #1a1a1a !important;
                    color: #e0e0e0 !important;
                    border-color: #555 !important;
                }
                img, video {
                    opacity: 0.8;
                }
            `;
            iframeDoc.head.appendChild(nightModeStyle);
        }
    }
}

// دالة تبديل وضع القارئ
function toggleReaderMode() {
    const iframeDoc = IFRAME.contentDocument || IFRAME.contentWindow.document;
    if (iframeDoc) {
        const existingStyle = iframeDoc.getElementById('reader-mode-style');
        if (existingStyle) {
            existingStyle.remove();
        } else {
            const readerModeStyle = iframeDoc.createElement('style');
            readerModeStyle.id = 'reader-mode-style';
            readerModeStyle.textContent = `
                * {
                    font-family: Georgia, 'Times New Roman', serif !important;
                    max-width: 800px !important;
                    margin: 0 auto !important;
                    padding: 20px !important;
                }
                body {
                    background-color: #f5f5dc !important;
                    color: #333 !important;
                }
                img, iframe, .ads {
                    display: none !important;
                }
            `;
            iframeDoc.head.appendChild(readerModeStyle);
        }
    }
}
function openAside(){
    aside.classList.toggle("open")
}
// ----- إضافة مستمعي الأحداث -----
if (SettingsBtn) SettingsBtn.addEventListener("click", openSettings);
if (overlay) overlay.addEventListener("click", openSettings);
if (ToogleTheme) ToogleTheme.addEventListener("click", toggleTheme);
if (readActionBtn) readActionBtn.addEventListener("click", openReadActions);
if (fullScreen) fullScreen.addEventListener("click", ToogleFullScreen);
if (superFullScreen) superFullScreen.addEventListener("click", SuperToogleFullScreen);
if (asideBtn) asideBtn.addEventListener("click", openAside);

function setupSidebarLinks() {
    const sidebarLinks = document.querySelectorAll('.list details a');
    console.log(sidebarLinks)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // إغلاق القائمة على الشاشات الصغيرة
            
                aside.classList.remove("open");
            
        });
    });
}

 setupSidebarLinks(); 
// ----- دعم زر الرجوع في المتصفح -----
window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) SetIframeSrc(key);
});

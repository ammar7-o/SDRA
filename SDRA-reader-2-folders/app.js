
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
    document.addEventListener('click', function (e) {
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
        fontSizeControl.addEventListener('change', function () {
            const fontSize = this.value;
            updateIframeStyle(`body { font-size: ${fontSize}px !important; }`);
        });
    }





}










function openAside() {
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

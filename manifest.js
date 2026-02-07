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

// ----- تحميل المحتوى داخل iframe -----
function SetIframeSrc(src) {
    if (!src) return;
    const decodedSrc = decodeURIComponent(src);
    const encodedSrc = encodeURIComponent(decodedSrc);
    const newUrl = `${window.location.pathname}?key=${encodedSrc}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    IFRAME.src = decodedSrc;
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

// ----- الوضع الداكن -----
function SwitchToDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    if (ToogleTheme) {
        ToogleTheme.innerHTML = isDark
            ? `<i class="fas fa-sun"></i>`
            : `<i class="fas fa-moon"></i>`;
    }
}

// ----- عند تحميل الصفحة -----
window.addEventListener('DOMContentLoaded', () => {
   
    // تحميل الوضع الداكن
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        if (ToogleTheme) ToogleTheme.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        if (ToogleTheme) ToogleTheme.innerHTML = `<i class="fas fa-moon"></i>`;
    }
});

// ----- إعدادات النافذة المنبثقة -----
function openSettings() {
    if (SettingsOverlay) SettingsOverlay.classList.toggle("open");
    if (overlay) overlay.classList.toggle("open");
}

// ----- قائمة الإجراءات للقراءة -----
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

    // تحميل الوضع الداكن
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        if (ToogleTheme) ToogleTheme.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        if (ToogleTheme) ToogleTheme.innerHTML = `<i class="fas fa-moon"></i>`;
    }
});

// ----- إضافة مستمعي الأحداث مع التأكد من وجود العناصر -----
if (SettingsBtn) SettingsBtn.addEventListener("click", openSettings);
if (overlay) overlay.addEventListener("click", openSettings);
if (ToogleTheme) ToogleTheme.addEventListener("click", SwitchToDarkMode);
if (readActionBtn) readActionBtn.addEventListener("click", openReadActions);
if (fullScreen) fullScreen.addEventListener("click", ToogleFullScreen);
if (superFullScreen) superFullScreen.addEventListener("click", SuperToogleFullScreen);

// دعم زر الرجوع في المتصفح
window.addEventListener("popstate", (e) => {
    if (e.state && e.state.key) {
        IFRAME.src = e.state.key;
    }
});

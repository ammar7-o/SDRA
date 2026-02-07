// ----- المتغيرات العامة -----
let IFRAME;
let SettingsOverlay;
let SettingsBtn;
let overlay;
let ToogleTheme;
let cards;
let searchInput;
let languageSelect;
let decreaseFontBtn;
let increaseFontBtn;
let resetFontBtn;

// ----- الوضع الداكن -----
function SwitchToDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    ToogleTheme.innerHTML = isDark
        ? `<i class="fas fa-sun"></i>`
        : `<i class="fas fa-moon"></i>`;
}

// ----- تغيير اللغة -----
function switchLanguage() {
    const lang = languageSelect.value;
    localStorage.setItem('language', lang);
    
    // تحديث لغة الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث النصوص وفقًا للغة
    updateTexts(lang);
}

// ----- تحديث النصوص -----
function updateTexts(lang) {
    if (lang === 'ar') {
        // تحديث النصوص إلى العربية
        document.querySelector('.logo span').textContent = 'مدونة SDRA';
        document.querySelector('main h1').textContent = '      مدونة SDRA  ';
        document.querySelector('main p').innerHTML = `<i class="fa-solid fa-lightbulb"></i> مدونة تحتوي على العديد من الملخصات للمواضيع المختلفة، من الصفر إلى الاحتراف`;
        document.querySelector('form input').placeholder = 'ابحث عن مواضيع...';
    } else {
        // تحديث النصوص إلى الإنجليزية
        document.querySelector('.logo span').textContent = 'SDRA Wiki';
        document.querySelector('main h1').textContent = '      SDRA Wiki  ';
        document.querySelector('main p').innerHTML = `<i class="fa-solid fa-lightbulb"></i> A wiki with many summaries for different things, from zero to hero`;
        document.querySelector('form input').placeholder = 'Search topics...';
    }
}

// ----- التحكم في حجم الخط -----
function adjustFontSize(factor) {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = currentSize + factor;
    
    // تأكد من أن الحجم لا يخرج عن الحدود المعقولة
    if (newSize >= 12 && newSize <= 24) {
        document.documentElement.style.fontSize = newSize + 'px';
        localStorage.setItem('fontSize', newSize);
    }
}

// ----- تعيين حجم الخط -----
function setFontSize(size) {
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
}

// ----- إعدادات النافذة المنبثقة -----
function openSettings() {
    SettingsOverlay.classList.toggle("open");
    overlay.classList.toggle("open");
}

// ----- محتوى الكروت -----
const content = [
    { name: "SDRA", src: "Root/sdra/Areader.html" },
    { name: "HTML", src: "Root/html/Areader.html" },
    { name: "CSS", src: "Root/css/Areader.html" },
    { name: "JS", src: "Root/js/Areader.html" },
    { name: "LINUX", src: "Root/linux/Areader.html" },
];

function renderContent(filter = "") {
    cards.innerHTML = ""; // مسح الكروت القديمة

    const filteredContent = content.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredContent.forEach(item => {
        cards.innerHTML += `
            <div class="card">
                <a href="${item.src}">
                    <i class="fa-solid fa-book"></i>
                    <span>${item.name}</span>
                </a>
            </div>
        `;
    });
}

// ----- تحميل الصفحة -----
window.addEventListener('DOMContentLoaded', () => {
    // ربط المتغيرات العامة بالعناصر
    IFRAME = document.getElementById("Iframe");
    SettingsOverlay = document.querySelector(".settings-overlay");
    SettingsBtn = document.querySelector(".settings");
    overlay = document.querySelector(".overlay");
    ToogleTheme = document.querySelector(".toogle-theme");
    cards = document.getElementById("cards");
    searchInput = document.querySelector("form input");
    languageSelect = document.getElementById("language-select");
    decreaseFontBtn = document.getElementById("decrease-font");
    increaseFontBtn = document.getElementById("increase-font");
    resetFontBtn = document.getElementById("reset-font");

    // أحداث
    if (SettingsBtn) SettingsBtn.addEventListener("click", openSettings);
    if (overlay) overlay.addEventListener("click", openSettings);
    if (ToogleTheme) ToogleTheme.addEventListener("click", SwitchToDarkMode);
    if (languageSelect) languageSelect.addEventListener("change", switchLanguage);
    if (decreaseFontBtn) decreaseFontBtn.addEventListener("click", () => adjustFontSize(-1));
    if (increaseFontBtn) increaseFontBtn.addEventListener("click", () => adjustFontSize(1));
    if (resetFontBtn) resetFontBtn.addEventListener("click", () => setFontSize(16));
    if (searchInput) {
        searchInput.addEventListener("input", (e) => renderContent(e.target.value));
    }

    document.querySelector("form").addEventListener("submit", e => e.preventDefault());

    // تحميل الإعدادات من localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        ToogleTheme.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        ToogleTheme.innerHTML = `<i class="fas fa-moon"></i>`;
    }
    
    // تحميل اللغة من localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        languageSelect.value = savedLang;
        switchLanguage();
    }
    
    // تحميل حجم الخط من localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        setFontSize(savedFontSize);
    }

    // عرض الكروت عند التحميل
    renderContent();
});

// دعم زر الرجوع في المتصفح
window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) {
        SetIframeSrc(key);
    }
});

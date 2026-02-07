document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مدونة SDRA</title>
    <link rel="stylesheet" href="../../SDRA-reader/style.css">
    <link rel="stylesheet" href="../../font-awesome/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>

<body>


    <section>
        <aside>
            <header>
                <div class="logo">
                    <img src="../../icon.png" alt="" class="icon">
                    <span>مدونة SDRA</span>
                </div>
                <nav>
                    <a class="menu-btn" href=""><i class="fas fa-bars"></i></a>
                </nav>
                <a href="#" class="settings"><i class="fas fa-cog"></i></a>

            </header>
            <div class="actions">
                <a href="../../index.html">خروج</a>
            </div>
             <div class="list">
            </div>

        </aside>
        <main>
        <a href="#" class="aside-btn"><i class="fas fa-bars" ></i></a>

            <iframe id="Iframe" src="index.html" frameborder="0"></iframe>
            <div class="read-actions">
                <div id="read-action-btn"><i class="fa-solid fa-angle-right"></i></div>
                <div id="download-btn"> <i class="fa-solid fa-download"></i></div>
                <div id="full-screen"><i class="fa-solid fa-expand"></i></div>
                <div id="super-full-screen"> <i class="fa-solid fa-desktop"></i></div>
                <div id="zoom-in"> <i class="fa-solid fa-magnifying-glass-plus"></i></div>
                <div id="zoom-out"> <i class="fa-solid fa-magnifying-glass-minus"></i></div>
                <div id="print-btn"> <i class="fa-solid fa-print"></i></div>
                <div id="search-btn"> <i class="fa-solid fa-search"></i></div>
                <div id="bookmarks-btn"> <i class="fa-solid fa-bookmark"></i></div>
                <div id="toc-btn"> <i class="fa-solid fa-list"></i></div>
                <div id="night-mode-btn"> <i class="fa-solid fa-moon"></i></div>
                <div id="reader-mode-btn"> <i class="fa-solid fa-book-open"></i></div>
                <div class="font-size-control-wrapper">
                    <label for="font-size-control"><i class="fa-solid fa-text-height"></i></label>
                    <input type="range" id="font-size-control" class="font-size-control" min="12" max="24" value="16">
                </div>
                <div class="line-height-control-wrapper">
                    <label for="line-height-control"><i class="fa-solid fa-arrows-alt-v"></i></label>
                    <input type="range" id="line-height-control" class="line-height-control" min="1" max="2" step="0.1" value="1.5">
                </div>
            </div>


        </main>
    </section>




    <div class="settings-overlay">
        <div class="head">
            <h2>الإعدادات</h2>
            <div onclick="openSettings()" class="close"><i class="fas fa-times"></i></div>
        </div>
        <div class="item">
            <span class="label">الوضع الليلي</span>
            <a href="#" class="toogle-theme"><i class="fas fa-moon"></i></a>
        </div>
        <div class="item">
            <span class="label">اللغة</span>
            <select id="language-select" class="lang-select">
                <option value="ar">العربية</option>
                <option value="en">English</option>
            </select>
        </div>
        <div class="item">
            <span class="label">حجم الخط</span>
            <div class="font-size-controls">
                <button id="decrease-font" class="font-btn">A-</button>
                <button id="reset-font" class="font-btn">A</button>
                <button id="increase-font" class="font-btn">A+</button>
            </div>
        </div>
        <div class="item">
            <span class="label">نوع الملف</span>
            <select id="file-type-select" class="file-type-select">
                <option value="pdf">PDF</option>
                <option value="html">HTML</option>
                <option value="txt">TXT</option>
            </select>
        </div>
    </div>
    <div class="overlay"></div>
</body>

<script src="../../settings.js"></script>

<script src="../../SDRA-reader/app.js"></script>


</html>
`);

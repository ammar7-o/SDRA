document.write(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SDRA Wiki</title>
    <link rel="stylesheet" href="../../SDRA-reader/style.css">
    <link rel="stylesheet" href="../../font-awesome/css/all.min.css">

</head>
</head>

<body>


    <section>
        <aside>
            <header>
                <div class="logo">
                    <img src="../../icon.png" alt="" class="icon">
                    <span>SDRA Wiki</span>
                </div>
                <nav>
                    <a class="menu-btn" href=""><i class="fas fa-bars"></i></a>
                </nav>
                <a href="#" class="settings"><i class="fas fa-cog"></i></a>

            </header>
            <div class="actions">
                <a href="../../index.html">Exit</a>
            </div>
             <div class="list">
            </div>

        </aside>
        <main>
        <a href="#" class="aside-btn"><i class="fas fa-bars" ></i></a>

            <iframe id="Iframe" src="index.html" frameborder="0"></iframe>
            <div class="read-actions">
                <div id="read-action-btn"><i class="fa-solid fa-angle-right"></i></div>
                <div id="full-screen"><i class="fa-solid fa-expand"></i></div>
                <div id="super-full-screen"> <i class="fa-solid fa-desktop"></i></div>

            </div>


        </main>
    </section>




    <div class="settings-overlay">
        <div class="head">
            <h2>settings</h2>
            <div onclick="openSettings()" class="close"><i class="fas fa-close"></i></div>
        </div>
        <div class="item">
            <span class="label">Dark mode</span>
            <a href="#" class="toogle-theme"><i class="fas fa-sun"></i></a>
        </div>
    </div>
    <div class="overlay"></div>
</body>

<script src="../../settings.js"></script>

<script src="../../SDRA-reader/app.js"></script>


</html>
`);

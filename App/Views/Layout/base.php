<!doctype html>
<html lang="es">
    <head>
        <base href="/" />
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		
        <title><?php echo $web_title;?></title>
		
        <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
        
        <link rel="stylesheet" href="css/pirulo.reset.css?<?php echo rand();?>" />
        <link rel="stylesheet" href="css/pirulo.grid.css?<?php echo rand();?>" />
        <link rel="stylesheet" href="css/pirulo.elements.css?<?php echo rand();?>" />
        <link rel="stylesheet" href="css/pirulo.style.css?<?php echo rand();?>" />
    </head>
    <body class="main">
        <?php echo $web_menu;?>
        <main>
            
            <header class="">
                <div class="header container block text-center">
                    <h1><?php echo $web_site;?></h1>
                </div>
            </header>
            
            <section class="content">
                <div class="container grid-row">
                    <?php echo isset($usuario) ? "Bienvenido, <b>{$usuario}</b>" : "";?>
                </div>
                <div class="container grid-row">
                    <!--
                    <div class="grid-3 column">
                        <?php echo isset($web_sidebar) ? $web_sidebar : "no definido";?>
                    </div>
                    -->
                    <div class="column">
                        <?php echo isset($web_content) ? $web_content : "no definido";?>
                    </div>
                </div>
            </section>
            <footer class="footer">
                <div class="container block text-center">
                    <?php echo $web_site;?> &copy; 2018 CoraPHP v3
                </div>
            </footer>
        </main>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script type="text/javascript" src="js/Lux.js"></script>
        <script type="text/javascript" src="js/mvc.js"></script>
        <script type="text/javascript" src="js/base.js"></script>
    </body>
</html>
<article>    
    <h2><?php echo $page_title;?></h2>
    <div>
        <?php foreach($users as $user):?>
        <div><?php echo $user->usuario;?> - <a href="/usuarios/ver/<?php echo $user->id;?>">Ver</a></div>
        <?php endforeach;?>
    </div>
</article>
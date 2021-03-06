<?php

namespace App\Controller;

use System\CoraPHP\Mvc\Controller;
use System\CoraPHP\Mvc\View;

use System\CoraPHP\Container\Registry;

/**
 * Controller con template
 */
class TemplateController extends Controller{
    
    /** @var View */
    protected $template = null;
    
    public function init()
    {
        parent::init();
        $layout = "Layout:blank";
        $this->template = View::make($layout);
        
        if($this->request->isInitial() && !$this->request->isAjax())
        {
            $this->template->setFile("Layout:base.admin");
            
            $this->template->add("web_site", Registry::channel("Settings")->get("web_site"))
                ->add("web_title", Registry::channel("Settings")->get("web_site"))
                ->add("web_sidebar", $this->fordward("/widget/sidebar"))
                ->add("web_menu", $this->fordward("/widget/menu"));
            
            if(login_has("usuario"))
            {
                $this->template->add("usuario", login_get("usuario"));
            }
        }
    }
    
    public function finish()
    {
        parent::finish();
        $this->response->body($this->template);
    }
}

<?php

namespace App\Controller;

/**
 * RoleController
 */
class RoleController extends SecureController{
    
    public function indexAction()
    {       
        $this->template->add("web_content","Hello from ".__METHOD__."!!");
    }
    
    public function viewAction(){
        
        $this->template->add("web_content","Hello from ".__METHOD__."!!");
    }
    
    public function editAction(){
        
        $this->template->add("web_content","Hello from ".__METHOD__."!!");
    }
    
    public function createAction(){
        
        $this->template->add("web_content","Hello from ".__METHOD__."!!");
    }
    
    public function deleteAction(){
     
        $this->redirect("/roles");
    }
}
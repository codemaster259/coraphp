<?php
namespace Core;

class Router{
    
    
    public $url = "/";
    private static $routes = array();
    protected static $bucket = null;
    
    public static function setBucket(Bucket $bucket) {
        self::$bucket = $bucket;
    }
    
    public static function register($route, $data)
    {
        self::$routes[$route] = $data;
    }
    
    public static function registerArray($routes = array())
    {
        foreach($routes as $route => $data)
            {
                self::register($route, $data);
            }
    }
    
    public static function getRouteByName($name)
    {
        return isset(self::$routes[$name]) ? self::$routes[$name]['route'] : $name;
    }
    
    function dispatch($url = "/")
    {    
        if($url== "")
        {
            $url= "/";
        }
        
        $this->url = $url;
        
        $match = null;
        
        //match by name
        if(isset(self::$routes[$this->url]))
        {
            $match = self::$routes[$this->url]['path'];
            
        }else{
            //match by path
            foreach(self::$routes as $route)
            {
                if($route['route'] == $this->url)
                {
                    $match = $route['path'];
                }
            }
        }
        
        //filter url
        if($match)
        {
            $ModuleControllerAction = explode(":", strtolower($match));

            $module = ucwords($ModuleControllerAction[0]);
            $controller = ucwords($ModuleControllerAction[1]);
            $action = $ModuleControllerAction[2];

            $controllerName = $module."\\Controller\\".$controller."Controller";
            
            $request = new Request($this->url);
            
            $request->attributes->set("_controller", $controller)
                    ->set("_module", $module)
                    ->set("_action", $action)
                    ->set("_url", $this->url);
            
            self::$bucket->set("request", $request);
            
            if(!class_exists($controllerName))
            {
                $controllerName = "Core\\ErrorController";
                //return "<strong>Class {$controllerName} doesn't exists.</strong><br/>";
            }
            
            /* @var Controler $controllerObject  */
            $controllerObject = new $controllerName(self::$bucket);
            
            if(!$controllerObject->actionExists($action))
            {
                $action = "index";
                //return "<strong>Action {$action} doesn't exists in {$controllerName} class.</strong><br/>";
            }

            $result = $controllerObject->execute($action);

            return $result;

        }else{
            return new Response("<strong>No match for {$this->url}.</strong><br/>");
        }
    }
    
    public static function sub($url)
    {
        $router = new self();
        return $router->dispatch($url, true);
    }
}
(function (){
    
    //Define main entrance
    var Lux = function(selector){
        return new init(selector);
    };
    
    //main object
    var init = function(selector){
        
        var els;
        
        if (typeof selector === "string")
        {
            els = document.querySelectorAll(selector);
        } else if (selector.length) {
            els = selector;
        } else {
            els = [selector];
        }
        
        for(var i = 0; i < els.length; i++ ){
            this[i] = els[i];
        }
        this.length = els.length;
    };
    
    
    //Instance Methods
    init.prototype.map = function(callback){
        var results = [], i = 0;
        for( ; i < this.length; i++){
            results.push(callback.call(this, this[i], i));
        }
        return results.length > 1 ?  results : results[0];;
    };


    init.prototype.forEach = function(callback){
        this.map(callback);
        return this;
    };
    
    /*only for inputs*/
    init.prototype.val = function (value) {
        if (typeof value !== "undefined")
        {
            return this.forEach(function (el){
                el.value = value;
            });
        }else{
            return this.map(function (el){
                return el.value;
            });
        }
    };
    
    init.prototype.text = function (txt) {
        if (typeof txt !== "undefined")
        {
            return this.forEach(function (el){
                el.innerText = txt;
            });
        }else{
            return this.map(function (el){
                return el.innerText;
            });
        }
    };


    init.prototype.html = function (html){
        if(typeof html !== "undefined")
        {
            this.forEach(function(el){
                el.innerHTML = html;
            });
            return this;
        }else{
            return this.map(function(el){
                return el.innerHTML;
            });
        }
    };


    init.prototype.addClass = function (classes) {

        return this.forEach(function (el){

            var current = el.className.split(" ").filter(function(d){return d.trim();});
            //console.log(current);
            var newClasses = classes.split(" ").filter(function(d){return d.trim();});
            
            newClasses.forEach(function(cls){
                current.push(cls);
            });

            el.className = current.join(" ").trim();
        });
    };


    init.prototype.removeClass = function (clazz){
        return this.forEach(function (el){
            var cs = el.className.split(" "), i;

            while ( (i = cs.indexOf(clazz)) > -1)
            { 
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(" ");
        }); 
    };

    init.prototype.hasAttr = function (attr){
      return this.map(function (el){
                return el.hasAttribute(attr);
            });  
    };

    init.prototype.attr = function (attr, val){
        if(typeof val !== "undefined")
        {
            return this.forEach(function(el){
                el.setAttribute(attr, val);
            });
        }else{
            return this.map(function (el){
                return el.getAttribute(attr);
            });
        }
    };
    
        
    /*DATAAAAAA*/
    init.prototype.data = function (key, val){
        if(typeof val !== "undefined")
        {
            return this.forEach(function(el){
                el.setAttribute("data-" + key, val);
            });
        }else{
            var n =  this.map(function (el){
                return el.getAttribute("data-" + key);
            });

            if(n && n.toLowerCase() === "true")
            {
                return true;
            }
            
            if(n && n.toLowerCase() === "false")
            {
                return false;
            }
            return n;
        }
    };
    
    init.prototype.hasData = function (attr){
      return this.map(function (el){
            return el.hasAttribute("data-"+attr);
        });  
    };


    init.prototype.append = function (els){

        if(typeof els === "string")
        {
            return this.forEach(function (parentEl, i){
                Lux(parentEl).html(Lux(parentEl).html() + els);
            });

        }else{

            return this.forEach(function (parentEl, i){
                els.forEach(function (childEl){
                    if (i > 0)
                    {
                        childEl = childEl.cloneNode(true);
                    }
                    parentEl.appendChild(childEl);
                });
            });
        }
    };


    init.prototype.prepend = function (els){
        return this.forEach(function (parEl, i){
            for (var j = els.length -1; j > -1; j--)
            {
                childEl = (i > 0) ?  els[j].cloneNode(true) : els[j];
                parEl.insertBefore(childEl, parEl.firstChild);
            }
        }); 
    };
    
    init.prototype.clear = function (){
        return this.forEach(function (el){
            return el.innerHTML = "";
        });
    };



    init.prototype.remove = function (){
        return this.forEach(function (el){
            return el.parentNode.removeChild(el);
        });
    };


    /*EVENTS*/
    init.prototype.on = (function (){
        if(document.addEventListener)
        {            
            return function (evt, fn) {             
                return this.forEach(function (el) {
                    var evtList = evt.split(" ").filter(function(d){return d.trim();});
                    evtList.forEach(function(e){
                        el.addEventListener(e, fn, false);
                    });
                });
            };
        }else if (document.attachEvent){
            return function (evt, fn){
                return this.forEach(function (el) {
                    var evtList = evt.split(" ").filter(function(d){return d.trim();});
                    evtList.forEach(function(e){
                        el.attachEvent("on" + e, fn);
                    });
                });
            };
        }else{
            return function (evt, fn) {
                return this.forEach(function (el) {
                    var evtList = evt.split(" ").filter(function(d){return d.trim();});
                    evtList.forEach(function(e){
                        el["on" + evt] = fn;
                    });
                });
            };
        }
     }());
     
     
    init.prototype.off = (function (){
        if(document.removeEventListener)
        {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.removeEventListener(evt, fn, false);
                });
            };
        }else if (document.detachEvent){
            return function (evt, fn){
                return this.forEach(function (el){
                    el.detachEvent("on" + evt, fn);
                });
            };
        }else{
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el["on" + evt] = null;
                });
            };
        }
    }());
    
    /*TOGGLE*/
    init.prototype.show = function (){
        return this.forEach(function (el) {
            
            var step = 0.1;
            var delay = 40;
            
            Lux(el).loop(delay, function(e){
                e.style.opacity = 0;
                e.style.display = e.oldisplay || '';
            },function(e){
                
                if(e.style.opacity < 1)
                {
                    e.style.opacity = parseFloat(e.style.opacity) +  step;
                    return false;
                }
                return true;
            });
        });
    };
    
    init.prototype.hide = (function (){
        return this.forEach(function (el) {
            
            var step = 0.1;
            var delay = 40;
            
            Lux(el).loop(delay, function(e){
                e.oldisplay = e.style.display;
                e.style.opacity = 1;
            },function(e){
                
                if(e.style.opacity > 0)
                {
                    e.style.opacity = parseFloat(e.style.opacity) - step;
                    return false;
                }
                e.style.display = "none";
                return true;
            });
        });
    });
    
    init.prototype.delay = (function(amount, fn){
        return this.forEach(function (el) {
            
            setTimeout(function(){
                fn(el);
            }, amount);
        });
    });
    
    /**
     * 
     * @param {type} delay
     * @param {type} start
     * @param {type} loop
     * @returns {undefined}
     */
    init.prototype.loop = function(delay, start, loop){
        this.forEach(function (el) {
            start(el);
            //console.log("start loop");
            function l(e){
                //console.log("make loop");
                if(!loop(e))
                {
                    setTimeout(function(){
                        l(e);
                        //console.log("repeat loop");
                    },delay);
                }else{
                    //console.log("end loop");
                }
            };
            l(el);
        });
    };
    
    
    //Static Methods
    Lux.doc = Lux(document);
    
    Lux.create = function (tagName, attrs){
        var el = new Lux([document.createElement(tagName)]);
        if(attrs)
        {
            if(attrs.className)
            {
                el.addClass(attrs.className);
                delete attrs.className;
            }
            if(attrs.text)
            {
                 el.text(attrs.text);
                    delete attrs.text;
            }
            for(var key in attrs)
            {
                if(attrs.hasOwnProperty(key))
                {
                    el.attr(key, attrs[key]);
                }
            }
        }
        return el;
    };
    
    Lux.plugin = function(name, callback){
        init.prototype[name] = callback;
    };
    
    Lux.extend = function(opts, ns){
        for(var op in opts)
        {
            if(ns)
            {
                init.prototype[ns][op] = opts[op];
            }else{
                init.prototype[op] = opts[op];
            }
        }
    };
    
    Lux.req = {};
    
    Lux.req.jsonToQuery = function(json) {
        var str = "";
        var amp = "";
        for(var key in json)
        {
            if(json.hasOwnProperty(key))
            {
                str += amp + encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
                amp = "&";
            }
        }
        return str;
    };
    
    Lux.req.ajax = function(o){
      
        o = o || {};
      
        var options = {
            method: "GET",
            url: "",
            data: null,
            success: function(){},
            error: function(){},
            json: true
        };
      
        var opts = Object.assign(options, o);
        
        if(opts.data)
        {
            opts.data = Lux.req.jsonToQuery(opts.data);
        }
        
        var xhr = new XMLHttpRequest();
        try{
            xhr.open(opts.method, opts.url, true);/*open first*/
            xhr.onreadystatechange = function(){
                if(this.status !== 200)
                {
                    opts.error.call(null, this.status);
                    return;
                }

                if(this.readyState === XMLHttpRequest.DONE)
                {
                    if(this.status === 200)
                    {
                        if(opts.json)
                        {
                            opts.success.call(null, JSON.parse(this.responseText));
                        }else{
                            opts.success.call(null, this.responseText);
                        }
                    }
                }
            };
            
            if(opts.method.toLowerCase() === 'post')
            {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");
            
            
            xhr.send(opts.data);
        }catch(e){
            console.log("AJAX ERROR: " + e);
        }
    };
    
    Lux.req.post = function(o){
        o['method'] = "POST";
        
        Lux.req.ajax(o);
    };
    
    Lux.req.get = function(o){
        o['method'] = "GET";
        
        Lux.req.ajax(o);
    };
    
    /**
     * 
     * 
     * @param {type} callback
     * 
     */
    Lux.ready = function(fn){
        Lux.doc.on("DOMContentLoaded", fn);
    };

    //create alias
    window.Lux = window.L = Lux;
})();

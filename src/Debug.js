/*
 * Debug
 * https://github.com/rbarros/debug.js
 *
 * Copyright (c) 2013 Ramon Barros
 * Licensed under the MIT license.
 */

(function($, window) {
  'use strict';

  // follow @HenrikJoreteg and @andyet if you like this ;)
  var inNode = typeof window === 'undefined',
      ls = !inNode && window.localStorage,
      out = {};

  if (inNode) {
      module.exports = console;
      return;
  }

  if (ls && ls.debug && window.console) {
      out = window.console;
  } else {
      var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),
          l = methods.length,
          fn = function () {};

      while (l--) {
          out[methods[l]] = fn;
      }
  }
  if (typeof exports !== 'undefined') {
      module.exports = out;
  } else {
      window.console = out;
  }

  var Element = function( selector, context ) {
    return _$.init(selector, context);
  };

  // JQuery is not loaded then use the functions on simple.
  var _$ = {
    init: function( selector, context ) {
      var i = 0, arr;
      if ( !selector ) {
        return this;
      }
      if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
          this[0] = document.createElement("div");
      } else if (/[#]/.test(selector)) {
          this[0] = document.getElementById(selector.replace('#',''));
      } else if (/[.]/.test(selector)) {
          this[0] = document.getElementsByClassName(selector.replace('.',''));
      } else {
          arr = document.getElementsByTagName(selector);
          for ( ; i < arr.length; i += 1) {
            this[i] = arr[i];
          }
      }
      return this;
    },
    attr: function(key, value) {
      if(value) {
        var i = 0,
            len = this[0].length,
            elem,
            attr;
        for ( ; i < len; i += 1) {
            elem = this[ i ];
            elem.setAttribute(key,value);
        }
        return this;
      }
    },
    addClass: function(value) {
      if (value) {
        var i = 0, j,
            len = this[0].length,
            elem,
            cur,
            clazz,
            classes = ( value || "" );
        for ( ; i < len; i += 1) {
            elem = this[ i ];
            cur = elem.nodeType === 1 && ( elem.className ?
            ( " " + elem.className + " " ).replace(/[\t\r\n\f]/g, " " ) :
            " "
            );
            if ( cur ) {
                j = 0;
                while ( (clazz = classes[j++]) ) {
                    if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                        cur += clazz + " ";
                    }
                }
                elem.className = this.trim( cur );
            }
        }
        return this;
      }
    },
    trim: function(text) {
      return text == null ? "" : ( text + "" ).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    appendTo: function(parent) {
      var el = this, parent = this.init(parent);
      parent[0].appendChild(el);
      //document.getElementById('qunit').insertBefore(div,document.getElementById('qunit').firstChild);
    }
  };

  //if(!$ || !jQuery) {
    window.$ = Element;
  //}

  var Debug = function(status) {
    this.version = '1.0';
    this.console = window.console;
    this.vconsole = document.getElementById('console');
  };

  Debug.prototype.visibility = function() {
    if (this.vconsole == null) {
        $("body").addClass("debug");
        this.vconsole = $("<div/>").attr("id", "console");//.css("z-index", "20000").css("position", "fixed").css("width", "100%").css("bottom", "0").css("height", "20%").css("overflow", "scroll").css("background", "#fff").css("color","#000").css("border", "1px solid #000").css("font","11px monospace").appendTo("body");
        this.console.log(this.vconsole);
    }
  };

  Debug.prototype.assert = function() {
    this.console['assert'](arguments);
  };

  Debug.prototype.count = function() {
    this.console['count'](arguments);
  };

  Debug.prototype.debug = function() {
    this.console['debug'](arguments);
  };

  Debug.prototype.dir = function() {
    this.console['dir'](arguments);
  };

  Debug.prototype.dirxml = function() {
    this.console['dirxml'](arguments);
  };

  Debug.prototype.error = function() {
    this.console['error'](arguments);
  };

  Debug.prototype.exception = function() {
    this.console['exception'](arguments);
  };

  Debug.prototype.group = function() {
    this.console['group'](arguments);
  };

  Debug.prototype.groupCollapsed = function() {
    this.console['groupCollapsed'](arguments);
  };
  
  Debug.prototype.groupEnd = function() {
    this.console['groupEnd'](arguments);
  };

  Debug.prototype.info = function() {
    this.console['info'](arguments);
  };

  Debug.prototype.log = function() {
    this.console['log'](arguments);
  };

  Debug.prototype.markTimeline = function() {
    this.console['markTimeline'](arguments);
  };

  Debug.prototype.log = function() {
    this.console['log'](arguments);
  };

  Debug.prototype.log = function() {
    this.console['log'](arguments);
  };

  Debug.prototype.warn = function() {
    this.console['warn'](arguments);
  };

  window.Debug = Debug;
  
  window.console = new Debug();

}(jQuery, window));

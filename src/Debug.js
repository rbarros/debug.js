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

  var Debug = function(status) {
    this.version = '1.0';
    this.console = window.console;
  };

  Debug.prototype.log = function() {
    this.console['log'](arguments);
  };

  Debug.prototype.info = function() {
    this.console['info'](arguments);
  };

  Debug.prototype.warn = function() {
    this.console['warn'](arguments);
  };

  window.Debug = Debug;

  window.console = new Debug();

}(jQuery, window));

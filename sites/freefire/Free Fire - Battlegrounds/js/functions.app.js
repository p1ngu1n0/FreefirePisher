/* ================================================
 * Increase/decrease number for Input field by using arrow up/down keys.
 * 
 * Useful when it's not possible to use HTML5's Number.
 * 
 * No modern version of jQuery UI is required.
 * 
 * Licensed under The MIT License.
 * ================================================ */

!function($) {
    "use strict";

    var Updown = function($element, options) {
        this.defaultOptions = {
            step: 1,
            shiftStep: 6,
            circle: false,
            min: null,
            max: null
        };
        this.init($element, options);
    };

    Updown.prototype = {
        constructor: Updown,
        init: function($element, options) {
            this.$element = $element;
            this.options = $.extend(true, this.defaultOptions, options);
            this.watchKeyboard();
            this.watchMouse();
            
            return this;
        },
        watchKeyboard: function() {
            var self = this;
            this.$element.bind('keydown', function(event) {
                var code = (event.keyCode ? event.keyCode : event.which);
                if (self.keysMap[code] && !isNaN(self.getInputVal())) {
                    self.keysMap[code].call(self, event);
                    event.preventDefault();
                }
            });

            return this;
        },
        watchMouse: function() {
            var self = this;
            this.$element.bind('mousewheel DOMMouseScroll', function(event) {
                var e = window.event || event; // old IE support
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail || -e.originalEvent.detail)));
                if (delta < 0) {
                    self.keysMap[40].call(self, event);
                } else {
                    self.keysMap[38].call(self, event);
                }
                event.preventDefault();
            });

            return this;
        },
        keysMap: {
            38: function(event) {
                this.increase(event);
                this.triggerEvents();

                return this;
            },
            40: function(event) {
                this.decrease(event);
                this.triggerEvents();

                return this;
            }
        },
        getNumberVal: function(val) {
            if (!val) {
                return 0;
            }

            return Number(val);
        },
        getInputVal: function() {
            return this.getNumberVal(this.$element.val());
        },
        setInputVal: function(val) {
            this.$element.val(val);

            return this;
        },
        increase: function(event) {
            var step = event.shiftKey ? this.options.shiftStep : this.options.step;
            var val = this.getInputVal() + step;
            if (this.options.max !== null && val > this.options.max) {
                val = this.options.circle ? this.options.min : this.options.max;
            }
            this.setInputVal(val);

            return this;
        },
        decrease: function(event) {
            var step = event.shiftKey ? this.options.shiftStep : this.options.step;
            var val = this.getInputVal() - step;
            if (this.options.min !== null && val < this.options.min) {
                val = this.options.circle ? this.options.max : this.options.min;
            }
            this.setInputVal(val);

            return this;
        },
        triggerEvents: function() {
            this.$element.trigger('keyup');

            return this;
        }
    };

    $.fn.updown = function(options) {
        return this.each(function(index) {
            var $this = $(this);
            var data = $this.data('updown');
            if (!data) {
                $this.data('updown', new Updown($(this), options));
            }
        });
    };
}(window.jQuery);

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
  var CountTo = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
    this.init();
  };

  CountTo.DEFAULTS = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  CountTo.prototype.init = function () {
    this.value     = this.options.from;
    this.loops     = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };

  CountTo.prototype.dataOptions = function () {
    var options = {
      from:            this.$element.data('from'),
      to:              this.$element.data('to'),
      speed:           this.$element.data('speed'),
      refreshInterval: this.$element.data('refresh-interval'),
      decimals:        this.$element.data('decimals')
    };

    var keys = Object.keys(options);

    for (var i in keys) {
      var key = keys[i];

      if (typeof(options[key]) === 'undefined') {
        delete options[key];
      }
    }

    return options;
  };

  CountTo.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;

    this.render();

    if (typeof(this.options.onUpdate) == 'function') {
      this.options.onUpdate.call(this.$element, this.value);
    }

    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;

      if (typeof(this.options.onComplete) == 'function') {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };

  CountTo.prototype.render = function () {
    var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(formattedValue);
  };

  CountTo.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };

  CountTo.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
  };

  CountTo.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  CountTo.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };

  function formatter(value, options) {
    return value.toFixed(options.decimals);
  }

  $.fn.countTo = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('countTo');
      var init    = !data || typeof(option) === 'object';
      var options = typeof(option) === 'object' ? option : {};
      var method  = typeof(option) === 'string' ? option : 'start';

      if (init) {
        if (data) data.stop();
        $this.data('countTo', data = new CountTo(this, options));
      }

      data[method].call(data);
    });
  };
}));
// Generated by CoffeeScript 1.3.3

/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.0.0

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/


(function() {

  (function($) {
    $.easyPieChart = function(el, options) {
      var addScaleLine, animateLine, drawLine, easeInOutQuad, renderBackground, renderScale, renderTrack,
        _this = this;
      this.el = el;
      this.$el = $(el);
      this.$el.data("easyPieChart", this);
      this.init = function() {
        var percent;
        _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
        percent = parseInt(_this.$el.data('percent'), 10);
        _this.percentage = 0;
        _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
        _this.ctx = _this.canvas.getContext('2d');
        _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
        _this.$el.append(_this.canvas);
        _this.$el.addClass('easyPieChart');
        _this.$el.css({
          width: _this.options.size,
          height: _this.options.size,
          lineHeight: "" + _this.options.size + "px"
        });
        _this.update(percent);
      };
      this.update = function(percent) {
        if (_this.options.animate === false) {
          drawLine(percent);
        } else {
          animateLine(_this.percentage, percent);
        }
      };
      renderScale = function() {
        var i, _i;
        _this.ctx.fillStyle = _this.options.scaleColor;
        _this.ctx.lineWidth = 1;
        for (i = _i = 0; _i <= 24; i = ++_i) {
          addScaleLine(i);
        }
      };
      addScaleLine = function(i) {
        var offset;
        offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
        _this.ctx.save();
        _this.ctx.rotate(i * Math.PI / 12);
        _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
        _this.ctx.restore();
      };
      renderTrack = function() {
        _this.ctx.strokeStyle = _this.options.scaleColor;
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, _this.options.size / 2 - _this.options.size * 0.08 - _this.options.lineWidth / 2, 0, Math.PI * 2, true);
        _this.ctx.closePath();
        _this.ctx.strokeStyle = _this.options.trackColor;
        _this.ctx.lineWidth = _this.options.lineWidth;
        _this.ctx.stroke();
      };
      renderBackground = function() {
        if (_this.options.scaleColor !== false) {
          renderScale();
        }
        if (_this.options.trackColor !== false) {
          renderTrack();
        }
      };
      drawLine = function(percent) {
        renderBackground();
        _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
        _this.ctx.lineCap = _this.options.lineCap;
        _this.ctx.save();
        _this.ctx.rotate(-Math.PI / 2);
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, _this.options.size / 2 - _this.options.size * 0.08 - _this.options.lineWidth / 2, 0, Math.PI * 2 * percent / 100, false);
        _this.ctx.stroke();
        _this.ctx.restore();
      };
      animateLine = function(from, to) {
        var currentStep, fps, self, steps;
        self = _this;
        fps = 30;
        steps = fps * _this.options.animate / 1000;
        currentStep = 0;
        _this.options.onStart.call(_this);
        _this.percentage = to;
        _this.animation = setInterval(function() {
          self.ctx.clearRect(-self.options.size / 2, -self.options.size / 2, self.options.size, self.options.size);
          renderBackground.call(self);
          drawLine.call(self, [easeInOutQuad(currentStep, from, to - from, steps)]);
          currentStep++;
          if ((currentStep / steps) > 1) {
            clearInterval(self.animation);
            self.options.onStop.call(self);
          }
        }, 1000 / fps);
      };
      easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t + b;
        } else {
          return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
      };
      return this.init();
    };
    $.easyPieChart.defaultOptions = {
      barColor: '#ef1e25',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      size: 110,
      lineWidth: 3,
      animate: false,
      onStart: $.noop,
      onStop: $.noop
    };
    $.fn.easyPieChart = function(options) {
      return $.each(this, function(i, el) {
        var $el;
        $el = $(el);
        if (!$el.data('easyPieChart')) {
          return $el.data('easyPieChart', new $.easyPieChart(el, options));
        }
      });
    };
    return void 0;
  })(jQuery);

}).call(this);

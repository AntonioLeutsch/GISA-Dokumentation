/**
 * gisa-scripts.js
 */

var SGB = window.SGB || {};

(function (w, SGB, undefined) {

  var doc = w.document,
      docEl = doc.documentElement;

    // Replace no-js class with js class
    docEl.className = docEl.className.replace(/no-js/gi,'');
    docEl.className+=' js';

  // Cut the mustard
  if ("querySelector" in doc && Array.prototype.forEach) {

    docEl.className+=' gisa-enhanced';

    // Syntactic sugar for querySelectorAll and event delegates courtesy
    // @paul_irish: https://gist.github.com/paulirish/12fb951a8b893a454b32
    var queryAll = document.querySelectorAll.bind(document);

    Node.prototype.on = window.on = function (name, fn) {
      this.addEventListener(name, fn);
    };

    NodeList.prototype.forEach = Array.prototype.forEach;

    NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
      this.forEach(function (elem, i) {
        elem.on(name, fn);
      });
    };

     // Add functionality to toggle classes on elements
    function _hasClass(el, cl) {
      var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
      return !!el.className.match(regex);
    }

    function _addClass(el, cl) {
      el.className += ' ' + cl;
    }

    function _removeClass(el, cl) {
      var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
      el.className = el.className.replace(regex, ' ');
    }

    function _toggleClass(el, cl) {
      _hasClass(el, cl) ? _removeClass(el, cl) : _addClass(el, cl);
    }

    // Public methods
    SGB.toggleNav = function() {
      _toggleClass(docEl, 'nav-is-active');
    };

    SGB.hideNav = function() {
      _removeClass(docEl, 'nav-is-active');
    };

    SGB.toggleSourceCode = function() {
      var sourceCode = this.parentNode.nextElementSibling;
      _toggleClass(sourceCode, 'gisa-source-active');
    };

    SGB.selectSourceCode = function() {
      var range,
          selection;

      if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(this.nextSibling);
        range.select();
      } else if (w.getSelection) {
        selection = w.getSelection();
        range = doc.createRange();
        range.selectNodeContents(this.nextSibling);
        selection.removeAllRanges();
        selection.addRange(range);
      }

       _toggleClass(this, 'gisa-btn--select-active');
    };

    queryAll('.gisa-nav-toggle').on('click', SGB.toggleNav);
    queryAll('.gisa-nav-group a').on('click', SGB.hideNav);
    queryAll('.gisa-btn--source').on('click', SGB.toggleSourceCode);
    queryAll('.gisa-btn--select').on('click', SGB.selectSourceCode);
  }
}(this, SGB));

function coolFunctions() {
	if ($(window).width() <= 1024) {
		// Scroll
		$('#scroll').trigger('sticky_kit:detach');
	} else {
		//Scroll
		$('#scroll').stick_in_parent();
		//Menu
		var elm = document.querySelector('#scroll');
		var ms = new MenuSpy(elm, {
      activeClass : 'current-item'
    });
	}
}



jQuery(document).ready(function() {
	coolFunctions();
});

jQuery(window).on('resize', function() {
	coolFunctions();

});

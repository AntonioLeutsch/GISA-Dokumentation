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

function counter() {
	jQuery('.timer').countTo({
    from: 0,
    to: 650
  });
}


var X = true;
$(function() {
  if (X == true) {

    console.log(X);
    var oTop = $('.timer').offset().top - window.innerHeight;
    $(window).scroll(function(){

        var pTop = $(window).scrollTop();
        console.log( pTop + ' - ' + oTop );   //just for your debugging
        if( pTop > oTop  && X != false){
            counter();
            X = false;
          }
      });
    }
});


function myAccordion() {

	jQuery('.accordion dt').bind('click', function() {
		if (!jQuery(this).hasClass('active')) {

			jQuery(this).siblings('dd.active').slideToggle('fast');
			jQuery(this).parent().find('.active').removeClass('active');
			jQuery(this).addClass('active');
			jQuery(this).next('dd').slideToggle('fast').addClass('active');

			// Toggle Icon
			jQuery(this).find('i').removeClass('icon_plus_alt2');
			jQuery(this).find('i').addClass('icon_minus_alt');
			jQuery(this).parent().find('dt').not('.active').find('i').removeClass('icon_minus_alt');
			jQuery(this).parent().find('dt').not('.active').find('i').addClass('icon_plus_alt2');

		}
	});
	jQuery('.accordion #open').click();
}


jQuery(document).ready(function() {
  //counter();
	myAccordion();
	coolFunctions();
	jQuery('.owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		navText: [
			"<span class='nav left'><i class='arrow_carrot-left'></i></span>", "<span class='nav right'><i class='arrow_carrot-right'></i></span>",
		],
		navElement: 'span',
		dots: false,
		items: 1
	});
	document.getElementById("defaultOpen").click();
	document.getElementById("defaultOpen").removeAttribute('id');
});

jQuery(window).on('resize', function() {
	coolFunctions();
  X = true;
});

function openTab(evt, tabName) {
	// Declare all variables
	var i,
		tabcontent,
		tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

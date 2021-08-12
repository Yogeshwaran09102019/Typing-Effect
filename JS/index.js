$("aside").hide();
$(".content").hide();

$(".loader-container").delay(9000).hide(1,function(){
  $("body").addClass("setBackground");
  $("aside").show();
  $(".content").show();
});
;(function () {

	'use strict';

var burgerMenu = function() {

  $('.js-colorlib-nav-toggle').on('click', function(event){
    event.preventDefault();
    var $this = $(this);

    if ($('body').hasClass('offcanvas')) {
      $this.removeClass('active');
      $('body').removeClass('offcanvas');
    } else {
      $this.addClass('active');
      $('body').addClass('offcanvas');
    }
  });


};


var navActive = function(section) {

  var $el = $('#navbar > ul');
  $el.find('li').removeClass('active');
  $el.each(function(){
    $(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
  });

};

var navigationSection = function() {

  var $section = $('section[data-section]');

  $section.waypoint(function(direction) {

      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
  }, {
      offset: '150px'
  });

  $section.waypoint(function(direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
  }, {
      offset: function() { return -$(this.element).height() + 155; }
  });

};
$(function(){
  burgerMenu();
  clickMenu();
  // navActive();
  navigationSection();
  // windowScroll();



});


}());

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 3);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

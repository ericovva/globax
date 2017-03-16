function choose_softly(target) {
    if (!$(target).hasClass("active")) {

        if ( $(target).hasClass("next") || $(target).hasClass("next1") || $(target).hasClass("next2") || $(target).hasClass("next3") ) {
        var select = $(".active").next();
        if (!select.length) {
            select = $('.panel:first');
        }
      }
      else {
        var select = $(".active").prev();
        if (!select.length) {
            select = $('.panel:last');
        }
      }

        if ( !TweenMax.isTweening(".active") ) {

            $(".panel").removeClass("active next next1 next2 next3 prev prev1 prev2 prev3");
            $(select).addClass("active");
        }
        change_position();

        if ($(target).hasClass("active")) {
            go_change_position(0.8);
        } else {
            go_change_position(0.35);
        }
        if ($(select).index() != $(target).index()) {
            setTimeout(choose_softly, 400, target)
        }
    }
}

function go_change_position(speed) {
  TweenMax.to(".active", speed, {x:0, y:-20, scale: 1});
  TweenMax.to(".next, .prev", speed, {x:20, scale: 0.85});
  TweenMax.to(".next", speed, {y:85, ease:Power1.easeOut});
  TweenMax.to(".prev", speed, {y:-85, ease:Power1.easeOut});
  TweenMax.to(".next1, .prev1", speed, {x:40, scale: 0.7});
  TweenMax.to(".next1", speed, {y:140, ease:Power1.easeOut});
  TweenMax.to(".prev1", speed, {y:-140, ease:Power1.easeOut});
  TweenMax.to(".next2, .prev2", speed, {x:60, scale: 0.5});
  TweenMax.to(".next2", speed, {y:180, ease:Power1.easeOut});
  TweenMax.to(".prev2", speed, {y:-180, ease:Power1.easeOut});
  TweenMax.to(".next3, .prev3", speed, {scale: 0.35});
  if ( $(".next3").hasClass("simple") ) {
    TweenMax.to(".next3", speed, {y:210, x:80, ease:Power1.easeOut});
  }
  else {
    var tm = new TimelineMax();
    tm.to(".next3", speed/3, {y:-270, x: 150,  ease:Power1.easeOut})
    .to(".next3", speed/3, {y:270, ease:Power1.easeOut})
    .to(".next3", speed/3, {y:210, x:80, ease:Power1.easeOut});
  }
  if ( $(".prev3").hasClass("simple") ) {
    TweenMax.to(".prev3", speed, {y:-210, x:80, ease:Power1.easeOut});
  }
  else {
    var timeline = new TimelineMax();
    timeline.to(".prev3", speed/3, {y:270, x: 150,  ease:Power1.easeOut})
    .to(".prev3", speed/3, {y:-270, ease:Power1.easeOut})
    .to(".prev3", speed/3, {y:-210, x:80, ease:Power1.easeOut});
  }

  $(".panel").removeClass("simple hard");
  $(".next2").addClass("simple");
  $(".prev2").addClass("simple");
}

function change_position() {

// цикл для создания иерархии элементов
for (var i = 0; i < 4; i++) {
  var name_old = "active";
  var name_new = "next";
  if (i > 0) {
    name_old = "next";
    if (i > 1) {
      name_old = "next" + (i - 1);
    }
    name_new = "next" + i;
  }


  if ( $("." + name_old).next().length ) {
  $("." + name_old).next().addClass(name_new);
  }
  else {
    $('.panel:first').addClass(name_new);
  }

  // и затем для prev
  var prev_name_old = "active";
  var prev_name_new = "prev";
  if (i > 0) {
    prev_name_old = "prev";
    if (i > 1) {
      prev_name_old = "prev" + (i - 1);
    }
    prev_name_new = "prev" + i;
  }

  if ( $("." + prev_name_old).prev().length ) {
  $("." + prev_name_old).prev().addClass(prev_name_new);
  }
  else {
      $('.panel:last').addClass(prev_name_new);
  }
}

}

function choose_item_menu(choice) {
  if (!TweenMax.isTweening( ".active" )) {
    $(".next2 prev2").addClass("simple");
    $(".next3 prev3").addClass("hard");
  $(".panel").removeClass("active next next1 next2 next3 prev prev1 prev2 prev3");
  $(choice).addClass("active");

  change_position();
  go_change_position(1);
}
}



function mainOne() {
$(".panel:first").addClass("active");
change_position();
go_change_position(0);


  $(".panel").click(function() {
      var select = $(this);
      choose_softly(select);
    });


  $('.first_section').on('mousewheel', function(event) {
    if (event.deltaY === 1) {
        var select = $(".active").prev();
        if (!select.length) {
          select = $('.panel:last');
        }
        choose_item_menu(select);
    }
    if (event.deltaY === -1) {
        var select = $(".active").next();
        if (!select.length) {
          select = $('.panel:first');
        }
        choose_item_menu(select);
    }
  });
}


$(document).ready(function() {
  mainOne();
});

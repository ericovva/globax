var colors = ["ED3237", "F58634", "FFF212", "00A859", "00AFEF", "5c60db", "b17fe0"];

var href_dictionary = {
    "/": 1,
    "/brief": 2,
    "/out-of-home": 3,
    "/digital": 4,
    "/mediaservice": 5,
    "/strategy": 6,
    "/production": 7,
    "/cases": 8,
    "/contacts": 9
}

var href_dictionary_html = {
    "index.html": 1,
    "/brief.html": 2,
    "/out-of-home.html": 3,
    "/digital.html": 4,
    "/mediaservice.html": 5,
    "/strategy.html": 6,
    "/production.html": 7,
    "/cases.html": 8,
    "/contacts.html": 9
}

var timerId;
var star_state = 0;


// контент
function content_description() {
    $(".content_list li").click(function() {
        $(this).find(".content_description").fadeToggle(200);
    });
}

function change_href_links(href) {
    $(".href").attr("href", href);
    $("#invisible").attr("href", href);
}


// для препятствия переключению слайдов
var global_lock_slide = 0;

function clock() {
    var progress = $(".active").index() + 1;
    var total = String(100 / 7 * progress) + "%";
    TweenMax.to(".clock__dial__progress", 1, {
        drawSVG: total,
        ease: Expo.easeInOut
    });

}

function circle_animation() {

    function circle_go() {
        var circle_outer = document.createElement("div");
        circle_outer.classList.add("circles_background");

        var circle = document.createElement("div");
        circle.classList.add("circle");

        var slide = $(".active").index();

        circle.style.borderColor = "#" + colors[slide];

        $(".clock").append(circle_outer);
        $(circle_outer).append(circle);

        TweenMax.fromTo(circle, 2.5, {
            opacity: 1,
            width: 250,
            height: 250
        }, {
            width: 400,
            height: 400,
            opacity: 0,
            onComplete: function() {
                circle_outer.parentNode.removeChild(circle_outer);
            }
        });
    }



    $(".href").hover(function() {
        TweenMax.to(".clock__dial", 0.7, {
            opacity: 0
        });
        TweenMax.to(".clock__dial__minutes", 0.3, {
            opacity: 0
        });
        timerId = setInterval(circle_go, 700);
    }, function() {
        TweenMax.to(".clock__dial", .7, {
            opacity: 1
        });
        TweenMax.to(".clock__dial__minutes", 0.3, {
            opacity: 1
        });
        clearTimeout(timerId);

    });

}

var splash_state = 0;


function go_stars() {
    for (var i in starField.geometry.vertices) {

        var star = Math.round(Math.random() * (x_array.length - 1));

        new TWEEN.Tween(starField.geometry.vertices[i]).to({
                x: x_array[star],
                y: y_array[star],
                z: z_array[star]
            }, 1500)
            .easing(TWEEN.Easing.Exponential.InOut).start();
    }

    for (var i in hazars.geometry.vertices) {
        var star = Math.round(Math.random() * (x_array.length - 1));

        new TWEEN.Tween(hazars.geometry.vertices[i]).to({

                x: x_array[star],
                y: y_array[star],
                z: z_array[star]
            }, 1500)
            .easing(TWEEN.Easing.Exponential.InOut).start();
    }
}

function change_page_stars() {
    go_stars();


    if (star_state === 0) {
        new TWEEN.Tween(starField.position).to({
                x: 100,
                y: 100
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(hazars.position).to({
                x: 100,
                y: 100
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        star_state = 1;
    } else if (star_state === 1) {
        new TWEEN.Tween(starField.position).to({
                x: -50,
                y: -100
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(hazars.position).to({
                x: -50,
                y: -100
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        star_state = 2;
    } else if (star_state === 2) {
        new TWEEN.Tween(starField.position).to({
                x: 0,
                y: 0,
                z: 0
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(hazars.position).to({
                x: 0,
                y: 0,
                z: 0
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        star_state = 0;
    }


}

function change_color_of_stars(color = "ffffff") {
    var time = 500;

    const hex_color = "0x" + color;

    if ($(".enter_page").length == 0) {

        go_stars();
        new TWEEN.Tween(starField.material)
            .to({
                opacity: 0.3
            }, time)
            .start()
            .onComplete(function() {
                starField.material.color.setHex(hex_color);
                new TWEEN.Tween(starField.material)
                    .to({
                        opacity: 1
                    }, time).start();
            });
        new TWEEN.Tween(hazars.material).to({
                opacity: 0.3
            }, time)
            .start()
            .onComplete(function() {
                hazars.material.color.setHex(hex_color);
                new TWEEN.Tween(hazars.material)
                    .to({
                        opacity: 1
                    }, time).start();
            });

    }



    // var svg_color = "#" + color;



    // TweenMax.to("#logo_text_color", 0.5, {
    //     color: svg_color
    // });

    // if (svg_color == "#ffffff") {
    //     svg_color = "#3C4349";
    // }

    // TweenMax.to(".st0_1, .st1_1", 0.5, {
    //     fill: svg_color
    // });


}

function change_background() {
    var slide = $(".active").index();
    change_color_of_stars(colors[slide]);



    function change_icon(img) {
        TweenMax.to(".inside_icon", 0.5, {
            opacity: 0,
            onComplete: function() {
                var img_path = "url(/static/main/img/ICONS/without_lightning/" + img + ".png)";
                console.log(img_path);
                $(".inside_icon").css("background-image", img_path);
                TweenMax.to(".inside_icon", 0.5, {
                    opacity: 1
                });
            }
        });
    }

    if (slide == 0) {
        change_icon("outdoor");
    }
    if (slide == 1) {
        change_icon("city");
    }
    if (slide == 2) {
        change_icon("transport");
    }
    if (slide == 3) {
        change_icon("smi");
    }
    if (slide == 4) {
        change_icon("graffiti");
    }
    if (slide == 5) {
        change_icon("internet");
    }
    if (slide == 6) {
        change_icon("city");
    }



    clock();
    switch_slides(slide);
}

function switch_slides(slide) {

    if (slide == 0) {
        change_href_links("/outdoor");
        appear_labels("Реклама, которую видит каждый",
            "От ситиформата до медиафасада",
            "Наружная реклама", "Статика | Динамика | Digital");
    }

    if (slide == 1) {
        change_href_links("/indoor");
        appear_labels("Реклама в нужной точке",
            "От квитанций до промо-акций",
            "Indoor", "Лайтбоксы | BTL | Брендирование");
    }
    if (slide == 2) {
        change_href_links("/transit");
        appear_labels("Реклама, которую не остановить",
            "Муниципальный, ЖД и коммерческий транспорт",
            "Реклама на транспорте и в метро", "Стикеры | Экраны | Оклейка");
    }
    if (slide == 3) {
        change_href_links("/mass_media");
        appear_labels("Читай, слушай, смотри",
            "Теле-, радиоэфиры, печатные издания",
            "Реклама в СМИ", "ТВ | Радио | Пресса");
    }
    if (slide == 4) {
        change_href_links("/nonstandard");
        appear_labels("Реклама, которую запомнят надолго",
            "Эффектные и эффективные решения",
            "Граффити и нестандарты", "Фасады | Конструкции | Крыши");
    }
    if (slide == 5) {
        change_href_links("/internet");
        appear_labels("Реклама, достигающая свою аудиторию",
            "Максимально точный таргетинг",
            "Интернет", "Media | Контекст| SMM");
    }
    if (slide == 6) {
        change_href_links("/creative_production");
        appear_labels("Этапы воплощения идеи в жизнь",
            "От логотипа до видеоклипа",
            "Креатив и продакшн", "Разработка | Печать | Производство");
    }


}



function appear_labels(big_label, small_label, clock_big_label, clock_small_label) {

    // надпись Далее
    TweenMax.set(".picture_tap", {
        opacity: 0,
        x: 10,
        y: 30
    });


    var slide = $(".active").index() + 1;
    var tweenie = new TimelineMax();
    tweenie.to("#number_this", 0.5, {
            y: -30,
            alpha: 0,
            onComplete: function() {
                $("#number_this").text(slide)
            }
        })
        .set("#number_this", {
            y: 30
        })
        .to("#number_this", 0.5, {
            y: 0,
            alpha: 1
        });


    var name = "#back_" + slide;
    var timeline = new TimelineMax();
    var timeline1 = new TimelineMax();
    var timeline2 = new TimelineMax();
    timeline.to(".clock_big_label", 0.5, {
            y: 40,
            alpha: 0
        })
        .to(".clock_big_label", 0.3, {
            y: -50,
            onComplete: function() {
                $(".clock_big_label").text(clock_big_label);
            }
        })
        .to(".clock_big_label", 1, {
            alpha: 1,
            y: 0
        });
    timeline1.to(".clock_small_label", 0.3, {
            alpha: 1
        })
        .to(".clock_small_label", 0.5, {
            y: 30,
            alpha: 0,
            onComplete: function() {
                $(".clock_small_label").text(clock_small_label);
            }
        })
        .to(".clock_small_label", 0.2, {
            y: -50
        })
        .to(".clock_small_label", 1, {
            alpha: 1,
            y: 0,
            scale: 1
        });

    timeline2.to(".enter", 0.3, {
            opacity: 0
        })
        .to(".enter", 1, {
            opacity: 0,
            onComplete: function() {
                TweenMax.to(".enter", 0.5, {
                    opacity: 1
                });
                var tweenie = new TimelineMax();
                tweenie.to(".picture_tap", 1, {
                        opacity: 1,
                        x: 0,
                        y: 0
                    })
                    .to(".picture_tap", 0.3, {
                        scale: 0.9
                    }, "+=0.5")
                    .to(".picture_tap", 0.3, {
                        scale: 1
                    })
                    .to(".picture_tap", 0.5, {
                        opacity: 0
                    }, "+=0.5");

            }
        })



    $(".down_left_group").find("p").typeIt({
            strings: small_label,
            speed: 50,
            cursorSpeed: 1500
        })
        .tiSettings({
            cursor: false
        });

    $(".down_left_group").find("h4").typeIt({
        strings: big_label,
        speed: 60,
        cursor: false
    })

}

function choose_softly(target) {
    if (!TweenMax.isTweening(".active") && global_lock_slide == 0) {
        if (!$(target).hasClass("active")) {

            if ($(target).hasClass("next") || $(target).hasClass("next1") || $(target).hasClass("next2") || $(target).hasClass("next3")) {
                var select = $(".active").next();
                if (!select.length) {
                    select = $('.panel:first');
                }
            } else {
                var select = $(".active").prev();
                if (!select.length) {
                    select = $('.panel:last');
                }
            }

            $(".panel").removeClass("active next next1 next2 next3 prev prev1 prev2 prev3");
            $(select).addClass("active");

            change_position();

            if ($(target).hasClass("active")) {
                go_change_position(0.8, target, "Power2.easeOut");
            } else if ($(target).hasClass("next") || $(target).hasClass("prev")) {
                go_change_position(0.4, target, "Power0");
            } else if ($(target).hasClass("next1") || $(target).hasClass("prev1")) {
                go_change_position(0.5, target, "Power2.easeIn");
            } else {
                go_change_position(0.35, target, "Power0");
            }

        }
    }
}

function go_change_position(speed, target, easing = "Power1.easeOut") {


    if ($(".active").index() == $(target).index()) {
        TweenMax.to(".active", speed, {
            height: "100px",
            x: 0,
            y: -20,
            scale: 1
        });
        change_background();
    } else {
        TweenMax.to(".active", speed, {
            x: 0,
            y: -25,
            scale: 1,
            onCompleteParams: [target],
            onComplete: choose_softly
        });
    }
    TweenMax.to(".next, .prev", speed, {
        x: -20,
        scale: 0.9,
        ease: easing
    });
    TweenMax.to(".next", speed, {
        y: 90,
        ease: easing
    });
    TweenMax.to(".prev", speed, {
        y: -90,
        ease: easing
    });
    TweenMax.to(".next, .prev", speed / 5, {
        height: "55px",
        ease: Power4.easeOut
    });
    TweenMax.to(".next1, .prev1", speed, {
        x: -40,
        scale: 0.8
    });
    TweenMax.to(".next1", speed, {
        y: 150,
        ease: easing
    });
    TweenMax.to(".prev1", speed, {
        y: -150,
        ease: easing
    });
    TweenMax.to(".next2, .prev2", speed, {
        x: -55,
        scale: 0.7
    });
    TweenMax.to(".next2", speed, {
        y: 187,
        ease: easing
    });
    TweenMax.to(".prev2", speed, {
        y: -187,
        ease: easing
    });

    var position_next_2 = {
        y: 200,
        x: -55,
        ease: Expo.easeOut
    };
    var position_prev_2 = {
        y: -200,
        x: -55,
        ease: Expo.easeOut
    };
    if ($(".next2").hasClass("simple")) {
        TweenMax.to(".next2", speed, position_next_2);
    } else {
        var tm = new TimelineMax();
        tm.to(".next2", speed / 2 - 0.001, {
                y: -270,
                x: -160,
                ease: easing
            })
            .to(".next2", 0.001, {
                y: 270
            })
            .to(".next2", speed / 2, position_next_2);
    }
    if ($(".prev2").hasClass("simple")) {
        TweenMax.to(".prev2", speed, position_prev_2);
    } else {
        var timeline = new TimelineMax();
        timeline.to(".prev2", speed / 2 - 0.001, {
                y: 270,
                x: -160,
                ease: easing
            })
            .to(".prev2", 0.001, {
                y: -270
            })
            .to(".prev2", speed / 2, position_prev_2);
    }

    $(".panel").removeClass("simple hard");
    $(".next1").addClass("simple");
    $(".prev1").addClass("simple");
}

function change_position() {

    // цикл для создания иерархии элементов
    for (var i = 0; i < 3; i++) {
        var name_old = "active";
        var name_new = "next";
        if (i > 0) {
            name_old = "next";
            if (i > 1) {
                name_old = "next" + (i - 1);
            }
            name_new = "next" + i;
        }


        if ($("." + name_old).next().length) {
            $("." + name_old).next().addClass(name_new);
        } else {
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

        if ($("." + prev_name_old).prev().length) {
            $("." + prev_name_old).prev().addClass(prev_name_new);
        } else {
            $('.panel:last').addClass(prev_name_new);
        }
    }

}

var handler_resize;

function menu_appear() {
    if (window.location.pathname == "/") {

        handler_resize = function() {
            if ($(window).width() > 800) {
                let indent = ($(".menu .container").outerWidth() / 2 - $(".menu_block").outerWidth() / 2) + "px";
                $(".menu_block").css("right", indent);

                if ($(window).width <= 800) {
                    TweenMax.set(".menu_block", {
                        right: 0
                    });
                }
            }

        };

        handler_resize();

        $(window).bind("resize", handler_resize);
        TweenMax.to(".menu .logo", 0.3, {
            opacity: 0
        });

    } else {
        TweenMax.to(".menu .logo", .5, {
            opacity: 1
        });

        $(window).unbind("resize", handler_resize);
        TweenMax.to(".menu .logo", 0.3, {
            opacity: 1
        });
        TweenMax.to(".menu_block", 1, {
            right: 0
        })
    }

    if (window.location.pathname == "/") {
        TweenMax.to(".menu .logo", 0.5, {
            opacity: 0
        })
    } else {
        TweenMax.to(".menu .logo", 0.5, {
            opacity: 1
        })
    }
}

function enter_page() {
    var tl = new TimelineLite();
    tl.staggerFromTo(".enter_logo, .enter_page h1, .enter_logo_text, .enter_page_button", 0.5, {
            opacity: 0
        }, {
            opacity: 1,
            delay: 1
        }, 0.3)
        .from(".enter_page_line", 0.5, {
            width: 0,
            ease: Power2.easeInOut
        });

    $(".enter_page_button").click(function() {
        var tl = new TimelineMax();
        tl.to(".enter_page_button", 0.3, {
                opacity: 0
            })
            .set(".enter_page_button", {
                display: "none"
            })
            .to(".enter_page_inside", 0.5, {
                y: -70,
                ease: Power2.easeOut
            })
            .set(".enter_page_columns", {
                display: "block",
                opacity: 1
            })
            .staggerFromTo(".enter_page_columns div", 0.3, {
                opacity: 0
            }, {
                opacity: 1
            }, 0.3);
    })
}


function mainOne(detach) {
    menu_appear();
    enter_page();

    // Кнопка для формы
    $(".content_button").click(function() {
        $(this).after(detach);
        var check = $(this);
        TweenMax.to($(this), 0.1, {
            opacity: 0,
            onComplete: function() {
                TweenMax.set(check, {
                    display: "none"
                });
                TweenMax.set(detach, {
                    display: "flex",
                    opacity: 0,
                    y: 100
                });
                TweenMax.to(detach, .5, {
                    y: 0,
                    opacity: 1
                });
                const offset = $(".form_all").offset();
                TweenLite.to(window, 1, {
                    scrollTo: offset.top,
                    ease: Power1.easeInOut
                });
            }
        });



        detach.unbind("submit");

        detach.submit(function() {
            var form_data = $(this).serialize();

            var name = $("#form_name").val();
            var phone = $("#form_phone").val();
            var email = $("#form_email").val();
            var comment = $("#form_comment").val();
            var path = window.location.href;

            var take = $(this);

            $.post("/request/", {
                    name: name,
                    phone: phone,
                    email: email,
                    comment: comment,
                    path: path
                })
                .done(function(data) {
                    console.log("done");
                    if (data['status'] == 'ok') {
                        take.find(".output").text("Спасибо! Ваша заявка получена.")
                    } else {
                        take.find(".output").text("Ошибка! Проверьте правильность заполнения полей.")
                    }
                })
                .fail(function() {
                    take.find(".output").text("Ошибка сервера! Попробуйте повторить попытку.")
                })
            $(this).find(".output").css("opacity", "1");
            return false;
        });


    })

    //форма 


function open_extended_item(item,time,offset) {

    if (!$(item).find(".item_inside").hasClass("opened")) {
            $(item).find(".item_inside").addClass("opened");
            // $(item).find(".item_inside").addClass("opened");
            var height = $(item).find(".flex_container_2_parts").outerHeight();

            TweenLite.to($(item).find(".item_inside"),time,{height:height+15});

            if (offset) {

                if ($(window).width() < 600) {
                    const offset = $(item).offset();
                    TweenLite.to(window, 1, {
                        scrollTo: offset.top,
                        ease: Power1.easeInOut
                    });
                }
            }

        } else {
            $(item).find(".item_inside").removeClass("opened");
            $(item).find(".item_inside").removeClass("opened");
            TweenLite.to($(item).find(".item_inside"),time,{height:0});
        }

}


    // раскрывающийся список
    $(".content_item").click(function() {

        open_extended_item(this,0.5,true);
    });

    $(".content_item").each(function(){
        open_extended_item(this,0,false);
    });



    var open_page_tween = new TimelineMax();
    open_page_tween.staggerFrom(".content_section_line", 1.6, {
            height: "0",
            ease: Power1.easeIn
        }, 0.1)
        .from(".content_section_first_number, .content_section_1 .left_to_top", 0.8, {
            y: -40,
            opacity: 0
        }, "-=2.2")
        .from(".content_section_1 .content_header, .content_section_1 .content_header_2", 0.7, {
            x: -50,
            opacity: 0
        }, "-=1.7")
        .from(".content_section_1 .aboveline_line", 0.3, {
            width: 0
        }, "-=1.4")
        .from(".content_section_1 .aboveline", 0.5, {
            x: -10,
            opacity: 0
        }, "-=1.2")
        .from(".content_section_1 .content_sub_header, .content_section_1 .content_citate", 0.6, {
            y: 30,
            opacity: 0
        }, "-=0.9")
        .fromTo(".content_section_1 .mouse_go, .hamburger_button, .for_content", 0.5, {
            opacity: 0
        }, {
            opacity: 1
        }, "-=1")
        .from(".content_section_first_image", 2, {
            opacity: 0.2,
            xPercent: -100,
            ease: Power4.easeOut
        }, "-=1");


    if ($("#main_section").length > 0) {
        // хаммер для свайпа
        // get a reference to an element
        var stage = document.getElementById('main_section');

        // create a manager for that element
        var mc = new Hammer.Manager(stage);

        // create a recognizer
        var swipe = new Hammer.Swipe();

        // add the recognizer
        mc.add(swipe);

        // subscribe to events
        mc.on('swipeup', function(e) {
            // do something cool

            var select = $(".active").next();
            if (!select.length) {
                select = $('.panel:first');
            }
            choose_softly(select);
        });


        mc.on('swipedown', function(e) {
            // do something cool

            var select = $(".active").prev();
            if (!select.length) {
                select = $('.panel:last');
            }
            choose_softly(select);
        });

    }

    if ($('.content_slider').length > 0) {
        $('.content_slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }

    content_description();
    circle_animation();

    var pathname = window.location.pathname;
    var begin = $(".panel:first");

    for (var key in href_dictionary) {
        if (key == pathname) {
            var number = href_dictionary[key] - 1;
            var stroke = ".panel:eq(" + number + ")";
            begin = $(stroke);
        }
    }




    if ($("#main_section").length > 0) {
        $(begin).addClass("active");
        change_position();
        go_change_position(0, begin);
    }


    // $(".panel").click(function() {
    //     var select = $(this);
    //     choose_softly(select);

        
        
    // });

    $('.panel').on('click', function(event) {
        if ($(this).hasClass('active')) {            
            window.location.replace($('.href').attr('href'));
        }
        var select = $(this);
        choose_softly(select);
        
    });

    // $('.panel').on('click', function(event) {
    //     event.preventDefault();
    //     // if ($(this).hasClass('prev') || $(this).hasClass('next') || $(this).hasClass('active')) {
    //     if ($(this).hasClass('active')) {            
    //         window.location.replace($('.href').attr('href'));
    //     } else {
    //         return 0;
    //     }
    // });

    // $(".panel").click(function(e) {
    //     e.preventDefault();
        
    // });




    $('.first_section').on('mousewheel', function(event) {
        console.log(event.deltaX * event.deltaFactor);
        if (event.deltaY === 1) {
            var select = $(".active").prev();
            if (!select.length) {
                select = $('.panel:last');
            }
            choose_softly(select);
        }
        if (event.deltaY === -1) {
            var select = $(".active").next();
            if (!select.length) {
                select = $('.panel:first');
            }
            choose_softly(select);
        }
        TweenMax.to(".mouse_go", 0.3, {
            opacity: 0
        });
    });

    $('.up').click(function() {
        var select = $(".active").prev();
        if (!select.length) {
            select = $('.panel:last');
        }
        choose_softly(select);
    });
    $('.down').click(function() {
        var select = $(".active").next();
        if (!select.length) {
            select = $('.panel:first');
        }
        choose_softly(select);

    });

    if (window.location.pathname == "/about" || window.location.pathname == "/contacts" || window.location.pathname == "/") {
        change_color_of_stars();
    }

    if (window.location.pathname == "/") {
        $(".menu").css("background", "none")

        function test() {
            var hex_color = "0xffffff";
            var time = 500;

            new TWEEN.Tween(starField.material)
                .to({
                    opacity: 0.3
                }, time)
                .start()
                .onComplete(function() {
                    starField.material.color.setHex(hex_color);
                    new TWEEN.Tween(starField.material)
                        .to({
                            opacity: 1
                        }, time).start();
                });
            new TWEEN.Tween(hazars.material).to({
                    opacity: 0.3
                }, time)
                .start()
                .onComplete(function() {
                    hazars.material.color.setHex(hex_color);
                    new TWEEN.Tween(hazars.material)
                        .to({
                            opacity: 1
                        }, time).start();
                });
        }
        test();
    } else if ($(window).width() < 600) {
        $(".menu").css("background", "rgba(0,0,0,.9)");
    } else {
        $(".menu").css("background", "none");
    }
}


$(document).ready(function() {
    if ($(window).width() > 900) {
        var maxContentItem = 0;
        $(".content_item>.flex_container_2part").each(function() {
            if ($(this).height() > maxContentItem) {
                maxContentItem = $(this).height();
            }
        });

        $(".content_item>.flex_container_2part").each(function() {
            $(this).css('height', maxContentItem+'px');
        });

    }

   


    $(".menu a").each(function() {

        const line_bottom_left = $(this).find(".line_bottom_left");
        const line_left = $(this).find(".line_left");
        const line_top_right = $(this).find(".line_top_right");
        const line_top_left = $(this).find(".line_top_left");
        const line_right = $(this).find(".line_right");
        const line_bottom_right = $(this).find(".line_bottom_right");

        const lines_top = $(this).find(".line_top_left, .line_top_right");
        const lines_sides = $(this).find(".line_left, .line_right");
        const lines_bottom = $(this).find(".line_bottom_left, .line_bottom_right");

        const time = 0.1;

        var tween = new TimelineMax({
            paused: true
        });
        tween.to(lines_top, time, {
                width: "50%",
                ease: Power0
            })
            .to(lines_sides, time, {
                height: "100%",
                ease: Power0
            }, "+=0.05")
            .to(lines_bottom, time, {
                width: "50%",
                ease: Power0
            }, "+=0.05")
            .to($(this).find("span"), 0.3, {
                backgroundColor: "#fff"
            });

        $(this).click(function() {
            if (!$(this).hasClass('selected_menu')) {
                tween.reverse();
            }
            
        });

        $(this).hover(function() {
            
            if ($(this).hasClass('logo')) {
                return 0;
            }
            if (!$(this).hasClass('selected_menu')) {
                tween.play();
                
                if ($(this).hasClass('toggle_agency')) {
                    $('.submenu_agency').fadeIn(400);
                    $('#menu_1_1').play();
                    $('#menu_1_2').play();
                }
            }
            
        }, function() {
            if (!$(this).hasClass('selected_menu')) {

                tween.reverse();
                if ($(this).hasClass('toggle_agency')) {
                    $('.submenu_agency').fadeOut(300);
                    $('#menu_1_1').reverse();
                    $('#menu_1_2').reverse();
                    $(this).reverse();
                }
    
                if ($(this) == $('#menu_1_1')) {
                    $('toggle_agency').play();
                }
    
                if ($(this) == $('#menu_1_2')) {
                    $('toggle_agency').play();
                }
            }
            // if ($(this).hasClass('selected_menu')) {
            //     return 0;
            // }
            
            
        });

        

    });

    var menu_button_lock = 0;

    $(".menu_button").click(function() {
        if (menu_button_lock == 0) {
            if ($(".menu").hasClass("opened")) {
                $(".menu").removeClass("opened");
                TweenMax.staggerTo(".menu .container a", .5, {
                    xPercent: -100,
                    onComplete: function() {
                        TweenMax.set(".menu .container", {
                            display: "none"
                        });
                    }
                }, 0.1);
            } else {
                $(".menu").addClass("opened");
                TweenMax.set(".menu .container", {
                    display: "block"
                });
                TweenMax.staggerTo(".menu .container a", .5, {
                    xPercent: 0
                }, 0.1);
            }

            menu_button_lock = 1;
            setTimeout(function() {
                menu_button_lock = 0
            }, 1000);
        }
    });





    $(document).mouseup(function(e) {
        var container = $(".menu");
        if (container.has(e.target).length === 0) {
            if ($(".menu").hasClass("opened")) {
                $(".menu").removeClass("opened");
                TweenMax.staggerTo(".menu .container a", .5, {
                    xPercent: -100,
                    onComplete: function() {
                        TweenMax.set(".menu .container", {
                            display: "none"
                        });
                    }
                }, 0.1);
            }
        }
    });

    $(".menu_block a").click(function() {
        if ($(".menu").hasClass("opened")) {
            $(".menu").removeClass("opened");
            TweenMax.staggerTo(".menu .container a", .5, {
                xPercent: -100,
                onComplete: function() {
                    TweenMax.set(".menu .container", {
                        display: "none"
                    });
                }
            }, 0.1);
        }
        $(".menu_block").find('.selected_menu').removeClass('selected_menu');

        // $(".menu_block a").each(function(){
        //     $(this).reverse();
        // });

        // $('#menu_1').trigger('click');
        // $('#menu_2').trigger('click');
        // $('#menu_3').trigger('click');

        // $('.menu_block a').mouseleave();

        $(this).addClass('selected_menu');

        

        
        

    });

    // lite-версия





    function setCookie(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    };


    function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset)
                if (end == -1) {
                    end = cookie.length;
                }
                setStr = unescape(cookie.substring(offset, end));
            }
        }
        return (setStr);
    }

    if (getCookie("foo") !== null) {
        $("#starForge_field").find("canvas").fadeOut(200);
        $(".toggle_option").addClass("selected");
    }

    console.log(getCookie("foo"));

    $(".toggle_option").click(function() {

        if (!$(this).hasClass("selected")) {
            $("#starForge_field").find("canvas").fadeOut(200);
            $(this).addClass("selected");
            setCookie("foo", "bar", "Mon, 01-Jan-2019 00:00:00 GMT", "/", "");
        } else {
            $("#starForge_field").find("canvas").fadeIn(200);
            $(this).removeClass("selected");

            setCookie("foo", "bar", "Mon, 01-Jan-2014 00:00:00 GMT", "/");
        }

        console.log(getCookie("foo"));

    });



    var detach = $(".form_all").eq(0).detach();

    mainOne(detach);



    var slide_global = 0;



    var $page = $('#ajax_contain'),
        options = {
            debug: true,
            prefetch: true,
            cacheLength: 2,
            onStart: {


                duration: 300, // Duration of our animation
                render: function($container) {
                    // Add your CSS animation reversing class

                    change_page_stars();
                    TweenMax.to($container, 0.3, {
                        opacity: 0
                    });
                }
            },
            onReady: {
                duration: 300,
                render: function($container, $newContent) {
                    clearTimeout(timerId);
                    // Inject the new content
                    $container.html($newContent);

                    TweenMax.to($container, 0.3, {
                        opacity: 1
                    });

                    mainOne(detach);

                    

                    console.log(window.location.pathname);
                }
            },
        },
        smoothState = $page.smoothState(options).data('smoothState');

    $('.menu a').click(function(e) {
        e.preventDefault();
        var content = $('#ajax_contain').smoothState().data('smoothState');
        var href = $(this).attr('href');
        content.load(href);
    });



    $(".item_inside").each(function() {
        $(this).removeClass('opened').css('height',0);
    });


});
// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/product.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/contacts-faq.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var Fancy_select = require('_modules/fancyselect');
var Jscrollpane = require('_modules/jscrollpane');
var LightGallery = require('_modules/lightgallery');
var Jslider = require('_modules/jslider');
var Fancybox = require('_modules/fancybox');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/ion-rangeslider/js/ion.rangeSlider');
import PerfectScrollbar from 'perfect-scrollbar';

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new Fancy_select();
    new Jscrollpane();
    new LightGallery();
    new Slider();
    new Jslider();
    new Fancybox();

    setTimeout(function () {
        $('body').trigger('scroll');
    }, 100);

    setTimeout(function () {
        $('body').trigger('resize');
        $('.slick-slider').slick('setPosition');
    }, 200);

    // catalog filters

    $('.catalog-filters__btn').click(function () {
        var btn_txt = $(this).find('.catalog-filters__btn-txt');
        $(this).toggleClass('active');
        $('.catalog-main__wrapper').toggleClass('opened-filters');
        if (!$(this).hasClass('active-filters')) {
            btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Фильтры товаров') : btn_txt.html('Скрыть фильтры');
        }
    });

    $('.catalog-filters__close').click(function () {
        $('.catalog-main__wrapper').removeClass('opened-filters');
        $('.catalog-filters__btn:not(.active-filters)').find('.catalog-filters__btn-txt:not(.filters-shown)').html('Фильтры товаров');
    });

    $('.catalog-filter__title').click(function () {
        $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
    });

    if ($('.filter-item.active').length) {
        $('.catalog-filters__bar-wrapper').addClass('checked-filters');
    }
    else {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
    }
    var checked_filters_couner = $('.filter-item.active').length;
    $('.catalog-filters__counter').html(checked_filters_couner);

    $('.filter-item').click(function () {
        var name = $(this).data('name');
        $(this).toggleClass('active');
        if ($('.filter-item.active').length) {
            $('.catalog-filters__bar-wrapper').addClass('checked-filters');
        }
        else {
            $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        }
        var checked_filters_couner = $('.filter-item.active').length;
        $('.catalog-filters__counter').html(checked_filters_couner);
        if ($(this).hasClass('active')) {
            $('.catalog-filters__checked-list').append('<div class="catalog-filters__checked-item" data-id="' + name + '">\n' +
                '                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '                                    <path d="M1.46309 8.53276C3.37569 10.5245 6.54095 10.5887 8.5327 8.67609C10.5245 6.76349 10.5886 3.59823 8.67603 1.60647C6.76344 -0.385282 3.59817 -0.449455 1.60642 1.46314C-0.385336 3.37574 -0.449508 6.541 1.46309 8.53276ZM3.3112 2.06138L5.09293 3.91685L6.9484 2.13512L8.0778 3.31126L6.22233 5.09299L8.00406 6.94846L6.82792 8.07785L5.04619 6.22238L3.19072 8.00411L2.06132 6.82797L3.91679 5.04624L2.13506 3.19077L3.3112 2.06138Z" fill="#211F1F"/>\n' +
                '                                </svg>\n' +
                '                                <span>' + name + '</span>\n' +
                '                            </div>');
        }
        else {
            $('.catalog-filters__checked-item').each(function () {
                var id = $(this).data('id');
                if (id === name) {
                    $(this).remove();
                }
            });
        }
    });

    $(document).delegate('.catalog-filters__checked-item', 'click', function (e) {
        var id = $(this).data('id');
        $(this).remove();
        $('.filter-item').each(function () {
            var name = $(this).data('name');
            if (id === name) {
                $(this).removeClass('active');
                if ($('.filter-item.active').length) {
                    $('.catalog-filters__bar-wrapper').addClass('checked-filters');
                }
                else {
                    $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
                }
                var checked_filters_couner = $('.filter-item.active').length;
                $('.catalog-filters__counter').html(checked_filters_couner);
            }
        });
    });

    $('.catalog-filters__clear').click(function () {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        $('.filter-item').removeClass('active');
        $('.catalog-filters__checked-list').html('');
    });

    setTimeout(function () {
        var filters_bar_pos = $('.catalog-filters__bar-wrapper').offset().top,
            wh = $(window).height();

        $(window).scroll(function () {
            var scrolled = $(window).scrollTop(),
                height_to_top = $('.catalog-filters__bar-wrapper').offset().top - $(window).scrollTop(),
                height_to_bot = wh - height_to_top;
            console.log(filters_bar_pos, wh, height_to_top, height_to_bot);
            if ($('.catalog-filters__bar-wrapper').hasClass('checked-filters')) {
                $('.catalog-filters__main').addClass('checked-filters');
            }
            else {
                $('.catalog-filters__main').removeClass('checked-filters');
            }
            if (scrolled > filters_bar_pos) {
                $('.catalog-filters__bar-wrapper').addClass('fixed');
                $('.catalog-filters__main').addClass('fixed');
                $('.catalog-filters__list').removeAttr('style');
            } else {
                $('.catalog-filters__bar-wrapper').removeClass('fixed');
                $('.catalog-filters__main').removeClass('fixed');
                if ($('.catalog-filters__main').hasClass('checked-filters')) {
                    $('.catalog-filters__list').css('max-height', height_to_bot - 152);
                }
                else {
                    $('.catalog-filters__list').css('max-height', height_to_bot - 127);
                }
            }
        });
    }, 1000);

    // show more text

    setTimeout(function () {
        $('.txt-hidden').each(function () {
            var txt_height = $(this).height();
            $('.txt-more__btn').click(function () {
                $(this).hide().closest('.txt-main__wrapper').find('.txt-main').css({ 'height': txt_height, 'max-height': 'unset', 'overflow': 'unset' });
            });
        });
    }, 1000);

    // scroll

    $('.scroll-wrapper').each(function () {
        const ps = new PerfectScrollbar($(this)[0], {
            wheelSpeed: 1,
            wheelPropagation: true,
            useBothWheelAxes: false,
            suppressScrollX: true
        });
        ps.update();
        $(window).resize(function () {
            ps.update();
        });
    });

    $('.scroll-wrapper__prop-false').each(function () {
        const ps1 = new PerfectScrollbar($(this)[0], {
            wheelSpeed: 1,
            wheelPropagation: false,
            useBothWheelAxes: false,
            suppressScrollX: true
        });
        ps1.update();
        $(window).resize(function () {
            ps1.update();
        });
        $('.catalog-filters__btn').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
        $('.catalog-filter__title').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
        $('.catalog-filters__checked-item').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
    });

    // product video

    $('.product-video').on('click', function () {
        $(this).removeClass('product-video');
        $(this).find('.product-video__play').hide();
        $(this).find('picture').hide().closest('.product-pic').find('video').show().play();
    });

    $('video').click(function () {
        $(this).closest('.product-pic').find('.product-video__play').toggleClass('show');
        this.paused ? this.play() : this.pause();
    });

    // product gallery

    $('.product-pics').lightGallery({
        selector: '.product-gal'
    });

    // product color

    $('.product-color__head').click(function () {
        $(this).toggleClass('open').next().slideToggle();
    });

    // product size

    $('.product-size').click(function () {
        $(this).closest('.product-size__head').toggleClass('open').next().slideToggle();
    });


    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});

// video

$('.video-inner').on('click', function (e) {
    $(this).find('img').hide();
    $(this).find('svg').hide();
    $(this).find('iframe').show();
    $(this).find('iframe')[0].src += '?autoplay=1';
    e.preventDefault();
});

$(".acc-body").css("display", "none");
$(".acc-title").click(function () {
    $(this).toggleClass("active").next().slideToggle();
    $(".acc-title").not(this).removeClass("active").next().slideUp();
});



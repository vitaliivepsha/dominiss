// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/product.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/contacts-success.html');
    require('./assets/templates/layouts/contacts-faq.html');
    require('./assets/templates/layouts/contacts-text.html');
    require('./assets/templates/layouts/contacts-sizes.html');
    require('./assets/templates/layouts/about-text.html');
    require('./assets/templates/layouts/about-press-room.html');
    require('./assets/templates/layouts/about-schedule-events.html');
    require('./assets/templates/layouts/shop.html');
    require('./assets/templates/layouts/shops.html');
    require('./assets/templates/layouts/dresses.html');
    require('./assets/templates/layouts/policy.html');
    require('./assets/templates/layouts/search.html');
    require('./assets/templates/layouts/search-not-found.html');
    require('./assets/templates/layouts/checkout.html');
    require('./assets/templates/layouts/checkout-b.html');
    require('./assets/templates/layouts/checkout-c.html');
    require('./assets/templates/layouts/success.html');
    require('./assets/templates/layouts/favorites.html');
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
        $('body').toggleClass('opened-filters');
        if (!$(this).hasClass('active-filters')) {
            btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Фильтры товаров') : btn_txt.html('Скрыть фильтры');
        }
    });

    $('.filters-close').click(function () {
        $('.catalog-main__wrapper').removeClass('opened-filters');
        $('body').removeClass('opened-filters');
        $('.catalog-filters__btn:not(.active-filters)').find('.catalog-filters__btn-txt:not(.filters-shown)').html('Фильтры товаров');
    });

    $('.catalog-filter__title').click(function () {
        $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
    });

    if ($('.filter-item.active').length) {
        $('.catalog-filters__bar-wrapper').addClass('checked-filters');
        $('.catalog-filters__checked-mob').addClass('checked-filters');
        $('.catalog-filters__btn-submit').removeClass('hidden');
        $('.catalog-filters__btn-clear').removeClass('hidden');
        $('.catalog-filters__btn-close').addClass('hidden');
    }
    else {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        $('.catalog-filters__checked-mob').removeClass('checked-filters');
        $('.catalog-filters__btn-submit').addClass('hidden');
        $('.catalog-filters__btn-clear').addClass('hidden');
        $('.catalog-filters__btn-close').removeClass('hidden');
    }
    var checked_filters_couner = $('.filter-item.active').length;
    $('.catalog-filters__counter').html(checked_filters_couner);

    $('.filter-item').click(function () {
        var name = $(this).data('name');
        $(this).toggleClass('active');
        if ($('.filter-item.active').length) {
            $('.catalog-filters__bar-wrapper').addClass('checked-filters');
            $('.catalog-filters__checked-mob').addClass('checked-filters');
            $('.catalog-filters__btn-submit').removeClass('hidden');
            $('.catalog-filters__btn-clear').removeClass('hidden');
            $('.catalog-filters__btn-close').addClass('hidden');
        }
        else {
            $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
            $('.catalog-filters__checked-mob').removeClass('checked-filters');
            $('.catalog-filters__btn-submit').addClass('hidden');
            $('.catalog-filters__btn-clear').addClass('hidden');
            $('.catalog-filters__btn-close').removeClass('hidden');
        }
        var checked_filters_couner = $('.filter-item.active').length;
        $('.catalog-filters__counter').html(checked_filters_couner);
        if ($(this).hasClass('active')) {
            $('.catalog-filters__checked-list').append('<div class="catalog-filters__checked-item" data-id="' + name + '">\n' +
                '                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '                                    <path d="M1.46309 8.53276C3.37569 10.5245 6.54095 10.5887 8.5327 8.67609C10.5245 6.76349 10.5886 3.59823 8.67603 1.60647C6.76344 -0.385282 3.59817 -0.449455 1.60642 1.46314C-0.385336 3.37574 -0.449508 6.541 1.46309 8.53276ZM3.3112 2.06138L5.09293 3.91685L6.9484 2.13512L8.0778 3.31126L6.22233 5.09299L8.00406 6.94846L6.82792 8.07785L5.04619 6.22238L3.19072 8.00411L2.06132 6.82797L3.91679 5.04624L2.13506 3.19077L3.3112 2.06138Z" fill="#757575"/>\n' +
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
                    $('.catalog-filters__checked-mob').addClass('checked-filters');
                    $('.catalog-filters__btn-submit').removeClass('hidden');
                    $('.catalog-filters__btn-clear').removeClass('hidden');
                    $('.catalog-filters__btn-close').addClass('hidden');
                }
                else {
                    $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
                    $('.catalog-filters__checked-mob').removeClass('checked-filters');
                    $('.catalog-filters__btn-submit').addClass('hidden');
                    $('.catalog-filters__btn-clear').addClass('hidden');
                    $('.catalog-filters__btn-close').removeClass('hidden');
                }
                var checked_filters_couner = $('.filter-item.active').length;
                $('.catalog-filters__counter').html(checked_filters_couner);
            }
        });
    });

    $('.filters-clear').click(function () {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        $('.catalog-filters__checked-mob').removeClass('checked-filters');
        $('.catalog-filters__btn-submit').addClass('hidden');
        $('.catalog-filters__btn-clear').addClass('hidden');
        $('.catalog-filters__btn-close').removeClass('hidden');
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
                $('.catalog-filters__checked-mob').addClass('checked-filters');
                $('.catalog-filters__btn-submit').removeClass('hidden');
                $('.catalog-filters__btn-clear').removeClass('hidden');
                $('.catalog-filters__btn-close').addClass('hidden');
            }
            else {
                $('.catalog-filters__main').removeClass('checked-filters');
                $('.catalog-filters__checked-mob').removeClass('checked-filters');
                $('.catalog-filters__btn-submit').addClass('hidden');
                $('.catalog-filters__btn-clear').addClass('hidden');
                $('.catalog-filters__btn-close').removeClass('hidden');
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
                var btn_txt = $(this);
                btn_txt.html() == 'Показать все' ? btn_txt.html('Скрыть') : btn_txt.html('Показать все');
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).closest('.txt-main__wrapper').find('.txt-main').css({ 'height': txt_height, 'max-height': 'unset', 'overflow': 'unset' });
                }
                else {
                    $(this).closest('.txt-main__wrapper').find('.txt-main').removeAttr('style');
                }
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
        $(this).find('picture').hide().closest('.product-pic').find('.prod-video').show().play();
    });

    $('.prod-video').click(function () {
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

    // product info

    $('.product-info__head').click(function () {
        $(this).toggleClass('open').next().slideToggle();
    });

    // custom slider navigation

    $('.custom-nav__slider').each(function () {
        var $slider = $(this);

        $slider.closest('.custom-nav__slider-wrapper').find('.slider-next').click(function () {
            $slider.slick('slickNext');
        });

        $slider.closest('.custom-nav__slider-wrapper').find('.slider-prev').click(function () {
            $slider.slick('slickPrev');
        });
    });

    // slider counter

    $('.counter-slider').each(function () {
        var $slider = $(this);

        var currentSlide;
        var slidesCount;
        var sliderCounter = $slider.closest('.counter-slider__wrapper').find('.slider-counter');
        $(sliderCounter).text('1' + 'из' + $slider.slick('getSlick').slideCount);

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = $slider.slick('getSlick').slideCount;
            $(sliderCounter).text(currentSlide + 'из' + slidesCount);
        };

        $slider.on('init', function (event, slick, slidesCount) {
            updateSliderCounter(slick, slidesCount);
        });

        $slider.on('afterChange', function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });
    });

    // header alert hide

    $('.mobile-header__alert-close').click(function () {
        $('.mobile-header__alert').slideUp();
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    // catalog mobile views

    $('.calalog-view').click(function () {
        $(this).toggleClass('active').siblings().toggleClass('active');
    });

    $('.calalog-view.one-col').click(function () {
        $('.catalog-items').addClass('one-col');
    });

    $('.calalog-view.two-cols').click(function () {
        $('.catalog-items').removeClass('one-col');
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

$('.acc-body').css('display', 'none');
$('.acc-title').click(function () {
    $(this).toggleClass('active').next().slideToggle();
    $('.acc-title').not(this).removeClass('active').next().slideUp();
});

// shop video

$('.shop-video').on('click', function () {
    $(this).removeClass('shop-video');
    $(this).find('.shop-video__play').hide();
    $(this).find('picture').hide().closest('.shop-pic').find('.the-video').show().play();
});

$('.the-video').click(function () {
    $(this).closest('.shop-pic').find('.shop-video__play').toggleClass('show');
    this.paused ? this.play() : this.pause();
});

// dress video

$('.dress-video').on('click', function () {
    $(this).removeClass('dress-video');
    $(this).find('.dress-video__play').hide();
    $(this)
        .find('picture')
        .hide()
        .closest('.dress-pic')
        .find('.dress-the-video')
        .show()
        .play();
});

$('.dress-the-video').click(function () {
    $(this).closest('.dress-pic').find('.dress-video__play').toggleClass('show');
    this.paused ? this.play() : this.pause();
});


$('.popup-link').magnificPopup({
    type: 'inline',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
});

// tabs

$('.tabs').each(function () {
    let tabs = $(this);
    tabs.find('.tabs-content-item').not(':first').hide();
    tabs.find('.tabs-caption-item').click(function () {
        tabs.find('.tabs-caption-item').removeClass('active').eq($(this).index()).addClass('active');
        tabs.find('.tabs-content-item').hide().eq($(this).index()).fadeIn(500);
    }).eq(0).addClass('active');
});

// basket
$(document).on('click', function (e) {
    var container1 = $('.header-cart');
    if (container1.has(e.target).length === 0) {
        container1.removeClass('active');
    }
});

$('.header-cart .header-cart__icon').on('click', function () {
    $(this).parent().toggleClass('active');
    $('body').addClass('header-cart-open');
});

$('.header-cart .header-cart__inner > button').on('click', function () {
    $(this).parent().parent().toggleClass('active');
    $('body').removeClass('header-cart-open');
});


if (!$('.header-cart-item').length) {
    $('.header-cart__inner').addClass('empty');
    $('.header-cart-order').html('На главную');
} else {
    $('.header-cart__inner').removeClass('empty');
    $('.header-cart-order').html('Оформить заказ');
}
$(document).on('click', function (e) {
    var container1 = $('.header-cart');
    if (container1.has(e.target).length === 0) {
        container1.removeClass('active');
    }
});

// search

$('.header-search > svg').on('click', function () {
    $(this).parent().addClass('open');
})

$(document).on('click', function (e) {
    var container = $('.header-search');
    if (container.has(e.target).length === 0) {
        container.removeClass('open');
    }
});

$('.header-search-options li').on('click', function () {
    var text = $(this).text();
    $('.header-search input').val(text);
    $(this).parent().parent().css('display', 'none');
    $('.header-search-found').css('display', 'block')
})

// checkout promo

$('.promo p').click(function () {
    $(this).toggleClass('active').next().slideToggle();
});

// checkout select

$('.form-select select').SumoSelect({
    search: true,
    searchText: 'Найти',
    noMatch: 'Не найдено',
    forceCustomRendering: true
});

$('.deliver-item-bot select').SumoSelect({
    search: true,
    searchText: 'Найти',
    noMatch: 'Не найдено',
    forceCustomRendering: true
});

$(".form-select-country select").change(function () {
    var value = $(this).val(),
        $ukraina = $(this).closest(".form").find(".form-select-city.ukraina"),
        $russia = $(this).closest(".form").find(".form-select-city.russia"),
        $germany = $(this).closest(".form").find(".form-select-city.germany");
    if (value == "ukraina") {
        $ukraina.show();
        $(".form-select-city.ukraina select").closest(".form").find(".deliver-ua").removeClass("active");
        $(this).closest(".form").find(".deliver-other").removeClass("active");
    } else {
        $ukraina.hide();
    }
    if (value == "russia") {
        $russia.show();
        $(".form-select-city.ukraina select").closest(".form").find(".deliver-ua").removeClass("active");
        $(this).closest(".form").find(".deliver-other").removeClass("active");
    } else {
        $russia.hide();
    }
    if (value == "germany") {
        $germany.show();
        $(".form-select-city.ukraina select").closest(".form").find(".deliver-ua").removeClass("active");
        $(this).closest(".form").find(".deliver-other").removeClass("active");
    } else {
        $germany.hide();
    }
});

$(".form-select-city.ukraina select").on("change", function () {
    $(this).closest(".form").find(".deliver-ua").addClass("active");
    $(this).closest(".form").find(".deliver-other").removeClass("active");
});

$(".form-select-city.russia select").on("change", function () {
    $(this).closest(".form").find(".deliver-other").addClass("active");
    $(this).closest(".form").find(".deliver-ua").removeClass("active");
});

$(".form-select-city.germany select").on("change", function () {
    $(this).closest(".form").find(".deliver-other").addClass("active");
    $(this).closest(".form").find(".deliver-ua").removeClass("active");
});

$(".deliver-item-top").click(function () {
    $(this).find('input').prop("checked", true);
    $(this).addClass("active").next().slideDown();
    $(".deliver-item-top").not(this).removeClass("active").next().slideUp();
});

// favorites

$('.favorites-item__close').on('click', function () {
    $(this).closest('.col').css('display', 'none');
})

$('.favorites-item__size select').SumoSelect({
    forceCustomRendering: true
});

$('.favorites-to-cart').on('click', function () {
    var s = $(this).find('span');
    console.log(s);
    s.html() == 'Добавить в корзину' ? s.html('В корзине') : s.html('Добавить в корзину');
    $(this).toggleClass('in-cart');
})

// share-popup

$('.favorites-share').on('click', function () {
    $(this).next().toggleClass('open');
})

$('.favorites-share-popup .close').on('click', function () {
    $(this).parent().removeClass('open');
})

$(document).keydown(function (e) {
    if (e.keyCode == 27) {
        $('.favorites-share-popup').removeClass('open');
    }
});

// copy text

$('.favorites-share-popup-btn').on('click', function () {
    var copyText = $(this).parent().find('.favorites-share-popup-link').text();
    console.log(copyText);
    var copytext2 = document.createElement('input');
    copytext2.value = copyText;
    document.body.appendChild(copytext2);
    copytext2.select();
    document.execCommand("copy");
    document.body.removeChild(copytext2);
})

$('.favorites-share-popup-link svg').on('click', function () {
    var copyText = $(this).parent().text();
    console.log(copyText);
    var copytext2 = document.createElement('input');
    copytext2.value = copyText;
    document.body.appendChild(copytext2);
    copytext2.select();
    document.execCommand("copy");
    document.body.removeChild(copytext2);

})












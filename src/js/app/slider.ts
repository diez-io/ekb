import Swiper from "swiper";
import {Autoplay, EffectCoverflow, Navigation, Pagination, Thumbs} from "swiper/modules";

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    mobileOnly;
    media;
    isAuto;
    offset;
    
    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')
        this.isAuto = this.el.hasAttribute('data-auto');
        this.offset = this.el.hasAttribute('data-offset');
        
        this.buttonPrev = this.el.querySelector('.swiper-btn--prev');
        this.buttonNext = this.el.querySelector('.swiper-btn--next');
        this.pagination = this.el.querySelector('.swiper-pagination');
        
        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');
        this.mobileOnly = this.el.hasAttribute('data-mobile-only');
        
        this.init();
    }
    
    init() {
        switch (this.sliderType) {
        case 'intro':
            this.initIntroSlider();
            break;
        case 'default':
            this.initDefaultSlider();
            break;
        case 'cards':
            this.initCardsSlider();
            break;
        case 'thumbs':
            this.initThumbsSlider();
            break;
        case 'carousel':
            this.initCarouselSlider();
            break;
        case 'auto':
            this.initAutoSlider();
            break;
        }
    }
    
    initIntroSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: this.slidesCount ? this.slidesCount : 1,
            spaceBetween: 35,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            autoplay: {
              delay: 6000,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                slideChangeTransitionStart: () => {
                    const wrapper = slider.querySelector('.swiper-wrapper') as HTMLElement;
                    
                    wrapper.style.transitionTimingFunction = 'ease';
                    wrapper.style.transitionDuration = '0.95s';
                }
            }
        })
    }
    
    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 'auto',
            spaceBetween: 16,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            autoplay: this.isAuto ? {delay: 3000} : undefined,
            loop: this.isAuto ? this.isAuto : false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                init: (swiper: Swiper) => {
                    swiper.update()
                }
            },
            breakpoints: {
                1200: {
                    slidesPerView: this.slidesCount ? this.slidesCount : 1,
                    spaceBetween: this.offset ? this.offset : 40,
                }
            }
        })
    }
    
    initCardsSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: this.isAuto ? 'auto' : 1,
            spaceBetween: 10,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                1200: {
                    slidesPerView: this.slidesCount ? this.slidesCount : 4,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: this.isAuto ? 'auto' : 2,
                    spaceBetween: 20,
                }
            },
        })
    }
    
    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumb = document.querySelector('[data-slider="thumb"]');
        const thumbSwiper = thumb.querySelector('.swiper');
        
        const thumbSlider = new Swiper(thumbSwiper, {
            modules: [Navigation],
            slidesPerView: 5,
            spaceBetween: 10,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            breakpoints: {
                1199: {
                    spaceBetween: 20,
                }
            }
        })
        
        new Swiper(slider, {
            modules: [Navigation, Pagination, Thumbs],
            slidesPerView: 1,
            spaceBetween: 10,
            thumbs: {
                swiper: thumbSlider,
            },
        })
    }
    
    initCarouselSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [EffectCoverflow],
            slidesPerView: 3,
            spaceBetween: 10,
            effect: "coverflow",
            centeredSlides: true,
            initialSlide: 2,
            loop: true,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: -30,
                modifier: 1,
                slideShadows: false,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 15,
                        stretch: -10,
                        depth: -80,
                        modifier: 1,
                        slideShadows: false,
                    },
                }
            }
        })
    }
    
    initAutoSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
        })
    }
}

export default Slider

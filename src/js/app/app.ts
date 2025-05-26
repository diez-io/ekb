import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import Mask from "./mask";
import MobileMenu from "./mobile-menu";
import Tabs from "./tabs";
import Video from "./video";
import Form from "./form";
import Overflow from "./overflow";
import Menu from "./menu";
import Filter from "./filter";

class App {
    constructor() {
        this.init();
    }
    
    init = () => {
        this.createSlider()
        this.createFancybox()
        this.createMask()
        this.createMobileMenu()
        this.createShowMore()
        this.createTabs()
        this.createForm()
        this.createOverflow()
        this.createMenu()
        this.createFilter()
    }
    
    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
    
    createFancybox = () => {
        const customCloseButton =
            `<button data-fancybox-close class="fancybox-btn" title="Закрыть">
               <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29293 4.00004L0.646484 1.35359L1.35359 0.646484L4.00004 3.29293L6.64648 0.646484L7.35359 1.35359L4.70714 4.00004L7.35359 6.64648L6.64648 7.35359L4.00004 4.70714L1.35359 7.35359L0.646484 6.64648L3.29293 4.00004Z" fill="current"/>
               </svg>
            </button>`
        
        Fancybox.bind('[data-fancybox]', {
            defaultType: 'inline',
            tpl: {
                closeButton: customCloseButton,
            },
        })
    }
    
    createMask = () => {
        new Mask();
    }
    
    createMobileMenu = () => {
        new MobileMenu()
    }
    
    createShowMore = () => {
        const showMoreBtn = document.querySelectorAll('[data-show-more]');
        if (!showMoreBtn) return
        
        showMoreBtn.forEach(el => {
            const textElement = el.querySelector('span')
            const innerText = textElement.textContent.trim();
            
            el.addEventListener('click', (evt) => {
                evt.preventDefault()
                const content = el.parentElement.querySelector('[data-content]');
                const textContent = el.parentElement.querySelector('[data-text-content]')
                if (content) {
                    content.classList.toggle('active')
                    if (content.classList.contains('active')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
                if (textContent) {
                    textContent.classList.toggle('text-visible')
                    if (textContent.classList.contains('text-visible')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
            })
        })
    }
    
    createTabs = () => {
        const tabs = document.querySelectorAll('[data-tabs]');
        if (!tabs) return
        
        tabs.forEach(tab => {
            new Tabs(tab)
        })
    }
    
    createForm = () => {
        const forms = document.querySelectorAll('.form');
        if (!forms) return
        forms.forEach(form => {
            new Form(form)
        })
    }
    
    createOverflow = () => {
        const overflowElements = document.querySelectorAll('[data-overflow]');
        if (!overflowElements) return
        overflowElements.forEach(overflowElement => {
            new Overflow(overflowElement)
        })
    }
    
    createMenu = () => {
        const menu = document.querySelector('[data-menu]');
        if (!menu) return
        new Menu(menu)
    }
    
    createFilter = () => {
        const filters = document.querySelectorAll('[data-filter]');
        if (!filters) return
        filters.forEach(filter => {
            new Filter(filter)
        })
    }
}

export {App};




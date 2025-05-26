import {Fancybox} from "@fancyapps/ui";

class MobileMenu {
    menuBtn;
    menu;
    menuContent;
    menuWraper;
    body;
    contentLinks;
    content;
    contentElements;
    backButtons;
    activeElementIdx: number;
    scrollbarWidth;
    
    constructor() {
        this.menuBtn = document.querySelector('.header__menu');
        this.menu = document.querySelector('.mobile-menu');
        this.body = document.querySelector('body');
        
        if (!this.menuBtn || !this.menu) return
        
        this.menuWraper = this.menu.querySelector('.mobile-menu__wrapper');
        this.menuContent = this.menu.querySelector('.mobile-menu__info');
        this.contentLinks = this.menu.querySelectorAll('[data-link]')
        this.contentElements = this.menu.querySelectorAll('[data-element]')
        this.content = this.menu.querySelector('.mobile-menu__content')
        this.backButtons = this.menu.querySelectorAll('[data-back]')
        this.activeElementIdx = null;
        this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        this.init()
    }
    
    init() {
        window.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 27) {
                if (this.menu.classList.contains('active')) {
                    this.toggleMenu()
                }
            }
        })
        
        this.backButtons.forEach(button => {
            button.addEventListener('click', (evt) => {
                evt.preventDefault()
                const text = button.querySelector('span');
                
                this.closeElement()
            })
        })
        
        this.menuBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.toggleMenu()
        })
        
        this.menu.addEventListener('click', (evt) => {
            evt.stopPropagation();
            this.toggleMenu()
        })
        
        this.menuWraper.addEventListener('click', (evt) => {
            evt.stopPropagation();
        })
        
        this.contentLinks.forEach(link => {
            link.addEventListener('click', (evt) => {
                evt.preventDefault();
                const linkIdx = Number(link.getAttribute('data-link'));
                this.activeElementIdx = linkIdx;
                this.contentLinks.forEach(temp => temp.classList.remove('active'));
                this.contentElements.forEach(temp => temp.classList.remove('active'));
                
                link.classList.add('active');
                this.content.classList.add('active')
                this.contentElements.forEach(el => {
                    const elIdx = Number(el.getAttribute('data-element'));
                    
                    if (elIdx === linkIdx) {
                        el.classList.add('active');
                    }
                })
            })
        })
        
        this.contentElements.forEach(el => {
            const links = el.querySelectorAll('li');
            const lists = el.querySelectorAll('.mobile-menu__list--inner')
            links.forEach(link => {
                const linkEl = link.querySelector('a');
                const list = link.querySelector('ul');
                let timeout: string | number | NodeJS.Timeout = null;
                if (!list) return
                
                linkEl.addEventListener('click', (evt) => {
                    console.log(linkEl, linkEl.parentElement.contains(list))
                    if (linkEl.parentElement.contains(list)) {
                        evt.preventDefault();
                    }
                })
                
                link.addEventListener('mouseenter', () => {
                    clearTimeout(timeout);
                    lists.forEach(temp => temp.classList.remove('active'));
                    list.classList.add('active');
                    link.classList.add('active');
                })
                
                link.addEventListener('mouseleave', () => {
                    timeout = setTimeout(() => {
                        list.classList.remove('active');
                        link.classList.remove('active');
                    }, 300)
                })
            })
        })
        
        const button = this.menu.querySelector('[data-fancybox]');
        
        button.addEventListener('click', (evt) => {
            Fancybox.show([{ src: `${button.getAttribute('data-src')}`, type: "inline" }]);
        })
    }
    
    closeElement = () => {
        this.contentElements.forEach(el => {
            const elIdx = Number(el.getAttribute('data-element'));
            
            if (elIdx === this.activeElementIdx) {
                el.classList.remove('active');
            }
        })
        this.contentLinks.forEach(link => link.classList.remove('active'));
        this.content.classList.remove('active');
    }
    
    toggleMenu = () => {
        this.toggle(this.menuBtn)
        this.toggle(this.menu)
        this.body.classList.toggle('fixed')
        this.body.style.paddingRight = `${this.scrollbarWidth}px`
        
        if (!this.menu.classList.contains('active')) {
            this.contentLinks.forEach(temp => temp.classList.remove('active'));
            this.contentElements.forEach(el => {
                const links = el.querySelectorAll('li');
                const lists = el.querySelectorAll('.mobile-menu__list--inner')
                lists.forEach(temp => temp.classList.remove('active'));
                links.forEach(temp => temp.classList.remove('active'));
                el.classList.remove('active');
            })
            this.content.classList.remove('active')
            this.body.style.paddingRight = null
        }
    }
    
    toggle = (element: Element) => {
        element.classList.toggle('active');
    }
}

export default MobileMenu

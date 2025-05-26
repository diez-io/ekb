class Menu {
    menu;
    header;
    openBtn;
    
    constructor(el: Element) {
        this.menu = el;
        this.header = document.querySelector('.header__wrapper') as HTMLElement;
        this.openBtn = document.querySelector('[data-menu-open]')
    
        this.init()
    }
    
    init() {
        this.openBtn.addEventListener('mouseenter', () => {
            this.menu.classList.add('active')
        })
        
        window.addEventListener('mouseover', (evt) => {
            const target = evt.target as HTMLElement;
            
            if (!this.menu.contains(target)) {
                this.menu.classList.remove('active')
            }
        })
    }
}

export default Menu;

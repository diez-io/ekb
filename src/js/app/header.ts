class Header {
    header;
    navLinks;
    logos;
    menu;
    burger;
    isHovered;
    isMobileMenuOpen;
    hasIntroBlock;
    scrollPositionInverted;
    
    constructor(header: Element) {
        this.header = header;
        this.logos = this.header.querySelectorAll('.logo img');
        this.navLinks = this.header.querySelectorAll('.nav__link') as NodeListOf<HTMLAnchorElement>;
        this.menu = this.header.querySelector('.nav');
        this.burger = document.querySelector('.burger');
        this.isHovered = false;
        this.isMobileMenuOpen = false;
        this.scrollPositionInverted = false;
        this.hasIntroBlock = document.querySelector('.section--intro');
    
        this.init()
    }
    
    init() {
        this.checkPosition();
        window.addEventListener('scroll', () => {
            if (!this.isHovered && !this.isMobileMenuOpen) {
                this.checkPosition()
            }
        })
        
        this.burger.addEventListener('click', () => {
            this.menu.classList.toggle('active');
            
            if (this.menu.classList.contains('active')) {
                this.isMobileMenuOpen = true;
                this.header.classList.add('invert')
                this.logos[0].setAttribute('hidden', '');
                this.logos[1].removeAttribute('hidden');
            } else {
                this.isMobileMenuOpen = false;
                this.header.classList.remove('invert')
                this.logos[0].removeAttribute('hidden');
                this.logos[1].setAttribute('hidden', '');
            }
        })
        
        this.header.addEventListener('mouseover', (evt) => {
            const target = evt.target as HTMLElement;
            const isLink = target.closest('.nav__link');
            if (isLink) {
                this.isHovered = true;
                this.header.classList.add('invert')
                this.logos[0].setAttribute('hidden', '');
                this.logos[1].removeAttribute('hidden');
            }
        })
        
        this.header.addEventListener('mouseleave', () => {
            this.isHovered = false;
            setTimeout(() => {
                if (!this.isHovered) {
                    this.checkPosition();
                }
            }, 200)
        })
    }
    
    checkPosition = () => {
        const shouldInvert = window.scrollY >= 200 || !this.hasIntroBlock;
        this.scrollPositionInverted = shouldInvert;
        
        if (shouldInvert) {
            this.header.classList.add('invert')
            this.logos[0].setAttribute('hidden', '');
            this.logos[1].removeAttribute('hidden');
        } else {
            this.header.classList.remove('invert')
            this.logos[0].removeAttribute('hidden');
            this.logos[1].setAttribute('hidden', '');
        }
    }
}

export default Header;

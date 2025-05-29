class Faq {
    faqBlock;
    elements;
    
    constructor(faqBlock: Element) {
        this.faqBlock = faqBlock;
        this.elements = this.faqBlock.querySelectorAll('.faq__item');
        
        this.init()
    }
    
    init() {
        this.elements.forEach((el) => {
            const contentEl = el.querySelector('.faq__content');
            
            el.addEventListener('click', () => {
                el.classList.toggle('active');
            })
            
            contentEl.addEventListener('click', (evt) => evt.stopPropagation());
        })
    }
}

export default Faq;

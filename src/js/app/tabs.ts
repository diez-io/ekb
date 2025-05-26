class Tabs {
    container;
    headerEls;
    contentEls;
    
    constructor(container: Element) {
        this.container = container;
        this.headerEls = container.querySelectorAll('[data-tabs-head]');
        this.contentEls = container.querySelectorAll('[data-tabs-element]');
        
        this.init()
    }
    
    init() {
        this.headerEls.forEach((headerEl, idx) => {
            headerEl.addEventListener('click', () => {
                this.headerEls.forEach(temp => {
                    temp.classList.remove('active')
                    temp.classList.remove('clean')
                });
                this.contentEls.forEach(temp => temp.classList.remove('active'));
                headerEl.classList.add('active');
                if (this.headerEls.item(idx - 1)) {
                    this.headerEls.item(idx - 1).classList.add('clean');
                }
                
                if (this.contentEls.item(idx)) {
                    this.contentEls.item(idx).classList.add('active');
                }
            })
        })
    }
}

export default Tabs;

class Tabs {
    tabsContainer;
    headerEls;
    contentEls;
    
    constructor(el: Element) {
        this.tabsContainer = el;
        this.headerEls = this.tabsContainer.querySelectorAll('[data-tabs-head]');
        this.contentEls = this.tabsContainer.querySelectorAll('[data-tabs-item]');
        
        this.init()
    }
    
    init() {
        this.headerEls.forEach((headerEl, idx) => {
            headerEl.addEventListener('click', () => {
                this.updateClasses();
                headerEl.classList.add('active');
                if (this.contentEls.item(idx)) {
                    this.contentEls.item(idx).classList.add('active');
                }
            })
        })
    }
    
    updateClasses() {
        this.headerEls.forEach(headerEl => headerEl.classList.remove('active'));
        this.contentEls.forEach(contentEl => contentEl.classList.remove('active'));
    }
}

export default Tabs;

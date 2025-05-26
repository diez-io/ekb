type viewStatus = 'visible' | 'hidden';

class Filter {
    filter;
    items;
    viewStatus: viewStatus;
    
    constructor(el: Element) {
        this.filter = el;
        this.items = this.filter.querySelectorAll('[data-filter-item]');
        this.viewStatus = "hidden"
        
        this.init()
    }
    
    init() {
        this.items.forEach((item) => {
            const list = item.querySelector('[data-filter-list]')
            const listItems = list.querySelectorAll('label');
            const showBtn = item.querySelector('[data-filter-show]')
            const headItem = item.querySelector('[data-filter-head]');
            
            if (listItems.length <= 5) {
                showBtn.classList.add('hidden');
            }
            
            headItem.addEventListener('click', () => {
                this.toggleDropdown(item)
            })
            
            showBtn.addEventListener('click', () => {
                this.viewAll(list)
                if (this.viewStatus === 'hidden') {
                    showBtn.textContent = 'Показать еще'
                } else {
                    showBtn.textContent = 'Скрыть'
                }
            })
        })
    }
    
    toggleDropdown = (element: Element) => {
        element.classList.toggle('active');
    }
    
    viewAll = (element: Element) => {
        element.classList.toggle('show');
        
        if (this.viewStatus === 'hidden') {
            this.viewStatus = 'visible'
        } else {
            this.viewStatus = 'hidden'
        }
    }
}

export default Filter;

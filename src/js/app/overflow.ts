type ButtonStatus = 'visible' | 'hidden'

class Overflow {
    container;
    limit;
    button;
    buttonSpanEl;
    buttonText;
    elements;
    status: ButtonStatus;
    
    constructor(el: Element) {
        this.container = el;
        this.limit = +this.container.getAttribute('data-overflow');
        this.elements = this.container.querySelectorAll('a')
        this.button = this.container.querySelector('.button');
        this.buttonSpanEl = this.button.querySelector('span');
        this.buttonText = this.buttonSpanEl.textContent;
        this.status = 'hidden';
        
        this.init()
    }
    
    init() {
        this.changeVisibleElements()
        
        this.button.addEventListener('click', () => {
            if (this.status === 'hidden') {
                this.status = 'visible';
                this.changeVisibleElements();
                this.changeButtonText(this.status);
            } else {
                this.status = 'hidden';
                this.changeVisibleElements();
                this.changeButtonText(this.status);
            }
        })
    }
    
    changeVisibleElements = () => {
        this.elements.forEach((el, idx) => {
            if (this.status === 'hidden') {
                if (idx + 1 > this.limit) {
                    el.style.display = 'none';
                }
            } else {
                el.style.display = null;
            }
        })
    }
    
    changeButtonText = (status: ButtonStatus) => {
        if (status === 'visible') {
            this.buttonSpanEl.textContent = 'Скрыть'
        } else {
            this.buttonSpanEl.textContent = this.buttonText
        }
    }
}

export default Overflow;

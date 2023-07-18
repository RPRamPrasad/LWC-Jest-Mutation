import { createElement } from 'lwc';
import HelloConditionalRendering from 'c/helloConditionalRendering';

describe('c-hello-conditional-rendering', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    async function flushPromises() {
        return Promise.resolve();
    }

    it('Show Detault Value when unchecked', () => {
        const EXPECTED ='Not showing details.'
        // Arrange
        const element = createElement('c-hello-conditional-rendering', {
            is: HelloConditionalRendering
        });

        // Act
        document.body.appendChild(element);

        // Assert
         const classText = element.shadowRoot.querySelector('.slds-var-m-vertical_medium');
        expect(classText.textContent.trim()).toBe(EXPECTED);
    });


    
    it('Show custom Value when checked', async () => {
        const EXPECTED ='These are the Details'
        // Arrange
        const element = createElement('c-hello-conditional-rendering', {
            is: HelloConditionalRendering
        });

        // Act
        document.body.appendChild(element);


        const inputElm = element.shadowRoot.querySelector('lightning-input');

        inputElm.checked = true;

        inputElm.dispatchEvent(new CustomEvent('change'))

        await flushPromises();
        // Assert
         const classText = element.shadowRoot.querySelector('.slds-var-m-vertical_medium');
        expect(classText.textContent.trim()).toBe(EXPECTED);
    });
});
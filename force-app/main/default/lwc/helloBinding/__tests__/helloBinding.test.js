import { createElement } from 'lwc';
import HelloBinding from 'c/helloBinding';

describe('c-hello-binding', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    async function flushPromises() {
        return Promise.resolve();
    }

    it('Check Default Value', () => {
        const EXPECTED ='Hello';
        // Arrange
        const element = createElement('c-hello-binding', {
            is: HelloBinding
        });

        // Act
        document.body.appendChild(element);

        // Assert
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe(EXPECTED);
    });

    it('Check Input Value to display', async () => {
        const EXPECTED ='World';
        // Arrange
        const element = createElement('c-hello-binding', {
            is: HelloBinding
        });

        // Act
        document.body.appendChild(element);

        const inputElm = element.shadowRoot.querySelector('lightning-input');

        inputElm.value = EXPECTED;

        inputElm.dispatchEvent(new CustomEvent('change'));


        await flushPromises()

        // Assert
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe(EXPECTED);
    });
});
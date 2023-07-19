import { createElement } from 'lwc';
import HelloForEach from 'c/helloForEach';

describe('c-hello-for-each', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Display Contacts', () => {

        const EXPECTED =[
            'Amy Taylor, VP of Engineering',
            'Michael Jones, VP of Sales',
            'Jennifer Wu, CEO'
        ];
        // Arrange
        const element = createElement('c-hello-for-each', {
            is: HelloForEach
        });

        // Act
        document.body.appendChild(element);

        // Assert

        const contacts = Array.from(
            element.shadowRoot.querySelectorAll('li')
        ).map((li) => li.textContent);
        
        expect(contacts).toEqual(EXPECTED);
    });
});
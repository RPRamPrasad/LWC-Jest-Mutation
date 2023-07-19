import { createElement } from 'lwc';
import ApexImperativeMethod from 'c/apexImperativeMethod';
import getContactList from '@salesforce/apex/ContactController.getContactList';

const APEX_CONTACTLIST_ERROR = require('./data/contactsError.json');
const APEX_CONTACTLIST_SUCCESS = require('./data/contactsList.json');


jest.mock(
    '@salesforce/apex/ContactController.getContactList',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c-apex-imperative-method', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    async function flushPromises() {
        return Promise.resolve();
    }

    it('Checking Contact Data', async () => {

        // Arrange
        const element = createElement('c-apex-imperative-method', {
            is: ApexImperativeMethod
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        getContactList.mockResolvedValue(APEX_CONTACTLIST_SUCCESS);

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        await flushPromises();

        const contacts = element.shadowRoot.querySelectorAll('p.contactName');

        expect(contacts.length).toBe(APEX_CONTACTLIST_SUCCESS.length);
        expect(contacts[0].textContent).toBe(APEX_CONTACTLIST_SUCCESS[0].Name)
        expect(contacts[1].textContent).toBe(APEX_CONTACTLIST_SUCCESS[1].Name)
        expect(contacts[2].textContent).toBe(APEX_CONTACTLIST_SUCCESS[2].Name)


    });

    it('renders the error when apex return an error',async()=>{

        
        // Arrange
        const element = createElement('c-apex-imperative-method', {
            is: ApexImperativeMethod
        });

        // Act
        document.body.appendChild(element);

        getContactList.mockRejectedValue(APEX_CONTACTLIST_ERROR)
        const buttonElement = element.shadowRoot.querySelector('lightning-button')
        buttonElement.click()
        
        await flushPromises();
            const errorElement = element.shadowRoot.querySelector('.error')
            expect(errorElement).not.toBeNull()
        
});
})
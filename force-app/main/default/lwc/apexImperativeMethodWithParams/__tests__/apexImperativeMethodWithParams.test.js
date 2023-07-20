import { createElement } from 'lwc';
import ApexImperativeMethodWithParams from 'c/apexImperativeMethodWithParams';
import getContactListFromSearch from '@salesforce/apex/ContactController.getContactListFromSearch';


const APEX_CONTACTLIST_ERROR = require('./data/contactsError.json');
const APEX_CONTACTLIST_SUCCESS = require('./data/contactsList.json');

jest.mock(
    '@salesforce/apex/ContactController.getContactListFromSearch',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c-apex-imperative-method-with-params', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    async function flushPromises() {
        return Promise.resolve();
    }

    it('Checking Contact Data from search Key word', async () => {
            const USER_INPUT = 'troop';
            const APEX_PARAMETERS = { input: USER_INPUT };

            getContactListFromSearch.mockResolvedValue(APEX_CONTACTLIST_SUCCESS);
            
        // Arrange
        const element = createElement('c-apex-imperative-method-with-params', {
            is: ApexImperativeMethodWithParams
        });

        // Act
        document.body.appendChild(element);


        const inputElm = element.shadowRoot.querySelector('lightning-input');
        inputElm.value=USER_INPUT;
        inputElm.dispatchEvent(new CustomEvent('change'));

        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        await flushPromises();        

        const detailEls = element.shadowRoot.querySelectorAll('p');

        expect(getContactListFromSearch.mock.calls[0][0]).toEqual(APEX_PARAMETERS);
        expect(detailEls.length).toBe(APEX_CONTACTLIST_SUCCESS.length);
        expect(detailEls[0].textContent).toBe(APEX_CONTACTLIST_SUCCESS[0].Name);
    });


    
//     it('Error Check', async () => {

//         getContactListFromSearch.mockRejectedValue(APEX_CONTACTLIST_ERROR);
        
//     // Arrange
//     const element = createElement('c-apex-imperative-method-with-params', {
//         is: ApexImperativeMethodWithParams
//     });

//     // Act
//     document.body.appendChild(element);

//     const buttonEl = element.shadowRoot.querySelector('lightning-button');
//     buttonEl.click();

//     await flushPromises();    

//     const detailEls = element.shadowRoot.querySelectorAll('p.error');

//     expect(detailEls).not.toBeNull();
// });


it('renders the error when apex return an error',async()=>{

        
    // Arrange
    const element = createElement('c-apex-imperative-method', {
        is: ApexImperativeMethodWithParams
    });

    // Act
    document.body.appendChild(element);

    getContactListFromSearch.mockRejectedValue(APEX_CONTACTLIST_ERROR)
    const buttonElement = element.shadowRoot.querySelector('lightning-button')
    buttonElement.click()
    
    await flushPromises();
        const errorElement = element.shadowRoot.querySelector('p.error')
        expect(errorElement).not.toBeNull()
    
});
});
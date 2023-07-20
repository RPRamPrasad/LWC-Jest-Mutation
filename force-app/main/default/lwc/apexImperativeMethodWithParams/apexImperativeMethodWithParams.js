import { LightningElement } from 'lwc';
import getContactListFromSearch from '@salesforce/apex/ContactController.getContactListFromSearch';

export default class ApexImperativeMethodWithParams extends LightningElement {

    contacts;
    error;
    searchKey='';

    handleKeyChange(event){
        this.searchKey = event.target.value;
    }

    handleSearch(){
        getContactListFromSearch({input: this.searchKey})
        .then((result)=>{
            this.contacts=result;
            this.error=undefined;
        })
        .catch((error)=>{
            this.error=error;
            this.contacts=undefined;
        })
    }
}
import { LightningElement } from 'lwc';

export default class HelloExpressions extends LightningElement {

    firstName='';
    lastName='';

    handleChange(event){
        
        if(event.target.name === 'firstName'){
            this.firstName = event.target.value;
        } else if (event.target.name === 'lastName'){
            this.lastName = event.target.value;
        }
    }

    get uppercasedFullName() {
        return `${this.firstName} ${this.lastName}`.trim().toUpperCase();
    }

}
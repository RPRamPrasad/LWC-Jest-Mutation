import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {
    greeting='Hello';

    handleChange(event){
        this.greeting = event.target.value;
    }
}
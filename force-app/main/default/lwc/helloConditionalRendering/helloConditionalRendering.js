import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {

    areDetailsVisible=false

    handleChnage(event){

        this.areDetailsVisible = event.target.checked;

    }
}
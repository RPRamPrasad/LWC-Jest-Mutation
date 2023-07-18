public with sharing class ContactController {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactList(){
        return [SELECT Name FROM  Contact];
    }
}

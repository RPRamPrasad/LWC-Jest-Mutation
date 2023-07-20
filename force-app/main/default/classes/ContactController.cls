public with sharing class ContactController {
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactList(){
        return [SELECT Name FROM  Contact];
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactListFromSearch(string input){
        string key = '%'+input+'%';
        return [SELECT Id, Name, Title, Phone, Email, Picture__c
        FROM Contact
        WHERE Name LIKE :key AND Picture__c != NULL
        WITH USER_MODE
        LIMIT 10];
    }
}

servicesModule
    .factory('Firebase', function ($rootScope, Utility, Security){

        return {
            saveObject: function (objectName, dataObject) {

                //Get ID for new object
                var newObjectKey = firebase.database().ref().child(objectName).push().key;

                //Add Basic Data to Objects
                dataObject["creator"] = {
                    name: Security.getUserName(),
                    uid: Security.getUserID(),
                };
                
                dataObject["time"] = Utility.getCurrentDate();
                dataObject["key"] = newObjectKey;

                console.log(dataObject);

                var updates = {};
                updates['/'+ objectName +'/' + newObjectKey] = dataObject;

                //Save to Database
                firebase.database().ref().update(updates);
            }
        }
    });
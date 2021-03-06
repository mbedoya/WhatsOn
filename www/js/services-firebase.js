servicesModule
    .factory('Firebase', function ($rootScope, Utility, Security) {

        return {
            saveObject: function (objectName, dataObject, fx) {

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
                updates['/' + objectName + '/' + newObjectKey] = dataObject;

                //Save to Database
                firebase.database().ref().update(updates, function (error) {
                    if(fx){
                        fx(newObjectKey, error);
                    }
                });
            },
            saveProperty: function (objectName, dataObject, fx) {

                var updates = {};
                updates['/' + objectName] = dataObject;
                
                //Save to Database
                firebase.database().ref().update(updates, function (error) {
                    if(fx){
                        fx(error);
                    }
                });
            },
            getObject: function (object, fx, fxError) {

                console.log(object);

                var recentPostsRef = firebase.database().ref(object);
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });
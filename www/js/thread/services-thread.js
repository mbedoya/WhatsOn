servicesModule
    .factory('Thread', function ($rootScope, Utility, Firebase, Security) {

        var fb_parent_object_name = 'category-topics';
        var fb_object_name = 'topic-threads';

        return {
            addMessage: function (message, fx) {

                var data = {
                    title: message,
                    name: Security.getUserName(),
                    gender: Security.getUserGender()
                };

                Firebase.saveObject('/' + fb_object_name + '/' + $rootScope.selectedTopic.key, data, function (newObjectKey, error) {

                    var parentObjectCount = '/' + fb_parent_object_name + '/' + $rootScope.selectedTopic.parentKey
                        + "/" + $rootScope.selectedTopic.key + "/count";

                    console.log(parentObjectCount);

                    //Its parent count needs to be updated
                    Firebase.getObject(parentObjectCount, function (snapshot) {

                        //Get Count and add 1
                        var count = snapshot.val();
                        if (!count) {
                            count = 0;
                        }
                        count = count + 1;
                        Firebase.saveProperty(parentObjectCount, count);

                    }, function error(params) {

                    });

                    fx(error);


                });

            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/' + fb_object_name + '/' + $rootScope.selectedTopic.key).limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getAll: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/' + fb_object_name + '/' + $rootScope.selectedTopic.key).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });
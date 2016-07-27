servicesModule
    .factory('Topic', function ($rootScope, Firebase) {

        //Name of the object root in Firebase
        var fb_object_name = 'topics';

        return {
            add: function (topic) {

                //Set object data
                var data = {
                    title: topic,
                    name: $rootScope.userProfile.name,
                    gender: $rootScope.userProfile.gender,
                };

                Firebase.saveObject(fb_object_name, data);
            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name).limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getAll: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });
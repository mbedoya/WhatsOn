servicesModule
    .factory('Thread', function ($rootScope, Utility) {

        var fb_object_name = 'posts';

        return {
            sendMessage: function (message) {

                var uid = $rootScope.userProfile.uid;
                var newPostKey = firebase.database().ref().child(fb_object_name).push().key;

                var postData = {
                    title: message,
                    name: $rootScope.userProfile.name,
                    gender: $rootScope.userProfile.gender,
                    uid: uid,
                    time: Utility.getCurrentDate()
                };

                var updates = {};
                updates['/'+ fb_object_name +'/' + newPostKey] = postData;

                firebase.database().ref().update(updates);
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
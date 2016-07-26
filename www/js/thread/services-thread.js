servicesModule
    .factory('Thread', function ($rootScope, Utility) {


        return {
            sendMessage: function (message) {

                var uid = $rootScope.userProfile.uid;
                var newPostKey = firebase.database().ref().child('posts').push().key;

                var postData = {
                    title: message,
                    name: $rootScope.userProfile.name,
                    uid: uid,
                    time: Utility.getCurrentDate()
                };

                var updates = {};
                updates['/posts/' + newPostKey] = postData;
                updates['/user-posts/' + uid + '/' + newPostKey] = postData;

                firebase.database().ref().update(updates);
            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('posts').limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getAll: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('posts').limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });
servicesModule
    .factory('Thread', function ($rootScope, Utility, Security) {

        var fb_object_name = 'topic-threads';

        return {
            addMessage: function (message) {

                var newPostKey = firebase.database().ref().child('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key).push().key;

                var postData = {
                    title: message,
                    name: Security.getUserName(),
                    gender: Security.getUserGender(),
                    uid: Security.getUserID(),
                    time: Utility.getCurrentDate()
                };

                var updates = {};
                updates['/'+ fb_object_name +'/' + $rootScope.selectedTopic.key + '/' + newPostKey ] = postData;

                firebase.database().ref().update(updates);
            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key).limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getAll: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });
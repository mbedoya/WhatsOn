servicesModule
    .factory('Topic', function ($rootScope, Firebase) {

        //Name of the object root in Firebase
        var fb_object_name = 'category-topics';
        var fb_ads_name = 'category-ads';

        return {
            add: function (topic, fx) {

                //Set object data
                var data = {
                    title: topic,
                    parentKey: $rootScope.selectedCategory.key,
                    count: 0
                };

                //Save Topic Data
                Firebase.saveObject(fb_object_name + "/" + $rootScope.selectedCategory.key, data, function (objectKey, error) {
                    if (fx) {
                        fx(objectKey, error);
                    }
                });

            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name).limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getByCategory: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name + "/" + $rootScope.selectedCategory.key).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            },
            getPopularByCategory: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.child($rootScope.selectedCategory.key).orderByChild("count").limitToLast(20).once("value", fx, fxError);
            },
            getRecentByCategory: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.child($rootScope.selectedCategory.key).limitToLast(20).once("value", fx, fxError);
            },
            getAdsByCategory: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_ads_name + "/" + $rootScope.selectedCategory.key).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            },
            getLastTopicByCategory: function (category, fx, fxError) {

                var recentPostsRef = firebase.database().ref(fb_object_name + "/" + category).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", function (snapshot) {

                    var maxCount = -1;
                    var maxTopic;
                    snapshot.forEach(function (childSnapshot) {
                        var topic = childSnapshot.val();

                        if(topic.count > maxCount){
                            maxCount = topic.count;
                            maxTopic = topic;
                        }
                    });

                    fx(maxTopic);

                }, fxError);
            }
        }
    });
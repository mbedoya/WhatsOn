angular.module('whatson.services', [])
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

                var recentPostsRef = firebase.database().ref('posts').limitToLast(100);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            }
        }
    })

    .factory('User', function ($rootScope, Utility) {


        return {
            register: function () {

                var uid = firebase.database().ref().child('users').push().key;

                var userData = {
                    name: $rootScope.userProfile.name,
                    gender: $rootScope.userProfile.gender,
                    creationTime: Utility.getCurrentDate()
                };

                var updates = {};
                updates['/users/' + uid] = userData;

                firebase.database().ref().update(updates);

                //Set User Data
                $rootScope.userProfile.uid = uid;
                $rootScope.userProfile.registered = true;

                //Storage User Data
                localStorage.wo_name = $rootScope.userProfile.name;
                localStorage.wo_uid = $rootScope.userProfile.uid;
                localStorage.wo_gender = $rootScope.userProfile.gender;

            }
        }
    })

    .factory('Utility', function () {

        this.padStr = function (i) {
            return (i < 10) ? "0" + i : "" + i;
        };

        var self = this;

        return {
            getDateDiffFormatted: function (startDate, endDate) {

                startDate = new Date(startDate);

                if (!endDate) {
                    endDate = new Date();
                } else {
                    endDate = new Date(endDate);
                }

                multiplicador = startDate < endDate ? 1 : -1;
                var diferenciaTiempo = Math.abs(endDate - startDate);
                var diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));

                result = diferenciaDias * multiplicador;

                if (result == 0) {

                    var diferenciaHoras = Math.floor(diferenciaTiempo / (1000 * 3600));

                    if (diferenciaHoras <= 12) {

                        if (diferenciaHoras == 0) {

                            var diferenciaMinutos = Math.floor(diferenciaTiempo / (1000 * 60));

                            if (diferenciaMinutos == 0) {
                                return "recién";
                            }

                            return "hace " + diferenciaMinutos + " minutos";

                        }

                        return "hace " + diferenciaHoras + " horas";
                    }

                    return "hoy";
                }

                if (result == 1) {
                    return "ayer";
                }

                return "hace " + result + " días";
            },
            getCurrentDate: function () {
                var fecha = new Date();

                var dateStr = self.padStr(fecha.getFullYear()) + "-" +
                    self.padStr(1 + fecha.getMonth()) + "-" +
                    self.padStr(fecha.getDate()) + " " +
                    self.padStr(fecha.getHours()) + ":" +
                    self.padStr(fecha.getMinutes()) + ":" +
                    self.padStr(fecha.getSeconds());

                return dateStr;
            }
        }
    })

    ;
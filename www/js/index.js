/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        this.receivedEvent('deviceready')
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        if (id !== 'deviceready') return
        var hostDomain = 'http://www.sjplus.cn'

        function shuffle(o) { //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        var data = []

        function getData(cb) {
            $.ajax({
                url: 'http://www.sjplus.cn/design-works/latest/list',
                data: {
                    count: 50
                },
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    data = shuffle(result.data)
                    if (cb) cb()
                }
            })
        }

        setInterval(getData, 300000)
        var i = 0
        var content = $('#content')
        var user = $('#user')
        var title = $('#title')
        var avatar = $('#avatar')

        function switchDesignWorks() {

            var current = data[i]
            content.css({
                backgroundImage: 'url(' + hostDomain + '/read/' + current.file_id.substring(0, 24) + '?m=full-size)'
            })

            avatar.animate({marginLeft: -180, opacity: 0}, 500, function () {
                avatar.animate({marginLeft: 0, opacity: 1}, 500)[0].src = 'http://www.sjplus.cn/avatar/' + current.owner_id + '_80x80'
            })
            user.animate({paddingLeft: 30, marginBottom: 50, opacity: 0}, 600, function () {
                user.css({paddingLeft: 0, marginBottom: 0}).animate({ opacity: 1}, 200).html(current.owner_user)

            })
            title.animate({paddingLeft: 30, opacity: 0}, 600, function () {
                title.css({paddingLeft: 0}).animate({opacity: 1}, 200).html(current.title)
            })
            var nextObj = data[++i]
            if (!nextObj) {
                i = 0
                nextObj = data[i]
            }
            new Image().src = hostDomain + '/read/' + nextObj.file_id.substring(0, 24) + '?m=full-size'
            setTimeout(switchDesignWorks, 6000)


        }

        getData(function () {
            switchDesignWorks()
        })

    }
};

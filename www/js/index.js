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
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        alert('start bindEvent')
        app.receivedEvent('deviceready');
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('receivedEvent(deviceready)')
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        if(id==='deviceready'){
            alert('start sjplus')
        var hostDomain = 'http://www.sjplus.cn'

        function shuffle(o) { //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        KISSY.use('dom,event,io,anim', function (S, DOM, Event, IO, Anim) {
            var data = []

            function getData(cb) {
                IO({
                    url: hostDomain + '/design-works/latest/list',
                    dataType: 'jsonp',
                    success: function (result) {
                        data = shuffle(result.data)
                        if (cb) cb()
                    }
                })
            }

            setInterval(getData, 300000)

            var i = 0

            var content = S.get('#content')

            function switchDesignWorks() {
                DOM.css(content, {
                    backgroundImage: 'url(' + hostDomain + '/read/' + data[i].file_id.substring(0,24)+ '?m=full-size)'
                })
                var nextObj = data[++i]
                if (!nextObj) {
                    i = 0
                    nextObj = data[i]
                }
                new Image().src = hostDomain + '/read/' + nextObj.file_id.substring(0,24)+'?m=full-size'
                setTimeout(switchDesignWorks, 5000)
            }

            getData(function () {
                switchDesignWorks()
            })

        })
    }
    }
};

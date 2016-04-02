// ==UserScript==
// @name           RO/bot
// @description    Automaticaly vote and log in to new room at Reddit's Robin
// @include        https://www.reddit.com/robin/*
// @version        1.0
// ==/UserScript==

(function ($) {
    console.log("Cerx's RO/bot initialized");
    var prefix = ">[RO/bot] ";


    //WAIT 4s for the site to load
    setTimeout(function () {
        WhatsGoingOn();
    }, 4000);

    //The main function
    function WhatsGoingOn() {
        room = $(".robin-chat--room-name");
        var interval = Math.round(Math.random() * (120000 - 30000) + 30000);

        if (JoinStatus() == false) {
            //Join a room
            console.log(prefix + "You're not in a room! Logging you in.");
            if (!JoinRoom()) {
                console.log(prefix + "Whoa, that wasn't supposed to happen.");
            }
            else {
                UpdateRoomName();
                console.log("Logged in room " + room + "!");
            }

        }
        else if (GrowStatus() == false) {
            //Vote atomatically
            console.log(prefix + "You're in a room but didn't voted yet!");
            if (!VoteForGrow()) {
                console.log(prefix + "Whoa, that wasn't supposed to happen.");
            }
            else {
                console.log("Voted for Grow in room " + room);
            }
        }
        else {
            console.log(prefix + "Idling...");
        }
        console.log(prefix + "Next check in " + interval + "ms.");


        //Random intervals, just in case
        setTimeout(function () {
            WhatsGoingOn();
        }, interval);
    }

    function UpdateRoomName() {
        room = $(".robin-chat--room-name");
    }

    function JoinStatus() {
        UpdateRoomName();
        //Is room name defined?
        if ($(".robin-chat--room-name").length) {
            return true;
            //Is there a join button?
        } else if ($(".robin-home--thebutton").length) {
            return true;
        }
        return false;
    }

    function JoinRoom() {
        //Unlock the join button
        if ($(".robin--thebutton-state--locked").length) {

            if (!UnlockLoginButton()) {
                console.log(prefix + "Couldn't unlock the login button! That's weird...");
            }
            else {
                console.log(prefix + "Login button unlocked");
                //Click the join button
                UseLoginButton();
            }

        }
    }

    function UnlockLoginButton() {
        $(".robin--thebutton-state--locked").click();
        console.log(prefix + "Unlocking login button...");
    }

    function UseLoginButton() {
        //Join a room!
        setTimeout($(".robin-home--thebutton").click(), 1234);
    }

    function VoteForGrow() {
        //Click the grow vote!
        $(".robin--vote-class--increase").click();
    }

    function GrowStatus() {
        //Did I voted?
        if ($(".robin--active").length) {
            return true;
        }
        return false;
    }


    /**     Created with ❤ by Cerx on 02.04.2016.
     *          https://github.com/Cerx-pw/ro-bot
     */

})(jQuery);

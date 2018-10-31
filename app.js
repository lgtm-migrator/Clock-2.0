import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCDrawer } from "@material/drawer";
import { MDCSelect } from '@material/select';
import { MDCMenu } from '@material/menu';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCSnackbar } from '@material/snackbar';

import $ from "jquery";

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));               //Drawer
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));            //Topappar

topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

//All of about form
//Icon Button
if (document.querySelector('.mdc-icon-button')) {
    const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
    iconButtonRipple.unbounded = true;
}

if (document.querySelector('.mdc-menu')) {
    const menu = new MDCMenu(document.querySelector('.mdc-menu'));
}


//Document Ready
$(document).ready(function () {
    if ($("meta[name='app']").attr('content') === 'main6b2532vb') {
        //main page
        console.log('main');

        let selectDOM = document.querySelector('.mdc-select');
        const select = MDCSelect.attachTo(selectDOM);

        const clockDOM = document.getElementById('clock');
        const maridianDOM = document.getElementById('maridian');
        const calenderDOM = document.getElementById('calender');
        const weekdayDOM = document.getElementById('weekday');
        const canvas = document.getElementById("canvasClock");

        let ctx = canvas.getContext("2d");
        let radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90
        setInterval(drawClock, 1000);

        /**
         * Functions for all Clock related works
         */
        let clock = {
            currentSeconds: '',
            currentMinutes:,
            currentHours:,
            currentMaridian:
            currentWeekDay:
            currentDay:
            currentMonth:
            currentYear:
        }

        function clock() {

            if (typeof clock.currentSeconds == 'undefined') {
                // It has not... perform the initialization
                clock.currentSeconds = <? php echo date('s'); ?>;
            }
            else {
                if (clock.currentSeconds < 59) {
                    clock.currentSeconds++;
                }
                else {
                    clock.currentSeconds = 0;
                    clock.currentMinutes++;
                }
            }

            if (typeof clock.currentMinutes == 'undefined') {
                clock.currentMinutes =  <? php echo date('i'); ?>;
            }
            else {
                if (clock.currentMinutes > 59) {
                    clock.currentHours++;
                    clock.currentMinutes = 0;
                }
            }

            if (typeof clock.currentHours == 'undefined') {
                clock.currentHours =  <? php echo date('h'); ?>;
            }

            if (clock.currentMinutes > 60 || clock.currentSeconds > 60) {
                alert("Some Error Occours. Kindly, Refreash the page.")
            }

            var currentMaridian = "<?php echo date('A'); ?>";

            var currentWeekDay = "<?php echo date('l'); ?>";

            var currentDay = "<?php echo date('j'); ?>";
            var currentMonth = "<?php echo date('F'); ?>";
            var currentYear = "<?php echo date('Y'); ?>";


            // Compose the string for display
            var currentTimeString = clock.currentHours + ":" + clock.currentMinutes + ":" + clock.currentSeconds;
            var currentDateString = currentMonth + " " + currentDay + "," + currentYear;

            console.log(currentTimeString + currentMaridian);
            console.log(currentDateString + currentWeekDay);

            document.getElementById("clock").innerHTML = currentTimeString;
            document.getElementById("maridian").innerHTML = currentMaridian;
            document.getElementById("calender").innerHTML = currentDateString;
            document.getElementById("weekday").innerHTML = currentWeekDay;

            drawClock(clock.currentHours, clock.currentMinutes, clock.currentSeconds);
        }

        function drawClock(iHr, iMin, iSec) {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawTime(ctx, radius, iHr, iMin, iSec);
        }

        function drawFace(ctx, radius) {
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);

            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = radius * 0.1;
            ctx.strokeStyle = "#1e88e5";      //Change Clock color
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
            ctx.fillStyle = '#333';
            ctx.fill();
        }

        function drawNumbers(ctx, radius) {
            var ang;
            var num;
            ctx.font = radius * 0.15 + "px arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            for (num = 1; num < 13; num++) {
                ang = num * Math.PI / 6;
                ctx.rotate(ang);
                ctx.translate(0, -radius * 0.85);
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius * 0.85);
                ctx.rotate(-ang);
            }
        }

        function drawTime(ctx, radius, iHr, iMin, iSec) {
            var now = new Date();
            // var hour = now.getHours();
            // var minute = now.getMinutes();
            // var second = now.getSeconds();

            var hour = iHr;
            var minute = iMin;
            var second = iSec;
            //hour
            hour = hour % 12;
            hour = (hour * Math.PI / 6) +
                (minute * Math.PI / (6 * 60)) +
                (second * Math.PI / (360 * 60));
            drawHand(ctx, hour, radius * 0.5, radius * 0.07);
            //minute
            minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
            drawHand(ctx, minute, radius * 0.8, radius * 0.07);
            // second
            second = (second * Math.PI / 30);
            drawHand(ctx, second, radius * 0.9, radius * 0.02);
        }

        function drawHand(ctx, pos, length, width) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.moveTo(0, 0);
            ctx.rotate(pos);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-pos);
        }

        let d = new Date();
        ///////////////
        $.get('./api/cookie.php', { y: d.getFullYear(), m: d.getMonth(), d: d.getDate(), h: d.getHours(), mn: d.getMinutes(), s: d.getSeconds(), tz: d.getTimezoneOffset() })
            .done(function (data) {
                if (data.s === '1') {
                    /////////////
                    $.post('./api/init.php', { token: Cookies.get('_s') })
                        .done(function (d) {
                            //////////
                            selectDOM.append()
                        })
                        .fail(function () {

                        })
                }
            })
            .fail(function () {

            });

        select.listen('change', () => {
            // Do something
            // alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
            $.ajax({
                type: 'POST',
                url: './api/time_zone.php',
                data: {
                    token1: Cookies.get('_s'),
                    token2: Cookies.get('_tz'),
                    tz: select.value,
                },
                async: true,
                dataType: 'json'
            })
                .done(function (data) {

                })
                .fail(function () {

                })
                .always(function () {

                })
        });
    }
    else if ($("meta[name='app']").attr('content') === 'about2v3n653') {
        //about page
        console.log('about');
    }
    else if ($("meta[name='app']").attr('content') === 'feedbackb36vb75b') {
        //feedback page
        console.log('feedback');

        const feedbackName = new MDCTextField(document.getElementById('feedback-name'));
        const feedbackEmail = new MDCTextField(document.getElementById('feedback-email'));
        const feedbackData = new MDCTextField(document.getElementById('feedback-data'));

        if (document.getElementById('feedback-name-helper-text')) {
            const feedbackNameHelperText = new MDCTextFieldHelperText(document.getElementById('feedback-name-helper-text'));
        }
        if (document.getElementById('feedback-email-helper-text')) {
            const feedbackEmailHelperText = new MDCTextFieldHelperText(document.getElementById('feedback-email-helper-text'));
        }
        if (document.getElementById('feedback-data-helper-text')) {
            const feedbackDataHelperText = new MDCTextFieldHelperText(document.getElementById('feedback-data-helper-text'));
        }

        if (document.getElementById('feedback-submit')) {
            const feedbackButtonRipple = new MDCRipple(document.getElementById('feedback-submit'));
        }

        const feedbackSnackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

        //When the submit Button is clicked
        $("form#feedback-formn4774").submit(function (event) {
            event.preventDefault();
            console.log('Feedback Submit');

            let dajaObj = {
                name: feedbackName.value,
                email: feedbackEmail.value,
                data: feedbackData.value,
                token: ''
            };
            if (dajaObj.name.length < 4) {
                feedbackSnackbar.show({
                    message: 'Please enter a Proper Name', actionText: 'OK', actionHandler: function () {

                    }
                });
                return false;
            }
            else if (dajaObj.email.length < 7) {
                feedbackSnackbar.show({
                    message: 'Please enter a Proper Email', actionText: 'OK', actionHandler: function () {

                    }
                });
                return false;
            }
            else if (dajaObj.data.length < 5) {
                feedbackSnackbar.show({
                    message: 'Please enter a Message', actionText: 'OK', actionHandler: function () {

                    }
                });
                return false;
            }
            console.log(dajaObj);
            grecaptcha.ready(function () {
                grecaptcha.execute('6LcGQncUAAAAAKYAaNg7ciOYFBEGMuaTQWbA8cEl', { action: 'homepage' }).then(function (token) {
                    //Make the ajax call
                    dajaObj.g_recaptcha = token;

                    $.ajax({
                        type: 'POST',
                        url: './api/feedback.php',
                        data: dajaObj,
                        async: true,
                        dataType: 'json'
                    })
                        .done(function (data) {
                            if (data.msgSend === '2vn64vn79') {
                                feedbackSnackbar.show({
                                    message: 'Feedback Send Successfully', actionText: 'OK', actionHandler: function () {

                                    }
                                });
                            }
                        })
                        .fail(function () {
                            grecaptcha.reset();
                        })
                        .always(function () {

                        });

                });
            });
        });
    }
    else {
        //something else
        console.log('none');
    }
});
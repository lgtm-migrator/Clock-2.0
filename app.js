/**
 * Import statements
 */
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCDrawer } from "@material/drawer";
import { MDCSelect } from '@material/select';
import { MDCMenu } from '@material/menu';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCSnackbar } from '@material/snackbar';

import $ from "jquery";

/**
 * Drawer and topappbar initializations
 */
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));               //Drawer
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));            //Topappar

topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

const baseApiUri = 'https://api.timeclock.ml';

/**
 * This will Executes thes the document is ready for manipulation
 */
$(document).ready(function () {
    if ($("meta[name='app']").attr('content') === 'main6b2532vb') {
        //main page
        console.log('main');

        // Declearation of all DOM elements
        let selectDOM = document.querySelector('.mdc-select');

        const clockDOM = document.getElementById('clock');
        const maridianDOM = document.getElementById('maridian');
        const calenderDOM = document.getElementById('calender');
        const weekdayDOM = document.getElementById('weekday');

        const canvasDOM = document.getElementById("canvasClock");
        const myCalDOM = document.getElementById("myCal");

        /**
         * timeClock creates and runs the clock
         */
        function timeClock() {

            if (typeof clock.currentSeconds == 'undefined') {
                // It has not... perform the initialization
                clock.currentSeconds = 0;
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
                clock.currentMinutes = 0;
            }
            else {
                if (clock.currentMinutes > 59) {
                    clock.currentHours++;
                    clock.currentMinutes = 0;
                }
            }

            if (typeof clock.currentHours == 'undefined') {
                clock.currentHours = 0;
            }

            if (clock.currentMinutes > 60 || clock.currentSeconds > 60) {
                alert("Some Error Occours. Kindly, Refreash the page.")
            }


            // Compose the string for display
            let currentTimeString = clock.currentHours + ":" + clock.currentMinutes + ":" + clock.currentSeconds;
            let currentDateString = clock.currentMonth + " " + clock.currentDay + "," + clock.currentYear;

            console.log(currentTimeString + clock.currentMaridian, currentDateString + clock.currentFormattedWeekDay);

            clockDOM.innerHTML = currentTimeString;
            maridianDOM.innerHTML = clock.currentMaridian;
            calenderDOM.innerHTML = currentDateString;
            weekdayDOM.innerHTML = clock.currentFormattedWeekDay;

            drawClock(clock.currentHours, clock.currentMinutes, clock.currentSeconds);
        }

        /**
         * drawClock draws the clock on the canvas
         * 
         * @param {The initial Hour Value} iHr 
         * @param {The initial Minute Value} iMin 
         * @param {The initial second Value} iSec 
         */
        function drawClock(iHr, iMin, iSec) {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawTime(ctx, radius, iHr, iMin, iSec);
        }

        /**
         * drawface draws the face of the clock in the canvas
         * 
         * @param {Context of the Clock} ctx 
         * @param {Radius of the Clock} radius 
         */
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

        /**
         * drawNumbers will draw the numbers in the surface ofthe clock
         * 
         * @param {Context of the Clock} ctx 
         * @param {Radius of the Clock} radius 
         */
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

        /**
         * drawtime Draws the time in the surface of the clock
         * 
         * @param {Context of the Clock} ctx 
         * @param {Radius of the Clock} radius 
         * @param {The initial Hour Value} iHr 
         * @param {The initial Minute Value} iMin 
         * @param {The initial second Value} iSec 
         */
        function drawTime(ctx, radius, iHr, iMin, iSec) {
            var now = new Date();
            // var hour = now.getHours();
            // var minute = now.getMinutes();
            // var second = now.getSeconds();

            let hour = iHr;
            let minute = iMin;
            let second = iSec;
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

        /**
         * drawHand drwas the indevisual hands of the clock
         * 
         * @param {Context of the Clock} ctx 
         * @param {The position of indevisual Hands} pos 
         * @param {The length of indevisual Hands} length 
         * @param {The width of indevisual Hands} width 
         */
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

        /**
         * Calender Code
         * Adds the Graphical Calender
         * 
         * @param {current Full Year} currYear 
         * @param {current month(1-12)} currMonth 
         * @param {current Day (1-31)} currDay 
         * @param {current Weekday(0-6)} currWeekDay 
         */
        function drawCalender(currYear, currMonth, currDay, currWeekDay) {
            /**
             * Element Declearation
             */
            let day_of_week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
            let month_of_year = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

            const DAYS_OF_WEEK = 7;    // "constant" for number of days in a week
            const DAYS_OF_MONTH = 31;    // "constant" for number of days in a month

            /**
             * VARIABLES FOR FORMATTING
             * You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR' tags to customize your caledanr's look.
             */
            const TR_start          = '<TR>';
            const TR_end            = '</TR>';
            const highlight_start   = '<TD WIDTH="30"><TABLE CELLSPACING=0 BORDER=0 BGCOLOR=#1e88e5 BORDERCOLOR=CCCCCC style="color: #ffffff;"><TR><TD WIDTH=20><B><CENTER>';
            const highlight_end     = '</CENTER></TD></TR></TABLE></B>';
            const TD_start          = '<TD WIDTH="30"><CENTER>';
            const TD_end            = '</CENTER></TD>';

            //  DECLARE AND INITIALIZE VARIABLES
            let year = currYear;            //Represents current year (4-digit number)
            let month = currMonth;          //Represents current month (Jan - Dec)
            let today = currDay;            //Represents current day (1-31)
            let weekday = currWeekDay;      //Represents current weekday (0-6)
            let mnthInitDay = 3;            //Represents the initial weekday of the month (0-6)

            let cal;    // Used for printing
            let index;  // Loop indexing variable

            currDay = 1;

            /**
             * BEGIN CODE FOR CALENDAR
             * You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR' tags to customize your calendar's look.
             */
            cal =   '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=0 BORDERCOLOR=BBBBBB id="table-center" class="mdc-typography">';
            cal +=      TR_start;
            cal +=          TD_start;
            cal +=              '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=2>';
            
            cal +=                  TR_start;
            cal +=                      '<TD COLSPAN="' + DAYS_OF_WEEK + '" BGCOLOR="#1e88e5" style="color: #ffffff;" class="mdc-typography--body1 mdc-elevation--z2" >';
            cal +=                          '<CENTER>';
            cal +=                              '<B>' + month_of_year[month] + '   ' + year + '</B>';
            cal +=                      TD_end;
            cal +=                  TR_end;
            
            cal +=                  TR_start;
 
            /**
             * Loop for weekday representation
             * If the weekday matchs with current day, then BOLD
             */
            for (index = 0; index < DAYS_OF_WEEK; index++) {
                if (weekday == index) {
                    //Bold Print
                    cal += TD_start + '<B>' + day_of_week[index] + '</B>' + TD_end;
                }
                else {
                    //Normal Print
                    cal += TD_start + day_of_week[index] + TD_end;
                }
            }
            cal +=                  TR_end;
            //End of weekDay

            //Start of Days
            cal +=                  TR_start;

            // FILL IN BLANK GAPS UNTIL TODAY'S DAY
            for (index = 0; index < mnthInitDay; index++){
                cal += TD_start + '  ' + TD_end;
            }

            let week_day = currWeekDay;
            // LOOPS FOR EACH DAY IN CALENDAR
            for (index = 0; index < DAYS_OF_MONTH; index++) {
                if (currDay > index) {
                    // RETURNS THE NEXT DAY TO PRINT

                    // START NEW ROW FOR FIRST DAY OF WEEK
                    if (week_day == 0)
                        cal += TR_start;

                    if (week_day != DAYS_OF_WEEK) {

                        // SET VARIABLE INSIDE LOOP FOR INCREMENTING PURPOSES
                        let day = currDay;

                        // HIGHLIGHT TODAY'S DATE
                        if (today == currDay)
                            cal += highlight_start + day + highlight_end + TD_end;

                        // PRINTS DAY
                        else
                            cal += TD_start + day + TD_end;
                    }

                    // END ROW FOR LAST DAY OF WEEK
                    if (week_day == DAYS_OF_WEEK)
                        cal += TR_end;
                }

                // INCREMENTS UNTIL END OF THE MONTH
                currDay = currDay + 1;
                week_day = week_day + 1;

            }// end for loop

            cal += '</TD></TR></TABLE></TABLE>';

            //  PRINT CALENDAR
            myCalDOM.innerHTML = cal;
        }

        /**
         * All values for static clock
         */
        let clock = {
            currentSeconds: undefined,
            currentMinutes: undefined,
            currentHours: undefined,
            currentMaridian: undefined,
            currentWeekDay: undefined,
            currentFormattedWeekDay: undefined,
            currentDay: undefined,
            currentMonth: undefined,
            currentYear: undefined
        };

        /**
         * Clock canves initialization
         */
        const select = MDCSelect.attachTo(selectDOM);
        let ctx = canvasDOM.getContext("2d");
        let radius = canvasDOM.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;

        //Date object

        /**
         * Return the 12 hr format hour
         */
        Date.prototype.getHours12 = function () {
            return (this.getHours() + 11) % 12 + 1; // edited.
        }

        /**
         * Return the meridiem
         */
        Date.prototype.getMeridiem = function () {
            return this.getHours() > 12 ? 'PM' : 'AM';
        }
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        //var n = weekday[d.getDay()];


        let d = new Date();

        //Adding Init locals of date
        let fullse = d.getSeconds();
        let fullmin = d.getMinutes();
        let fullhr = d.getHours12();
        let fullmd = d.getMeridiem();
        let fullwd = d.getDay();
        let fmrtwd = weekday[d.getDay()];
        let fulldt = d.getDate();
        let fullmon = d.getMonth();
        let fullYr = d.getFullYear();

        //Add localvariables
        clock.currentSeconds = fullse;
        clock.currentMinutes = fullmin;
        clock.currentHours = fullhr;
        clock.currentMaridian = fullmd;
        clock.currentWeekDay = fullwd;
        clock.currentFormattedWeekDay = fmrtwd;
        clock.currentDay = fulldt;
        clock.currentMonth = fullmon;
        clock.currentYear = fullYr;


        let intv = setInterval(timeClock, 1000);
        drawCalender(clock.currentYear, clock.currentMonth, clock.currentDay, clock.currentWeekDay);

        ///////////////
        $.get('./api/cookie.php', { tz: d.getTimezoneOffset() })
            .done(function (data) {
                if (data.s === '1') {
                    /////////////
                    $.post('./api/init.php', { token: Cookies.get('_s') })
                        .done((d) => {
                            //////////
                            selectDOM.append()
                        })
                        .fail(() => {

                        })
                }
            })
            .fail(() => {

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
                .done((data) => {

                })
                .fail(() => {

                })
                .always(() => {

                })
        });
    }
    else if ($("meta[name='app']").attr('content') === 'about2v3n653') {
        //about page
        console.log('about');

        //Icon Button
        if (document.querySelector('.mdc-icon-button')) {
            const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
            iconButtonRipple.unbounded = true;
        }

        if (document.querySelector('.mdc-menu')) {
            const menu = new MDCMenu(document.querySelector('.mdc-menu'));
        }
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

        $.ajax({
            type: 'POST',
            url: baseApiUri + '/cookie.php',
            data: {
                uri: '45y3tze5ws',
            },
            dataType: 'json',
            async: true
        }).done(function(d){
            
        })
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
                        .done((data) => {
                            if (data.msgSend === '2vn64vn79') {
                                feedbackSnackbar.show({
                                    message: 'Feedback Send Successfully', actionText: 'OK', actionHandler: function () {

                                    }
                                });
                            }
                        })
                        .fail(() => {
                            grecaptcha.reset();
                        })
                        .always(() => {

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
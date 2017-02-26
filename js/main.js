var thisService;
var thatService;

var trigger;
var feedUrl;
var action;
var emailAddress;

function hideAllSections() {
    $("#home").hide();
    $("#services").hide();
    $("#choose-a-trigger").hide();
    $("#configure-trigger").hide();
    $("#choose-an-action").hide();
    $("#configure-action").hide();
    $("#confirmation-and-summary").hide();
}

$(document).ready(function() {
    hideAllSections();
    $("#home").show();
});

function launchModal(title, message) {
    $('#modal-title').html(title);
    $('#modal-body-p').html(message);
    $('#error-modal').modal();
}

function selectThisService() {
    if (thisService) {
        var title = "Oops!";
        var message = "Please select an Action first.";
        launchModal(title, message);
    } else {
        hideAllSections();
        $("#services").show();
    }
}

function selectThatService() {
    if (!thisService) {
        var title = "Oops!";
        var message = "Please select a Trigger first.";
        launchModal(title, message);
    } else {
        hideAllSections();
        $("#services").show();
    }
}

function selectedService(serviceName) {
    if (!thisService) {
        if (serviceName !== 'feed') {
            var title = "Oops!";
            var message = "This service is not available now.";
            launchModal(title, message);
        } else {
            thisService = serviceName;
            hideAllSections();
            $("#choose-a-trigger").show();
        }
    } else {
        if (serviceName !== 'email') {
            var title = "Oops!";
            var message = "This service is not available now.";
            launchModal(title, message);
        } else {
            thatService = serviceName;
            hideAllSections();
            $("#choose-an-action").show();
        }
    }
}

function selectTrigger(triggerName) {
    if (triggerName !== 'New Feed Item') {
        var title = "Oops!";
        var message = "This trigger is not available now.";
        launchModal(title, message);
    } else {
        trigger = triggerName;
        hideAllSections();
        $("#configure-trigger").show();
    }
}

$("#configure-trigger-form").submit(function(event){
    event.preventDefault();
});

function configuredTrigger() {
    feedUrl = $("#feedUrl").val();
    if (!feedUrl) {
        var title = "Oops!";
        var message = "Please enter a RSS feed url.";
        launchModal(title, message);
        return;
    }

    //var pattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i
    var pattern = /^((ftp|http|https):\/\/)?[^ " !:]+$/i
    if (!pattern.test(feedUrl)) {
        var title = "Oops!";
        var message = "Please enter a valid RSS feed url.";
        launchModal(title, message);
        return;
    }

    hideAllSections();
    $("#home").show();
}

function selectAction(actionName) {
    action = actionName;
    hideAllSections();
    $("#configure-action").show();
}

$("#configure-action-form").submit(function(event){
    event.preventDefault();
});

function configuredAction() {
    emailAddress = $("#emailAddress").val();
    if (!emailAddress) {
        var title = "Oops!";
        var message = "Please enter your email address.";
        launchModal(title, message);
        return;
    }

    var pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
    if (!pattern.test(emailAddress)) {
        var title = "Oops!";
        var message = "Please enter a valid email address.";
        launchModal(title, message);
        return;
    }
    showConfirmationAndSummary();
}

function showConfirmationAndSummary() {
    $("#this-div").html(trigger + ' at ' + feedUrl);
    $("#that-div").html(action + ' (' + emailAddress + ')');
    hideAllSections();
    $("#confirmation-and-summary").show();
}

function goHome() {
    thisService = null;
    thatService = null;
    feedUrl = null;
    emailAddress = null;

    hideAllSections();
    $("#home").show();
}

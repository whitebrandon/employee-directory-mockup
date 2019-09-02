/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Requests
Name: Brandon White
Date of Last Modification: 02/09/2019
******************************************/

/****************************************************************************************************************
 This version of the Public API Requests is meant purely as a challenge for myself | Before tackling this project using Promises and Async/Await I wanted to make sure I could follow the logic of a continuation-passing style of coding.
****************************************************************************************************************/

'use strict';   

    /**
     * Appends child elements to parent element
     * @param {Element} parent Parent node
     * @param  {...any} children An array of child elements to be appended
     */
    const appendMultiples = (parent, ...children) => children.forEach(child => parent.append(child));
    /**
     * Creates card for each employee and appends to Gallery
     * @param {Object} user Results object from parsed JSON
     */
    const createCard = (user) => {
        const $card = $('<div>').addClass('card');
        $('#gallery').append($card);
        const $imgContain = $('<div>').addClass('card-img-container');
        const $infoContain = $('<div>').addClass('card-info-container');
        appendMultiples($card, $imgContain, $infoContain);
        const $cardImg = $('<img>').addClass('card-img').attr('src', user.picture.large).attr('alt', "profile picture");
        $imgContain.append($cardImg);
        const $h3Info = $('<h3>').attr('id', `${user.name.first}-${user.name.last}`).addClass('card-name cap').text(`${user.name.first} ${user.name.last}`);
        const $emailPar = $('<p>').addClass('card-text').text(user.email);
        const $locationPar = $('<p>').addClass('card-text cap').text(`${user.location.city}, ${user.location.state}`);
        appendMultiples($infoContain, $h3Info, $emailPar, $locationPar);
    }
    /**
     * Adds/hides modal overlay to DOM
     */
    const createModalContainer = () => {
        const $div = $('<div>').addClass('modal-container').css('display', "none");
        const $modal = $('<div>').addClass('modal');
        $div.append($modal);
        const $button = $('<button>').attr('type', "button").attr('id', "modal-close-btn").addClass('modal-close-btn');
        $modal.append($button);
        const $strong = $('<strong>').text('X');
        $button.append($strong);
        $('script:first').before($div);
    }
    /**
     * Appends/hides modal version of employee card to DOM
     * @param {Object} user Results object from parsed JSON 
     */
    const createModalContent = (user) => {
        const $modalContainer = $('<div>').addClass('modal-info-container').css('display', "none");
        const $modalImg = $('<img>').addClass('modal-img').attr('src', user.picture.large).attr('alt', "profile picture");
        const $modalh3 = $('<h3>').attr('id', `${user.name.first}-${user.name.last}`).addClass('modal-name cap').text(`${user.name.first} ${user.name.last}`);
        const $modalEmailPar = $('<p>').addClass('modal-text').text(user.email);
        const $modalCityPar = $('<p>').addClass('modal-text cap').text(user.location.city);
        const $modalhr = $('<hr>');
        const $modalPhonePar = $('<p>').addClass('modal-text').text(user.phone);
        const $modalLocationPar = $('<p>').addClass('modal-text cap').text(`${user.location.street}, ${user.location.city}, ${stateAbbr[user.location.state]} ${user.location.postcode}`);
        const $modalDOBPar = $('<p>').addClass('modal-text').text(`Birthday: ${user.dob.date.substring(0, 10)}`);
        appendMultiples($modalContainer, $modalImg, $modalh3, $modalEmailPar, $modalCityPar, $modalhr, $modalPhonePar, $modalLocationPar, $modalDOBPar);
        $('.modal').append($modalContainer);
    }
    /**
     * Adds Prev and Next buttons to modal overlay
     */
    const createModalBtns = () => {
        const $modalBtn = $('<div>').addClass('modal-btn-container');
        const $prevButton = $('<button>').attr('type', "button").attr('id', "modal-prev").addClass('modal-prev btn').text("Prev");
        const $nextButton = $('<button>').attr('type', "button").attr('id', "modal-next").addClass('modal-next btn').text("Next");
        appendMultiples($modalBtn, $prevButton, $nextButton);
        $('.modal-container').append($modalBtn);
    }
    /**
     * Moves back and forth through modal employee cards
     * @param {DOMTokenList} list List of employee cards
     * @param {string} ordinal first or last
     * @param {integer} number 1 or -1 
     */
    const switchUser = (list, ordinal, number) => {
        const $employee = list.filter(function () {return $(this).css('display') === "block"}).first();
        const $reference = list.index($employee);
        if (list.eq($reference).children().eq(1).text() !== list[ordinal]().children().eq(1).text()) {
            $employee.css('display', "none");
            list.eq($reference + number).fadeIn(500).css('display', "block");
        }
    }
    /**
     * IIFE | Creates/appends search bar to DOM
     */
    (function createSearchBar () {
        const $searchContainer = $('.search-container');
        const $search = $('<form>').attr('action', "#").attr('method', "get");
        const $searchInput = $('<input>').attr('type', "search").attr('id', "search-input").attr('class', "search-input").attr('placeholder', "Search...");
        const $submitInput = $('<input>').attr('type', "submit").attr('value', "🔍").attr('id', "search-submit").attr('class', "search-submit");
        $searchContainer.append($search);
        appendMultiples($search, $searchInput, $submitInput);
    })();
    /**
     * Filters through employees on page
     */
    const employeeFilter = () => {
        const $input = $('#search-input').val();
        const $match = $('.card:contains(' + $input + ')');
        $('.card').css('display', "none");
        $match.css('display', "flex");
    }
    /**
     * Makes XMLHttpRequest, parses JSON/response and filters into generateHTML function 
     * @param {string} url Location of data
     * @param {function} callback 
     */
    const getJSON = function (url, callback) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
              const results = data.results;
              return callback(results);
            }
        });
    }
    /**
     * Creates/appends card for each employee to DOM
     * @param {Object} data Results object from parsed JSON
     * @param {function} callback 
     */
    const generateHTML = function (data, callback) {
        data.forEach(user => {
            createCard(user);
        });
        // console.log(data);
        return callback(data);
    }
    /**
     * Creates/appends modal for each employee card to DOM
     * @param {Object} data Results object from parsed JSON
     * @param {function} callback 
     */
    const generateModal = function (data, callback) {
        createModalContainer();
        data.forEach(user => {
            createModalContent(user);
        });
        createModalBtns();
        return callback(data);
    }

    getJSON("https://randomuser.me/api/?results=12&nat=us", (data) => {
        generateHTML(data, (data) => {
            generateModal(data, () => {
                $('.card').on('click', function () {
                    const $h3 = $(this).children().eq(1).children().eq(0).attr('id');
                    const $modals = $('.modal-info-container h3');
                    $modals.each(function () {
                        if ($h3 === $(this).attr('id')) {
                            $(this).parent().css('display', "block");
                            $('.modal-container').css('display', "block");
                            $('#modal-close-btn').on('click', function () {
                                $('.modal-container').css('display', "none");
                                const $active = $('.modal-info-container').filter(function () {return $(this).css('display') === "block"}).first();
                                $active.css('display', "none");
                            });
                        };
                    });
                });
                $('#search-input').on('input', function () {
                    employeeFilter();
                });
                $('#search-submit').on('click', function () {
                    employeeFilter();
                });
                $('body').on('click', function (e) {
                    if ($(e.target).attr('class') === $('.modal-container').attr('class')) {
                        $(e.target).css('display', "none");
                        const $active = $('.modal-info-container').filter(function () {return $(this).css('display') === "block"}).first();
                        $active.css('display', "none");
                    }
                });
                $(document).on('keydown', function (e) {
                    if ($('.modal-container').css('display') === "block") {
                        const $cards = $('.modal-info-container');
                        if (e.which === 39) {
                            switchUser($cards, "last", 1)
                        } else if (e.which === 37) {
                            switchUser($cards, "first", -1);
                        }
                    }
                });
                $('.modal-btn-container button').each(function () {
                    $(this).on('click', function (e) {
                        const $cards = $('.modal-info-container');
                        if ($(e.target).attr('id') === "modal-prev") {
                            switchUser($cards, "first", -1);
                        } else if ($(e.target).attr('id') === "modal-next") {
                            switchUser($cards, "last", 1);
                        }
                    });
                });
            });
        });
    });
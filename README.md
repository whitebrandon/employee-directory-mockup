# EMPLOYEE DIRECTORY USING RANDOM USER GENERATROR API

a COURSE BY TREEHOUSE

JS CODE by Brandon White | white.brandonsean@gmail.com

## Objective:
The objective of this project was to build an app that uses the [Random User Generator API](https://randomuser.me) to grab information on 12 random employees, and for that returned data to be used to build the prototype for an "Awesome Startup" employee directory.

## Summary of Results:
* For this project a Fetch request is made to the **Random User Generator API** to retrieve information on twelve randomized users presented as employees for a mockup. A refresh of the page requests an entirely new set of users, of which the request is programmed to only pass along users with a US nationality.
* HTML is then generated for each user, and each user is displayed on the page within his or her own "profile" card. Information presented on the card include: the user's image, name, email address, and general location.
* Upon clicking on a user's "profile" card, a modal window fades in providing a view at more detailed information on the user. Additional information present within the modal window (not present within the "profile" cards) include: the user's phone number, birthday, and a full street address.
    * Moreover, the modal can be closed by clicking the **X** button in the top right corner of the modal window, or by clicking anywhere outside of the modal window.
    * Functionality has also been added to allow navigation of the users while the modal window is open. The users may be navigated through via the "Prev" and "Next" buttons present within the modal window, or via the "left" and "right" arrows of a physical keyboard. 

## Explanation of Techniques Used:
1. Both `jQuery` and `Promises` are used heavily in this project. 
    1. For each project I try to issue a challenge for myself that extends beyond the "Exceeds Expectations" present within each project's rubric. For this project, I challenged myself to first complete the assignment by nesting functions within function (or using a continuation-passing style of coding). The result of this has been stored in the `js` folder for this project as `callback_hell.js`.
    2. After successfully tackling the assignment with a "pyramind of doom" approach, I converted/refactored `callback_hell.js` to `scripts.js` using `Promises` and `fetch`. My original goal was to also use `Async/Await` when refactoring, but given the project only makes one request, `Async/Await` did not seem to make my code more efficient.
2. I have attempted to name and organize my functions in such a way that the names—alone—allow my code to be more understandable.
3. I have added a `state_abbreviations.js` inside of the `js` folder. This file contains an object which binds all of the two-letter state codes to their full-name versions. The location returned from the parsed JSON request objects is used as a reference to get the correct two-letter state code from the `stateAbbr` object.
4. For the styling of the page, I wanted to do something simple with bold colors.
    1. The background color of the page has been changed to orange.
    2. The background color of the "profile" cards have been changed to either green or purple.
    3. Box shadows (both inset and set out) have been added to the "profile" cards as well as other elements on the page.
    4. The font-family for the page has been changed to [Chilanka]('https://fonts.googleapis.com/css?family=Chilanka&display=swap').
    5. I am a huge fan of border radiuses, so they've been used to give a rounded look to most elements on the paage.
    6. The modal windows feature a black background with either a green or purple border, and the container for the modal buttons has a background with a layered radial-gradient. 

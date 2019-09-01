/* $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  }); */
'use strict';
    // ↓ Creates search bar
    const searchContainer = document.querySelector('.search-container');
    const search = document.createElement('form');
    const searchInput = document.createElement('input');
    const submitInput = document.createElement('input');
    searchContainer.appendChild(search);
    search.setAttribute('action', "#");
    search.setAttribute('method', "get");
    search.appendChild(searchInput);
        searchInput.setAttribute('type', "search");
        searchInput.setAttribute('id', "search-input");
        searchInput.setAttribute('class', "search-input");
        searchInput.setAttribute('placeholder', "Search...");
    search.appendChild(submitInput);
        submitInput.setAttribute('type', "submit");
        submitInput.setAttribute('value', "🔍");
        submitInput.setAttribute('id', "search-submit");
        submitInput.setAttribute('class', "search-submit");

    const getJSON = function (url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            const data = JSON.parse(xhr.responseText);
            const results = data.results;
            return callback(results);
        };
        xhr.send();
    }

    const generateHTML = function (data, callback) {
        data.forEach(user => {
            const card = document.createElement('div');
            card.className = "card";
            document.getElementById('gallery').appendChild(card);
            const imgContain = document.createElement('div');
            imgContain.className = "card-img-container";
            const infoContain = document.createElement('div');
            infoContain.className = "card-info-container";
            card.appendChild(imgContain);
            card.appendChild(infoContain);
            const cardImg = document.createElement('img');
            imgContain.appendChild(cardImg);
            cardImg.className = "card-img";
            cardImg.setAttribute('src', user.picture.large);
            cardImg.setAttribute('alt', "profile picture");
            const h3Info = document.createElement('h3');
            const emailPar = document.createElement('p');
            const locationPar = document.createElement('p');
            infoContain.appendChild(h3Info);
            infoContain.appendChild(emailPar);
            infoContain.appendChild(locationPar);
            h3Info.setAttribute('id', `${user.name.first}-${user.name.last}`);
            h3Info.className = "card-name cap";
            h3Info.textContent = `${user.name.first} ${user.name.last}`;
            emailPar.className = "card-text";
            emailPar.textContent = user.email;
            locationPar.className = "card-text cap";
            locationPar.textContent = `${user.location.city}, ${user.location.state}`;
        });
        /*console.log(data);*/
        return callback(data);
    }

    const generateModal = function (data, callback) {
        const div = document.createElement('div');
        div.className = "modal-container";
        const modal = document.createElement('div');
        modal.className = "modal";
        div.appendChild(modal);
        const button = document.createElement('button');
        modal.appendChild(button);
        button.setAttribute('type', "button");
        button.setAttribute('id', "modal-close-btn");
        button.className = "modal-close-btn";
        const strong = document.createElement('strong');
        button.appendChild(strong);
        strong.textContent = "X";
        document.querySelector('body').insertBefore(div, document.querySelector('script'));
        div.style.display = "none";
        data.forEach(user => {
            const modalContainer = document.createElement('div');
            modalContainer.className = "modal-info-container";
            const modalImg = document.createElement('img');
            modalContainer.appendChild(modalImg);
            modalImg.className = "modal-img";
            modalImg.setAttribute('src', user.picture.large);
            modalImg.setAttribute('alt', "profile picture");
            const modalh3 = document.createElement('h3');
            modalContainer.appendChild(modalh3);
            modalh3.setAttribute('id', `${user.name.first}-${user.name.last}`);
            modalh3.className = "modal-name cap";
            modalh3.textContent = `${user.name.first} ${user.name.last}`;
            const modalEmailPar = document.createElement('p');
            modalContainer.appendChild(modalEmailPar);
            modalEmailPar.className = "modal-text";
            modalEmailPar.textContent = user.email;
            const modalCityPar = document.createElement('p');
            modalContainer.appendChild(modalCityPar);
            modalCityPar.className = "modal-text cap";
            modalCityPar.textContent = user.location.city;
            const modalHr = document.createElement('hr');
            modalContainer.appendChild(modalHr);
            const modalPhonePar = document.createElement('p');
            modalContainer.appendChild(modalPhonePar);
            modalPhonePar.className = "modal-text";
            modalPhonePar.textContent = user.phone;
            const modalLocationPar = document.createElement('p');
            modalContainer.appendChild(modalLocationPar);
            modalLocationPar.className = "modal-text";
            modalLocationPar.textContent = `${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
            const modalDOBPar = document.createElement('p');
            modalContainer.appendChild(modalDOBPar);
            modalDOBPar.className = "modal-text";
            modalDOBPar.textContent = `Birthday: ${user.dob.date}`;
            document.querySelector('.modal').appendChild(modalContainer);
            modalContainer.style.display = "none";
        });
        const modalBtn = document.createElement('div');
        modalBtn.className = "modal-btn-container";
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        modalBtn.appendChild(prevButton);
        modalBtn.appendChild(nextButton);
        prevButton.setAttribute('type', "button");
        prevButton.setAttribute('id', "modal-prev");
        prevButton.className = "modal-prev btn";
        prevButton.textContent = "Prev";
        nextButton.setAttribute('type', "button");
        nextButton.setAttribute('id', "modal-next")
        nextButton.className = "modal-next btn";
        nextButton.textContent = "Next";
        div.appendChild(modalBtn);
        return callback(data);
    }

    getJSON("https://randomuser.me/api/?results=12", (data) => {
        generateHTML(data, (data) => {
            generateModal(data, () => {
                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', function () {
                        const h3 = card.children[1].children[0];
                        const id = h3.getAttribute("id");
                        const modals = Array.from(document.querySelectorAll('.modal-info-container h3'));
                        for (let i = 0; i < modals.length; i++) {
                            if (id === modals[i].getAttribute("id")) {
                                modals[i].parentNode.style.display = "block";
                                document.querySelector('.modal-container').style.display = "block";
                                document.getElementById('modal-close-btn').addEventListener('click', function () {
                                    document.querySelector('.modal-container').style.display = "none";
                                    Array.from(document.querySelectorAll('.modal-info-container')).find(employee => employee.style.display === "block").style.display = "none";
                                });
                                /* document.querySelector('body').addEventListener('click', function (e) {
                                    if (e.target === document.querySelector('.modal-container')) {
                                        e.target.style.display = "none";
                                        const activeModal = Array.from(document.querySelectorAll('.modal-info-container')).find(employee => employee.style.display === "block");
                                        activeModal.style.display = "none";
                                    }
                                }); */
                                document.querySelectorAll('.modal-btn-container button').forEach(button => button.addEventListener('click', function (e) {
                                    const cards = Array.from(document.querySelectorAll('.modal-info-container')) ;
                                    if (e.target.getAttribute('id') === "modal-prev") {
                                        const employee = cards.find(employee => employee.style.display === "block");
                                        const reference = cards.indexOf(employee);
                                        if (cards[reference] !== cards[0]) {
                                            employee.style.display = "none";
                                            cards[reference - 1].style.display = "block";
                                        }
                                    } else if (e.target.getAttribute('id') === "modal-next") {
                                        const employee = cards.find(employee => employee.style.display === "block");
                                        const reference = cards.indexOf(employee);
                                        if (cards[reference] !== cards[cards.length - 1]) {
                                            employee.style.display = "none";
                                            cards[reference + 1].style.display = "block";
                                        }
                                    }
                                }, false));
                            }
                        }
                    });
                })
            })             
        })        
    });
/* $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  }); */
'use strict';

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
            card.innerHTML = `
                        <div class="card-img-container">
                            <img class="card-img" src=${user.picture.large} alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id=${user.name.first}-${user.name.last} class="card-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="card-text">${user.email}</p>
                            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                        </div> `;
        });
        /*console.log(data);*/
        return callback(data);
    }

    const generateModal = function (data, callback) {
        const div = document.createElement('div');
        div.className = "modal-container";
        div.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        document.querySelector('body').insertBefore(div, document.querySelector('script'));
        div.style.display = "none";
        data.forEach(user => {
            const modalContainer = document.createElement('div');
            modalContainer.className = "modal-info-container";
            modalContainer.innerHTML = `
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id=${user.name.first}-${user.name.last} class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${user.dob.date}</p>`;
            document.querySelector('.modal').appendChild(modalContainer);
            modalContainer.style.display = "none";
        });
        return callback(data);
    }

    getJSON("https://randomuser.me/api/?results=12", (data) => { // Function 1
        generateHTML(data, (data) => { // Function 2
            generateModal(data, () => { // Function 3
                document.querySelectorAll('.card').forEach(card => {
                    /*console.log(card);*/ // Add Listener is Function 4
                    card.addEventListener('click', function () { // Anonymous is Function 5
                        const h3 = card.children[1].children[0];
                        /*console.log(h3);*/
                        const id = h3.getAttribute("id");
                        /*console.log(id);*/
                        const modals = Array.from(document.querySelectorAll('.modal-info-container h3'));
                        /*console.log(modals);*/
                        for (let i = 0; i < modals.length; i++) {
                            if (id === modals[i].getAttribute("id")) {
                                modals[i].parentNode.style.display = "block";
                                document.querySelector('.modal-container').style.display = "block";
                                document.getElementById('modal-close-btn').addEventListener('click', function () {
                                    document.querySelector('.modal-container').style.display = "none";
                                    modals[i].parentNode.style.display = "none";
    /*                                document.querySelector('.modal-container').addEventListener('click', function (e) {
                                        e.target.style.display = "none";
                                        modals[i].parentNode.style.display = "none";
                                    });*/
                                });
                            }
                        }
                    });
                })
            })             
        })        
    });
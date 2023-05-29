const newPartyForm = document.querySelector("#new-party-form");
const partyListContainer = document.querySelector("#party-list-container");
const partyContainer = document.querySelector("#party-container");

const PARTIES_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/parties";
const GUESTS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/guests";
const RSVPS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
const GIFTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

// get all parties
const getAllParties = async () => {
  try {
    const response = await fetch(PARTIES_API_URL);
    console.log(response);
    const parties = await response.json();
    return parties;
  } catch (error) {
    console.error(error);
  }
};

// get single party by id
const getPartyById = async (id) => {
  try {
    const response = await fetch(`${PARTIES_API_URL}/${id}`);
    const party = await response.json();
    return party;
  } catch (error) {
    console.error(error);
  }
};

// delete party
const deleteParty = async (id) => {
  // your code here
};

// render a single party by id
const renderSinglePartyById = async (id) => {
  try {
    // fetch party details from server
    const party = await getPartyById(id);

    console.log(party);
    // GET - /api/workshop/guests/party/:partyId - get guests by party id
    const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
    const guests = await guestsResponse.json();

    // GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
    const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
    const rsvps = await rsvpsResponse.json();

    // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
    // const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
    // const gifts = await giftsResponse.json();

    // create new HTML element to display party details
    const partyDetailsElement = document.createElement("div");
    partyDetailsElement.classList.add("party-details");
    partyDetailsElement.innerHTML = `
            <h2> <strong> Party Name: </strong> ${party.name}</h2>
            <p> <strong> Location: </strong>${party.location}</p>
            <p> <strong> Description: </strong> ${party.description}</p>
            <p> <strong> Date: </strong> ${party.date}</p>
            <p> <strong> Time: </strong> ${party.time}</p>
            <h3> <em> Guests: </em></h3>
            <ul>
            ${guests
              .map(
                (guest, index) => `
              <li>
                <div>${guest.name}</div>
                <div>${rsvps[index].status}</div>
              </li>
            `
              )
              .join("")}
          </ul>
          


            <button class="close-button">Close</button>
        `;
    partyContainer.style.display = "block";
    // hide party list container
    partyListContainer.style.display = "none";

    partyContainer.appendChild(partyDetailsElement);

    // add event listener to close button
    const closeButton = partyDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      partyDetailsElement.remove();
      init();
      partyListContainer.style.display = "block";
    });
  } catch (error) {
    console.error(error);
  }
};

// render all parties
const renderParties = async (parties) => {
  try {
    partyListContainer.innerHTML = "";
    parties.forEach((party) => {
      const partyElement = document.createElement("div");
      partyElement.classList.add("party");
      partyElement.innerHTML = `
      <h2> <strong> Party Name: </strong> ${party.name}</h2>
      <p> <strong> Location: </strong>${party.location}</p>
      <p> <strong> Description: </strong> ${party.description}</p>
      <p> <strong> Date: </strong> ${party.date}</p>
      <p> <strong> Time: </strong> ${party.time}</p>
                <button class="details-button" data-id="${party.id}">See Details</button>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
      partyListContainer.appendChild(partyElement);

      // see details
      const detailsButton = partyElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        // console.log(event.target.dataset.id);
        const partyId = event.target.dataset.id;
        // your code here
        renderSinglePartyById(partyId);
      });

      // delete party
      const deleteButton = partyElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        // your code here
      });
    });
  } catch (error) {
    console.error(error);
  }
};

// init function
const init = async () => {
  // your code here
  const parties = await getAllParties();
  console.log(parties);
  renderParties(parties);
};

init();

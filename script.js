const newPartyForm = document.querySelector("#new-party-form");
const partyListContainer = document.querySelector("#party-list-container");
const partyContainer = document.querySelector("#party-container");

const PARTIES_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/parties";
const GUESTS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/guests";
const RSVPS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
const GIFTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

// Render All Parties
// Fetches data and renders all of the parties in the browser.Can see all parties posted to the database.

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
  try {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(`${PARTIES_API_URL}/${id}`, requestOptions);
    const party = await response.json();
    return party;
  } catch (error) {
    console.error(error);
  }
};

// function to generate random pastel colors
const getRandomColor = () => {
  const min = 150;
  const max = 256;
  const red = Math.floor(Math.random() * (max - min) + min);
  const green = Math.floor(Math.random() * (max - min) + min);
  const blue = Math.floor(Math.random() * (max - min) + min);
  return `rgb(${red}, ${green}, ${blue})`;
};

// render a single party by id
const renderSinglePartyById = async (id, backgroundColor) => {
  try {
    // fetch party details from server
    const party = await getPartyById(id);

    const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
    const guests = await guestsResponse.json();

    const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
    const rsvps = await rsvpsResponse.json();

    const partyDetailsElement = document.createElement("div");
    partyDetailsElement.classList.add("party");
    partyDetailsElement.style.backgroundColor = backgroundColor;
    partyDetailsElement.innerHTML = `
      <h2><strong>Party Name:</strong> ${party.name}</h2>
      <p><strong>Party ID:</strong> ${party.id}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p><strong>Date:</strong> ${party.date}</p>
      <p><strong>Time:</strong> ${party.time}</p>
      <p><strong>Description:</strong> ${party.description}</p>

      <h3><em>Guests:</em></h3>
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

    partyListContainer.style.display = "none";

    partyContainer.appendChild(partyDetailsElement);

    const closeButton = partyDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      partyDetailsElement.remove();
      partyListContainer.style.display = "flex";
    });
  } catch (error) {
    console.error(error);
  }
};

const renderParties = async (parties) => {
  try {
    partyListContainer.innerHTML = "";
    parties.forEach((party) => {
      const partyElement = document.createElement("div");
      partyElement.classList.add("party");
      const backgroundColor = getRandomColor();
      partyElement.style.backgroundColor = backgroundColor;
      partyElement.innerHTML = `
        <h2><strong>Party Name:</strong> ${party.name}</h2>
        <p><strong>Location:</strong> ${party.location}</p>
        <p><strong>Date:</strong> ${party.date}</p>
        <p><strong>Time:</strong> ${party.time}</p>
        <p><strong>Description:</strong> ${party.description}</p>
     
        <button class="details-button" data-id="${party.id}">See Details</button>
        <button class="delete-button" data-id="${party.id}">Delete</button>
      `;
      partyListContainer.appendChild(partyElement);

      const detailsButton = partyElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        const partyId = event.target.dataset.id;
        const partyElement = event.target.closest(".party");
        const backgroundColor = getComputedStyle(partyElement).backgroundColor;
        renderSinglePartyById(partyId, backgroundColor);
      });

      const deleteButton = partyElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        const partyId = event.target.dataset.id;
        deleteParty(partyId);

        event.target.closest("div.party").remove();
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  const parties = await getAllParties();
  renderParties(parties);
};

init();

// const newPartyForm = document.querySelector("#new-party-form");
// const partyListContainer = document.querySelector("#party-list-container");
// const partyContainer = document.querySelector("#party-container");

// const PARTIES_API_URL =
//   "http://fsa-async-await.herokuapp.com/api/workshop/parties";
// const GUESTS_API_URL =
//   "http://fsa-async-await.herokuapp.com/api/workshop/guests";
// const RSVPS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
// const GIFTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

// // get all parties
// const getAllParties = async () => {
//   try {
//     const response = await fetch(PARTIES_API_URL);
//     console.log(response);
//     const parties = await response.json();
//     return parties;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // get single party by id
// const getPartyById = async (id) => {
//   try {
//     const response = await fetch(`${PARTIES_API_URL}/${id}`);
//     const party = await response.json();
//     return party;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // delete party
// const deleteParty = async (id) => {
//   // your code here
//   try {
//     const requestOptions = {
//       method: "DELETE",
//     };
//     const response = await fetch(`${PARTIES_API_URL}/${id}`, requestOptions);
//     const party = await response.json();
//     return party;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Helper function to format the date as "Month/Day/Year"
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const month = date.getMonth() + 1; // months are zero-based indexed, so add 1
//   const day = date.getDate();
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };

// // render a single party by id
// const renderSinglePartyById = async (id) => {
//   try {
//     // fetch party details from server
//     const party = await getPartyById(id);

//     console.log(party);
//     // GET - /api/workshop/guests/party/:partyId - get guests by party id
//     const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
//     const guests = await guestsResponse.json();

//     // GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
//     const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
//     const rsvps = await rsvpsResponse.json();

//     // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
//     // const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
//     // const gifts = await giftsResponse.json();

//     // create new HTML element to display party details
//     const partyDetailsElement = document.createElement("div");
//     partyDetailsElement.classList.add("party");
//     partyDetailsElement.innerHTML = `
//             <h2> <strong> Party Name: </strong> ${party.name}</h2>
//             <p> <strong> Party ID: </strong>${party.id}</p>
//             <p> <strong> Location: </strong>${party.location}</p>
//             <p> <strong> Date: </strong> ${party.date}</p>
//             <p> <strong> Time: </strong> ${party.time}</p>
//             <p> <strong> Description: </strong> ${party.description}</p>
            
//             <h3> <em> Guests: </em></h3>
//             <ul>
//             ${guests
//               .map(
//                 (guest, index) => `
//               <li>
//                 <div>${guest.name}</div>
//                 <div>${rsvps[index].status}</div>
//               </li>
//             `
//               )
//               .join("")}
//           </ul>
          


//             <button class="close-button">Close</button>
//         `;
//     // hide party list container
//     partyListContainer.style.display = "none";

//     partyContainer.appendChild(partyDetailsElement);

//     // add event listener to close button
//     const closeButton = partyDetailsElement.querySelector(".close-button");
//     closeButton.addEventListener("click", () => {
//       partyDetailsElement.remove();
//       partyListContainer.style.display = "flex";
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getRandomColor = () => {
//   const min = 150; // Minimum RGB value for pastel colors
//   const max = 256; // Maximum RGB value for pastel colors
//   const red = Math.floor(Math.random() * (max - min) + min);
//   const green = Math.floor(Math.random() * (max - min) + min);
//   const blue = Math.floor(Math.random() * (max - min) + min);
//   return `rgb(${red}, ${green}, ${blue})`;
// };
// // render all parties
// const renderParties = async (parties) => {
//   try {
//     partyListContainer.innerHTML = "";
//     parties.forEach((party) => {
//       const partyElement = document.createElement("div");
//       partyElement.classList.add("party");
//       partyElement.style.backgroundColor = getRandomColor();
//       partyElement.innerHTML = `
//       <h2> <strong> Party Name: </strong> ${party.name}</h2>
//       <p> <strong> Location: </strong>${party.location}</p>
//       <p> <strong> Date: </strong> ${party.date}</p>
//       <p> <strong> Time: </strong> ${party.time}</p>
//       <p> <strong> Description: </strong> ${party.description}</p>
     
//                 <button class="details-button" data-id="${party.id}">See Details</button>
//                 <button class="delete-button" data-id="${party.id}">Delete</button>
//             `;
//       partyListContainer.appendChild(partyElement);

//       // see details
//       const detailsButton = partyElement.querySelector(".details-button");
//       detailsButton.addEventListener("click", async (event) => {
//         // console.log(event.target.dataset.id);
//         const partyId = event.target.dataset.id;
//         // your code here
//         renderSinglePartyById(partyId);
//       });

//       // delete party
//       const deleteButton = partyElement.querySelector(".delete-button");
//       deleteButton.addEventListener("click", async (event) => {
//         // your code here
//         const partyId = event.target.dataset.id;
//         deleteParty(partyId);

//         event.target.closest("div.party").remove();
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// // init function
// const init = async () => {
//   // your code here
//   const parties = await getAllParties();
//   console.log(parties);
//   renderParties(parties);
// };

// init();

const newPartyForm = document.querySelector("#new-party-form");
const partyListContainer = document.querySelector("#party-list-container");
const partyContainer = document.querySelector("#party-container");

const PARTIES_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/parties";
const GUESTS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/guests";
const RSVPS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
const GIFTS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

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

// Helper function to format the date as "Month/Day/Year"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // months are zero-based indexed, so add 1
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Helper function to generate random pastel colors
const getRandomColor = () => {
  const min = 150; // Minimum RGB value for pastel colors
  const max = 256; // Maximum RGB value for pastel colors
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
          .
          map(
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

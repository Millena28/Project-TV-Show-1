// bring in all the components of the applications

import {render} from "./render.mjs";
import {state} from "./state.mjs";
import {sortAlphabetically} from "./helpers.mjs";
import {createCard} from "./card.mjs";
import {handleSearch} from "./search.mjs";
import {
  createOption,
  handleShowSelect,
  handleEpisodeSelect,
} from "./select.mjs";
import {fetchFromTVMaze} from "./api.mjs";

// these are called getters, look them up
const getCardContainer = () => document.getElementById("card-container");
const getSelect = () => document.getElementById("episode-select");

// this is the main function that runs when the page loads
// sets up the state, fetches data from the TVMaze API, and renders the UI
const init = async () => {
  try {
    const shows = await fetchFromTVMaze("shows");
    // populate state
    state.allShows = sortAlphabetically(shows);
    state.currentShow = shows;

    // grab nodes from html
    const search = document.getElementById("episode-search");
    const episodeSelect = getSelect();
    const showSelect = document.getElementById("show-select");

    // listen for user events
    search.addEventListener("input", handleSearch);
    episodeSelect.addEventListener("change", handleEpisodeSelect);
    showSelect.addEventListener("change", handleShowSelect);

    // render UI
    render(state.allShows, getCardContainer(), "card-template", createCard);
    render(state.allShows, showSelect, "option-template", createOption);
  } catch (error) {
    getCardContainer().textContent = `Something went wrong, sorry! ${error.message}`;
  }
};

window.onload = init;

export {getCardContainer, getSelect};

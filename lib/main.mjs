import {createCard} from "./card.mjs";
import {handleSearch} from "./search.mjs";
import {
  createEpisodeOption,
  createShowOption,
  handleShowSelect,
  handleEpisodeSelect,
} from "./select.mjs";
import {fetchFromTVMaze} from "./api.mjs";
// State and Render

const state = {
  allEpisodes: [],
  currentEpisodes: [],
  allShows: [],
  currentShow: [],

  updateState(stateKey, newValues) {
    this[stateKey] = newValues;
  },
};

const getCardContainer = () => document.getElementById("card-container");

// a generalised render function
// based on https://programming.codeyourfuture.io/data-flows/sprints/2/prep/#refactoring-to-state%2brender

const render = (stateKey, container, template, creator) => {
  container.textContent = ""; // remember we clear up first
  const fragment = stateKey.map((episode) => creator(template, episode));
  container.append(...fragment);
};

const init = async () => {
  try {
    const shows = await fetchFromTVMaze("shows");
    // populate state
    state.allShows = shows;
    state.currentShow = shows;

    console.log(state);

    // grab nodes from html
    const search = document.getElementById("episode-search");
    const episodeSelect = document.getElementById("episode-select");
    const showSelect = document.getElementById("show-select");

    // listen for user events
    search.addEventListener("input", handleSearch);
    episodeSelect.addEventListener("change", handleEpisodeSelect);
    showSelect.addEventListener("change", handleShowSelect);

    // render UI
    render(state.allShows, getCardContainer(), "card-template", createCard);
    render(state.allShows, showSelect, "option-template", createShowOption);
  } catch (error) {
    getCardContainer().textContent = `Something went wrong, sorry! ${e.message}</div>`;
  }
};

window.onload = init;

export {state, render, getCardContainer};

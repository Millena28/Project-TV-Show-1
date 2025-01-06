import {createCard} from "./card.mjs";
import {handleSearch} from "./search.mjs";
import {createOption, handleSelect} from "./select.mjs";

// State and Render

const state = {allEpisodes: [], currentEpisodes: []};

function updateEpisodeState(newEpisodes) {
  state.currentEpisodes = newEpisodes;
}

const getCardContainer = () => document.getElementById("card-container");
const getCountContainer = () => document.getElementById("count-container");

// a generalised render function
// based on https://programming.codeyourfuture.io/data-flows/sprints/2/prep/#refactoring-to-state%2brender

const render = (data, container, template, creator) => {
  container.textContent = ""; // remember we clear up first
  const fragment = data.map((item) => creator(template, item));
  container.append(...fragment);
};

const init = () => {
  // set out the initial html nodes
  const episodes = getAllEpisodes();
  const search = document.getElementById("episode-search");
  const select = document.getElementById("episode-select");

  // events
  search.addEventListener("keyup", handleSearch);
  select.addEventListener("change", handleSelect);

  // here's our state
  state.allEpisodes = episodes;
  state.currentEpisodes = episodes;

  // render the UI
  render(state.currentEpisodes, getCardContainer(), "episode-card", createCard);
  render(state.currentEpisodes, select, "option-template", createOption);
};

window.onload = init;

export {state, render, updateEpisodeState, getCardContainer, getCountContainer};

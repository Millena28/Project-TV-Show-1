import {createCard} from "./card.mjs";
import {handleSearch} from "./search.mjs";
import {createOption, handleSelect} from "./select.mjs";

// State and Render

const state = {episodes: []};

function updateEpisodeState(newEpisodes) {
  state.episodes = newEpisodes;
}

const getCardContainer = () => document.getElementById("card-container");

// a generalised render function
// based on https://programming.codeyourfuture.io/data-flows/sprints/2/prep/#refactoring-to-state%2brender

const render = (container, template, creator) => {
  container.textContent = ""; // remember we clear up first
  const fragment = state.episodes.map((episode) => creator(template, episode));
  container.append(...fragment);
};

const init = () => {
  // set out the initial html nodes
  const episodes = getAllEpisodes();
  const search = document.getElementById("episode-search");
  const select = document.getElementById("episode-select");

  // events
  search.addEventListener("input", handleSearch);
  select.addEventListener("change", handleSelect);

  // here's our state
  state.episodes = episodes;

  // render the UI
  render(getCardContainer(), "episode-card", createCard);
  render(select, "option-template", createOption);
};

window.onload = init;

export {state, render, updateEpisodeState, getCardContainer};

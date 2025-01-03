import {createCard} from "./card.mjs";
import {handleSearch} from "./search.mjs";
import {createOption, handleSelect} from "./select.mjs";
import {fetchEpisodes} from "./api.mjs";
// State and Render

const state = {
  allEpisodes: [],
  currentEpisodes: [],
};

function updateEpisodeState(newEpisodes) {
  state.currentEpisodes = newEpisodes;
}

const getCardContainer = () => document.getElementById("card-container");

// a generalised render function
// based on https://programming.codeyourfuture.io/data-flows/sprints/2/prep/#refactoring-to-state%2brender

const render = (container, template, creator) => {
  container.textContent = ""; // remember we clear up first
  const fragment = state.currentEpisodes.map((episode) =>
    creator(template, episode)
  );
  container.append(...fragment);
};

const init = async () => {
  try {
    const episodes = await fetchEpisodes();
    // populate state
    state.allEpisodes = episodes;
    state.currentEpisodes = episodes;
    // grab nodes from html
    const search = document.getElementById("episode-search");
    const select = document.getElementById("episode-select");
    // listen for user events
    search.addEventListener("input", handleSearch);
    select.addEventListener("change", handleSelect);
    // render UI
    render(getCardContainer(), "episode-card", createCard);
    render(select, "option-template", createOption);
  } catch (error) {
    getCardContainer().innerHTML = `Something went wrong, sorry! ${e.message}</div>`;
  }
};

window.onload = init;

export {state, render, updateEpisodeState, getCardContainer};

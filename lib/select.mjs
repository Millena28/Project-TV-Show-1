import {state} from "./state.mjs";
import {render} from "./render.mjs";
import {getCardContainer, getSelect} from "./app.mjs";
import {pad, makeEpisodeTitle, sortAlphabetically} from "./helpers.mjs";
import {createCard} from "./card.mjs";
import {fetchFromTVMaze} from "./api.mjs";

function createOption(template, {name, season, number}) {
  const option = document.getElementById(template).content.cloneNode(true);
  option.querySelector("option").textContent = makeEpisodeTitle(
    name,
    season,
    number
  );
  return option;
}

function handleEpisodeSelect(event) {
  //filter the list
  const filteredEpisodes = state.currentEpisodes.filter((episode) =>
    event.target.value.includes(episode.name)
  );
  // update the state
  state.updateState("currentEpisodes", filteredEpisodes);
  // render the UI
  render(
    state.currentEpisodes,
    getCardContainer(),
    "card-template",
    createCard
  );
}

async function handleShowSelect(event) {
  // filter the list
  const show = state.allShows.find((show) => event.target.value === show.name);

  // fetch episodes if not already fetched
  if (!show.episodes) {
    show.episodes = await fetchFromTVMaze(`shows/${show.id}/episodes`);
    state.updateState("show.episodes", show.episodes);
  }
  // update the state
  state.updateState("currentShow", show);
  state.updateState("currentEpisodes", show.episodes);

  // render the UI
  render(state.currentEpisodes, getSelect(), "option-template", createOption);
  render(
    state.currentEpisodes,
    getCardContainer(),
    "card-template",
    createCard
  );
}

export {createOption, handleEpisodeSelect, handleShowSelect};

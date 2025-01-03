import {state, render, getCardContainer} from "./main.mjs";
import {pad, makeEpisodeTitle} from "./helpers.mjs";
import {createCard} from "./card.mjs";

function createEpisodeOption(template, {name, season, number}) {
  const option = document.getElementById(template).content.cloneNode(true);
  const title = `${makeEpisodeTitle(name, season, number)}`;
  option.querySelector("option").textContent = title;
  return option;
}

function createShowOption(template, {name}) {
  const option = document.getElementById(template).content.cloneNode(true);
  option.querySelector("option").textContent = name;
  return option;
}

function handleEpisodeSelect(event) {
  const filteredEpisodes = state.allEpisodes.filter((episode) =>
    event.target.value.includes(episode.name)
  );
  state.updateState("currentEpisodes", filteredEpisodes);
  render(
    state.currentEpisodes,
    getCardContainer(),
    "card-template",
    createCard
  );
}

function handleShowSelect(event) {
  const filteredShows = state.allShows.filter(
    (show) => event.target.value === show.name
  );
  state.updateState("currentShow", filteredShows);
  render(state.currentShow, getCardContainer(), "card-template", createCard);
}

// could these two be generalised?
export {
  createEpisodeOption,
  createShowOption,
  handleEpisodeSelect,
  handleShowSelect,
};

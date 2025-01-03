import {state, render, updateEpisodeState, getCardContainer} from "./main.mjs";
import {pad, makeEpisodeTitle} from "./helpers.mjs";
import {createCard} from "./card.mjs";

function createOption(template, {name, season, number}) {
  const option = document.getElementById(template).content.cloneNode(true);
  const title = `${makeEpisodeTitle(name, season, number)}`;
  option.querySelector("option").textContent = title;
  return option;
}

function handleSelect(event) {
  const filteredEpisodes = state.allEpisodes.filter((episode) =>
    event.target.value.includes(episode.name)
  );
  updateEpisodeState(filteredEpisodes);
  render(getCardContainer(), "episode-card", createCard);
}

export {createOption, handleSelect};

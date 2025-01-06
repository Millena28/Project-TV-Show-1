import {
  state,
  render,
  updateEpisodeState,
  getCardContainer,
  getCountContainer,
} from "./main.mjs";
import {createCard} from "./card.mjs";

function createCount(template, episode) {
  const count = document.getElementById(template).content.cloneNode(true);
  count.textContent = `Displaying ${state.currentEpisodes.length} episodes`;
  return count;
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredEpisodes = state.allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  updateEpisodeState(filteredEpisodes);
  render(state.currentEpisodes, getCardContainer(), "episode-card", createCard);
  render([1], getCountContainer(), "results-template", createCount);
}

export {handleSearch};

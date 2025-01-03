import {state, render, updateEpisodeState, getCardContainer} from "./main.mjs";
import {createCard} from "./card.mjs";

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredEpisodes = state.episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  updateEpisodeState(filteredEpisodes);
  render(getCardContainer(), "episode-card", createCard);
}

export {handleSearch};

import {state, render, getCardContainer} from "./main.mjs";
import {createCard} from "./card.mjs";

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredEpisodes = state.allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  state.updateState("currentEpisodes", filteredEpisodes);
  render(
    state.currentEpisodes,
    getCardContainer(),
    "card-template",
    createCard
  );
}

export {handleSearch};

import {state} from "./state.mjs";
import {render} from "./render.mjs";
import {getCardContainer} from "./app.mjs";
import {createCard} from "./card.mjs";

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const current = state.currentEpisodes.length
    ? state.currentEpisodes
    : state.allShows;

  const filtered = current.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  render(filtered, getCardContainer(), "card-template", createCard);
}

export {handleSearch};

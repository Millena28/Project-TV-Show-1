//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  const root = document.getElementById("root");
  /* JSDoc
   * @param {object[]} allEpisodes - The episodes
   * @param {Element} root - The root element
   */
  const episodeCards = allEpisodes.map((episode) =>
    episodeCard("episode-template", episode)
  );
  /* JSDoc
   * @param {Element[]} episodeCards - The episode cards
   */
  episodeCards.forEach((card) => {
    root.appendChild(card);
  });
}
/* JSDoc
 * @param {string} template - The template to clone
 * @param {object} episode - The episode object
 * @returns {Element} - The card element
 */
const episodeCard = (
  template,
  {id, image: {medium}, name, summary, season, number}
) => {
  const card = document.getElementById(template).content.cloneNode(true);
  card.querySelector('[data-episode="title"]').textContent = name;
  card.querySelector('[data-episode="code"]').textContent = makeEpisodeCode(
    season,
    number
  );
  card.querySelector('[data-episode="summary"]').textContent =
    parseFromAPI(summary).body.textContent;
  card.querySelector('[data-episode="image"]').src = medium;

  return card;
};

/* JSDoc
 * @param {number} number - The number to pad
 * @returns {string} - The padded number
 */
const pad = (number) => number.toString().padStart(2, "0");

/* JSDoc
 * @param {number} season - The season number
 * @param {number} episode - The episode number
 * @returns {string} - The episode code
 */
const makeEpisodeCode = (season, episode) => `S${pad(season)}E${pad(episode)}`;
/* JSDoc
 * @param {string} html - The HTML to parse
 * @returns {Document} - The parsed HTML
 */
const parseFromAPI = (html) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
};

window.onload = setup;

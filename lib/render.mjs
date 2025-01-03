const render = (stateKey, container, template, creator) => {
  container.textContent = ""; // remember we clear up first
  const fragment = stateKey.map((episode) => creator(template, episode));
  container.append(...fragment);
};

export {render};

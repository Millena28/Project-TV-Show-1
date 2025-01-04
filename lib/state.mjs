const state = {
  allShows: [],
  currentShow: {},
  currentEpisodes: [],

  updateState(stateKey, newValues) {
    this[stateKey] = newValues;
  },
};

export {state};

const state = {
  shows: [],
  current: {
    show: null,
    episodes: [],
  },

  updateState(stateKey, newValues) {
    this[stateKey] = newValues;
  },
};

export {state};

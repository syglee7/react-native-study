const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    longitudeDelta: 0.0421,
    latitudeDelta: 0.0922,
  },
} as const;

export {numbers};

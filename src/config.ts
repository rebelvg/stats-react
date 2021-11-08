const { STATS_HOST } = process.env;

console.log(STATS_HOST);

export const config = {
  STATS_HOST: STATS_HOST || null,
};

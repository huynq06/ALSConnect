import R from 'ramda';


export const inPeriod = (period, date) => {
    const dt = new Date(date).getTime();
    const from = +period.from;
    const to = +period.to;
    return R.and(R.gte(dt, from), R.lt(dt, to));
  };
  
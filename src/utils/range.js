export default function range(start = 0, end, step, isRight) {
  let startPre, endPre, stepPre;
  const DEFAULT_START = 0;
  const DEFAULT_STEP = 1;

  if (end === undefined && step === undefined) {
    startPre = DEFAULT_START;
    endPre = start;
    stepPre = start >= 0 ? DEFAULT_STEP : DEFAULT_STEP * -1;
  } else if (step === undefined) {
    startPre = start;
    endPre = end;
    stepPre = DEFAULT_STEP;
  } else {
    startPre = start;
    endPre = end;
    stepPre = step;
  }

  let result = [];
  for (let n = startPre; endPre < 0 ? n > endPre : n < endPre; n = n + stepPre) {
    if (isRight) {
      result.unshift(n);
    } else {
      result.push(n);
    }
  }
  return result;
}

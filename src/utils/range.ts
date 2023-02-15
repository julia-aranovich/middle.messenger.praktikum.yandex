export default function range(
  start: number = 0,
  end?: number,
  step?: number,
  isRight?: boolean
): number[] {
  let startPre: number, endPre: number, stepPre: number;
  const DEFAULT_START = 0;
  const DEFAULT_STEP = 1;

  if (end === undefined && step === undefined) {
    startPre = DEFAULT_START;
    endPre = start;
    stepPre = start >= 0 ? DEFAULT_STEP : DEFAULT_STEP * -1;
  } else if (step === undefined) {
    startPre = start;
    // @ts-ignore
    endPre = end;
    stepPre = DEFAULT_STEP;
  } else {
    startPre = start;
    // @ts-ignore
    endPre = end;
    stepPre = step;
  }

  const result = [];
  for (let n = startPre; endPre < 0 ? n > endPre : n < endPre; n += stepPre) {
    if (isRight) {
      result.unshift(n);
    } else {
      result.push(n);
    }
  }
  return result;
}

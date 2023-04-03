export function range(start: number, end: number, step: number = 1) {
    let nextIndex = start
    let iterationCount = 0
    return {
        next() {
            let result;
            if (nextIndex < end) {
              result = { value: nextIndex, done: false };
              nextIndex += step;
              iterationCount++;
              return result;
            }
            return { value: iterationCount, done: true };
          },
    }
}
export default function Distributions(data = []) {
  const benfordProbabilities = {
    1: 0.301,
    2: 0.176,
    3: 0.125,
    4: 0.097,
    5: 0.079,
    6: 0.067,
    7: 0.058,
    8: 0.051,
    9: 0.046,
  };
  const initialDigits = {
    1: { count: 0 },
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
    6: { count: 0 },
    7: { count: 0 },
    8: { count: 0 },
    9: { count: 0 },
  };

  const sanitized = data.filter((e) => e > 0);
  this.sanitizedInput = {
    data: sanitized,
    size: sanitized.length,
  };

  this.digits = sanitized.reduce((acc, number) => {
    const digit = +`${number}`.charAt(0);
    const count = acc[digit].count + 1;
    const percentage = count / sanitized.length;
    const deviation = percentage - benfordProbabilities[digit];

    acc[digit] = { count, percentage, deviation };

    return acc;
  }, initialDigits);

  this.getBenfordProbabilities = () => {
    let data = [];
    let index = 1;
    for (let pos in benfordProbabilities) {
      data.push({
        name: index,
        benford: benfordProbabilities[pos],
        actual: this.digits[pos].percentage,
      });
      index++;
    }
    return data;
  };

  this.getDistribution = () => {
    let obj = {};

    for (let i = 0; i < this.sanitizedInput.data.length; i++) {
      let element = this.sanitizedInput.data[i];

      element = Math.ceil(element / 10) * 10;

      // if it exists, add 1 to the value
      if (obj[element] !== undefined) {
        obj[element] += 1;
      } else {
        obj[element] = 1;
      }
    }

    let data = [];

    for (let pos in obj) {
      data.push({ tokens: parseInt(pos), holders: parseInt(obj[pos]) });
    }
    return data;
  };
}

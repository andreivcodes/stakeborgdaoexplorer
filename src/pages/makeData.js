import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    address: namor.generate({ words: 1, numbers: 0 }),
    wallet: Math.floor(Math.random() * 100),
    governanceStaking: Math.floor(Math.random() * 100),
    governanceUnclaimed: Math.floor(Math.random() * 100),
    farmingUnclaimed: Math.floor(Math.random() * 100),
    airdropUnclaimed: Math.floor(Math.random() * 100),
    total: Math.floor(Math.random() * 100),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

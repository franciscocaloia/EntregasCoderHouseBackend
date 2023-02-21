export function randoms(max) {
  const randoms = {};
  let random;
  for (let i = 0; i < max; i++) {
    random = Math.floor(Math.random() * 1000) + 1;
    if (randoms[random]) {
      randoms[random]++;
    } else {
      randoms[random] = 1;
    }
  }
  return randoms;
}

process.on("message", (max) => process.send(randoms(max)));

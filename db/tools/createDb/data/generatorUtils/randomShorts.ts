export const randomShorts = (
  count: number,
  adjectives1: string[],
  adjectives2: string[],
  noun: string[]
): string[] => {
  const maxShortsLength = adjectives1.length * adjectives2.length * noun.length;
  const shortsLength = count > maxShortsLength ? maxShortsLength : count;
  const allShorts: string[] = [];
  for (const adj1 of adjectives1) {
    for (const adj2 of adjectives2) {
      for (const n of noun) {
        allShorts.push(
          `${n.endsWith("a") ? adj1.slice(0, adj1.length - 1) + "a" : adj1} ${
            n.endsWith("a") ? adj2.slice(0, adj2.length - 1) + "a" : adj2
          } ${n}`
        );
      }
    }
  }
  for (let i = allShorts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allShorts[i], allShorts[j]] = [allShorts[j], allShorts[i]];
  }
  return allShorts.slice(0, shortsLength);
};

export default function sortResults(results) {
  for (let i = 0; i < results.length; i++) {
    for (let j = i; j < results.length; j++) {
      if (results[i].time > results[j].time || 
        (results[i].time == results[j].time && results[i].moves > results[j].moves)) {
        [results[i], results[j]] = [results[j], results[i]];
      } 
    }
  }
  return results;
}
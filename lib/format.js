export function formatDKK(n) {
  const s = n.toString();
  return 'from ' + s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' DKK';
}

export function formatDuration(ms: number): string {
  if (ms === 0) return 'Persistent'
  return `${ms / 1000}s`
}

export function formatPosition(position: string): string {
  return position.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

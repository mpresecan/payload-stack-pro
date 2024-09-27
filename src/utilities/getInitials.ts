export const getInitials = (name?: string | null, numberOfInitials = 2) => {
  if (!name) return ''

  const [firstName, lastName, extraName] = name.split(' ')
  const numOfInitials = Math.min([firstName, lastName, extraName].filter(Boolean).length, numberOfInitials)

  return [firstName, lastName, extraName].filter(Boolean).map((name, index) => name[0].toUpperCase()).slice(0, numOfInitials).join('')
}

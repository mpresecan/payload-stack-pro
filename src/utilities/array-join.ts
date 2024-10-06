export const arrayJoin = (array: string[], separator: string = ', ', andSeparator: string = ' and '): string => {
  if (array.length === 1) {
    return array[0];
  } else if (array.length === 2) {
    return array.join(andSeparator);
  } else {
    const last = array.pop(); // Remove the last element
    return `${array.join(separator)} and ${last}`;
  }
}

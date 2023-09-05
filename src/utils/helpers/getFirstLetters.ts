export function getFirstLetters(firstName: string | undefined, secondName: string | undefined): string {
  return firstName && secondName ? `${firstName[0]}${secondName[0]}`.toUpperCase() : '?';
}

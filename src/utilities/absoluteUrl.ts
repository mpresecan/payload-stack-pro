export function absoluteUrl(path?: string) {
  return path ? `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
}

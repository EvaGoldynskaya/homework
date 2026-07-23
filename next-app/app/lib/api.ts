export async function fetchJson<T>(url: string, init ?:RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
  const text = await res.text();
  if (!text) {
    throw new Error(`Empty response body for ${url}`)
  }
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${url}: ${error}`);
  }
}
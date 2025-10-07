const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4100/api';

export async function fetchIdeas() {
  const res = await fetch(`${API}/ideas`);
  if (!res.ok) throw new Error('Failed to fetch ideas');
  return res.json();
}

export async function createIdea(text: string, title?: string) {
  const res = await fetch(`${API}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, title }),
  });
  if (!res.ok) throw new Error('Failed to create idea');
  return res.json();
}

export async function upvoteIdea(id: string) {
  const url = `${API}/ideas/${id}/upvote`;
  console.log('Upvote URL:', url);
  const res = await fetch(url, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to upvote');
  return res.json();
}

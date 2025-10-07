const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchIdeas = async () => {
  const res = await fetch(`${API_URL}/ideas`);
  if (!res.ok) throw new Error('Failed to fetch ideas');
  return res.json();
};

export async function createIdea(text: string) {
  const res = await fetch(`${API_URL}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('Failed to create idea');
  return res.json();
};


export const upvoteIdea = async (id: string) => {
  await fetch(`${API_URL}/ideas/${id}/upvote`, { method: "POST" });
};

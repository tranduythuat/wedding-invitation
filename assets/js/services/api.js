// Gọi API dùng chung.
// Dùng Content-Type text/plain để tránh preflight CORS — tương thích Google Apps Script Web App.
// Nếu backend riêng hỗ trợ CORS, có thể đổi sang 'application/json'.
export async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json().catch(() => ({}));
}

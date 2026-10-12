// Điểm truy cập duy nhất tới Anime.js (UMD, nạp bằng <script> trong index.html).
// Nếu sau này đổi sang ESM/bundler chỉ cần sửa file này.
if (!window.anime) throw new Error('Anime.js chưa được nạp.');

export const { animate, createTimeline, stagger } = window.anime;

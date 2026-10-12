# Thiệp mời online — base project

## Chạy
```bash
npm install            # cài sass
npm run css            # biên dịch SCSS -> assets/css/main.css (có source map)
npm run css:watch      # tự biên dịch khi lưu (chạy khi đang code)
npm run css:build      # bản nén để deploy
npm run serve          # mở bằng server local (ES modules không chạy được qua file://)
```
Đặt 5 ảnh bì thư vào `assets/images/`: `envelope-back.png`, `envelope-front.png`, `envelope-flap.png`, `card-inside.png`, `wax-seal.png`.

## Thêm tính năng mới
1. Tạo `assets/js/modules/ten.js`: `export default function ten(root) { ... }`
2. `main.js`: `register('ten', ten)`
3. HTML: `<div data-module="ten">`

Giao tiếp giữa module: `emit('event')` / `on('event', fn)` trong `core/events.js`.
Animation mới: `registerPreset('ten', { ...props anime.js })` rồi dùng `data-anim="ten"`.

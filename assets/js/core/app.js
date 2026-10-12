// Registry module: gắn hành vi cho phần tử qua thuộc tính data-module.
//   <div data-module="countdown slider"></div>  => chạy cả 2 module
// Thêm tính năng mới: viết module (root) => {...}, register('ten', module) trong main.js.
const registry = new Map();
const instances = new WeakMap();

export function register(name, factory) {
  registry.set(name, factory);
}

export function boot(root = document) {
  root.querySelectorAll('[data-module]').forEach((el) => {
    el.dataset.module.split(/\s+/).filter(Boolean).forEach((name) => {
      const factory = registry.get(name);
      if (!factory) return console.warn(`[app] Module "${name}" chưa được đăng ký.`);
      try {
        const api = factory(el);
        if (api) instances.set(el, { ...(instances.get(el) || {}), [name]: api });
      } catch (err) {
        console.error(`[app] Module "${name}" lỗi khi khởi tạo:`, err);
      }
    });
  });
}

// Lấy API do module trả về (vd destroy) nếu cần điều khiển từ bên ngoài
export const getInstance = (el, name) => instances.get(el)?.[name];

// Cấu hình trung tâm: chỉnh ở đây thay vì sửa trong từng module.
export default {
  event: {
    date: '2026-12-20T10:00:00+07:00', // ISO 8601, có múi giờ
  },

  animation: {
    duration: 800,
    ease: 'outCubic',
    threshold: 0.15, // % phần tử xuất hiện trong viewport thì chạy animation
  },

  // Thời lượng (ms) từng bước mở bì thư
  envelope: {
    hint: 250,
    seal: 850,
    flap: 1800,
    card: 1500,
    gap: 0,
    exit: 500,
  },

  rsvp: {
    // Để trống = chế độ mock (chỉ log ra console). Điền URL API / Google Apps Script khi triển khai.
    endpoint: '',
    messages: {
      loading: 'Đang gửi...',
      success: 'Cảm ơn bạn đã xác nhận!',
      error: 'Gửi không thành công, vui lòng thử lại.',
      invalidName: 'Vui lòng nhập họ tên.',
      invalidAttendance: 'Vui lòng chọn tham dự hoặc không.',
    },
  },

  // Tùy chọn mặc định cho Swiper; ghi đè từng slider bằng data-swiper='{"loop":false}'
  swiper: {
    loop: true,
    spaceBetween: 16,
    autoplay: { delay: 4000, disableOnInteraction: false },
  },
};

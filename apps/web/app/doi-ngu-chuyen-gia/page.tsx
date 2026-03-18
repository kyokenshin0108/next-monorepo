"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

interface ConsultationForm {
  fullName: string;
  email: string;
  phone: string;
  expert: string;
  topic: string;
  datetime: string;
  description: string;
}

const defaultForm: ConsultationForm = {
  fullName: "",
  email: "",
  phone: "",
  expert: "",
  topic: "",
  datetime: "",
  description: "",
};

const teamMembers = [
  {
    id: "team1",
    name: "Trần Đức Minh",
    role: "Trưởng Phòng Phân Tích",
    exp: "15 năm kinh nghiệm",
    desc: "Chuyên gia phân tích kỹ thuật với hơn 15 năm kinh nghiệm trong lĩnh vực tài chính. Từng tư vấn cho nhiều quỹ đầu tư lớn và doanh nghiệp niêm yết.",
    tags: [
      { label: "Phân Tích Kỹ Thuật", color: "bg-blue-100 text-blue-800" },
      { label: "Tư Vấn Đầu Tư", color: "bg-green-100 text-green-800" },
    ],
  },
  {
    id: "team2",
    name: "Phạm Thị Hương",
    role: "Chuyên Gia Phân Tích Cơ Bản",
    exp: "12 năm kinh nghiệm",
    desc: "Chuyên gia phân tích cơ bản với kinh nghiệm phong phú trong việc đánh giá doanh nghiệp. Từng làm việc tại các công ty chứng khoán hàng đầu.",
    tags: [
      { label: "Phân Tích Cơ Bản", color: "bg-orange-100 text-orange-800" },
      { label: "Quản Lý Danh Mục", color: "bg-purple-100 text-purple-800" },
    ],
  },
  {
    id: "team3",
    name: "Nguyễn Văn Thành",
    role: "Chuyên Gia Chiến Lược Giao Dịch",
    exp: "8 năm kinh nghiệm",
    desc: "Chuyên gia về chiến lược giao dịch và phân tích kỹ thuật. Có kinh nghiệm trong việc phát triển các hệ thống giao dịch tự động và quản lý rủi ro.",
    tags: [
      { label: "Phân Tích Kỹ Thuật", color: "bg-blue-100 text-blue-800" },
      { label: "Chiến Lược Giao Dịch", color: "bg-red-100 text-red-800" },
    ],
  },
  {
    id: "team4",
    name: "Lê Hoàng Nam",
    role: "Giám Đốc Tư Vấn Đầu Tư",
    exp: "14 năm kinh nghiệm",
    desc: "Chuyên gia tư vấn đầu tư với kinh nghiệm phong phú trong việc xây dựng danh mục đầu tư. Từng làm việc tại các ngân hàng đầu tư quốc tế.",
    tags: [
      { label: "Phân Tích Cơ Bản", color: "bg-orange-100 text-orange-800" },
      { label: "Tư Vấn Đầu Tư", color: "bg-green-100 text-green-800" },
    ],
  },
  {
    id: "team5",
    name: "Vũ Thị Mai Anh",
    role: "Chuyên Gia Quản Lý Danh Mục",
    exp: "10 năm kinh nghiệm",
    desc: "Chuyên gia quản lý danh mục đầu tư với kinh nghiệm trong việc xây dựng và quản lý danh mục đầu tư cho các khách hàng cá nhân và tổ chức.",
    tags: [
      { label: "Quản Lý Danh Mục", color: "bg-purple-100 text-purple-800" },
      { label: "Phân Tích Kỹ Thuật", color: "bg-blue-100 text-blue-800" },
    ],
  },
  {
    id: "team6",
    name: "Đỗ Quang Huy",
    role: "Chuyên Gia Chiến Lược Giao Dịch",
    exp: "7 năm kinh nghiệm",
    desc: "Chuyên gia chiến lược giao dịch với kinh nghiệm trong việc phát triển các chiến lược giao dịch ngắn hạn và trung hạn trên thị trường chứng khoán.",
    tags: [
      { label: "Chiến Lược Giao Dịch", color: "bg-red-100 text-red-800" },
      { label: "Phân Tích Cơ Bản", color: "bg-orange-100 text-orange-800" },
    ],
  },
];

const faqs = [
  {
    q: "Làm thế nào để đặt lịch tư vấn với chuyên gia?",
    a: 'Bạn có thể đặt lịch tư vấn với chuyên gia bằng cách nhấp vào nút "Đặt Lịch Tư Vấn" trên trang thông tin chi tiết của chuyên gia. Sau đó, điền thông tin cá nhân và chủ đề tư vấn, chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ để xác nhận lịch hẹn.',
  },
  {
    q: "Chi phí tư vấn với chuyên gia là bao nhiêu?",
    a: "Chi phí tư vấn với chuyên gia phụ thuộc vào thời gian tư vấn và kinh nghiệm của chuyên gia. Thông thường, chi phí dao động từ 500.000đ đến 2.000.000đ cho một buổi tư vấn kéo dài 1 giờ. Bạn có thể xem chi tiết về chi phí trên trang thông tin của từng chuyên gia.",
  },
  {
    q: "Làm thế nào để theo dõi các buổi live stream của chuyên gia?",
    a: 'Bạn có thể theo dõi lịch live stream của các chuyên gia trên trang "Live Stream" của chúng tôi. Để không bỏ lỡ các buổi live stream, bạn có thể đăng ký nhận thông báo bằng cách nhấp vào nút "Đặt Lịch Nhắc" trên trang thông tin chi tiết của chuyên gia hoặc trên trang chi tiết của buổi live stream.',
  },
  {
    q: "Tôi có thể xem lại các buổi live stream đã phát sóng không?",
    a: 'Có, bạn có thể xem lại các buổi live stream đã phát sóng trong mục "Thư Viện Live Stream" trên trang web của chúng tôi. Các buổi live stream được lưu trữ và phân loại theo chủ đề, chuyên gia và thời gian phát sóng để bạn dễ dàng tìm kiếm.',
  },
  {
    q: "Làm thế nào để trở thành chuyên gia của TheStockHunters?",
    a: "Để trở thành chuyên gia của TheStockHunters, bạn cần có kinh nghiệm và chuyên môn trong lĩnh vực tài chính, đầu tư chứng khoán. Bạn có thể gửi hồ sơ ứng tuyển qua email: recruitment@thestockhunters.vn. Hồ sơ cần bao gồm CV, chứng chỉ chuyên môn và một bài viết phân tích thị trường mẫu.",
  },
];

const expertStats = [
  { icon: "ri-time-line", label: "Kinh Nghiệm", value: "15 năm" },
  { icon: "ri-user-star-line", label: "Người Theo Dõi", value: "15.8K" },
  { icon: "ri-live-line", label: "Live Stream", value: "Thứ 2, 4, 6 (19:30)" },
  { icon: "ri-star-line", label: "Đánh Giá", value: "4.9/5 (256 đánh giá)" },
];

const teamStats = [
  { icon: "ri-user-star-line", num: "15+", label: "Chuyên Gia" },
  { icon: "ri-time-line", num: "10+", label: "Năm Kinh Nghiệm Trung Bình" },
  { icon: "ri-live-line", num: "20+", label: "Live Stream Mỗi Tuần" },
  {
    icon: "ri-customer-service-2-line",
    num: "5000+",
    label: "Nhà Đầu Tư Được Tư Vấn",
  },
];

const testimonials = [
  {
    stars: 5,
    half: false,
    rating: "5.0",
    text: "Tôi đã theo dõi các buổi live stream phân tích kỹ thuật của anh Trần Đức Minh trong 6 tháng qua và đã học được rất nhiều kiến thức bổ ích. Cách phân tích rõ ràng, dễ hiểu và có chiều sâu giúp tôi cải thiện đáng kể hiệu quả đầu tư.",
    name: "Nguyễn Văn Hùng",
    sub: "Nhà đầu tư cá nhân, Hà Nội",
  },
  {
    stars: 5,
    half: false,
    rating: "5.0",
    text: "Chị Phạm Thị Hương đã tư vấn cho tôi xây dựng danh mục đầu tư dài hạn rất hiệu quả. Cách tiếp cận phân tích cơ bản của chị rất chuyên nghiệp và giúp tôi lựa chọn được những cổ phiếu có nền tảng tốt, tiềm năng tăng trưởng cao.",
    name: "Trần Thị Minh Tâm",
    sub: "Nhà đầu tư cá nhân, TP.HCM",
  },
  {
    stars: 4,
    half: true,
    rating: "4.5",
    text: "Các buổi live stream hỏi đáp của anh Nguyễn Văn Thành rất bổ ích. Anh giải đáp mọi thắc mắc một cách chi tiết và dễ hiểu. Chiến lược giao dịch ngắn hạn mà anh chia sẻ đã giúp tôi cải thiện đáng kể hiệu suất giao dịch của mình.",
    name: "Lê Đình Quang",
    sub: "Trader, Đà Nẵng",
  },
];

export default function DoiNguPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ConsultationForm>(defaultForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(defaultForm);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <Navbar />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg z-50">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <i className="ri-checkbox-circle-line"></i>
            </div>
            <p>
              Yêu cầu tư vấn đã được gửi thành công. Chúng tôi sẽ liên hệ lại
              với bạn trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-lg w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Đặt Lịch Tư Vấn
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chuyên gia tư vấn
                </label>
                <div className="relative">
                  <select
                    name="expert"
                    required
                    value={formData.expert}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800 appearance-none pr-10"
                  >
                    <option value="">Chọn chuyên gia</option>
                    <option value="tran-duc-minh">
                      Trần Đức Minh - Phân Tích Kỹ Thuật
                    </option>
                    <option value="pham-thi-huong">
                      Phạm Thị Hương - Phân Tích Cơ Bản
                    </option>
                    <option value="nguyen-van-thanh">
                      Nguyễn Văn Thành - Chiến Lược Giao Dịch
                    </option>
                    <option value="le-hoang-nam">
                      Lê Hoàng Nam - Tư Vấn Đầu Tư
                    </option>
                    <option value="vu-thi-mai-anh">
                      Vũ Thị Mai Anh - Quản Lý Danh Mục
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chủ đề tư vấn
                </label>
                <div className="relative">
                  <select
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800 appearance-none pr-10"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="technical-analysis">
                      Phân Tích Kỹ Thuật
                    </option>
                    <option value="fundamental-analysis">
                      Phân Tích Cơ Bản
                    </option>
                    <option value="portfolio-management">
                      Quản Lý Danh Mục
                    </option>
                    <option value="trading-strategy">
                      Chiến Lược Giao Dịch
                    </option>
                    <option value="investment-planning">
                      Lập Kế Hoạch Đầu Tư
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày giờ mong muốn
                </label>
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  value={formData.datetime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhu cầu tư vấn
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Gửi Yêu Cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-gray-700 opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Đội Ngũ Chuyên Gia TheStockHunters
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Gặp gỡ những chuyên gia phân tích tài chính và người dẫn chương
              trình hàng đầu của chúng tôi, những người sẽ đồng hành cùng bạn
              trên hành trình đầu tư thành công.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/live-stream"
                className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap flex items-center"
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-calendar-line"></i>
                </div>
                Lịch Live Stream
              </Link>
              <button
                onClick={openModal}
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center"
              >
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-user-add-line"></i>
                </div>
                Đặt Lịch Tư Vấn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm border-none focus:outline-none"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500">
                <i className="ri-search-line"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3"></div>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  {/* Image placeholder (replaces readdy.ai search image) */}
                  <div className="w-full h-72 bg-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <i className="ri-user-3-line text-4xl text-gray-400"></i>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {member.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                        >
                          <i className="ri-facebook-fill"></i>
                        </a>
                        <a
                          href="https://youtube.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                        >
                          <i className="ri-youtube-fill"></i>
                        </a>
                        <a
                          href="https://tiktok.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                        >
                          <i className="ri-tiktok-fill"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-3">{member.role}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="w-5 h-5 flex items-center justify-center mr-1 text-blue-800">
                      <i className="ri-time-line"></i>
                    </div>
                    <span>{member.exp}</span>
                  </div>
                  <p className="text-gray-700 mb-5">{member.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#expert-detail"
                      className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap flex items-center justify-center"
                    >
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-user-line"></i>
                      </div>
                      Xem Chi Tiết
                    </a>
                    <button
                      onClick={openModal}
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center justify-center"
                    >
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-calendar-line"></i>
                      </div>
                      Đặt Lịch Tư Vấn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition whitespace-nowrap">
              Xem Thêm Chuyên Gia
            </button>
          </div>
        </div>
      </section>

      {/* Expert Detail Section */}
      <section id="expert-detail" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-800">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <i className="ri-user-3-line text-4xl text-gray-400"></i>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10 w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <i className="ri-user-3-line text-3xl text-gray-400"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Trần Đức Minh
                    </h2>
                    <p className="text-blue-100">Trưởng Phòng Phân Tích</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    Phân Tích Kỹ Thuật
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Tư Vấn Đầu Tư
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    Đào Tạo
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                  >
                    <i className="ri-youtube-fill"></i>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                  >
                    <i className="ri-tiktok-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-4 mb-8">
                {expertStats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center px-4 py-2 bg-gray-100 rounded-lg"
                  >
                    <div className="w-10 h-10 flex items-center justify-center text-blue-800 mr-3">
                      <i className={`${stat.icon} text-xl`}></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-12 bg-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Đội Ngũ Chuyên Gia Của Chúng Tôi
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Đội ngũ chuyên gia của TheStockHunters với kinh nghiệm phong phú
              và kiến thức chuyên sâu sẽ đồng hành cùng bạn trên hành trình
              đầu tư thành công.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  <i className={stat.icon}></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.num}
                </h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-block bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap"
            >
              Tham Gia Cùng Chúng Tôi
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Nhà Đầu Tư Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những đánh giá từ các nhà đầu tư đã tham gia các buổi live stream
              và nhận tư vấn từ đội ngũ chuyên gia của TheStockHunters.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <i key={si} className="ri-star-fill"></i>
                    ))}
                    {t.half && <i className="ri-star-half-fill"></i>}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">{t.rating}</span>
                </div>
                <p className="text-gray-700 mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4 flex items-center justify-center flex-shrink-0">
                    <i className="ri-user-3-line text-xl text-gray-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-gray-600 text-sm">{t.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những câu hỏi thường gặp về đội ngũ chuyên gia và dịch vụ tư vấn
              của TheStockHunters.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <i
                      className={
                        openFaq === i
                          ? "ri-arrow-up-s-line"
                          : "ri-arrow-down-s-line"
                      }
                    ></i>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Đăng Ký Nhận Thông Báo
            </h2>
            <p className="text-blue-100 mb-8">
              Nhận thông báo về các buổi live stream và phân tích thị trường
              mới nhất từ đội ngũ chuyên gia của TheStockHunters.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 border-none focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

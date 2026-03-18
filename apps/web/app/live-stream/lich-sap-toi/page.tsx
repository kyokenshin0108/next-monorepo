"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

const TAG_STYLES: Record<string, string> = {
  technical: "bg-blue-100 text-blue-600",
  fundamental: "bg-orange-100 text-orange-600",
  portfolio: "bg-purple-100 text-purple-600",
  strategy: "bg-red-100 text-red-600",
  education: "bg-green-100 text-green-600",
}

const DOT_COLOR: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
}

type LivestreamItem = {
  id: number
  title: string
  time: string
  isLive: boolean
  tag: string
  tagLabel: string
  tag2?: string
  tag2Label?: string
  expert: string
  role: string
  registered: number
}

const SECTIONS: { label: string; items: LivestreamItem[] }[] = [
  {
    label: "Hôm Nay (09/06/2025)",
    items: [
      { id: 1, title: "Phân Tích Thị Trường Tuần Mới: Cơ Hội & Rủi Ro", time: "19:30 - 21:00", isLive: true, tag: "technical", tagLabel: "Phân Tích Kỹ Thuật", expert: "Trần Đức Minh", role: "Trưởng Phòng Phân Tích", registered: 128 },
    ],
  },
  {
    label: "Ngày Mai (10/06/2025)",
    items: [
      { id: 2, title: "Nhận Diện Mô Hình Giá: Từ Cơ Bản Đến Nâng Cao", time: "10:00 - 11:30", isLive: false, tag: "technical", tagLabel: "Phân Tích Kỹ Thuật", tag2: "education", tag2Label: "Hướng Dẫn", expert: "Trần Đức Minh", role: "Trưởng Phòng Phân Tích", registered: 95 },
      { id: 3, title: "Phân Tích Báo Cáo Tài Chính Q2/2025: Ngành Ngân Hàng", time: "15:00 - 16:30", isLive: false, tag: "fundamental", tagLabel: "Phân Tích Cơ Bản", expert: "Phạm Thị Hương", role: "Chuyên Gia Phân Tích Cơ Bản", registered: 76 },
    ],
  },
  {
    label: "Thứ Tư (11/06/2025)",
    items: [
      { id: 4, title: "Triển Vọng Ngành Bất Động Sản 6 Tháng Cuối Năm 2025", time: "10:00 - 11:30", isLive: false, tag: "fundamental", tagLabel: "Phân Tích Cơ Bản", expert: "Phạm Thị Hương", role: "Chuyên Gia Phân Tích Cơ Bản", registered: 64 },
    ],
  },
  {
    label: "Thứ Sáu (13/06/2025)",
    items: [
      { id: 5, title: "Chiến Lược Phân Bổ Tài Sản Hiệu Quả Trong Thị Trường Biến Động", time: "10:00 - 11:30", isLive: false, tag: "portfolio", tagLabel: "Quản Lý Danh Mục", expert: "Vũ Thị Mai Anh", role: "Chuyên Gia Quản Lý Danh Mục", registered: 83 },
      { id: 6, title: "Chiến Lược Giao Dịch Theo Xu Hướng: Kỹ Thuật Nâng Cao", time: "15:00 - 16:30", isLive: false, tag: "strategy", tagLabel: "Chiến Lược Giao Dịch", expert: "Nguyễn Văn Thành", role: "Chuyên Gia Chiến Lược Giao Dịch", registered: 92 },
    ],
  },
]

const PAST_STREAMS = [
  { title: "Phân Tích Thị Trường: Cơ Hội & Rủi Ro Tuần 23/2025", duration: "1:25:16", tag: "technical", tagLabel: "Phân Tích Kỹ Thuật", expert: "Trần Đức Minh", date: "02/06/2025" },
  { title: "Phân Tích Cơ Bản: Triển Vọng Ngành Bán Lẻ 2025", duration: "1:42:08", tag: "fundamental", tagLabel: "Phân Tích Cơ Bản", expert: "Phạm Thị Hương", date: "30/05/2025" },
  { title: "Quản Lý Danh Mục Trong Thị Trường Biến Động", duration: "1:18:45", tag: "portfolio", tagLabel: "Quản Lý Danh Mục", expert: "Vũ Thị Mai Anh", date: "27/05/2025" },
  { title: "Chiến Lược Giao Dịch Với RSI & MACD", duration: "1:31:22", tag: "strategy", tagLabel: "Chiến Lược Giao Dịch", expert: "Nguyễn Văn Thành", date: "24/05/2025" },
]

const LEGEND = [
  { color: "bg-blue-500", label: "Phân Tích Kỹ Thuật" },
  { color: "bg-orange-500", label: "Phân Tích Cơ Bản" },
  { color: "bg-purple-500", label: "Quản Lý Danh Mục" },
  { color: "bg-red-500", label: "Chiến Lược Giao Dịch" },
  { color: "bg-green-500", label: "Hướng Dẫn Đầu Tư" },
]

const WEEK_DAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

const WEEK_DATA = [
  { day: 8, isToday: false, dots: [] as string[] },
  { day: 9, isToday: true, dots: [] as string[] },
  { day: 10, isToday: false, dots: ["blue", "green"] },
  { day: 11, isToday: false, dots: ["orange"] },
  { day: 12, isToday: false, dots: [] as string[] },
  { day: 13, isToday: false, dots: ["purple", "red"] },
  { day: 14, isToday: false, dots: [] as string[] },
]

const MONTH_DATA = [
  { d: 1, dots: [] as string[] }, { d: 2, dots: [] as string[] }, { d: 3, dots: ["blue"] }, { d: 4, dots: [] as string[] },
  { d: 5, dots: ["orange"] }, { d: 6, dots: [] as string[] }, { d: 7, dots: ["green"] }, { d: 8, dots: [] as string[] },
  { d: 9, isToday: true, dots: [] as string[] }, { d: 10, dots: ["blue"] }, { d: 11, dots: ["orange"] },
  { d: 12, dots: [] as string[] }, { d: 13, dots: ["red"] }, { d: 14, dots: [] as string[] }, { d: 15, dots: [] as string[] },
  { d: 16, dots: [] as string[] }, { d: 17, dots: ["blue"] }, { d: 18, dots: [] as string[] }, { d: 19, dots: ["orange"] },
  { d: 20, dots: [] as string[] }, { d: 21, dots: ["purple"] }, { d: 22, dots: [] as string[] }, { d: 23, dots: [] as string[] },
  { d: 24, dots: ["blue"] }, { d: 25, dots: [] as string[] }, { d: 26, dots: ["green"] }, { d: 27, dots: [] as string[] },
  { d: 28, dots: ["red"] }, { d: 29, dots: [] as string[] }, { d: 30, dots: [] as string[] },
]

export default function LichLiveStreamPage() {
  const [activeView, setActiveView] = useState<"week" | "month">("week")
  const [showNotifModal, setShowNotifModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedStream, setSelectedStream] = useState<LivestreamItem | null>(null)
  const [notifForm, setNotifForm] = useState({ name: "", email: "", phone: "" })
  const [notifSuccess, setNotifSuccess] = useState(false)

  const openDetail = (item: LivestreamItem) => { setSelectedStream(item); setShowDetailModal(true) }
  const openReminder = (item: LivestreamItem) => { setSelectedStream(item); setShowNotifModal(true) }

  const handleNotifSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNotifSuccess(true)
    setTimeout(() => { setShowNotifModal(false); setNotifSuccess(false); setNotifForm({ name: "", email: "", phone: "" }) }, 2000)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gray-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Lịch Live Stream</h1>
            <p className="text-xl text-blue-100 mb-8">Theo dõi lịch phát trực tiếp của các chuyên gia tài chính hàng đầu tại TheStockHunters. Đăng ký ngay để không bỏ lỡ những phân tích chuyên sâu và chiến lược đầu tư hiệu quả.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/live-stream" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2"><i className="ri-arrow-left-line"></i></div>
                Quay Lại Live Stream
              </Link>
              <button onClick={() => setShowNotifModal(true)} className="bg-primary text-white px-6 py-3 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2"><i className="ri-notification-line"></i></div>
                Đăng Ký Nhận Thông Báo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-5 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <input type="text" placeholder="Tìm kiếm live stream..." className="search-input w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm border-none" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-500"><i className="ri-search-line"></i></div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
                  <span>Chuyên Gia</span><div className="w-5 h-5 flex items-center justify-center ml-1"><i className="ri-arrow-down-s-line"></i></div>
                </button>
                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
                  <span>Chủ Đề</span><div className="w-5 h-5 flex items-center justify-center ml-1"><i className="ri-arrow-down-s-line"></i></div>
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-1"><i className="ri-filter-3-line"></i></div>Áp Dụng
                </button>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full p-1 self-start">
              {(["week", "month"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveView(v)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${activeView === v ? "bg-white text-primary shadow-sm" : "text-gray-600"}`}
                >
                  {v === "week" ? "Xem Theo Tuần" : "Xem Theo Tháng"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {activeView === "week" ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tuần 10/06 - 16/06/2025</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><i className="ri-arrow-left-s-line"></i></button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><i className="ri-arrow-right-s-line"></i></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-4">
                {WEEK_DAYS.map((d) => <div key={d} className="text-center font-medium text-gray-500">{d}</div>)}
                {WEEK_DATA.map((d) => (
                  <div key={d.day} className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg border ${d.isToday ? "bg-primary border-primary text-white" : d.dots.length > 0 ? "bg-blue-50 border-blue-200 font-semibold text-primary" : "border-gray-200"}`}>
                    <span className="text-lg font-medium">{d.day}</span>
                    <span className={`text-xs ${d.isToday ? "text-white" : "text-gray-500"}`}>06/2025</span>
                    {d.dots.length > 0 && <div className="mt-1 flex gap-1">{d.dots.map((c, i) => <span key={i} className={`w-2 h-2 rounded-full ${DOT_COLOR[c]}`}></span>)}</div>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tháng 6/2025</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><i className="ri-arrow-left-s-line"></i></button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><i className="ri-arrow-right-s-line"></i></button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {WEEK_DAYS.map((d) => <div key={d} className="text-center font-medium text-gray-500 py-2">{d}</div>)}
                {[...Array(6)].map((_, i) => <div key={`e${i}`} className="aspect-square rounded-lg border border-gray-200"></div>)}
                {MONTH_DATA.map(({ d, dots, isToday }) => (
                  <div key={d} className={`aspect-square flex flex-col items-center justify-center p-1 rounded-lg border ${isToday ? "bg-primary border-primary text-white" : dots.length > 0 ? "bg-blue-50 border-blue-200 font-semibold text-primary" : "border-gray-200"}`}>
                    <span className="text-sm font-medium">{d}</span>
                    {dots.length > 0 && <div className="mt-0.5 flex gap-0.5">{dots.map((c, i) => <span key={i} className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[c]}`}></span>)}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-4 justify-end">
            {LEGEND.map((l) => <div key={l.label} className="flex items-center gap-1"><span className={`w-3 h-3 rounded-full ${l.color}`}></span><span className="text-xs text-gray-600">{l.label}</span></div>)}
          </div>
        </div>
      </section>

      {/* Livestream List */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Lịch Live Stream Sắp Tới</h2>
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.label}>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-2 text-primary"><i className="ri-calendar-event-line"></i></div>
                  {section.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition duration-300">
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center"><i className="ri-live-line text-4xl text-gray-400"></i></div>
                        <div className={`absolute top-3 right-3 ${item.isLive ? "bg-red-500" : "bg-gray-800"} text-white px-2 py-1 rounded text-xs font-medium flex items-center`}>
                          <div className="w-3 h-3 flex items-center justify-center mr-1"><i className={item.isLive ? "ri-live-line" : "ri-time-line"}></i></div>
                          {item.time}
                        </div>
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${TAG_STYLES[item.tag]}`}>{item.tagLabel}</span>
                          {item.tag2 && <span className={`px-2 py-1 rounded text-xs font-medium ${TAG_STYLES[item.tag2]}`}>{item.tag2Label}</span>}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-3">{item.title}</h4>
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3"><i className="ri-user-3-line text-gray-400"></i></div>
                          <div><p className="font-medium">{item.expert}</p><p className="text-sm text-gray-500">{item.role}</p></div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <div className="w-5 h-5 flex items-center justify-center mr-1 text-gray-400"><i className="ri-user-line"></i></div>
                          <span>{item.registered} người đã đăng ký</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openDetail(item)} className="flex-1 bg-primary text-white px-3 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center">
                            <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-information-line"></i></div>Chi Tiết
                          </button>
                          <button onClick={() => openReminder(item)} className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center justify-center">
                            <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-notification-line"></i></div>Đặt Lịch
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-button font-medium hover:bg-gray-50 transition whitespace-nowrap">Xem Thêm Live Stream</button>
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Sự Kiện Đặc Biệt Sắp Tới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { date: "17/06/2025 | 19:00 - 21:30", title: "Hội Thảo: Chiến Lược Đầu Tư Nửa Cuối Năm 2025", desc: "Hội thảo trực tuyến với sự tham gia của các chuyên gia hàng đầu về thị trường chứng khoán, bất động sản và tiền điện tử. Phân tích triển vọng thị trường và chiến lược đầu tư hiệu quả cho 6 tháng cuối năm 2025.", tags: [{ icon: "ri-user-star-line", label: "5 Chuyên Gia" }, { icon: "ri-time-line", label: "2.5 Giờ" }, { icon: "ri-question-answer-line", label: "Hỏi Đáp Trực Tiếp" }] },
              { date: "24/06/2025 | 09:00 - 17:00", title: "Workshop: Xây Dựng Hệ Thống Giao Dịch Cá Nhân", desc: "Workshop trực tuyến kéo dài một ngày, hướng dẫn chi tiết cách xây dựng hệ thống giao dịch cá nhân từ A-Z. Bao gồm phương pháp xác định xu hướng, quản lý vốn và tâm lý giao dịch.", tags: [{ icon: "ri-user-star-line", label: "Nguyễn Văn Thành" }, { icon: "ri-time-line", label: "8 Giờ" }, { icon: "ri-file-list-3-line", label: "Tài Liệu & Mẫu Excel" }] },
            ].map((event) => (
              <div key={event.date} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center"><i className="ri-video-line text-5xl text-gray-400"></i></div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium">{event.date}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    {event.tags.map((tag) => (
                      <div key={tag.label} className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
                        <div className="w-5 h-5 flex items-center justify-center mr-1.5 text-primary"><i className={tag.icon}></i></div>
                        <span className="text-sm">{tag.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary text-white px-4 py-2.5 rounded-button font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center justify-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1.5"><i className="ri-calendar-check-line"></i></div>Đăng Ký Tham Gia
                    </button>
                    <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"><i className="ri-share-line"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Livestreams */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Live Stream Gần Đây</h2>
            <a href="#" className="text-primary font-medium hover:underline flex items-center">Xem Tất Cả<div className="w-5 h-5 flex items-center justify-center ml-1"><i className="ri-arrow-right-line"></i></div></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAST_STREAMS.map((s) => (
              <div key={s.title} className="bg-white rounded-lg shadow-sm overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition duration-300">
                <div className="relative">
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center"><i className="ri-play-circle-line text-4xl text-gray-400"></i></div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">{s.duration}</div>
                  <div className="absolute top-3 left-3"><span className={`px-2 py-1 rounded text-xs font-medium ${TAG_STYLES[s.tag]}`}>{s.tagLabel}</span></div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{s.title}</h4>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2"><i className="ri-user-3-line text-gray-400 text-sm"></i></div>
                    <p className="text-sm font-medium">{s.expert}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-4 h-4 flex items-center justify-center mr-1"><i className="ri-calendar-line"></i></div>
                    <span>{s.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && setShowNotifModal(false)}>
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button onClick={() => setShowNotifModal(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"><i className="ri-close-line text-xl"></i></button>
            {notifSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-checkbox-circle-line text-3xl text-green-600"></i></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Đăng Ký Thành Công!</h3>
                <p className="text-gray-600">Chúng tôi sẽ gửi thông báo đến bạn trước mỗi buổi live stream.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Đăng Ký Nhận Thông Báo</h2>
                {selectedStream && <p className="text-gray-600 mb-4 text-sm">Cho buổi: <span className="font-medium">{selectedStream.title}</span></p>}
                <form onSubmit={handleNotifSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="notif-name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                    <input id="notif-name" type="text" value={notifForm.name} onChange={(e) => setNotifForm({ ...notifForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                  </div>
                  <div>
                    <label htmlFor="notif-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input id="notif-email" type="email" value={notifForm.email} onChange={(e) => setNotifForm({ ...notifForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                  </div>
                  <div>
                    <label htmlFor="notif-phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (tùy chọn)</label>
                    <input id="notif-phone" type="tel" value={notifForm.phone} onChange={(e) => setNotifForm({ ...notifForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-button font-medium hover:bg-primary/90 transition">Đăng Ký</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedStream && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
            <button onClick={() => setShowDetailModal(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"><i className="ri-close-line text-xl"></i></button>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedStream.title}</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700"><i className="ri-time-line text-primary"></i><span>Thời gian: {selectedStream.time}</span></div>
              <div className="flex items-center gap-2 text-gray-700"><i className="ri-user-line text-primary"></i><span>Chuyên gia: {selectedStream.expert} — {selectedStream.role}</span></div>
              <div className="flex items-center gap-2 text-gray-700"><i className="ri-group-line text-primary"></i><span>{selectedStream.registered} người đã đăng ký</span></div>
              <div className="flex items-center gap-2 text-gray-700"><i className="ri-tag-line text-primary"></i><span className={`px-2 py-1 rounded text-xs font-medium ${TAG_STYLES[selectedStream.tag]}`}>{selectedStream.tagLabel}</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowDetailModal(false); openReminder(selectedStream) }} className="flex-1 bg-primary text-white py-2.5 rounded-button font-medium hover:bg-primary/90 transition">Đặt Lịch Nhắc Nhở</button>
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-button font-medium hover:bg-gray-200 transition">Đóng</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

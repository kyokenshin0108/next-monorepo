"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import type { YouTubeStatus, YouTubeVideo } from "@/app/api/youtube/route"
import type { CalendarEvent } from "@/app/api/google-calendar/route"

export default function LiveStream() {
  const [showReminderDialog, setShowReminderDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [copyText, setCopyText] = useState("Sao chép")
  const [downloadEmail, setDownloadEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [calendarView, setCalendarView] = useState("month")
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [youtubeStatus, setYoutubeStatus] = useState<YouTubeStatus | null>(null)
  const [youtubeLoading, setYoutubeLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [calendarLoading, setCalendarLoading] = useState(true)

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ]

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText("https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025")
    setCopyText("Đã sao chép!")
    setTimeout(() => setCopyText("Sao chép"), 2000)
  }

  function handleConfirmDownload() {
    if (!validateEmail(downloadEmail)) {
      setEmailError(true)
      return
    }
    if (!selectedFormat) return
    setShowDownloadDialog(false)
    setDownloadEmail("")
    setSelectedFormat(null)
    setEmailError(false)
  }

  function handlePrevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  function handleNextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  useEffect(() => {
    async function fetchYouTubeStatus() {
      try {
        const res = await fetch("/api/youtube")
        if (res.ok) {
          const data: YouTubeStatus = await res.json()
          setYoutubeStatus(data)
        }
      } catch (err) {
        console.error("Failed to fetch YouTube status:", err)
      } finally {
        setYoutubeLoading(false)
      }
    }
    fetchYouTubeStatus()
    // Refresh every 2 minutes
    const interval = setInterval(fetchYouTubeStatus, 120_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchCalendarEvents() {
      setCalendarLoading(true)
      try {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const res = await fetch(`/api/google-calendar?year=${year}&month=${month}`, { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setCalendarEvents(data.events || [])
        }
      } catch (err) {
        console.error("Failed to fetch calendar events:", err)
      } finally {
        setCalendarLoading(false)
      }
    }
    fetchCalendarEvents()
  }, [currentDate])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Element
      if (!target.closest('#calendar-view-dropdown')) setShowCalendarDropdown(false)
      if (!target.closest('#filter-dropdown')) setShowFilterMenu(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Active video in main player: user-selected sidebar video, or the latest regular video
  const activeVideo = selectedVideo ?? youtubeStatus?.latestVideo ?? null

  return (
    <>
      <Navbar />
      <main>
        {/* Current Live Stream Section */}
        <section className="bg-gray-900 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Video Player */}
              <div className="w-full lg:w-3/4">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video" id="live-stream-container">
                  {youtubeLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-white text-center">
                        <i className="ri-loader-4-line text-4xl animate-spin block mb-2"></i>
                        <span className="text-sm">Đang tải...</span>
                      </div>
                    </div>
                  ) : youtubeStatus?.isLive && youtubeStatus.liveVideo ? (
                    <>
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeStatus.liveVideo.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center pointer-events-none">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-live-line"></i>
                        </div>
                        <span>ĐANG PHÁT TRỰC TIẾP</span>
                      </div>
                    </>
                  ) : activeVideo ? (
                    <>
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${activeVideo.videoId}?rel=0&modestbranding=1`}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                      <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center pointer-events-none">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-video-line"></i>
                        </div>
                        <span>VIDEO MỚI NHẤT</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <a href="https://www.youtube.com/@TheStockHunters" target="_blank" rel="noopener noreferrer" className="text-white text-center hover:opacity-80 transition">
                        <i className="ri-youtube-fill text-red-500 text-5xl block mb-2"></i>
                        <span className="text-sm">Xem kênh TheStockHunters</span>
                      </a>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-lg p-5 mt-4">
                  {youtubeStatus?.isLive && youtubeStatus.liveVideo ? (
                    <>
                      <h1 className="text-xl font-bold mb-2">{youtubeStatus.liveVideo.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center text-red-600 font-medium">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-live-line"></i>
                          </div>
                          <span>Đang phát trực tiếp</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-price-tag-3-line"></i>
                          </div>
                          <span>TheStockHunters</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3">{youtubeStatus.liveVideo.description || "Phân tích thị trường chứng khoán trực tiếp cùng TheStockHunters."}</p>
                    </>
                  ) : activeVideo ? (
                    <>
                      <h1 className="text-xl font-bold mb-2">{activeVideo.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-time-line"></i>
                          </div>
                          <span>{new Date(activeVideo.publishedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-price-tag-3-line"></i>
                          </div>
                          <span>TheStockHunters</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3">{activeVideo.description || "Phân tích thị trường chứng khoán cùng TheStockHunters."}</p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-xl font-bold mb-2">Phân Tích Thị Trường Tuần 23/2025: Cơ Hội Đầu Tư Nhóm Cổ Phiếu Ngân Hàng</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-user-line"></i>
                          </div>
                          <span>Trần Đức Minh</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-time-line"></i>
                          </div>
                          <span>19:30 - 21:00, 08/06/2025</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center mr-1">
                            <i className="ri-price-tag-3-line"></i>
                          </div>
                          <span>Phân Tích Thị Trường</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">Phân tích chi tiết diễn biến thị trường tuần qua và dự báo xu hướng tuần tới. Tập trung vào nhóm cổ phiếu ngân hàng và bất động sản. Phân tích các yếu tố vĩ mô tác động đến thị trường và cơ hội đầu tư ngắn hạn.</p>
                    </>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button id="reminder-btn" onClick={() => setShowReminderDialog(true)} className="bg-primary text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-notification-line"></i>
                      </div>
                      Đặt Lịch Nhắc
                    </button>

                    {/* Reminder Dialog */}
                    {showReminderDialog && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Đặt Lịch Nhắc</h3>
                            <button onClick={() => setShowReminderDialog(false)} className="text-gray-500 hover:text-gray-700">
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                          <div className="mb-6">
                            <h4 className="font-semibold mb-2">Phân Tích Thị Trường Tuần 23/2025</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center">
                                <div className="w-5 h-5 flex items-center justify-center mr-1">
                                  <i className="ri-time-line"></i>
                                </div>
                                <span>19:30 - 21:00, 08/06/2025</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-5 h-5 flex items-center justify-center mr-1">
                                  <i className="ri-user-line"></i>
                                </div>
                                <span>Trần Đức Minh</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Nhận thông báo qua</label>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input type="checkbox" id="notify-email" className="custom-checkbox hidden" />
                                  <label htmlFor="notify-email" className="flex items-center cursor-pointer">
                                    <span className="w-5 h-5 inline-block mr-2 rounded border border-gray-300 flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded"></span>
                                    <span>Email</span>
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" id="notify-browser" className="custom-checkbox hidden" />
                                  <label htmlFor="notify-browser" className="flex items-center cursor-pointer">
                                    <span className="w-5 h-5 inline-block mr-2 rounded border border-gray-300 flex-shrink-0 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded"></span>
                                    <span>Trình duyệt</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Nhắc trước</label>
                              <select id="reminder-time" className="w-full bg-gray-100 border-none rounded-button py-2 px-3 text-gray-700 text-sm">
                                <option value="15">15 phút</option>
                                <option value="30">30 phút</option>
                                <option value="60">1 giờ</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowReminderDialog(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Hủy</button>
                            <button onClick={() => setShowReminderDialog(false)} className="px-4 py-2 text-white bg-primary rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap">Xác Nhận</button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button id="share-btn" onClick={() => setShowShareDialog(true)} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-share-line"></i>
                      </div>
                      Chia Sẻ
                    </button>

                    {/* Share Dialog */}
                    {showShareDialog && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Chia Sẻ Live Stream</h3>
                            <button onClick={() => setShowShareDialog(false)} className="text-gray-500 hover:text-gray-700">
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                          <div className="mb-6">
                            <h4 className="font-semibold mb-2">Phân Tích Thị Trường Tuần 23/2025</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center">
                                <div className="w-5 h-5 flex items-center justify-center mr-1">
                                  <i className="ri-time-line"></i>
                                </div>
                                <span>19:30 - 21:00, 08/06/2025</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025')}`, '_blank')} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                              <i className="ri-facebook-circle-fill text-[#1877F2] text-xl"></i>
                              <span className="text-sm">Facebook</span>
                            </button>
                            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025')}`, '_blank')} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                              <i className="ri-twitter-x-fill text-black text-xl"></i>
                              <span className="text-sm">Twitter</span>
                            </button>
                            <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025')}`, '_blank')} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                              <i className="ri-linkedin-box-fill text-[#0A66C2] text-xl"></i>
                              <span className="text-sm">LinkedIn</span>
                            </button>
                            <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent('TheStockHunters Live Stream')}&body=${encodeURIComponent('https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025')}`, '_blank')} className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                              <i className="ri-mail-fill text-gray-600 text-xl"></i>
                              <span className="text-sm">Email</span>
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div className="relative">
                              <input type="text" id="share-url" value="https://thestockhunters.vn/live/phan-tich-thi-truong-tuan-23-2025" readOnly className="w-full bg-gray-100 rounded-lg py-2 px-3 pr-24 text-sm border-none" />
                              <button onClick={handleCopyUrl} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary text-sm font-medium hover:text-primary/90">{copyText}</button>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                              <i className="ri-qr-code-line text-xl"></i>
                              <span className="text-sm">Tạo mã QR</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <button id="download-btn" onClick={() => setShowDownloadDialog(true)} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-1">
                        <i className="ri-download-line"></i>
                      </div>
                      Tải Tài Liệu
                    </button>

                    {/* Download Dialog */}
                    {showDownloadDialog && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-md p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Tải Tài Liệu</h3>
                            <button onClick={() => { setShowDownloadDialog(false); setSelectedFormat(null); setDownloadEmail(""); setEmailError(false) }} className="text-gray-500 hover:text-gray-700">
                              <i className="ri-close-line text-xl"></i>
                            </button>
                          </div>
                          <div className="mb-6">
                            <h4 className="font-semibold mb-2">Phân Tích Thị Trường Tuần 23/2025</h4>
                            <p className="text-sm text-gray-600">Chọn định dạng tài liệu và nhập email để nhận tài liệu</p>
                          </div>
                          <div className="space-y-4 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Định dạng tài liệu</label>
                              <div className="grid grid-cols-3 gap-3">
                                {["pdf", "pptx", "docx"].map((fmt) => (
                                  <button key={fmt} onClick={() => setSelectedFormat(fmt)} className={`px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 ${selectedFormat === fmt ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                    <i className={`ri-file-${fmt === 'pdf' ? 'pdf' : fmt === 'pptx' ? 'ppt' : 'word'}-line ${fmt === 'pdf' ? 'text-red-500' : fmt === 'pptx' ? 'text-orange-500' : 'text-blue-500'}`}></i>
                                    <span>{fmt.toUpperCase()}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label htmlFor="download-email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <input type="email" id="download-email" value={downloadEmail} onChange={(e) => { setDownloadEmail(e.target.value); setEmailError(false) }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Nhập email của bạn" />
                              {emailError && <p className="text-red-500 text-xs mt-1">Vui lòng nhập email hợp lệ</p>}
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button onClick={() => { setShowDownloadDialog(false); setSelectedFormat(null); setDownloadEmail(""); setEmailError(false) }} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-button text-sm font-medium hover:bg-gray-200 transition whitespace-nowrap">Hủy</button>
                            <button onClick={handleConfirmDownload} className="px-4 py-2 text-white bg-primary rounded-button text-sm font-medium hover:bg-primary/90 transition whitespace-nowrap">Xác Nhận</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Sidebar: Live Chat when live, Recent Videos when not live */}
              <div className="w-full lg:w-1/4">
                {youtubeStatus?.isLive && youtubeStatus.liveVideo ? (
                  /* ── Live Chat (shown only during live stream) ── */
                  <div className="bg-white rounded-lg h-[400px] overflow-hidden flex flex-col">
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <h3 className="font-semibold">Trò Chuyện Trực Tiếp</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                      {[
                        { color: "blue", name: "Nguyễn Minh Tuấn", time: "19:32", msg: "Chào anh Minh, hôm nay anh đánh giá thế nào về cổ phiếu VCB?" },
                        { color: "green", name: "Trần Thị Mai", time: "19:33", msg: "Nhóm ngân hàng tuần này có khả năng tăng không anh?" },
                        { color: "purple", name: "Lê Văn Hùng", time: "19:35", msg: "Anh có thể phân tích thêm về tác động của lãi suất FED đến TTCK Việt Nam không?" },
                        { color: "yellow", name: "Phạm Thị Ngọc", time: "19:37", msg: "Cảm ơn anh vì những phân tích rất chi tiết và hữu ích!" },
                        { color: "red", name: "Đỗ Thanh Tùng", time: "19:39", msg: "Anh đánh giá thế nào về nhóm cổ phiếu bán lẻ trong thời gian tới?" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={`w-8 h-8 rounded-full bg-${m.color}-100 flex items-center justify-center flex-shrink-0`}>
                            <i className={`ri-user-line text-${m.color}-600`}></i>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{m.name}</span>
                              <span className="text-xs text-gray-500">{m.time}</span>
                            </div>
                            <p className="text-sm text-gray-700">{m.msg}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <div className="relative">
                        <input type="text" placeholder="Nhập tin nhắn..." className="w-full py-2 pl-3 pr-10 rounded-full bg-gray-100 text-sm border-none" />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary">
                          <i className="ri-send-plane-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Recent Videos (shown when not live) ── */
                  <div className="bg-white rounded-lg overflow-hidden flex flex-col" style={{ height: "400px" }}>
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <i className="ri-youtube-fill text-red-600"></i>
                        <h3 className="font-semibold text-sm">Video Nổi Bật</h3>
                      </div>
                      <a
                        href="https://www.youtube.com/@TheStockHunters"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Xem tất cả
                      </a>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      {youtubeLoading ? (
                        /* Skeleton loading */
                        <div className="p-3 space-y-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex gap-2 animate-pulse">
                              <div className="w-20 h-14 bg-gray-200 rounded flex-shrink-0"></div>
                              <div className="flex-1 space-y-1.5 py-0.5">
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2.5 bg-gray-200 rounded w-1/2 mt-1"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : youtubeStatus?.recentVideos && youtubeStatus.recentVideos.length > 0 ? (
                        <div className="p-3 space-y-2">
                          {youtubeStatus.recentVideos.map((video) => {
                            const isSelected = selectedVideo?.videoId === video.videoId
                            return (
                              <button
                                key={video.videoId}
                                onClick={() => setSelectedVideo(video)}
                                className={`flex gap-2 group rounded-lg p-1 transition w-full text-left ${
                                  isSelected
                                    ? "bg-primary/10 ring-1 ring-primary/30"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                {/* Thumbnail */}
                                <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                                  {video.thumbnail ? (
                                    <img
                                      src={video.thumbnail}
                                      alt={video.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <i className="ri-youtube-fill text-red-400 text-xl"></i>
                                    </div>
                                  )}
                                  {/* Play icon overlay */}
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                                    <div className={`w-6 h-6 rounded-full bg-white/80 flex items-center justify-center transition ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                      <i className={`ri-play-fill text-xs ${isSelected ? "text-primary" : "text-gray-800"}`}></i>
                                    </div>
                                  </div>
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs font-medium line-clamp-2 transition leading-tight ${isSelected ? "text-primary" : "text-gray-900 group-hover:text-primary"}`}>
                                    {video.title}
                                  </p>
                                  <p className="text-[11px] text-gray-400 mt-1">
                                    {new Date(video.publishedAt).toLocaleDateString("vi-VN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
                          <i className="ri-youtube-fill text-red-400 text-3xl mb-2"></i>
                          <p className="text-sm">Không tải được video.</p>
                          <a
                            href="https://www.youtube.com/@TheStockHunters"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1"
                          >
                            Xem trên YouTube
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Live Streams Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Lịch Live Stream Sắp Tới</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    <span>Thứ 2 - Thứ 6</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative" id="calendar-view-dropdown">
                  <button onClick={(e) => { e.stopPropagation(); setShowCalendarDropdown(!showCalendarDropdown) }} className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 mr-2">
                    <i className="ri-calendar-line"></i>
                  </button>
                  {showCalendarDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700">Chế độ xem</h3>
                      </div>
                      {["month", "week", "day", "list"].map((view) => (
                        <button key={view} onClick={() => { setCalendarView(view); setShowCalendarDropdown(false) }} className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center ${calendarView === view ? 'text-primary font-medium' : 'text-gray-700'}`}>
                          <i className={`${view === 'month' ? 'ri-calendar-line' : view === 'week' ? 'ri-calendar-2-line' : view === 'day' ? 'ri-calendar-event-line' : 'ri-list-check-2'} mr-2`}></i>
                          {view === 'month' ? 'Xem theo tháng' : view === 'week' ? 'Xem theo tuần' : view === 'day' ? 'Xem theo ngày' : 'Xem theo danh sách'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative" id="filter-dropdown">
                  <button onClick={(e) => { e.stopPropagation(); setShowFilterMenu(!showFilterMenu) }} className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200">
                    <i className="ri-filter-3-line"></i>
                  </button>
                  {showFilterMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700">Bộ lọc</h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-2">Chủ đề</h4>
                          <div className="space-y-2">
                            {["Phân tích kỹ thuật", "Phân tích cơ bản", "Tọa đàm"].map((topic) => (
                              <label key={topic} className="flex items-center">
                                <input type="checkbox" className="form-checkbox hidden filter-checkbox" />
                                <span className="w-4 h-4 border border-gray-300 rounded inline-block mr-2 relative"></span>
                                <span className="text-sm">{topic}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-2">Người dẫn</h4>
                          <div className="space-y-2">
                            {["Trần Đức Minh", "Phạm Thị Hương", "Nguyễn Văn Thành"].map((presenter) => (
                              <label key={presenter} className="flex items-center">
                                <input type="checkbox" className="form-checkbox hidden filter-checkbox" />
                                <span className="w-4 h-4 border border-gray-300 rounded inline-block mr-2 relative"></span>
                                <span className="text-sm">{presenter}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 mb-2">Thời gian</h4>
                          <div className="space-y-2">
                            {["Tuần này", "Tháng này", "Tùy chỉnh"].map((time) => (
                              <label key={time} className="flex items-center">
                                <input type="radio" name="time-filter" className="form-radio hidden filter-radio" />
                                <span className="w-4 h-4 border border-gray-300 rounded-full inline-block mr-2 relative"></span>
                                <span className="text-sm">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 flex justify-end space-x-2">
                        <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">Xóa bộ lọc</button>
                        <button onClick={() => setShowFilterMenu(false)} className="px-3 py-1.5 text-sm bg-primary text-white rounded-button hover:bg-primary/90">Áp dụng</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar View */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">{monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-red-100"></span>
                      <span>Phiên Sáng (9:00 - 11:30)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-100"></span>
                      <span>Phiên Chiều (13:00 - 12:45)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-purple-100"></span>
                      <span>Phiên Tối (18:30 - 21:30)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                ))}
              </div>
              {/* Calendar grid — dynamic from Google Calendar */}
              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const year = currentDate.getFullYear()
                  const month = currentDate.getMonth()
                  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
                  const daysInMonth = new Date(year, month + 1, 0).getDate()
                  const prevMonthLastDay = new Date(year, month, 0).getDate()
                  const today = new Date()

                  function eventsForDay(day: number): CalendarEvent[] {
                    return calendarEvents.filter(e => {
                      if (!e.start) return false
                      if (!e.title || !/\S/.test(e.title)) return false
                      const d = new Date(e.start)
                      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
                    })
                  }

                  function eventColor(start: string): { bg: string; text: string } {
                    const hour = new Date(start).getHours()
                    if (hour < 12) return { bg: "bg-red-100", text: "text-red-800" }
                    if (hour < 17) return { bg: "bg-blue-100", text: "text-blue-800" }
                    return { bg: "bg-purple-100", text: "text-purple-800" }
                  }

                  function fmtTime(start: string): string {
                    const d = new Date(start)
                    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
                  }

                  const cells: React.ReactNode[] = []

                  // Previous month trailing days
                  for (let i = 0; i < firstDay; i++) {
                    const d = prevMonthLastDay - firstDay + 1 + i
                    cells.push(
                      <div key={`prev-${d}`} className="h-24 p-1 text-gray-400 border border-gray-100 rounded-lg">
                        <div className="text-sm">{d}</div>
                      </div>
                    )
                  }

                  // Current month days
                  for (let day = 1; day <= daysInMonth; day++) {
                    const isToday =
                      today.getDate() === day &&
                      today.getMonth() === month &&
                      today.getFullYear() === year
                    const dayEvents = eventsForDay(day)
                    const hasEvents = dayEvents.length > 0

                    cells.push(
                      <div
                        key={`day-${day}`}
                        className={`p-1 border border-gray-100 rounded-lg ${hasEvents ? "h-32" : "h-24"} ${isToday ? "bg-blue-50 text-gray-700" : "text-gray-700"}`}
                      >
                        <div className={`text-sm ${isToday ? "font-medium" : ""}`}>{day}</div>
                        {calendarLoading ? (
                          <div className="mt-1 space-y-1">
                            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                          </div>
                        ) : (
                          <div className="space-y-1 mt-1">
                            {dayEvents.map(ev => {
                              const color = eventColor(ev.start)
                              return (
                                <div
                                  key={ev.id}
                                  className={`p-1 ${color.bg} ${color.text} text-xs rounded flex items-center`}
                                  title={ev.title}
                                >
                                  <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
                                    <i className="ri-live-line text-[10px]"></i>
                                  </div>
                                  <div className="truncate">{fmtTime(ev.start)} - {ev.title}</div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }

                  // Next month leading days to complete the last row
                  const totalCells = cells.length
                  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
                  for (let i = 1; i <= remaining; i++) {
                    cells.push(
                      <div key={`next-${i}`} className="h-24 p-1 text-gray-400 border border-gray-100 rounded-lg">
                        <div className="text-sm">{i}</div>
                      </div>
                    )
                  }

                  return cells
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Upcoming Streams from API */}
        {!youtubeLoading && youtubeStatus && !youtubeStatus.isLive && youtubeStatus.upcomingStreams.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-6">
                <i className="ri-youtube-fill text-red-600 text-2xl"></i>
                <h2 className="text-xl font-bold text-gray-900">Lịch Stream Sắp Tới trên YouTube</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {youtubeStatus.upcomingStreams.map((stream) => (
                  <a
                    key={stream.videoId}
                    href={`https://www.youtube.com/watch?v=${stream.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition group"
                  >
                    {stream.thumbnail && (
                      <div className="relative aspect-video">
                        <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <i className="ri-calendar-event-line"></i>
                          <span>SẮP PHÁT</span>
                        </div>
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition mb-1">{stream.title}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(stream.publishedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Notification Subscription */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Đăng Ký Nhận Thông Báo</h2>
              <p className="text-blue-100 mb-8">Nhận thông báo về các buổi live stream mới nhất từ TheStockHunters. Không bỏ lỡ bất kỳ phân tích thị trường quan trọng nào!</p>
              <form className="max-w-md mx-auto flex gap-2 mb-8">
                <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-button text-gray-800 border-none" />
                <button type="submit" className="bg-white text-primary px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition whitespace-nowrap">Đăng Ký</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

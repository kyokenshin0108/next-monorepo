import type { Metadata } from "next"
import { Montserrat, Pacifico } from "next/font/google"
import "@workspace/ui/globals.css"

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  weight: "400",
})

export const metadata: Metadata = {
  title: "TheStockHunters - Cổng thông tin đầu tư chứng khoán hàng đầu",
  description:
    "Nền tảng phân tích chứng khoán hàng đầu Việt Nam với những nhận định sắc bén, phân tích chuyên sâu và chiến lược đầu tư hiệu quả.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </head>
      <body className={`${montserrat.variable} ${pacifico.variable} bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

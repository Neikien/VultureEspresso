"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useBooking } from "@/app/context/BookingContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CustomDatePicker from "@/components/CustomDatePicker";
import RoomListing from "@/components/RoomListing";
import { format, parseISO } from "date-fns";

// --- 1. MOCK DATA ẢNH (Vì backend chưa có ảnh) ---
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
];

const HOTEL_OPTIONS = [
  { id: 1, name: "Hanoi", value: "Hà Nội" },
  { id: 2, name: "Da Nang", value: "Đà Nẵng" },
  { id: 3, name: "Nha Trang", value: "Nha Trang" },
  { id: 4, name: "Da Lat", value: "Đà Lạt" },
  { id: 5, name: "Ho Chi Minh City", value: "TP.HCM" },
];

// Hàm bỏ dấu tiếng Việt
const removeAccents = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
};

// --- COMPONENT HEADER ---
const BookingHeader = ({ onSearch, isLoading }) => {
  const { bookingParams, updateBookingParams } = useBooking();
  const [showCalendar, setShowCalendar] = useState(false);

  const displayDate = (isoDate) => {
    try {
      return format(parseISO(isoDate), "dd/MM/yyyy");
    } catch {
      return isoDate;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white shadow-2xl p-6 md:p-8 mt-[-80px] z-30 border-t-4 border-accent">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Điểm đến */}
        <div className="w-full md:w-1/4 border-r border-gray-200 px-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase">
            Điểm đến
          </label>
          <select
            value={bookingParams.menu}
            onChange={(e) =>
              updateBookingParams({ menu: e.target.value })
            }
            className="w-full text-xl font-serif text-primary outline-none bg-transparent cursor-pointer"
          >
            {HOTEL_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày tháng */}
        <div
          className="w-full md:w-1/3 border-r border-gray-200 px-4 relative cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <label className="text-[10px] font-bold text-gray-400 uppercase">
            Ngày đi — Ngày về
          </label>
          <div className="text-xl font-serif text-primary">
            {displayDate(bookingParams.checkInDate)}{" "}
            <span className="text-accent">→</span>{" "}
            {displayDate(bookingParams.checkOutDate)}
          </div>
          {showCalendar && (
            <div
              className="absolute top-full left-0 mt-4 z-50 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CustomDatePicker
                checkInDate={displayDate(bookingParams.checkInDate)}
                checkOutDate={displayDate(bookingParams.checkOutDate)}
                onDateChange={(inStr, outStr) => {
                  const [d1, m1, y1] = inStr.split("/");
                  const [d2, m2, y2] = outStr.split("/");
                  updateBookingParams({
                    checkInDate: `${y1}-${m1}-${d1}`,
                    checkOutDate: `${y2}-${m2}-${d2}`,
                  });
                }}
              />
            </div>
          )}
        </div>

        {/* Nút Tìm Kiếm - CÓ LOG MỖI KHI CLICK */}
        <button
          onClick={() => {
            console.log("👉 Đã bấm nút TÌM KIẾM!");
            onSearch();
          }}
          disabled={isLoading}
          className="px-10 py-4 bg-primary text-white font-bold uppercase hover:bg-gray-800 transition-all disabled:bg-gray-400 min-w-[150px]"
        >
          {isLoading ? "Đang tải..." : "Tìm kiếm"}
        </button>
      </div>
    </div>
  );
};

// --- TRANG CHÍNH ---
export default function BookingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { bookingParams } = useBooking();

  const [roomsData, setRoomsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearch = async () => {
    // 1. Alert để chắc chắn hàm đang chạy
    // alert("Bắt đầu tìm kiếm! Hãy xem Console (F12)");

    setLoading(true);
    setRoomsData([]);
    setSearchStatus("Đang tải dữ liệu...");

    console.log("🔵 --- BẮT ĐẦU QUÁ TRÌNH TÌM KIẾM ---");
    console.log("📍 Điểm đến đang chọn:", bookingParams.menu);

    try {
      // API HOTELS
      console.log("📡 1. Gọi API lấy danh sách khách sạn...");
      const hotelsRes = await fetch(
        "https://khachsan-backend-production-9810.up.railway.app/hotels/?skip=0&limit=100"
      );

      if (!hotelsRes.ok) {
        throw new Error(`Lỗi API Hotels: ${hotelsRes.status}`);
      }

      const hotels = await hotelsRes.json();
      console.log(`✅ API Hotels trả về ${hotels.length} khách sạn.`);

      // LOC HOTEL
      const keyword = removeAccents(bookingParams.menu);
      console.log(`🔎 Từ khóa tìm kiếm (đã bỏ dấu): "${keyword}"`);

      const matchedHotel = hotels.find((h) => {
        const diaChi = removeAccents(h.DiaChi);
        const tenKS = removeAccents(h.TenKS);
        const match = diaChi.includes(keyword) || tenKS.includes(keyword);
        // console.log(`   - So sánh với KS: ${h.TenKS} (${diaChi}) -> ${match ? "KHỚP" : "Không"}`);
        return match;
      });

      let roomsUrl = "";
      if (matchedHotel) {
        console.log(
          `🏨 Đã chọn được khách sạn: ${matchedHotel.TenKS} (ID: ${matchedHotel.MaKS})`
        );
        setSelectedHotel(matchedHotel);
        roomsUrl = `https://khachsan-backend-production-9810.up.railway.app/rooms/?hotel_id=${matchedHotel.MaKS}`;
      } else {
        console.warn(
          `⚠️ Không khớp khách sạn nào. Dùng chế độ FALLBACK (Lấy 20 phòng bất kỳ).`
        );
        setSearchStatus(
          `Không tìm thấy KS tại ${bookingParams.menu}. Gợi ý phòng khác:`
        );
        // Fallback để luôn hiện phòng
        roomsUrl = `https://khachsan-backend-production-9810.up.railway.app/rooms/?skip=0&limit=20`;
      }

      // API ROOMS
      console.log(`📡 2. Gọi API lấy phòng: ${roomsUrl}`);
      const roomsRes = await fetch(roomsUrl);
      if (!roomsRes.ok) throw new Error(`Lỗi API Rooms: ${roomsRes.status}`);

      const rawRooms = await roomsRes.json();
      console.log(`📦 API trả về ${rawRooms.length} phòng.`);

      // FORMAT DATA & THÊM ẢNH MOCK
      const validRooms = rawRooms.filter((r) => r.TinhTrang === "Trống");
      console.log(
        `✅ Sau khi lọc 'Trống', còn lại: ${validRooms.length} phòng.`
      );

      if (validRooms.length === 0) {
        setSearchStatus("Rất tiếc, không có phòng trống nào.");
        setRoomsData([]);
      } else {
        const formattedRooms = validRooms.map((room) => {
          // Logic chọn ảnh mock cố định theo ID
          const imgIndex = room.MaPhong % MOCK_IMAGES.length;

          return {
            id: room.MaPhong,
            name: room.TenPhong || room.LoaiPhong || `Phòng ${room.MaPhong}`,
            price: room.GiaPhong,
            image: room.HinhAnh || MOCK_IMAGES[imgIndex], // Dùng ảnh Mock nếu thiếu
            desc:
              room.MoTa || "Phòng tiện nghi, view đẹp, dịch vụ chuẩn quốc tế.",
            MaPhong: room.MaPhong,
            status: room.TinhTrang,
          };
        });

        console.log("🎨 Dữ liệu hiển thị lên Frontend:", formattedRooms);
        setRoomsData(formattedRooms);
        setSearchStatus("");
      }
    } catch (error) {
      console.error("❌ LỖI:", error);
      setSearchStatus(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setLoading(false);
      console.log("🏁 --- KẾT THÚC QUÁ TRÌNH TÌM KIẾM ---");
    }
  };

  const handleBookRoom = (room) => {
    if (!user) {
      alert("Vui lòng sign in để đặt phòng!");
      return;
    }
    router.push(`/booking/checkout?roomId=${room.MaPhong}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920"
          fill
          className="object-cover opacity-60"
          alt="Hero"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-serif text-5xl md:text-6xl text-center px-4">
          {selectedHotel ? selectedHotel.TenKS : "Đặt Phòng Trực Tuyến"}
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 mb-20">
        <BookingHeader onSearch={handleSearch} isLoading={loading} />
      </div>

      <main className="max-w-[1320px] mx-auto px-5 pb-24">
        <div className="mb-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Home &gt; Booking &gt;{" "}
          <span className="text-primary">{bookingParams.menu}</span>
        </div>

        {searchStatus && (
          <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
            {searchStatus}
          </div>
        )}

        {/* LIST PHÒNG */}
        {roomsData.length > 0 ? (
          <RoomListing rooms={roomsData} onBookRoom={handleBookRoom} />
        ) : (
          !loading && (
            <div className="text-center py-20 border border-dashed border-gray-200">
              <p className="text-gray-400 font-serif text-xl">
                Vui lòng bấm nút "Tìm kiếm" để xem danh sách phòng.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}

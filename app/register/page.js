"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiService"; // Đảm bảo import đúng đường dẫn

export default function RegisterPage() {
  const router = useRouter();

  // State chứa dữ liệu form
  const [formData, setFormData] = useState({
    HoTen: "",
    Email: "",
    SDT: "",
    DiaChi: "",
    CCCD: "",
    MatKhau: "",
    ConfirmMatKhau: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 1. Kiểm tra mật khẩu khớp nhau
    if (formData.MatKhau !== formData.ConfirmMatKhau) {
      setError("Mật khẩu xác nhận không khớp!");
      setIsLoading(false);
      return;
    }

    try {
      console.log("📤 Đang gửi form:", formData);

      // 2. Gọi API Service (Toàn bộ logic khó nằm ở đây)
      await apiService.register(formData);

      // 3. Thành công
      alert("Sign up thành công! Đang chuyển về trang chủ...");
      router.push("/"); // Hoặc router.push("/login")
    } catch (err) {
      console.error("Lỗi sign up:", err);
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="relative w-full max-w-[1000px] bg-white shadow-2xl flex rounded-lg overflow-hidden animate-fade-in-up">
        {/* CỘT TRÁI: ẢNH */}
        <div className="hidden lg:block w-5/12 relative min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
            alt="Register Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-10 left-8 text-white p-4">
            <h3 className="font-serif text-3xl mb-2">Join Us</h3>
            <p className="text-sm opacity-90">
              Bắt đầu hành trình nghỉ dưỡng đẳng cấp.
            </p>
          </div>
        </div>

        {/* CỘT PHẢI: FORM */}
        <div className="w-full lg:w-7/12 p-8 lg:p-12">
          <h2 className="font-serif text-3xl text-primary mb-2">
            Tạo Tài Khoản
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Điền thông tin để sign up thành viên.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border-l-4 border-red-500 rounded font-medium">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Họ Tên */}
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Họ Tên
              </label>
              <input
                type="text"
                name="HoTen"
                required
                value={formData.HoTen}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="Nguyễn Văn A"
              />
            </div>

            {/* Email */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                name="Email"
                required
                value={formData.Email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="email@example.com"
              />
            </div>

            {/* Số Điện Thoại (Sửa name="SDT" cho khớp state) */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                name="SDT"
                required
                value={formData.SDT}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="0912..."
              />
            </div>

            {/* CCCD */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                CCCD / CMND
              </label>
              <input
                type="text"
                name="CCCD"
                required
                value={formData.CCCD}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="Số căn cước"
              />
            </div>

            {/* Địa chỉ */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Địa Chỉ
              </label>
              <input
                type="text"
                name="DiaChi"
                value={formData.DiaChi}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="Hà Nội"
              />
            </div>

            {/* Mật Khẩu */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Mật Khẩu
              </label>
              <input
                type="password"
                name="MatKhau"
                required
                value={formData.MatKhau}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="******"
              />
            </div>

            {/* Xác nhận MK */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Xác nhận MK
              </label>
              <input
                type="password"
                name="ConfirmMatKhau"
                required
                value={formData.ConfirmMatKhau}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:border-accent outline-none"
                placeholder="******"
              />
            </div>

            {/* Nút Submit */}
            <div className="col-span-2 mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 rounded shadow-lg"
              >
                {isLoading ? "Đang xử lý..." : "Sign Up Now"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Đã có tài khoản? </span>
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign in tại đây
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

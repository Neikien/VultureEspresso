"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_URL = "https://khachsan-backend-production-9810.up.railway.app";

// --- HÀM GIẢI MÃ TOKEN (JWT) ---
// Giúp lấy thông tin user trực tiếp từ token mà không cần gọi API
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Lỗi giải mã Token:", e);
    return null;
  }
}

export default function LoginModal({ isOpen, onClose }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("🚀 [LOGIN] Bắt đầu...");

    try {
      // 1. GỌI API LOGIN
      const params = new URLSearchParams();
      params.append("username", formData.email.trim());
      params.append("password", formData.password);
      params.append("grant_type", "password");

      const resLogin = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params,
      });

      const dataLogin = await resLogin.json();
      console.log("📥 Server trả về:", dataLogin);

      if (!resLogin.ok) {
        throw new Error(dataLogin.detail || "Sai tài khoản hoặc mật khẩu");
      }

      // 2. XỬ LÝ TOKEN & LẤY THÔNG TIN
      if (dataLogin.access_token) {
        const token = dataLogin.access_token;

        // A. Lưu Token
        localStorage.clear();
        localStorage.setItem("access_token", token);
        console.log("✅ Đã lưu Token.");

        // B. Giải mã Token để lấy thông tin (Bỏ qua API /auth/info bị lỗi)
        const decoded = parseJwt(token);
        console.log("🔓 Thông tin giải mã từ Token:", decoded);

        // C. Tạo object User từ thông tin có được
        // Lưu ý: dataLogin.user có thể có sẵn (nếu backend trả về)
        // Nếu không, ta dùng thông tin từ token (sub thường là id hoặc username)
        const userInfo = {
          id: decoded?.sub || decoded?.id || dataLogin?.user?.id || 0,
          email: formData.email, // Lấy từ form cho chắc
          name:
            decoded?.name ||
            dataLogin?.user?.fullname ||
            formData.email.split("@")[0],
          role: decoded?.role || "user",
        };

        // D. Lưu User
        localStorage.setItem("user", JSON.stringify(userInfo));
        console.log("👤 Đã lưu User:", userInfo);

        alert("🎉 sign in thành công!");

        // E. Reload trang để App nhận diện
        window.location.href = "/";
      } else {
        throw new Error("Không nhận được Token từ Server");
      }
    } catch (err) {
      console.error("❌ Lỗi:", err);
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-[900px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[600px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Cột Trái: Ảnh */}
        <div className="hidden lg:block w-1/2 relative">
          <Image
            src="https://phuquoc.regenthotels.com/sites/rpq/files/styles/height_1400/public/homepage/shutterstock_1446827465_1%20%281%29_0.jpg?itok=ZSXjz5zI"
            alt="Login Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="font-serif text-3xl">Welcome Back</h3>
            <p className="text-xs tracking-[2px] opacity-90 uppercase mt-2">
              Luxury Hotel Collection
            </p>
          </div>
        </div>

        {/* Cột Phải: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="font-serif text-3xl text-primary mb-2">Sign In</h2>
          <p className="text-gray-500 text-sm mb-6">
            Access your member benefits.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border-b border-gray-300 py-3 text-base text-primary outline-none focus:border-accent font-serif bg-transparent"
            />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-b border-gray-300 py-3 text-base text-primary outline-none focus:border-accent font-serif bg-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 text-xs font-bold tracking-[2px] uppercase hover:bg-gray-800 transition-all mt-4 disabled:opacity-70 shadow-lg"
            >
              {isLoading ? "Verifying..." : "SIGN IN"}
            </button>
          </form>

          <div className="mt-6 text-center flex justify-between text-xs text-gray-400">
            <Link
              href="/forgot-password"
              className="hover:text-primary transition"
            >
              Forgot Password?
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className="hover:text-primary transition font-bold text-primary"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

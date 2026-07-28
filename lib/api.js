const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://khachsan-backend-production-9810.up.railway.app";

const getAuthHeaders = (tokenOverride = null) => {
  let token = tokenOverride;
  if (!token && typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  token = token ? token.trim() : "";

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

// --- HÀM LOGIN ĐÃ SỬA (BỎ AUTO-CREATE CUSTOMER) ---
export async function login(emailOrUsername, password) {
  const username = emailOrUsername.includes("@")
    ? emailOrUsername.split("@")[0]
    : emailOrUsername;

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("grant_type", "password");

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Sai tài khoản hoặc mật khẩu");
  }

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);

    try {
      const userProfile = await getProfile(data.access_token);
      localStorage.setItem("user", JSON.stringify(userProfile));

      // ❌ ĐÃ XÓA: Không tự động tạo Customer Profile ở đây nữa.
      // Để tránh việc tạo profile rỗng trước khi kịp lưu SĐT/CCCD.

      return { ...data, user: userProfile };
    } catch (error) {
      console.error("Lỗi lấy thông tin User:", error.message);
      return data;
    }
  }

  return data;
}

// --- HÀM REGISTER (GIỮ NGUYÊN COMBO 3 BƯỚC) ---
export async function register(userData) {
  console.log("🚀 Bắt đầu quy trình sign up...");

  // 1. Chuẩn bị dữ liệu
  const emailRaw = userData.Email || "";
  const passwordRaw = userData.MatKhau || "";
  const fullnameRaw = userData.HoTen || "";

  const email = emailRaw.trim();
  const username = email.includes("@") ? email.split("@")[0] : email;

  // --- BƯỚC 1: TẠO USER ---
  const userPayload = {
    username: username,
    password: passwordRaw,
    email: email,
    fullname: fullnameRaw,
  };

  try {
    const signupResponse = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });

    if (!signupResponse.ok) {
      const errorData = await signupResponse.json().catch(() => ({}));
      throw new Error(errorData.detail || "Sign up failed");
    }
    console.log("✅ B1: Tạo User thành công.");

    // --- BƯỚC 2: LOGIN ---
    console.log("🔄 B2: Đang đăng nhập...");
    const loginData = await login(email, passwordRaw);

    if (!loginData || !loginData.access_token) {
      throw new Error("Sign up xong nhưng không thể đăng nhập tự động.");
    }

    const token = loginData.access_token;
    const userId = loginData.user.id;
    console.log("✅ B2: Đăng nhập thành công. User ID:", userId);

    // --- BƯỚC 3: TẠO CUSTOMER (QUAN TRỌNG) ---
    // Bây giờ Login không tạo rác nữa, nên bước này sẽ tạo Customer chuẩn xịn
    console.log("📝 B3: Đang lưu SĐT, CCCD...");

    const customerPayload = {
      user_id: userId,
      full_name: fullnameRaw,
      email: email,
      phone: userData.SDT || "",
      address: userData.DiaChi || "",
      identification_number: userData.CCCD || "",
    };

    const customerResponse = await fetch(`${API_URL}/customers/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerPayload),
    });

    if (!customerResponse.ok) {
      // Nếu lỗi 400 có thể do Customer đã tồn tại (rất hiếm khi xảy ra nữa)
      console.warn("⚠️ Không thể tạo Customer Profile chi tiết.");
    } else {
      console.log("✅ B3: Lưu thông tin khách hàng thành công!");
    }

    return loginData;
  } catch (error) {
    console.error("❌ Lỗi quy trình sign up:", error);
    throw error;
  }
}

// ----------------------------------------------
// Các hàm dưới giữ nguyên
// ----------------------------------------------

export async function getProfile(token = null) {
  const headers = getAuthHeaders(token);
  const response = await fetch(`${API_URL}/auth/info`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Lỗi xác thực");
  return response.json();
}

export async function updateUserProfile(userData) {
  const response = await fetch(`${API_URL}/auth/update`, {
    method: "PATCH",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Update thất bại");
  return response.json();
}

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Lỗi lấy danh sách customers");
  return response.json();
}

export async function getCustomerProfile() {
  try {
    const userInfo = await getProfile();
    const customers = await getCustomers();
    // Logic tìm customer của chính user này
    const customer = customers.find((c) => c.user_id === userInfo.id);
    return customer || null;
  } catch (error) {
    console.error("Lỗi lấy customer profile:", error);
    return null;
  }
}

export async function getMyCustomerProfile() {
  const response = await fetch(`${API_URL}/customers/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Lỗi lấy customer profile");
  }
  return response.json();
}

export async function createCustomerProfile(customerData) {
  const response = await fetch(`${API_URL}/customers/`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Tạo customer thất bại");
  }
  return response.json();
}

export async function updateCustomerProfile(customerId, customerData) {
  const response = await fetch(`${API_URL}/customers/${customerId}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) throw new Error("Cập nhật thất bại");
  return response.json();
}

// Hàm này vẫn giữ để dùng cho trường hợp khác (ví dụ lúc đặt phòng)
// Nhưng KHÔNG gọi nó trong Login nữa
export async function getOrCreateCustomerProfile(token = null) {
  try {
    let customer = await getCustomerProfile();
    if (!customer) {
      const userInfo = await getProfile(token);
      const defaultCustomerData = {
        user_id: userInfo.id,
        full_name: userInfo.fullname || userInfo.username,
        email: userInfo.email,
        phone: "",
        address: "",
        identification_number: "",
      };
      customer = await createCustomerProfile(defaultCustomerData);
    }
    return customer;
  } catch (error) {
    console.error("Lỗi getOrCreate:", error);
    throw error;
  }
}

export async function checkCustomerProfileExists() {
  const customer = await getCustomerProfile();
  return customer !== null;
}

export const createBooking = async (bookingData) => {
  const hasCustomerProfile = await checkCustomerProfileExists();
  if (!hasCustomerProfile) {
    throw new Error("Vui lòng cập nhật thông tin cá nhân trước khi đặt phòng");
  }

  const response = await fetch(`${API_URL}/bookings/`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Đặt phòng thất bại");
  }
  return response.json();
};

export async function getHotels() {
  const response = await fetch(`${API_URL}/hotels/`);
  return response.json();
}

export async function getRooms() {
  const response = await fetch(`${API_URL}/rooms/`);
  return response.json();
}

export const getRoomsByHotel = async (hotelId) => {
  const response = await fetch(`${API_URL}/rooms/?hotel_id=${hotelId}`);
  return response.json();
};

export async function getBookings() {
  const response = await fetch(`${API_URL}/bookings/`, {
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getBooking(bookingId) {
  const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
    headers: getAuthHeaders(),
  });
  return response.json();
}

export async function getServices() {
  const response = await fetch(`${API_URL}/services/`);
  return response.json();
}

export async function askChatbot(question) {
  const response = await fetch(`${API_URL}/chatbot/chatbot/ask`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });
  if (!response.ok) throw new Error("Lỗi chatbot");
  return response.json();
}

export const apiService = {
  login,
  register,
  getProfile,
  updateUserProfile,
  getCustomerProfile,
  createCustomerProfile,
  updateCustomerProfile,
  getOrCreateCustomerProfile,
  checkCustomerProfileExists,
  getCustomers,
  getHotels,
  getRooms,
  getRoomsByHotel,
  createBooking,
  getBookings,
  getBooking,
  getServices,
  askChatbot,
};

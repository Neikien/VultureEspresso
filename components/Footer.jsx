// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-400 py-16 mt-auto">
      {/* mt-auto để footer luôn nằm dưới cùng dù nội dung ngắn */}
      <div className="max-w-[90%] mx-auto flex flex-col lg:flex-row justify-between gap-10">
        <div>
          <h3 className="font-serif text-2xl text-white mb-4">
            Vulture St. Espresso
          </h3>
          <p className="text-sm font-light">Green Cafe</p>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-white font-serif mb-4 text-sm">Help</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About us
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-4 border-t border-slate-700 mt-4">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 gap-2 px-2">
        <p className="text-sm text-slate-400">
          <FaHeart className="text-md text-red-600" /> made by Arun. Copyright © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

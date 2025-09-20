"use client";

import React from "react";
import { Github, Twitter, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const links = {
    Product: [
      { name: "Documentation", href: "#" },
      { name: "Components", href: "#" },
      { name: "Examples", href: "#" },
      { name: "Blocks", href: "#" },
    ],
    Resources: [
      { name: "GitHub", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Discord", href: "#" },
      { name: "Changelog", href: "#" },
    ],
    Community: [
      { name: "Discord", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Discussions", href: "#" },
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
       
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          Logo and Description 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="text-xl font-bold">OaZ</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Beautifully designed components that you can copy and paste into your apps. 
              Accessible. Customizable. Open Source.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

           Links 
          {Object.entries(links).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>  */}


        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          // 좌우 컬럼이 서로 높이에 영향 안 받도록: items-start + gap
          className="mt-2 pt-2 flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8"
        >
          {/* LEFT */}
          <div className="text-gray-600 text-sm">
            <p className="text-gray-600 text-sm flex items-center">
              Built with <Heart className="w-4 h-4 text-red-500 mx-1" /> by{" "}
              <a href="#" className="font-medium text-gray-900 ml-1 hover:underline">
                OaZ
              </a>
            </p>
            <p>2025 Ver. Created by 이유민, 정호연, 신석민, 박유림</p>
            <p className="mt-2">서울특별시 성북구 안암로 145, 고려대학교 신공학관 106B</p>
            <p>koreaoaz@gmail.com</p>
          </div>

          {/* RIGHT */}
          <div className="w-full sm:w-auto">
            <p className="text-gray-950 text-base font-bold">회장</p>
            <p className="text-gray-600 text-sm mt-2">박지우 010-2863-0604</p>

            <p className="text-gray-950 text-base font-bold mt-4">부회장</p>
            <p className="text-gray-600 text-sm mt-2">김령환 010-7741-0719</p>

            {/* 소셜 아이콘 행 */}
            <div className="mt-4 flex justify-end gap-3">

              {/* GitHub */}
              <a
                href="https://github.com/koreaoaz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md hover:border-gray-300 hover:bg-gray-50 transition"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
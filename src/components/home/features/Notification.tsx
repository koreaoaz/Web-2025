"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Notification() {
  const [Notifications, setNotifications] = useState<string[]>([]);

  const fetchNotifications = async () => {
    const {data, error} = await supabase
    .from("editor_0_noti")
    .select("text")
    .order("created_at",{ascending:false})
    .limit(5);
    
    if(error){
      console.error("error loading noti");
      return;
    }

    if(data){
      setNotifications(data.map((item) => item.text));
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 본문 영역 */}
      <ul className="px-4 py-25 text-sm text-gray-800 list-disc list-inside space-y-2">
        {Notifications.map((item, index) => (
          <li
            key={index}
            className="truncate whitespace-nowrap overflow-hidden"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

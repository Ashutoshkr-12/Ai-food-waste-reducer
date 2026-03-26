"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import Header from "@/components/Header";

const dummyItems = [
  {
    id: 1,
    name: "Milk",
    expiry_date: "2026-03-27",
  },
  {
    id: 2,
    name: "Tomato",
    expiry_date: "2026-03-28",
  },
  {
    id: 3,
    name: "Cheese",
    expiry_date: "2026-03-26",
  },
];

export default function NotificationsPage() {

  const [items, setItems] = useState<any[]>([])

  useEffect(() => {

    setItems(dummyItems)

  }, [])


  return (
    <>
<Header showBack title="Notifcations"/>
    <div className="max-w-md mx-auto p-4">
        
      <h1 className="text-xl font-bold mb-4">
        Expiring Soon
      </h1>


      {items.length === 0 && (
        <p>No items expiring</p>
      )}


      {items.map((item) => (

        <div
          key={item.id}
          className="border rounded-xl p-3 mb-3"
        >

          <h3 className="font-semibold">
            {item.name}
          </h3>

          <p className="text-sm text-gray-500">
            expires: {item.expiry_date}
          </p>

        </div>

      ))}

    </div>
</>
  )

}
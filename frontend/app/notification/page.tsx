"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header";

const dummyItems = [
  {
    id: 1,
    name: "Milk",
    expiry_date: "2026-03-27",
    image_url: "https://t4.ftcdn.net/jpg/05/35/38/81/360_F_535388138_vrJV0SoQBPc6oUyHeIFQkw8nFaH1GP3O.jpg"
  },
  {
    id: 2,
    name: "Tomato",
    expiry_date: "2026-03-28",
    image_url: "https://t4.ftcdn.net/jpg/05/72/95/29/360_F_572952963_YNVwHoPX0FWaENu6jShGiYpIICS3W1cc.jpg"
  },
  {
    id: 3,
    name: "Cheese",
    expiry_date: "2026-03-26",
    image_url: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlfGVufDB8fDB8fHww"
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
          className="border rounded-xl p-3 mb-3 flex gap-3"
        >
          <div className="w-14 h-14  flex items-center rounded-full">
         <img 
  src={item.image_url} 
  alt={item.name} 
  className="w-14 h-14 object-cover rounded-full"
/>
          </div>
          <div>

          <h3 className="font-semibold">
            {item.name}
          </h3>

          <p className="text-sm text-gray-500">
            expires: {item.expiry_date}
          </p>
          </div>

        </div>

      ))}

    </div>
</>
  )

}
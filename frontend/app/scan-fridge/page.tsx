"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Camera, Loader2, Check } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { scanFridge } from "@/lib/api/scan";
import Image from "next/image";
import IngredientCard from "@/components/IngredientCard";
import { fetchImage } from "@/lib/api/fetchImage";
import { useRef } from "react";
import { saveFridge } from "@/lib/api/fridge";
import { Detection } from "@/lib/types/types";


export default function ScanFridge() {
  const navigate = useRouter();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [annotated, setAnnotated] = useState<string | null>(null);
  const [items, setItems] = useState<Detection[]>([]);
  const [scanId, setScanId] = useState<number>()
  const [hasScanned, setHasScanned] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef<any>(null);


  const mergeDuplicates = (detections: any[]) => {
    const map: any = {};

    detections.forEach((d) => {
      const name = d.item;
      if (!map[name]) {
        map[name] = {
          ...d,
          quantity: 0,
        };
      }
      map[name].quantity += 1;
    });
    return Object.values(map);
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        item: "",
        confidence: 0,
        quantity: 1,
        expiry_days: "",
        image_url: "",
      },
    ]);
  };

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setHasScanned(false);
    setAnnotated(null);

    const url = URL.createObjectURL(file);
    setPreview(url);
    setIsScanning(true);

   try {
  const token = await getToken();
  const data = await scanFridge(file, token as string);
  setScanId(data.id)

  console.log("API:", data.scan_result);
  const merged = mergeDuplicates(
    data.scan_result.detections
  ) as Detection[];

  setItems(merged || []);

  if (data.scan_result.annotated_image) {
    setAnnotated(
      `data:image/jpeg;base64,${data.scan_result.annotated_image}`
    );
  }
} catch (err: any) {
  setError(err.message);
}finally {
      setIsScanning(false);
      setHasScanned(true);
    }
  };

const editItem = async (
  index: number,
  field: string,
  value: any
) => {

  const token = await getToken()
  const updated = [...items];

  //@ts-ignore
  updated[index][field] = value;
  setItems(updated);
  if (field === "item") {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async () => {

      const img = await fetchImage(value,token!);

      const updated2 = [...items];

      updated2[index].image_url = img;

      setItems(updated2);

    }, 600); 
  }
};

function convertToIngredient(item: any) {

  return {
    id: item.id,
    title: item.item,
    quantity: item.quantity || 1,
    expiry_days: item.expiry_days,
    image_url: item.image_url,
    confidence: item.confidence,
  };
}

const sendItemToFridge = async() => {
  setLoading(true)
  try {
    // console.log("times:",items)
    const token = await getToken();

    const getExpiryDate = (days: string) => {
    const d = new Date();
    const expiryDate = new Date(d)
    expiryDate.setDate(expiryDate.getDate() + Number(days) );
    return expiryDate.toISOString().split("T")[0];
};

    if(items){
       const payload = items.map((i) => ({
      name: i.item,
      quantity: i.quantity || 1,
      expiry_date: getExpiryDate(i.expiry_days),
      image_url: i.image_url,
      scan_id: scanId,
    }))
    // console.log("payload:",payload)
    await saveFridge(payload,token!);
    navigate.push("/my-fridge");
    }
  } catch (err: any) {
    setError(err?.message)
  } finally{
    setLoading(false)
  }
}

if(loading){ 
  <div className="w-full h-screen flex items-center justify-center">
    <span className="loader"></span>
  </div>
}

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Scan Fridge" showBack />
      <div className="max-w-md mx-auto px-4 py-6">
        {/* upload */}
        {!hasScanned && !isScanning && (
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-neutral-300 text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Scan Your Fridge</h2>
            <div className="flex flex-col gap-3">
              <Button className="relative">
                Take Photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="absolute inset-0 opacity-0"
                  onChange={handleScan}
                />
              </Button>
              <Button variant="outline" className="relative">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0"
                  onChange={handleScan}
                />
              </Button>
            </div>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
        {/* scanning */}
        {isScanning && (
          <div className="bg-white rounded-3xl p-6 text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              <Image
                src={annotated ? annotated : preview || ""}
                alt="scan"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-green-500/20 animate-pulse rounded-2xl" />
            </div>
            <Loader2 className="animate-spin mx-auto" />
            <p>Scanning...</p>
          </div>
        )}
        {/* results */}
        {hasScanned && items.length > 0 && (
          <div className="bg-white rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Check className="text-green-600" />
              <h2>{items.length} items detected</h2>
            </div>
            {/* annotated image */}
            {annotated && (
              <div className="mb-4">
                <Image
                  src={annotated}
                  alt="annotated"
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
              </div>
            )}
            {/* edit list */}
            <div className="space-y-3">
              {items.map((item, i) => {
                const ingredient = convertToIngredient(item);
                return( 
                  <IngredientCard key={i} ingredient={ingredient} index={i} onEdit={editItem} />
                )
              })}
              {/* add button */}
              <button
                onClick={addItem}
                className="w-full bg-blue-500 text-white p-2 rounded-xl"
              >
                + Add Item
              </button>
            </div>
            <Button
              className="w-full mt-4"
              onClick={sendItemToFridge}
            >
              {loading ? <>saving to fridge...</> : <>  Add to fridge</>}
            
            </Button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
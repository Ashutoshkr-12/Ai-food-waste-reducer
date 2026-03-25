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

type Detection = {
  image_url: string | undefined;
  expiry_date: any;
  quantity?: number;
  item: string;
  confidence?: number;
  bbox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export default function ScanFridge() {
  const navigate = useRouter();
  const { getToken } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [annotated, setAnnotated] = useState<string | null>(null);
  const [items, setItems] = useState<Detection[]>([]);
  const [hasScanned, setHasScanned] = useState(false);
  const [error, setError] = useState("");

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
        expiry_date: "",
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

  // console.log("API:", data);

  const merged = mergeDuplicates(
    data.detections
  ) as Detection[];

  setItems(merged || []);

  if (data.annotated_image) {
    setAnnotated(
      `data:image/jpeg;base64,${data.annotated_image}`
    );
  }

} catch (err: any) {
  setError(err.message);
}finally {
      setIsScanning(false);
      setHasScanned(true);
    }
  };

  const editItem = (
  index: number,
  field: string,
  value: any
) => {

  const updated = [...items];
 // @ts-ignore
  updated[index][field] = value;

  setItems(updated);
};

function convertToIngredient(item: any) {

  const today = new Date();

  const expiry = new Date(item.expiry_date);

  const diff = Math.ceil(
    (expiry.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return {
    id: item.id,
    title: item.item,
    quantity: item.quantity || 1,
    expiry_date: diff,
    image_url: item.image_url,
    confidence: item.confidence,
  };
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
              onClick={() => navigate.push("/my-fridge")}
            >
              Add to fridge
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

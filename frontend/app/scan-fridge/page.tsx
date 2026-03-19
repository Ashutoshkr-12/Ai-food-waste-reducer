"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Camera, Upload, Loader2, Check } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { scanFridge } from "@/lib/api/scan";
import Image from "next/image";
import { ScanItem } from "@/lib/types/types";

export default function ScanFridge() {
  const navigate = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<ScanItem[]>([]);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanId, setScanId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    setIsScanning(true);
    setHasScanned(false);

    try {
      const token = await getToken();
      const data = await scanFridge(selectedFile, token as string);
      if (data) {
        setScannedItems(data.scan_result);
      }
      console.log("data:", data.scan_result);
    } catch (err: any) {
      setError(err.message);
      // console.log("error in fetching scan-data:",error.message)
    } finally {
      setIsScanning(false);
      setHasScanned(true);
    }
  };

  const handleAddToFridge = () => {
    navigate.push("/my-fridge");
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header title="Scan Fridge" showBack />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Upload Area */}
        {!hasScanned && !isScanning && (
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-neutral-300 text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Scan Your Fridge
            </h2>
            <p className="text-neutral-600 mb-6">
              Take a photo of your fridge and let AI detect all ingredients
            </p>

            <div className="flex flex-col gap-3">
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 rounded-full">
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  placeholder="Take Photo"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleScan}
                />
              </Button>

              <Button variant="outline" className="w-full h-12 rounded-full">
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScan}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer "
                />
              </Button>
            </div>
          </div>
        )}
        {error && (
          <div className="w-full h-full text-red-500 font-bold text-xl">
            {error}
          </div>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              <Image
                src={preview ? preview : ""}
                alt="Scanning"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-green-600/20 rounded-2xl animate-pulse" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
              <span className="text-lg font-medium text-neutral-900">
                AI Scanning in Progress...
              </span>
            </div>

            <p className="text-neutral-600">
              Detecting ingredients and analyzing freshness
            </p>
          </div>
        )}

        {/* Results */}
        {hasScanned && scannedItems.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {scannedItems.length} Items Detected
                </h2>
                <p className="text-sm text-neutral-600">
                  Review and edit below
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {scannedItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-50 rounded-xl space-y-2"
                >
                  {/* name */}
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...scannedItems];
                      updated[index].name = e.target.value;
                      setScannedItems(updated);
                    }}
                  />

                  {/* quantity */}
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={item.quantity}
                    onChange={(e) => {
                      const updated = [...scannedItems];
                      updated[index].quantity = Number(e.target.value);
                      setScannedItems(updated);
                    }}
                  />

                  {/* expiry */}
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2"
                    value={item.expiry_date}
                    onChange={(e) => {
                      const updated = [...scannedItems];
                      updated[index].expiry_date = e.target.value;
                      setScannedItems(updated);
                    }}
                  />

                  {/* image */}
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      width={16}
                      height={16}
                      className="w-16 h-16 rounded-lg object-cover"
                      alt="img"
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleAddToFridge}
              className="w-full h-12 bg-green-600 hover:bg-green-700 rounded-full"
            >
              Add to My Fridge
            </Button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span> Tips for Better Scanning
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Ensure good lighting</li>
            <li>• Include clear view of items</li>
            <li>• Avoid shadows and reflections</li>
            <li>• Position camera directly in front</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

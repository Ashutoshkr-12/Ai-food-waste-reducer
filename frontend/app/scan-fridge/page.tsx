'use client'
import { ReactHTMLElement, useState } from 'react';
import { Camera, Upload, Loader2, Check } from 'lucide-react';
import Header  from '@/components/Header';
import BottomNav  from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { scanFridge } from '@/lib/api/scan';
import Image from 'next/image';

export default function ScanFridge(){
  const navigate = useRouter();
  const [file,setFile] = useState< File | null>(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [hasScanned, setHasScanned] = useState(false);

const handleFile = (file: File | null) => {
   console.log(URL.createObjectURL(file!))
   setFile(file);
   if (file) {
    setIsScanning(true);
     setPreview(URL.createObjectURL(file));
   }
}

  const handleScan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHasScanned(false);
    
    // Simulate AI scanning
    setTimeout(() => {
      setScannedItems([
        'Cherry Tomatoes',
        'Spinach',
        'Chicken Breast',
        'Mozzarella Cheese',
        'Bell Peppers',
        'Mushrooms',
        'Avocado'
      ]);
      setIsScanning(false);
      setHasScanned(true);
    }, 3000);
  };

  const handleAddToFridge = () => {
    navigate.push('/my-fridge');
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
              <Button
              className="w-full h-12 bg-green-600 hover:bg-green-700 rounded-full"
              >
               <Camera className="w-5 h-5 mr-2" />
                Take Photo
              <input 
               type='file'
              accept='image/*'
              capture="environment"
              placeholder='Take Photo'
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={e => handleFile(e.target.files ? e.target.files[0] : null)}
              />
               </Button>
            
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-full"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
                <input 
                type='file'
                accept='image/*'
                onChange={e => handleFile(e.target.files ? e.target.files[0] : null)}
                className='absolute inset-0 opacity-0 w-full h-full cursor-pointer '
                />
              </Button>
            </div>
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
                <p className="text-sm text-neutral-600">Review and edit below</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {scannedItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-xl">
                        {item.includes('Tomato') ? '🍅' :
                         item.includes('Spinach') ? '🥬' :
                         item.includes('Chicken') ? '🍗' :
                         item.includes('Cheese') ? '🧀' :
                         item.includes('Pepper') ? '🫑' :
                         item.includes('Mushroom') ? '🍄' :
                         item.includes('Avocado') ? '🥑' : '🥗'}
                      </span>
                    </div>
                    <span className="font-medium text-neutral-900">{item}</span>
                  </div>
                  <button className="text-sm text-green-600 hover:text-green-700">
                    Edit
                  </button>
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

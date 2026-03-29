import cloudinary
import cloudinary.uploader
import os


cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

async def upload_result(
          file_bytes,
          fileName
):
     result = cloudinary.uploader.upload(file_bytes,public_id=fileName)

     return result["secure_url"]

async def upload_from_url(image_url: str):

    result = cloudinary.uploader.upload(
        image_url,
        folder="fridge_items"
    )

    return result["secure_url"]
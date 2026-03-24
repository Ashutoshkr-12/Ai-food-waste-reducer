from roboflow import Roboflow
from dotenv import load_dotenv
import os

load_dotenv()

rf = Roboflow(api_key=os.getenv("ROBOFLOW_API_KEY"))
project = rf.workspace(os.getenv("ROBOFLOW_WORKSPACE")) \
            .project(os.getenv("ROBOFLOW_PROJECT"))
model = project.version(int(os.getenv("ROBOFLOW_VERSION"))).model

async def detect_food_items(file_bytes: bytes, filename: str) -> dict:
    # Save temp file
    temp_path = f"temp_{filename}"
    with open(temp_path, "wb") as f:
        f.write(file_bytes)

    # Run inference
    result = model.predict(temp_path, confidence=40).json()

    # Cleanup
    os.remove(temp_path)

    # Format detections
    detections = []
    for pred in result["predictions"]:
        detections.append({
            "item":       pred["class"],
            "confidence": round(pred["confidence"], 3),
            "bbox": {
                "x":      pred["x"],
                "y":      pred["y"],
                "width":  pred["width"],
                "height": pred["height"]
            }
        })

    return {
        "filename":   filename,
        "detections": detections,
        "count":      len(detections)
    }
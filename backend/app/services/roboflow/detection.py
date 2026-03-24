from roboflow import Roboflow
from dotenv import load_dotenv
import os
import cv2
import numpy as np
import base64

load_dotenv()

rf = Roboflow(api_key=os.getenv("ROBOFLOW_API_KEY"))
project = rf.workspace(os.getenv("ROBOFLOW_WORKSPACE")) \
            .project(os.getenv("ROBOFLOW_PROJECT"))
model = project.version(int(os.getenv("ROBOFLOW_VERSION"))).model

async def detect_food_items(file_bytes: bytes, filename: str) -> dict:

    #decoding image
    nparr = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    height, width = image.shape[:2]
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

        x = int(pred["x"])
        y = int(pred["y"])
        w = int(pred["width"])
        h = int(pred["height"])

        x1 = int(x - w / 2)
        y1 = int(y - h / 2)
        x2 = int(x + w / 2)
        y2 = int(y + h / 2)

        cv2.rectangle(
            image,
            (x1,y1),
            (x2,y2),
            (0,255,0),
            2,
        )

        cv2.putText(
            image,
            pred["class"],
            (x1,y1 -5),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 255, 0),
            2,
        )

        detections.append({
            "item": pred["class"],
            "confidence": pred["confidence"],
            "bbox": {
                "x": x,
                "y": y,
                "width": w,
                "height": h,
            }
        })

    _, buffer = cv2.imencode(".jpg",image)
    annotated_base64 = base64.b64encode(buffer).decode()

    return {
        "filename":   filename,
        "detections": detections,
        "count":      len(detections),
        "annotated_image": annotated_base64,
        "image_width": width,
        "image_height": height,
    }
from roboflow import Roboflow
import os
from dotenv import load_dotenv

load_dotenv()

rf = Roboflow(api_key=os.getenv("ROBOFLOW_API_KEY"))

project = rf.workspace(os.getenv("ROBOFLOW_WORKSPACE")).project(os.getenv("ROBOFLOW_PROJECT"))

version = project.version(int(os.getenv("ROBOFLOW_VERSION")))
dataset = version.download("yolov8")

print(f"Downloaded to: {dataset.location}")
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data
mock_products = [
    {"id": 1, "name": "Smartphone", "category": "Tech", "rating": 4.5},
    {"id": 2, "name": "Yoga Mat", "category": "Fitness", "rating": 4.7},
    {"id": 3, "name": "Espresso Maker", "category": "Home", "rating": 4.3}
]

user_views = {
    1: [mock_products[0], mock_products[2]]
}

feedbacks = []

# Pydantic models
class Feedback(BaseModel):
    userId: int
    productId: int
    rating: float
    comment: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/recommendations")
def get_recommendations(userId: Optional[int] = None):
    print("recommendations called")
    return mock_products

@app.get("/product/{id}")
def get_product(id: int):
    prod = next((p for p in mock_products if p["id"] == id), None)
    if prod:
        return {**prod, "description": "This is a detailed product description."}
    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/search")
def search_products(q: str):
    print("search called")
    results = [p for p in mock_products if q.lower() in p["name"].lower()]
    return results

@app.get("/history")
def get_history(userId: int):
    return user_views.get(userId, [])

@app.post("/feedback")
def post_feedback(feedback: Feedback):
    feedbacks.append(feedback.dict())
    return {"message": "Feedback received"}

@app.post("/login")
def login(login_req: LoginRequest):
    print("login called")
    if login_req.email == "user@example.com" and login_req.password == "1234":
        return {"user": {"id": 1, "email": login_req.email, "name": "Sample User"}}
    raise HTTPException(status_code=401, detail="Invalid credentials")
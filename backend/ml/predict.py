import pandas as pd
import joblib
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(
    current_dir,
    "employee_model.pkl"
)

model = joblib.load(model_path)

sample = pd.DataFrame([{
    "tasks_completed": 85,
    "feedback_score": 4.6,
    "attendance": 92,
    "achievement_score": 89
}])

prediction = model.predict(sample)[0]

if prediction == 1:
    result = """
Top Performer
Training Recommendation: Leadership Skills
Performance Trend: Improving
"""
else:
    result = """
Needs Improvement
Training Recommendation: Technical Upskilling
Performance Trend: Declining
"""

print(result)
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("processed_data.csv")

X = df[
[
    "tasks_completed",
    "feedback_score",
    "attendance",
    "achievement_score"
]
]

y = df["top_performer"]

model = RandomForestClassifier()

model.fit(X, y)

joblib.dump(model, "employee_model.pkl")

print("Model trained successfully")
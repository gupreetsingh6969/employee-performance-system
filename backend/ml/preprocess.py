import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

df = pd.read_csv("employee_data.csv")

df = df.dropna()

features = [
    "tasks_completed",
    "feedback_score",
    "attendance",
    "achievement_score"
]

scaler = StandardScaler()

df[features] = scaler.fit_transform(df[features])

joblib.dump(scaler, "scaler.pkl")

df.to_csv("processed_data.csv", index=False)

print("Data preprocessing completed")
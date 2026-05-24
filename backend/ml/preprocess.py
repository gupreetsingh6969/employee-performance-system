import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

# Load employee dataset
df = pd.read_csv("ml/employee_data.csv")

# Remove missing values
df = df.dropna()

# Features from your current CSV
features = [
    "score",
    "tasksCompleted",
    "attendance",
    "feedbackRating"
]

# Scale data
scaler = StandardScaler()

df[features] = scaler.fit_transform(
    df[features]
)

# Save scaler model
joblib.dump(
    scaler,
    "ml/scaler.pkl"
)

# Save processed data
df.to_csv(
    "ml/processed_data.csv",
    index=False
)

print("Data preprocessing completed")
print("\nProcessed Data Preview:\n")
print(df.head())
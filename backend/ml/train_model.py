import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load processed data
df = pd.read_csv("ml/processed_data.csv")

# Input features
X = df[
    [
        "score",
        "tasksCompleted",
        "attendance",
        "feedbackRating"
    ]
]

# Output label
y = df["promoted"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

# Predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(
    y_test,
    predictions
)

print(
    f"Model Accuracy: {accuracy*100:.2f}%"
)

# Save model
joblib.dump(
    model,
    "ml/employee_model.pkl"
)

print(
    "Model saved successfully"
)
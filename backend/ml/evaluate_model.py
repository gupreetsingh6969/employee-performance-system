import pandas as pd
import joblib
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

model = joblib.load("ml/employee_model.pkl")

df = pd.read_csv("ml/processed_data.csv")

X = df[
[
"score",
"tasksCompleted",
"attendance",
"feedbackRating"
]
]

y = df["promoted"]

predictions = model.predict(X)

print(
"\nAccuracy:",
accuracy_score(y,predictions)
)

print(
"\nConfusion Matrix:"
)

print(
confusion_matrix(
y,
predictions
)
)

print(
"\nClassification Report:"
)

print(
classification_report(
y,
predictions
)
)
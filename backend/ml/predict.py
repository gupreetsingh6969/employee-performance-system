import pandas as pd
import joblib
import sys

# Load trained model
model = joblib.load("ml/employee_model.pkl")

# Take values from command line
score = float(sys.argv[1])
tasksCompleted = float(sys.argv[2])
attendance = float(sys.argv[3])
feedbackRating = float(sys.argv[4])

# Create input data
data = pd.DataFrame(
    [[
        score,
        tasksCompleted,
        attendance,
        feedbackRating
    ]],
    columns=[
        "score",
        "tasksCompleted",
        "attendance",
        "feedbackRating"
    ]
)

# Prediction
prediction = model.predict(data)

if prediction[0] == 1:
    print("Top Performer")
else:
    print("Training Required")
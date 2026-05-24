import { useEffect, useState } from "react";
import axios from "axios";

function AIRecommendations() {

    const [prediction, setPrediction] = useState("");

    useEffect(() => {

        const fetchPrediction = async () => {

            try {

                const response = await axios.get(
                    "https://employee-performance-system-production-2fc6.up.railway.app/api/predict"
                );

                setPrediction(
                    response.data.prediction
                );

            } catch (error) {
                console.log(error);
            }

        };

        fetchPrediction();

    }, []);

    return (

        <div style={{padding:"20px"}}>

            <h1>AI Recommendations</h1>

            <div
                style={{
                    border:"1px solid #ccc",
                    padding:"20px",
                    borderRadius:"10px"
                }}
            >
                <pre
                    style={{
                        whiteSpace:"pre-wrap",
                        fontSize:"18px"
                    }}
                >
                    {prediction}
                </pre>
            </div>

        </div>

    );

}

export default AIRecommendations;
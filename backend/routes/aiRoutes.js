import express from "express";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();

router.get("/predict", (req, res) => {

    const pythonFile = path.join(
        process.cwd(),
        "ml",
        "predict.py"
    );

    const python = spawn(
        "python",
        [pythonFile]
    );

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        error += data.toString();
    });

    python.on("close", () => {

        if(error){
            return res.status(500).json({
                success:false,
                error:error
            });
        }

        res.json({
            success:true,
            prediction:result.trim()
        });

    });

});

export default router;
function TestingMetrics() {

    const metrics = [

        {
            name:"AI Prediction Accuracy",
            value:"92%"
        },

        {
            name:"API Success Rate",
            value:"99%"
        },

        {
            name:"Average Response Time",
            value:"120ms"
        },

        {
            name:"Usability Score",
            value:"9/10"
        }

    ];

    return (

        <div style={{padding:"20px"}}>

            <h1>
                Testing Metrics
            </h1>

            <br/>

            {

                metrics.map((item,index)=>(

                    <div
                    key={index}
                    style={{
                        border:"1px solid #d1d5db",
                        padding:"15px",
                        marginBottom:"15px",
                        borderRadius:"10px"
                    }}
                    >

                        <h3>
                            {item.name}
                        </h3>

                        <p>
                            {item.value}
                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default TestingMetrics;
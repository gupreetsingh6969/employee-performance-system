function Analytics() {

    const analytics = [

        {
            title:"Top Performers",
            value:"15 Employees"
        },

        {
            title:"Employees Need Training",
            value:"8 Employees"
        },

        {
            title:"Average Attendance",
            value:"91%"
        },

        {
            title:"Completed Tasks",
            value:"120"
        }

    ];

    return (

        <div style={{padding:"20px"}}>

            <h1>
                Employee Analytics
            </h1>

            <br/>

            {

                analytics.map((item,index)=>(

                    <div
                    key={index}
                    style={{
                        border:"1px solid #d1d5db",
                        padding:"15px",
                        marginBottom:"15px",
                        borderRadius:"10px"
                    }}
                    >

                    <h3>{item.title}</h3>

                    <p>{item.value}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default Analytics;
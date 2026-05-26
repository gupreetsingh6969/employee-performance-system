import { useState } from "react";

function DataProcessing(){

const [processedData] = useState([

{
employee:"John Smith",
rawScore:92,
normalizedScore:0.92
},

{
employee:"Sarah Lee",
rawScore:84,
normalizedScore:0.84
},

{
employee:"David Wilson",
rawScore:76,
normalizedScore:0.76
}

]);


return(

<div style={{padding:"20px"}}>

<h1>
Historical Data Processing
</h1>

<p>
Prepared employee performance records for AI analysis
</p>

<br/>

{

processedData.map((record)=>(

<div
key={record.employee}
style={{
border:"1px solid gray",
padding:"15px",
marginBottom:"10px",
borderRadius:"10px"
}}
>

<h3>
{record.employee}
</h3>

<p>
Original Score:
{record.rawScore}
</p>

<p>
Normalized Score:
{record.normalizedScore}
</p>

</div>

))

}

</div>

);

}

export default DataProcessing;

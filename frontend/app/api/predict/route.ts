import { NextResponse } from "next/server";
export async function POST(request: Request){
    try{
        const body=await request.json()
        const response=await fetch("http://127.0.0.1:5000/predict",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.ok){
            const data=await response.json()
            return NextResponse.json(data)
        }else{
            return NextResponse.json({error:"Error in response"},{   
                status:response.status})
        }
    }catch{
        console.error("Error predicting price:",Error)
        return NextResponse.json({error:"Error predicting price"},{
            status:500
        })
    }
}
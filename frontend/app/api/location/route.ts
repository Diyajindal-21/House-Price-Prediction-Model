import { NextResponse } from "next/server";
export async function GET(){
    try{
        const response=await fetch ("http://127.0.0.1:5000/location",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            const data=await response.json()
            return NextResponse.json(data)
        }else{
            return NextResponse.json({error:"Error in response"},{
                status:response.status})
        }
    }catch(error){
        console.error("Error fetching locations:",error)
        return NextResponse.json({error:"Error fetching locations"},{
            status:500
        })
    }
}
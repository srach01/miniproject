import { NextResponse } from "next/server";
const {Client} = require("pg")
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

export async function PUT(req: Request){
    try {
        const {switchstatus} = await req.json();
        const res = await client.query('UPDATE "tbl_Panudetingai020" SET switch_status = $1 RETURNING *', [switchstatus]);
        return new Response(JSON.stringify(res.rows[0]), {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        });
    }
}
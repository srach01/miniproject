import { NextResponse } from "next/server";
const {Client} = require("pg")
import dotenv from 'dotenv';

export async function GET() {
    return NextResponse.json({ message: "Hello World" });
}

dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();
export async function POST(req: Request) {
    try {
        const { distance, duty_cycle, switchbutton} = await req.json();
        // Hash password
        const res = await client.query('INSERT INTO "tbl_Panudetingai020" (ultrasonic_value, buzzer_value, last_switch_state) VALUES ($1, $2, $3) RETURNING *', [distance, duty_cycle, switchbutton]);
        return new Response(JSON.stringify(res.rows[0]), {
            status: 201,
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
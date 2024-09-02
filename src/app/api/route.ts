import { NextResponse } from "next/server";
const {Client} = require("pg")
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();
export async function POST(req: Request) {
    try {
        const { distance, led_yellow} = await req.json();
        // Hash password
        const res = await client.query('INSERT INTO "srh031" (ultrasonic_value, led_yellow) VALUES ($1, $2) RETURNING *', [distance, led_yellow]);
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

export async function GET(){
    try {
        const res = await client.query('SELECT * FROM "srh031" ORDER BY id DESC LIMIT 1');
        return new Response(JSON.stringify(res.rows), {
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
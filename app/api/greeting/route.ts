import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * @swagger
 * /api/greeting:
 *   get:
 *     description: Returns json placeholder api response and added prop `jake`
 *     responses:
 *       200:
 *         description: Content-Type, Authorization, x-jake-header header allowed
 */
export async function GET(request: Request) {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const { searchParams } = new URL(request.url);
  console.log("data: ", searchParams.get("data"));
  // console.log(new URLSearchParams(searchParams));

  const mock = await data.json();
  return NextResponse.json(
    { name: "jake", mock },
    {
      status: 200,
      headers: {
        "x-jake-header": "test",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, x-jake-header",
      },
    }
  );
}

/**
 * @swagger
 * /api/greeting:
 *   post:
 *     summary: return `who` set `bearer token` `when`
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                time:
 *                  type: string
 *                who:
 *                  type: string
 *     responses:
 *       201:
 *         description: got post data and logged in app server
 *       500:
 *         description: something wrong on app server
 */
export async function POST(request: Request) {
  interface BodyType {
    time: string;
    who: string;
  }

  const { headers } = request;
  const bearerToken = headers.get("Authorization");

  try {
    const _body = await request.json();
    const body = _body as unknown as BodyType;
    const { who, time } = body;

    console.log(`${who} sent this post request at ${time}`);
    return NextResponse.json(
      {
        message: "received",
        author: who,
        timestamp: time,
        token: bearerToken,
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "wrong",
        author: "",
        timestamp: "",
        token: null,
      },
      {
        status: 404,
      }
    );
  } finally {
    console.log("Request process done");
  }
}

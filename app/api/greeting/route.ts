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

  const headersList = headers();

  // console.log({ headersList });
  // console.log("url", request.url);

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

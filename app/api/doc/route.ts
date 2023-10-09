import { createSwaggerSpec } from "next-swagger-doc";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "developerasun web2 snippet",
        version: "0.1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });

  return NextResponse.json({
    spec,
  });
}

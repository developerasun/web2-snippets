"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type SwaggerProps = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: SwaggerProps) {
  return <SwaggerUI spec={spec} />;
}

export default function IndexPage() {
  const [swaggerSpec, setSwaggerSpec] = useState<SwaggerProps>({ spec: {} });

  useEffect(() => {
    async function _getApiDoc() {
      const response = await fetch("api/doc");
      const { spec } = await response.json();
      setSwaggerSpec(spec);
    }

    _getApiDoc();
  }, []);

  return (
    <section className="container">
      <ReactSwagger spec={swaggerSpec} />
    </section>
  );
}

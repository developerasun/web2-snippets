"use client";
import React from "react";

export default function Check() {
  const [dataResponse, setDataResponse] = React.useState<any>("");
  const [isClick, setIsClick] = React.useState(false);

  function handleAPI() {
    setIsClick(!isClick);
  }

  React.useEffect(() => {
    async function useMock() {
      const response = await fetch("/api/greeting");
      // console.log("data: ", new URL(response.url).searchParams.get("data"));
      const _data = await response.json();

      // console.log({ _data });
      // console.log("clieck");
      setDataResponse(JSON.stringify(_data));
    }

    useMock();
  }, [isClick]);

  return (
    <React.Fragment>
      <button onClick={() => handleAPI()}>api response:</button>

      {process.env.NEXT_PUBLIC_TEST && (
        <div>check: {process.env.NEXT_PUBLIC_TEST}</div>
      )}
      <div> {dataResponse}</div>
    </React.Fragment>
  );
}

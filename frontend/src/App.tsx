import bgImage from "@/assets/Hero-Background-notecode.svg";
import { Header } from "./components/common/headet";
import { CodeCard } from "./components/CodeCard";
import { useEffect, useState } from "react";
import { LoadingIcon } from "./components/icons/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Renderを叩き起こす
    fetch(`${import.meta.env.VITE_API_URL}/api/`).finally(() =>
      setIsLoading(false)
    );
  }, []);
  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed inset-0 bg-gray-700/80 z-50 flex flex-col justify-center items-center gap-y-4">
          <p className="text-white font-semibold">
            APIサーバーを起動しています...（約30秒）
          </p>
          <LoadingIcon />
        </div>
      )}
      <div
        className="w-screen min-h-screen bg-size-[100%] bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="pt-8 pb-16 px-6 flex flex-col gap-y-6 items-center">
          <Header />
          <div className="max-w-[720px] w-full">
            <CodeCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

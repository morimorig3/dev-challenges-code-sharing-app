import bgImage from "@/assets/Hero-Background-notecode.svg";
import { Header } from "./components/common/headet";
import { CodeCard } from "./components/CodeCard";

function App() {
  return (
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
  );
}

export default App;

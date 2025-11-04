import { Button } from "@/components/ui/button";
import bgImage from "@/assets/Hero-Background-notecode.svg";
import { Header } from "./components/common/headet";

function App() {
  return (
    <div
      className="w-screen min-h-screen bg-size-[100%] bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="pt-8 pb-16">
        <Header />
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;

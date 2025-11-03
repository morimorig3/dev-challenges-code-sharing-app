import { Button } from "@/components/ui/button";
import bgImage from "@/assets/Hero-Background-notecode.svg";

function App() {
  return (
    <div
      className="w-screen min-h-screen bg-size-[100%] bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Button>Click me</Button>
    </div>
  );
}

export default App;

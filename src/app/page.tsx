import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 m-4">
      <div>
        <Button variant={"elevated"}>Hello</Button>
      </div>
      <div>
        <Input placeholder="Hellooo" />
      </div>
      <div>
        <Progress value={67} />
      </div>
      <div>
        <Textarea placeholder="Hellooooo" />
      </div>
    </div>
  );
}

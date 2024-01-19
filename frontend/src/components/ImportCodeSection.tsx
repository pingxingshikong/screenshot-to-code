import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import OutputSettingsSection from "./OutputSettingsSection";
import toast from "react-hot-toast";
import { Stack } from "../lib/stacks";

interface Props {
  importFromCode: (code: string, stack: Stack) => void;
}

function ImportCodeSection({ importFromCode }: Props) {
  const [code, setCode] = useState("");
  const [stack, setStack] = useState<Stack | undefined>(undefined);

  const doImport = () => {
    if (code === "") {
      toast.error("Please paste in some code");
      return;
    }

    if (stack === undefined) {
      toast.error("Please select your stack");
      return;
    }

    importFromCode(code, stack);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">从代码中导入</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>粘贴你的HTML代码</DialogTitle>
          <DialogDescription>
            请确保您要导入的代码是有效的HTML.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64"
        />

        <OutputSettingsSection
          stack={stack}
          setStack={(config: Stack) => setStack(config)}
          label="库类型:"
          shouldDisableUpdates={false}
        />

        <DialogFooter>
          <Button type="submit" onClick={doImport}>
            导入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCodeSection;

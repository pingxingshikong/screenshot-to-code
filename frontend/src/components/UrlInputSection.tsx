import { useState } from "react";
import { HTTP_BACKEND_URL } from "../config";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-hot-toast";

interface Props {
  screenshotOneApiKey: string | null;
  doCreate: (urls: string[]) => void;
}

export function UrlInputSection({ doCreate, screenshotOneApiKey }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState("");

  async function takeScreenshot() {
    if (!screenshotOneApiKey) {
      toast.error(
        // "Please add a ScreenshotOne API key in the Settings dialog. This is optional - you can also drag/drop and upload images directly.",
          "请在“设置”中添加ScreenshotOne API屏幕截图配置。这是可选的-您也可以直接拖放和上传图像。",
        { duration: 8000 }
      );
      return;
    }

    if (!referenceUrl) {
      // toast.error("Please enter a URL");
      toast.error("请输入一个url地址");

      return;
    }

    if (referenceUrl) {
      try {
        setIsLoading(true);
        const response = await fetch(`${HTTP_BACKEND_URL}/api/screenshot`, {
          method: "POST",
          body: JSON.stringify({
            url: referenceUrl,
            apiKey: screenshotOneApiKey,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // throw new Error("Failed to capture screenshot");
          throw new Error("捕获屏幕截图失败");
        }

        const res = await response.json();
        doCreate([res.url]);
      } catch (error) {
        console.error(error);
        toast.error(
          // "Failed to capture screenshot. Look at the console and your backend logs for more details."
            "未能捕获屏幕截图。查看控制台和后端日志以了解更多详细信息。"

        );
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="max-w-[90%] min-w-[40%] gap-y-2 flex flex-col">
      <div className="text-gray-500 text-sm">或者输入一个URL进行截图...</div>
      <Input
        placeholder="输入 URL"
        onChange={(e) => setReferenceUrl(e.target.value)}
        value={referenceUrl}
      />
      <Button
        onClick={takeScreenshot}
        disabled={isLoading}
        className="bg-slate-400"
      >
        {isLoading ? "截图中..." : "截图"}
      </Button>
    </div>
  );
}

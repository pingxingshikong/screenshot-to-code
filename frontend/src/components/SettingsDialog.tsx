import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCog } from "react-icons/fa";
import { EditorTheme, Settings } from "../types";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { capitalize } from "../lib/utils";
import { IS_RUNNING_ON_CLOUD } from "../config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import AccessCodeSection from "./settings/AccessCodeSection";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

function SettingsDialog({ settings, setSettings }: Props) {
  const handleThemeChange = (theme: EditorTheme) => {
    setSettings((s) => ({
      ...s,
      editorTheme: theme,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">设置</DialogTitle>
        </DialogHeader>

        {/* Access code */}
        {IS_RUNNING_ON_CLOUD && (
          <AccessCodeSection settings={settings} setSettings={setSettings} />
        )}

        <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div>DALL-E 占位符图像生成</div>
            <div className="font-light mt-2">
              它更有趣，但如果你想省钱，就把它关掉.
            </div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.isImageGenerationEnabled}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                isImageGenerationEnabled: !s.isImageGenerationEnabled,
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label htmlFor="openai-api-key">
            <div>OpenAI API key</div>
            <div className="font-light mt-2 leading-relaxed">
              仅存储在您的浏览器中。从不存储在服务器上。
            </div>
          </Label>

          <Input
            id="openai-api-key"
            placeholder="OpenAI API key"
            value={settings.openAiApiKey || ""}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                openAiApiKey: e.target.value,
              }))
            }
          />

          {!IS_RUNNING_ON_CLOUD && (
            <>
              <Label htmlFor="openai-api-key">
                <div>OpenAI Base URL (optional)</div>
                <div className="font-light mt-2 leading-relaxed">
                  如果不想使用默认URL,请替换为代理URL.
                </div>
              </Label>

              <Input
                id="openai-base-url"
                placeholder="OpenAI Base URL"
                value={settings.openAiBaseURL || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiBaseURL: e.target.value,
                  }))
                }
              />
            </>
          )}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>根据URL屏幕截图配置</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="screenshot-one-api-key">
                  <div className="leading-normal font-normal text-xs">
                    如果您想直接使用URL而不是自己截图，请添加ScreenshotOne API密钥.{" "}
                    <a
                      href="https://screenshotone.com?via=screenshot-to-code"
                      className="underline"
                      target="_blank"
                    >
                      免费获得100张screenshots屏幕截图/mo.
                    </a>
                  </div>
                </Label>

                <Input
                  id="screenshot-one-api-key"
                  className="mt-2"
                  placeholder="ScreenshotOne API key"
                  value={settings.screenshotOneApiKey || ""}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      screenshotOneApiKey: e.target.value,
                    }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>主题设置</AccordionTrigger>
              <AccordionContent className="space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-theme">
                    <div>应用主题</div>
                  </Label>
                  <div>
                    <button
                      className="flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50t"
                      onClick={() => {
                        document
                          .querySelector("div.mt-2")
                          ?.classList.toggle("dark"); // enable dark mode for sidebar
                        document.body.classList.toggle("dark");
                        document
                          .querySelector('div[role="presentation"]')
                          ?.classList.toggle("dark"); // enable dark mode for upload container
                      }}
                    >
                      切换黑暗模式
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="editor-theme">
                    <div>
                      代码编辑器主题-需要刷新页面才能更新
                    </div>
                  </Label>
                  <div>
                    <Select // Use the custom Select component here
                      name="editor-theme"
                      value={settings.editorTheme}
                      onValueChange={(value) =>
                        handleThemeChange(value as EditorTheme)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        {capitalize(settings.editorTheme)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cobalt">Cobalt</SelectItem>
                        <SelectItem value="espresso">Espresso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DialogFooter>
          <DialogClose>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;

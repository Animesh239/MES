// rulesAndRegulation.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ChevronRight, Download } from "lucide-react";
import { RulesAndRegulations } from "@/config/Minare/landingpagedata";
import { useEffect, useState } from "react";
import { EventData } from "@/config/Minare/type";
import toast from "react-hot-toast";

export function RulesDialog({
  open,
  setOpen,
  title,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) {
  const [eventData, setEventData] = useState<EventData | undefined>();

  useEffect(() => {
    if (open && title) {
      console.log("tt", title);
      console.log("Looking for rules for event:", title);
      const foundEvent = RulesAndRegulations.find(
        (item) => item.name === title
      );
      if (foundEvent) {
        console.log("Found rules data for:", title);
        setEventData(foundEvent);
      } else {
        console.log("No rules found for:", title);
        setEventData(undefined);
      }
    }
  }, [title, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[90vw] h-screen md:max-w-[800px] bg-black/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-white/10">
        <DialogHeader className="pb-4 mt-3">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-inner shadow-white/5">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {title || "MINARE 2025"}
              <span className="block text-base md:text-lg font-medium text-white/60 mt-1">
                Rules and Regulations
              </span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[65vh] sm:h-[70vh] pr-4">
          <div className="space-y-10">
            {eventData ? (
              <div className="space-y-5 relative">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white shrink-0">
                      {eventData.id}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {eventData.name}
                      </h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed mt-2">
                        {eventData.description}
                      </p>
                    </div>
                  </div>
                </div>

                {eventData.rules && (
                  <div className="space-y-4 ml-11">
                    <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Rules
                    </h4>
                    <ul className="grid gap-3 text-sm md:text-base text-white/70">
                      {eventData.rules.map((rule, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium text-white/40 shrink-0">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {eventData.stages && (
                  <div className="space-y-6 ml-11">
                    {eventData.stages.map((stage, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          {stage.name}
                        </h4>
                        <ul className="grid gap-3 text-sm md:text-base text-white/70">
                          {stage.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex gap-3 items-start"
                            >
                              <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium text-white/40 shrink-0">
                                {detailIndex + 1}
                              </span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {eventData.additionalRules && (
                  <div className="space-y-4 ml-11">
                    <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Additional Rules
                    </h4>
                    <ul className="grid gap-3 text-sm md:text-base text-white/70">
                      {eventData.additionalRules.map((rule, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-medium text-white/40 shrink-0">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <p className="text-white/70 text-center">
                  {title
                    ? `No rules found for "${title}". wait till events to be added`
                    : "Please select an event to view its rules and regulations."}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-3 mt-5 mb-4">
          <Button
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 text-black hover:from-white/95 hover:to-white/85 transition-all font-medium"
          >
            Close
          </Button>
          {eventData?.pdf ? (
            <Button
              onClick={() => {
                window.open(eventData.pdf, "_blank");
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 text-black hover:from-white/95 hover:to-white/85 transition-all font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          ) : (
            (title === "Rock-On-Pap" ||
              title === "Group Discussion" ||
              title === "Case-Ore-inted") && (
              <Button
                onClick={() => {
                  toast.success("The PDF will be available soon!!");
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 text-black hover:from-white/95 hover:to-white/85 transition-all font-medium flex items-center gap-2"
              ></Button>
            )
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

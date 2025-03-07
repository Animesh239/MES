import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ChevronRight } from "lucide-react";
import { RulesAndRegulations } from "@/config/Minare/landingpagedata";

export function RulesDialog({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[90vw] h-screen md:max-w-[800px] bg-black/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-white/10">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-inner shadow-white/5">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              MINARE 2025
              <span className="block text-base md:text-lg font-medium text-white/60 mt-1">
                Rules and Regulations
              </span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[70vh] md:h-[70vh] pr-4">
          <div className="space-y-10">
            {RulesAndRegulations.map((event) => (
              <div key={event.id} className="space-y-5 relative">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white shrink-0">
                      {event.id}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {event.name}
                      </h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed mt-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>

                {event.rules && (
                  <div className="space-y-4 ml-11">
                    <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Rules
                    </h4>
                    <ul className="grid gap-3 text-sm md:text-base text-white/70">
                      {event.rules.map((rule, index) => (
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

                {event.stages && (
                  <div className="space-y-6 ml-11">
                    {event.stages.map((stage, index) => (
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

                {event.additionalRules && (
                  <div className="space-y-4 ml-11">
                    <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Additional Rules
                    </h4>
                    <ul className="grid gap-3 text-sm md:text-base text-white/70">
                      {event.additionalRules.map((rule, index) => (
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

                {event.id !== RulesAndRegulations.length && (
                  <Separator className="my-8 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-5">
          <Button
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto bg-gradient-to-r from-white to-white/90 text-black hover:from-white/95 hover:to-white/85 transition-all font-medium"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

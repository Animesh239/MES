"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { YearsData } from "@/config/Eventspage/EventsPageData";

export const SelectYear = ({
  handleSelectYear
}: {
  handleSelectYear: (year: string) => void;
}) => {
  const handleSelectChange = (value: string) => {
    console.log(`Selected year: ${value}`);
    handleSelectYear(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px] border-[2px] font-[600] tracking-wider text-white h-[60px] ">
        <SelectValue placeholder="2024" />
      </SelectTrigger>
      <SelectContent>
        {YearsData.map((data, idx) => (
          <SelectGroup className="flex flex-col" key={idx}>
            <SelectLabel>{data.label}</SelectLabel>
            {data.years.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

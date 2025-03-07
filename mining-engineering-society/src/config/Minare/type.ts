export interface EventData {
  id: number;
  name: string;
  description: string;
  rules?: string[];
  stages?: Stage[];
  additionalRules?: string[];
}

export interface Stage {
  name: string;
  details: string[];
}

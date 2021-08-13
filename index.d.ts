import { TailwindConfig } from 'tailwindcss/tailwind-config';
type params = {
  tailwindConfig?: TailwindConfig;
  baseCss: string;
  baseHTML: string;
};
function main(config:params): Promise<string>;

export = main;

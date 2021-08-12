import { TailwindConfig } from 'tailwindcss/tailwind-config';

declare module 'tailwind-purge' {
  type params = {
    tailwindConfig?: TailwindConfig;
    baseCss: string;
    baseHTML: string;
  };

  type main = (config: params) => Promise<string>;

  export = main;
}
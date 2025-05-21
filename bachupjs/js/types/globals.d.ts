// Define types for third-party libraries without TypeScript declarations
declare module 'react-apexcharts' {
  import { ComponentType } from 'react';

  interface ApexChartProps {
    type?: 'line' | 'area' | 'bar' | 'histogram' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea';
    series: any[];
    width?: string | number;
    height?: string | number;
    options?: any;
    [key: string]: any;
  }

  const ApexCharts: ComponentType<ApexChartProps>

  export default ApexCharts;
}

interface Config {
  version?: string;
  theme?: string;
  [key: string]: any;
}

interface Ziggy {
  url: string;
  port: string | null;
  defaults: Record<string, any>
  routes: Record<string, any>
}

interface Window {
  config: Config;
  Ziggy: Ziggy;
  Echo: any;
}

interface ZiggyHelper {
  (name: string, params?: Record<string, any>, absolute?: boolean): string;
  current: (name?: string) => boolean;
  check: (name?: string) => boolean;
  route: (name: string, params?: Record<string, any>, absolute?: boolean) => string;
}

declare global {
  var Ziggy: Ziggy;
  var route: ZiggyHelper;
}

export {};

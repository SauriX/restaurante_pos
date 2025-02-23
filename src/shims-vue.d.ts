/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'bootstrap-vue-next';

// types/thermal-printer-ws.d.ts
declare module '@/libraries/printer.js' {
  export default class Printer {
    constructor(model: string,ip:string);
    constructor(model: string);
    constructor();
    printText(text: string): void;
    cutPartial(): void;
    cutFull(): void;
    printDocument(): void;
    testPrinter(): void;
    code123(text: string): void;
    code39(text: string): void;
    ean13(text: string): void;
    openDrawer(): void;
    separator(text:string):void
    bold(text:string):void
    underLine(text:string):void
    expanded(mode:boolean):void
    condensed(mode:boolean):void
    doubleWidth2(): void;
    doubleWidth3(): void;
    normalWidth(): void;
    alignRight(): void;
    alignCenter(): void;
    alignLeft():void;
    fontA(text: string): void;
    fontB(text: string): void;
    fontC(text: string): void;
    fontD(text: string): void;
    fontE(text: string): void;
    fontEspecialA(text: string): void;
    fontEspecialB(text: string): void;
    initializePrint(): void;
    lineHeight(count: number): void;
    newLine(): void;
    newLines(count: number): void;
    getPrinters():string[]
    
  }
}

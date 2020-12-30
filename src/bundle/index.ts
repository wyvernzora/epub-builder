import { Locale } from "locale-enum";
import { Bundle } from "./bundle";

export interface RenderingContext {
    readonly language: Locale
    readonly bundle: Bundle
}

export * from './asset'
export * from './bundle'
export * from './bundler'
export * as Paths from './paths'

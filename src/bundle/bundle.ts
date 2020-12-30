import { Assets } from "./asset";

export class Bundle {
    readonly assets: Assets = []

    addAssets(...assets: Assets): void {
        this.assets.push(...assets)
    }

    text(): Assets {
        return this.assets.filter(i => i.category === 'text')
    }

    stylesheets(): Assets {
        return this.assets.filter(i => i.category === 'style')
    }

}

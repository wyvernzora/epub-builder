import { Assets } from "./asset";

export class Bundle {
    readonly assets: Assets = []

    pushAssets(...assets: Assets): void {
        this.assets.push(...assets)
    }

    unshiftAssets(...assets: Assets): void {
        this.assets.unshift(...assets)
    }

    text(): Assets {
        return this.assets.filter(i => i.category === 'text')
    }

    stylesheets(): Assets {
        return this.assets.filter(i => i.category === 'style')
    }

}

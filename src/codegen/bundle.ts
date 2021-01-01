import UUID from "short-uuid";
import { Asset, Assets } from "./asset";

export type AddAssetProps = Omit<Asset, 'id'> & Partial<Pick<Asset, 'id'>>

export class Bundle {
    readonly assets: Assets = []

    pushAssets(...assets: AddAssetProps[]): void {
        this.assets.push(...assignAssetIds(assets))
    }

    unshiftAssets(...assets: AddAssetProps[]): void {
        this.assets.unshift(...assignAssetIds(assets))
    }

    text(): Assets {
        return this.assets.filter(i => i.category === 'text')
    }

    stylesheets(): Assets {
        return this.assets.filter(i => i.category === 'style')
    }

}

function assignAssetIds(assets: AddAssetProps[]): Assets {
    for (const asset of assets.filter(a => !a.id)) {
        asset.id = `a${UUID.generate()}`
    }
    return assets as Assets
}

import { Book, Content, Group } from "./structure";
import { Bundler } from "./bundle";
import { Locale } from "locale-enum";
import 'preact/debug'
import JSZip from 'jszip';
import { promises } from "fs"

const book = new Book({
    name: 'n123456',
    title: 'Test Book',
    author: 'Test Author',
    language: Locale.ja_JP,
    updatedAt: new Date(),
})

const chapter = new Group({
    name: 'c01',
    title: 'Chapter One',
})
book.push(chapter)

chapter.push(new Content({
    name: 'e01',
    title: 'Episode One',
    content: 'Lorem Ipsum Dolor Sit Amet',
}))
chapter.push(new Content({
    name: 'e02',
    title: 'Episode Two',
    content: 'Lorem Ipsum Dolor Sit Amet',
}))

const subchapter = new Group({
    name: 's01',
    title: 'Subchapter One'
})
chapter.push(subchapter)

subchapter.push(new Content({
    name: 'e03',
    title: 'Episode Three',
    content: 'Lorem Ipsum!!',
}))

;(async function() {
    const bundle = await book.accept(new Bundler())

    const jszip = new JSZip()
    jszip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

    for (const asset of bundle.assets) {
        console.log(`Bundling asset [${asset.id}] @ ${asset.path}`)
        console.log(asset.data.toString() + '\n\n')
        jszip.file(asset.path, asset.data, { compression: 'DEFLATE' })
    }

    const archiveBuffer = await jszip.generateAsync({
        type: 'nodebuffer',
        compressionOptions: {
            level: 9
        }
    })
    await promises.writeFile('test.epub', archiveBuffer)

})().catch(console.error);

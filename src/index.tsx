import { Book, Content, Group } from "./structure";
import { CodeGenerator, DataFile } from "./codegen";
import { Locale } from "locale-enum";
import { ContentComponent, GroupComponent, TableOfContents } from "./template";
import { NCX } from "./template/ncx";
import { render } from "preact-render-to-string";

const book = new Book({
    id: 'n123456',
    title: 'Test Book',
    author: 'Test Author',
    language: Locale.ja_JP,
    updatedAt: new Date(),
})

const chapter = new Group({
    id: 'c01',
    title: 'Chapter One',
})
book.push(chapter)

chapter.push(new Content({
    id: 'e01',
    title: 'Episode One',
    content: 'Lorem Ipsum Dolor Sit Amet',
}))
chapter.push(new Content({
    id: 'e02',
    title: 'Episode Two',
    content: 'Lorem Ipsum Dolor Sit Amet',
}))

const subchapter = new Group({
    id: 's01',
    title: 'Subchapter One'
})
chapter.push(subchapter)

subchapter.push(new Content({
    id: 'e03',
    title: 'Episode Three',
    content: 'Lorem Ipsum!!'
}))

class DefaultCodeGenerator implements CodeGenerator {
    language = Locale.ja
    stylesheets = []

    visitContent(content: Content): DataFile[] {
        const data = render(<ContentComponent { ...this } node={content} />)

        return [{
            path: content.link(),
            data: Buffer.from(data),
        }]
    }

    visitGroup(group: Group): DataFile[] {
        const data = render(<GroupComponent  {...this} node={group} />)

        return [{
            path: group.link(),
            data: Buffer.from(data)
        }, ...group.children().flatMap(node => node.accept(this))]
    }

    visitBook(book: Book): DataFile[] {
        const data = render(<TableOfContents {...this} node={book} />)

        return [{
            path: 'OEBPS/text/toc.xhtml',
            data: Buffer.from(data),
        }, {
            path: 'ncx.toc',
            data: Buffer.from(render(<NCX {...this} node={book} />))
        }, ...book.children().flatMap(node => node.accept(this))]
    }
}

(async function() {
    const files = book.accept(new DefaultCodeGenerator())
    for (const file of files) {
        console.log(`=== ===`)
        console.log(`File: ${file.path}`);
        console.log(file.data.toString('utf-8'))
        console.log(`\n\n`)
    }
})().catch(console.error);

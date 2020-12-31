import { Book, Content, Group } from "./structure";
import { Locale } from "locale-enum";
import 'preact/debug'
import CodeGenerator from './codegen'
import { Output } from './output'

const book = new Book({
    name: 'n123456',
    title: 'Test Book',
    author: 'Test Author',
    language: Locale.ja_JP,
    updatedAt: new Date(),
}).push(
    new Group({ name: 'c01', title: 'Chapter One' }).push(
        new Content({ name: 'e01', title: 'Episode One', content: 'Lorem Ipsum One' }),
        new Content({ name: 'e02', title: 'Episode Two', content: 'Lorem Ipsum Two' })),
    new Group({ name: 'c02', title: 'Chapter Two' }).push(
        new Group({ name: 's01', title: 'Subchapter One' }).push(
            new Content({ name: 'e03', title: 'Episode Three', content: 'Lorem Ipsum Three'}))))

;(async function() {
    const generator = CodeGenerator.defaultGenerator(book)
    const bundle = await book.accept(generator)

    await Output.terminal('**/container.xml').writeBundle(bundle)
    await Output.archive('test.epub').writeBundle(bundle)

})().catch(console.error);

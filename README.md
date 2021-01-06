# EPUB Builder
Library to build EPUB archives and auto-generate EPUB metadata, table of contents and manifests.
I built this to address my own needs, and therefore it is not intended to implement the full EPUB spec.

## Example

```typescript
import { Locale } from 'locale-enum'
import { Book, Group, Content, CodeGenerator, Output } from '@wyvernzora/epub-builder'

const book = new Book({
    name: 'n9669bk',
    title: '無職転生',
    author: '理不尽な孫の手',
    language: Locale.ja,
    updatedAt: new Date(),
})

book.push(
    new Group({ name: 'chapter01', title: '第１章　幼年期' }).push(
        new Content({ name: 'prologue', title: 'プロローグ', content: 'XHTML Markup...' }),
        new Content({ name: 'episode01', title: '第一話「もしかして：異世界」', content: 'XHTML Markup...' })),
    new Group({ name: 'chapter02', title: '第２章　少年期　家庭教師編' }).push(
        new Content({ name: 'chapter12', title: '第十二話「お嬢様の暴力」', content: 'XHTML Markup...' }),
        new Content({ name: 'chapter13', title: '第十三話「自作自演？」', content: 'XHTML Markup...' }))
)

const bundle = await book.accept(CodeGenerator.defaultGenerator(book))
const output = Output.archive('./output.epub')

await output.writeBundle(bundle)
```

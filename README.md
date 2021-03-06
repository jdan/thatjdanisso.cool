## thatjdanisso.cool

This is a collection of node scripts to build my blog - https://thatjdanisso.cool

### building

```
$ npm install
$ npm run build
```

You can also run `npm run watch` to auto-build on relevant file changes.

### editing

I shipped an editor for some reason. You can access it with:

```
$ npm run editor
```

I'm also working on a new editor using [Trix](https://trix-editor.org/)
with `npm run trix-editor`.

### all of the above

I typically write with my editor, watcher, and server running simultaneously. You
can do this with

```
$ npm run suite
```

### importing

I like Medium's editor a lot (way better than my own) so I built an importer

```
$ npm run import
```

### license

The contents of this blog (articles, code snippets) are licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). The code powering the blog itself is MIT licensed, see [LICENSE.txt](/LICENSE.txt) for details.

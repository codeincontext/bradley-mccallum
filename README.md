bradleymccallum.com is a production site built in our spare time. We challenged ourselves to make a CMS-driven React site for as little developer cost as possible, yet without compromising on the quality we'd bring to larger projects.

This means leveraging tools like Prismic.io for hosting content, Next.js as a standardised harness for universal React, and Now for hosting. We hope it's an interesting example and encourage you to copy the approach for your own projects.

The project also demonstrates styled-jsx, Github pull requests, NPM tasks, Prettier, and eslint. Feel free to open an issue if you have any questions.

## License

The visual design, brand, and content are all copyright Bradley McCallum. All functional code is released under the MIT license except CSS code and assets which describe bradleymccallum.com's design.

Please take this and make great things. Please don't use it without modification like a cheap Wordpress theme.

## Setup

Install dependencies

```bash
npm install
```

## Development

Run the dev server:

```bash
npm run dev
```

## Changing Prismic types

Prismic content types are versioned in the Git project and saved in `scripts/prismic-types`. To change a type you can edit one of these files. It's easiest to make the change in the Prismic editor first to see how the JSON needs to change.

When you're updated the json file you should build it with the `build-prismic-type` NPM task and copy its output into Prismic.

For example, to copy the `project` type's JSON to the clipboard, run:

```bash
npm run -s build-prismic-type -- project | pbcopy
```

Then paste the result in the Project content type's JSON field in Prismic. This process lets us version our content types and re-use our slices (Image Grid, Single Image, etc) across multiple types.

## Special Exhibitions

"Special Exhibitions" is a place to highlight exhibitions that don't belong to a project. Technically it's a project but it's hidden from the main project list on the homepage

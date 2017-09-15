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

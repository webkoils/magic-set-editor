# Magic Editor Online

[Roadmap](https://github.com/webkoils/magic-set-editor/wiki).
[UI Component Library](https://magic-set-editor-ui.vercel.app)

Magic Card Editor is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.

## DISCLAIMER:

Magic Set Editor is intended for creating custom cards only, and should not be used to attempt the creation or distribution of counterfeits of real items produced by Wizards of the Coast, Konami, or other companies. Nor should any custom cards generated be passed off as if they are real in any setting.

All other trademarks are owned by whoever owns them.

## What's inside?

This monorepo uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

### Apps and Packages

#### Apps

- `next-app`: Boilerplate [Next.js](https://nextjs.org) app
- `packages`: Reusable packages

#### Packages

- `ui`: a stub React component library shared by any frontend app
- `eslint-config`,`tsconfig` configurations used throughout the monorepo configurations
- `config`: shared configs used in other packages or apps
- `lib`: nodejs library of shared code modules
- `template-converter`: converts og magic set editor templates to json

#### The goal is for each package/app to be 100% [TypeScript](https://www.typescriptlang.org/) so anytime we can convert js to ts, please do so.

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

### Pre-requisites

- [Node 16.x](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)

### Quickstart

1. pnpm
2. pnpm run dev - Run all projects
3. pnpm run storybook - Run UI storybook

### Develop

#### UI Component Library

Run Storybook

```
pnpm storybook
```

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

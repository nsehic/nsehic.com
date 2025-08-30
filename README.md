# nsehic.com
My personal site built with [Astro](https://astro.build). Contributions are welcome.

## Getting Started
To get started, make sure you have Node.js and pnpm installed, then clone the repository and install dependencies.

### Requirements
- Node.js
- pnpm

### Clone the repository
```shell
git clone https://github.com/nsehic/nsehic.com.git
```
### Install dependencies
```shell
pnpm install
```

### Run development server
```shell
pnpm run dev
```

### Preview changes
You can preview your changes on http://localhost:4321/

## Deployment
The website is deployed as static content on Google Cloud Storage. Commits merged to `main` will automatically be deployed via a workflow.

If you would like to do a production build locally, run the following command:
```shell
pnpm run build
```
Build output will appear in the `/dist` directory.

## License
MIT

## Acknowledgments
This site is a customised version of the [Astro Nano](https://github.com/markhorn-dev/astro-nano) template by Mark Horn.
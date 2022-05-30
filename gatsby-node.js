const path = require('path')
const generator = require('./lib/generator');
const url = require('url')
const fs = require('fs')
const handlebars = require('handlebars')

// Dynamically require the contract from the path
// that the Landr CLI passed to us.
const DATA = require(process.env.LANDR_CONTRACT_PATH);

const DEPLOY_URL = process.env.LANDR_IS_PREVIEW === 'false' ? null : process.env.LANDR_DEPLOY_URL;
const DIRECTORY = __dirname

/*
 * Calculate the site root and base path
 * if possible, in order to generate sitemap.xml.
 */
const siteUrl = DEPLOY_URL || DATA.data.links.homepage;
// const basePath = siteUrl ? new url.URL(siteUrl).pathname : null;

const site = generator(DATA, JSON.parse(process.env.LANDR_THEME), {
	siteUrl,
});

// for (const routePath of Object.keys(site)) {
// 	console.log(`Generating route: ${routePath}`);
// }

const analyticsOptions = process.env.LANDR_MIXPANEL_TOKEN
  ? {
    type: 'mixpanel',
    proxy: process.env.LANDR_MIXPANEL_PROXY,
    token: process.env.LANDR_MIXPANEL_TOKEN
  }
  : null


exports.onCreateWebpackConfig = ({ stage, actions, plugins, loaders }) => {
	if (stage === 'build-html') {
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						// since xterm uses global window, we shim the import while SSR until it's fixed in xterm and xterm-addon-fit.
						test: /xterm|xterm-addon-fit|react-typist|mixpanel-browser/,
						use: loaders.null(),
					},
				],
			},
		});
	}

	actions.setWebpackConfig({
		node: {
			fs: 'empty',
		},
		resolve: {
			alias: {
				'styled-components': path.resolve('node_modules', 'styled-components'),
			},
		},
	});
};

exports.createPages = async ({ actions }) => {
	const { createPage } = actions;

	const routes = [
		{
			path: '/',
			template: path.resolve(__dirname, 'lib/components/404/index.js'),
		},
	];


const rendererBuffer = await  new Promise((resolve, reject) => {
	fs.readFile(path.join(__dirname, 'lib/renderer.jsx.hbs'), (err, data) => {
		if (err) {
			reject(err);
		} else {
			resolve(data);
		}
	});
});
for (const [uri, combination] of Object.entries(site)) {
	const result = handlebars.compile(rendererBuffer.toString())({
		uri,
		combination,
	});
	const filename = `${combination
		.map((definition) => {
			return definition.component;
		})
		.join('-')}.renderer.jsx`;
	try {
		await fs.Promises.access(path.resolve(__dirname, filename), fs.constants.F_OK);
	} catch (err) {
		// File doesn't exist, write it
		// eslint-disable-next-line no-loop-func
		await new Promise((resolve, reject) => {
			fs.writeFile(path.resolve(__dirname, filename), result, (error) => {
				if (error) {
					return reject(error);
				}

				return resolve();
			});
		});
	}
}
for (const [uri, combination] of Object.entries(site)) {
	routes.push({
		path: uri,
		template: path.join(
			DIRECTORY,
			`${combination
				.map((definition) => {
					return definition.component;
				})
				.join('-')}.renderer.jsx`
		),
		context: {
			analytics: analyticsOptions,
			landrConfig: {
				envVars: {
					googleMapsKey: process.env.LANDR_GOOGLE_MAPS_KEY,
				},
			},
			site: siteUrl,
			combination,
		},
	});
}
	return new Promise((resolve, reject) => {

		routes.forEach((p) =>
			createPage({
				path: p.path,
				component: p.template,
				context: p.context,
			})
		);
		resolve();
	});
};

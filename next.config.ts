import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	experimental: {
		reactCompiler: true,
	},
	//reactStrictMode: false,
	devIndicators: {
		position: "top-left",
	},

	webpack: (config) => {
		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			sharp$: false,

			"onnxruntime-node$": false,
		};
		return config;
	},
};

export default nextConfig;

const turboAliases = {
	sharp: "sharp",
	"onnxruntime-node": "onnxruntime-node",
};

const withTurboAliases = {
	turbopack: {
		resolveAlias: turboAliases,
	},
};

// Fusiona la configuración de Turbopack con la existente
Object.assign(nextConfig, withTurboAliases);

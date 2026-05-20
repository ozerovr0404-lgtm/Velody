import { i as __toESM, t as require_react } from "./react-B35R_oEX.js";
import { Dt as require_prop_types, a as identifier_default, ct as styled, gt as styleFunctionSx_default, it as useTheme, lt as require_jsx_runtime, nt as ClassNameGenerator, s as createTheme, tt as clsx } from "./styled-B5beAdxu.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-_cBmygnp.js";
//#region node_modules/@mui/system/createBox/createBox.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function createBox(options = {}) {
	const { themeId, defaultTheme, defaultClassName = "MuiBox-root", generateClassName } = options;
	const BoxRoot = styled("div", { shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as" })(styleFunctionSx_default);
	return /* @__PURE__ */ import_react.forwardRef(function Box(inProps, ref) {
		const theme = useTheme(defaultTheme);
		const { className, component = "div", ...other } = inProps;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxRoot, {
			as: component,
			ref,
			className: clsx(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
			theme: themeId ? theme[themeId] || theme : theme,
			...other
		});
	});
}
//#endregion
//#region node_modules/@mui/material/Box/boxClasses.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
//#endregion
//#region node_modules/@mui/material/Box/Box.mjs
var Box = createBox({
	themeId: identifier_default,
	defaultTheme: createTheme(),
	defaultClassName: boxClasses.root,
	generateClassName: ClassNameGenerator.generate
});
Box.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
export { boxClasses as n, Box as t };

//# sourceMappingURL=Box-DLeo2mwf.js.map
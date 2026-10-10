import { Context } from "@deepseek-ai/cordis";
import SessionStore, { KNOWN_SESSION_EVENT_TYPES, SessionId } from "@deepseek-ai/dsh-session";
import { defineDomain } from "@deepseek-ai/dsh-storage-domain";
import { MessageId } from "@deepseek-ai/dsh-llm";
import { defineTool } from "@deepseek-ai/dsh-tools";
import z from "@deepseek-ai/schemastery";
import { createHash, randomUUID } from "node:crypto";
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var _a$1;
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
const globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const ratio = val / step;
	const roundedRatio = Math.round(ratio);
	const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
	if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
	return ratio - roundedRatio;
}
const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = /* @__PURE__*/ cached(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
const propertyKeyTypes = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
const NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
	rest.path ?? (rest.path = []);
	rest.message = message;
	if (ctx?.reportInput) rest.input = _input;
	return rest;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
const initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
const _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const cuid = /^[cC][0-9a-z]{6,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const httpProtocol = /^https?$/;
const e164 = /^\+[1-9]\d{6,14}$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
const integer = /^-?\d+$/;
const number$1 = /^-?\d+(?:\.\d+)?$/;
const boolean$1 = /^(?:true|false)$/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
const numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) {
			if (def.inclusive) bag.maximum = def.value;
			else bag.exclusiveMaximum = def.value;
		}
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) {
			if (def.inclusive) bag.minimum = def.value;
			else bag.exclusiveMinimum = def.value;
		}
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		var _a;
		(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
const version = {
	major: 4,
	minor: 4,
	patch: 3
};
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
});
const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			if (!def.normalize && def.protocol?.source === httpProtocol.source) {
				if (!/^https?:\/\//i.test(trimmed)) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: payload.value,
						inst,
						continue: !def.abort
					});
					return;
				}
			}
			const url = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.normalize) payload.value = url.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
	const isPresent = key in input;
	if (result.issues.length) {
		if (isOptionalIn && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && !isOptionalIn) {
		if (!result.issues.length) final.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [key]
		});
		return;
	}
	if (result.value === void 0) {
		if (isPresent) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalIn = _catchall.optin === "optional";
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (key === "__proto__") continue;
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", { get: () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			return newSh;
		} });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject$1 = isObject;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalIn = el._zod.optin === "optional";
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const schema = shape[key];
			const isOptionalIn = schema?._zod?.optin === "optional";
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$2 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		payload.fallback = true;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (input === void 0 && (result.issues.length || result.fallback)) return {
		issues: [],
		value: void 0
	};
	return result;
}
const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const input = payload.value;
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
			return handleOptionalResult(result, input);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault returns the default value immediately in forward direction.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
				payload.fallback = true;
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
			payload.fallback = true;
		}
		return payload;
	};
});
const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues,
		fallback: left.fallback
	}, ctx);
}
const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link _cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process$1(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process$1(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			defs[seen.defId] = seen.def;
		}
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) {
		if (ctx.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
	}
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
const formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
const stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
const numberProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
	if (typeof format === "string" && format.includes("int")) json.type = "integer";
	else json.type = "number";
	const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
	const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
	const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
	if (exMin) {
		if (legacy) {
			json.minimum = exclusiveMinimum;
			json.exclusiveMinimum = true;
		} else json.exclusiveMinimum = exclusiveMinimum;
	} else if (typeof minimum === "number") json.minimum = minimum;
	if (exMax) {
		if (legacy) {
			json.maximum = exclusiveMaximum;
			json.exclusiveMaximum = true;
		} else json.exclusiveMaximum = exclusiveMaximum;
	} else if (typeof maximum === "number") json.maximum = maximum;
	if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
const enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
const customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
const transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
const arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process$1(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
const objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process$1(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set([...allKeys].filter((key) => {
		const v = def.shape[key]._zod;
		if (ctx.io === "input") return v.optin === void 0;
		else return v.optout === void 0;
	}));
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = process$1(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
const unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process$1(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
const intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process$1(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process$1(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
};
const nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
const optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
const initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue) => {
			inst.issues.push(issue);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		addIssues: { value: (issues) => {
			inst.issues.push(...issues);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const encode = /* @__PURE__ */ _encode(ZodRealError);
const decode = /* @__PURE__ */ _decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region ../../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
const _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
	const proto = Object.getPrototypeOf(inst);
	let installed = _installedGroups.get(proto);
	if (!installed) {
		installed = /* @__PURE__ */ new Set();
		_installedGroups.set(proto, installed);
	}
	if (installed.has(group)) return;
	installed.add(group);
	for (const key in methods) {
		const fn = methods[key];
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const bound = fn.bind(this);
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: bound
				});
				return bound;
			},
			set(v) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: v
				});
			}
		});
	}
}
const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	_installLazyMethods(inst, "ZodType", {
		check(...chks) {
			const def = this.def;
			return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(/* @__PURE__ */ _overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn) {
			return fn(this);
		}
	});
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	return inst;
});
/** @internal */
const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	_installLazyMethods(inst, "_ZodString", {
		regex(...args) {
			return this.check(/* @__PURE__ */ _regex(...args));
		},
		includes(...args) {
			return this.check(/* @__PURE__ */ _includes(...args));
		},
		startsWith(...args) {
			return this.check(/* @__PURE__ */ _startsWith(...args));
		},
		endsWith(...args) {
			return this.check(/* @__PURE__ */ _endsWith(...args));
		},
		min(...args) {
			return this.check(/* @__PURE__ */ _minLength(...args));
		},
		max(...args) {
			return this.check(/* @__PURE__ */ _maxLength(...args));
		},
		length(...args) {
			return this.check(/* @__PURE__ */ _length(...args));
		},
		nonempty(...args) {
			return this.check(/* @__PURE__ */ _minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(/* @__PURE__ */ _lowercase(params));
		},
		uppercase(params) {
			return this.check(/* @__PURE__ */ _uppercase(params));
		},
		trim() {
			return this.check(/* @__PURE__ */ _trim());
		},
		normalize(...args) {
			return this.check(/* @__PURE__ */ _normalize(...args));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ _toLowerCase());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ _toUpperCase());
		},
		slugify() {
			return this.check(/* @__PURE__ */ _slugify());
		}
	});
});
const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
	inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
	inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	_installLazyMethods(inst, "ZodNumber", {
		gt(value, params) {
			return this.check(/* @__PURE__ */ _gt(value, params));
		},
		gte(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		min(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		lt(value, params) {
			return this.check(/* @__PURE__ */ _lt(value, params));
		},
		lte(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		max(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(/* @__PURE__ */ _gt(0, params));
		},
		nonnegative(params) {
			return this.check(/* @__PURE__ */ _gte(0, params));
		},
		negative(params) {
			return this.check(/* @__PURE__ */ _lt(0, params));
		},
		nonpositive(params) {
			return this.check(/* @__PURE__ */ _lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		step(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		finite() {
			return this;
		}
	});
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	_installLazyMethods(inst, "ZodArray", {
		min(n, params) {
			return this.check(/* @__PURE__ */ _minLength(n, params));
		},
		nonempty(params) {
			return this.check(/* @__PURE__ */ _minLength(1, params));
		},
		max(n, params) {
			return this.check(/* @__PURE__ */ _maxLength(n, params));
		},
		length(n, params) {
			return this.check(/* @__PURE__ */ _length(n, params));
		},
		unwrap() {
			return this.element;
		}
	});
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	_installLazyMethods(inst, "ZodObject", {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone({
				...this._zod.def,
				catchall
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: never()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(incoming) {
			return extend(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		}
	});
});
function object(shape, params) {
	const def = {
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	};
	return new ZodObject(def);
}
const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		payload.value = output;
		payload.fallback = true;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return /* @__PURE__ */ _superRefine(fn, params);
}
//#endregion
//#region src/config.ts
/**
* Config schema and resolution for `dsh-library`. Every tunable is a
* validated {@link Config} field changeable from cordis.yml (no hardcoded
* tunables); `resolveConfig` is the explicit resolution step that fails loud
* on out-of-range values and invalid embedder commands.
* @module dsh-library/config
*/
/** Library names: safe as domain keys and shown verbatim to the model. */
const LIBRARY_NAME = /^[a-z0-9][a-z0-9-]{0,63}$/;
/** Files larger than this are rejected with a clear error instead of being truncated. */
const DEFAULT_MAX_FILE_BYTES = 5242880;
/** Absolute safety bound on one stored chunk (chunkSize must stay below it). */
const MAX_CHUNK_CHARS = 4e3;
/** Local Ollama base URL (zero cloud — only this localhost endpoint is ever contacted). */
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
/** Default Ollama embedding model. */
const DEFAULT_OLLAMA_MODEL = "nomic-embed-text";
/** Embedder subprocess budget. */
const DEFAULT_EMBEDDING_TIMEOUT_MS = 3e4;
const DEFAULT_EMBEDDING_GRACE_MS = 1e3;
const DEFAULT_EMBEDDING_MAX_OUTPUT_BYTES = 1048576;
const DEFAULT_SEARCH_HYBRID_WEIGHT = .6;
const DEFAULT_SEARCH_MIN_RELEVANCE = .15;
const DEFAULT_SEARCH_DIVERSITY_LAMBDA = .5;
const DEFAULT_SEARCH_MAX_RESULT_CHARS = 16e3;
/** Injection defaults. */
const DEFAULT_INJECT_MAX_CHARS = 12e3;
const DEFAULT_CITATION_MIN_SEMANTIC = .1;
/** Schemastery schema: the loader validates and fills defaults before `apply`. */
const Config = z.object({
	chunkSize: z.number().default(900),
	chunkOverlap: z.number().default(120),
	maxFileBytes: z.number().default(DEFAULT_MAX_FILE_BYTES),
	embedding: z.object({
		dims: z.number().default(256),
		provider: z.union([
			z.const("hash"),
			z.const("command"),
			z.const("ollama")
		]).default("hash"),
		command: z.string(),
		ollamaUrl: z.string().default(DEFAULT_OLLAMA_URL),
		ollamaModel: z.string().default(DEFAULT_OLLAMA_MODEL),
		timeoutMs: z.number().default(DEFAULT_EMBEDDING_TIMEOUT_MS),
		graceMs: z.number().default(DEFAULT_EMBEDDING_GRACE_MS),
		maxOutputBytes: z.number().default(DEFAULT_EMBEDDING_MAX_OUTPUT_BYTES),
		maxBatchItems: z.number().default(64)
	}).default({
		dims: 256,
		provider: "hash",
		command: "",
		ollamaUrl: DEFAULT_OLLAMA_URL,
		ollamaModel: DEFAULT_OLLAMA_MODEL,
		timeoutMs: DEFAULT_EMBEDDING_TIMEOUT_MS,
		graceMs: DEFAULT_EMBEDDING_GRACE_MS,
		maxOutputBytes: DEFAULT_EMBEDDING_MAX_OUTPUT_BYTES,
		maxBatchItems: 64
	}),
	search: z.object({
		topK: z.number().default(8),
		hybridWeight: z.number().default(DEFAULT_SEARCH_HYBRID_WEIGHT),
		minRelevance: z.number().default(DEFAULT_SEARCH_MIN_RELEVANCE),
		diversityLambda: z.number().default(DEFAULT_SEARCH_DIVERSITY_LAMBDA),
		lostMiddleHead: z.number().default(1),
		lostMiddleTail: z.number().default(1),
		maxResultChars: z.number().default(DEFAULT_SEARCH_MAX_RESULT_CHARS)
	}).default({
		topK: 8,
		hybridWeight: DEFAULT_SEARCH_HYBRID_WEIGHT,
		minRelevance: DEFAULT_SEARCH_MIN_RELEVANCE,
		diversityLambda: DEFAULT_SEARCH_DIVERSITY_LAMBDA,
		lostMiddleHead: 1,
		lostMiddleTail: 1,
		maxResultChars: DEFAULT_SEARCH_MAX_RESULT_CHARS
	}),
	injection: z.object({
		enabled: z.boolean().default(true),
		maxChars: z.number().default(DEFAULT_INJECT_MAX_CHARS)
	}).default({
		enabled: true,
		maxChars: DEFAULT_INJECT_MAX_CHARS
	}),
	citation: z.object({
		windowChars: z.number().default(150),
		minScore: z.number().default(40),
		minSemantic: z.number().default(DEFAULT_CITATION_MIN_SEMANTIC)
	}).default({
		windowChars: 150,
		minScore: 40,
		minSemantic: DEFAULT_CITATION_MIN_SEMANTIC
	}),
	purge: z.object({
		signatureLength: z.number().default(4),
		maxProbes: z.number().default(24)
	}).default({
		signatureLength: 4,
		maxProbes: 24
	}),
	diagnose: z.object({
		maxDuplicatePairs: z.number().default(24),
		sampleCap: z.number().default(200),
		positionBins: z.number().default(5)
	}).default({
		maxDuplicatePairs: 24,
		sampleCap: 200,
		positionBins: 5
	})
});
/** Reject a non-positive or non-integer count with the owning key name. */
function assertPositiveInteger(name, value) {
	if (!Number.isSafeInteger(value) || value <= 0) throw new TypeError(`dsh-library: ${name} must be a positive safe integer, got ${String(value)}`);
}
/** Reject a non-finite number with the owning key name. */
function assertFinite(name, value) {
	if (!Number.isFinite(value)) throw new TypeError(`dsh-library: ${name} must be finite, got ${String(value)}`);
}
/**
* Validate raw values and compile the resolved config. Defaults are applied
* HERE — the explicit resolution step — so a partially-specified config from
* a direct `ctx.plugin` mount behaves like the loader-filled one.
* @param config - raw (possibly partial) plugin config.
* @returns the fully resolved config.
* @throws TypeError on non-positive caps, an oversized chunk window, or an
*   embedder command without an executable part (misconfiguration fails loud).
*/
function resolveConfig(config = {}) {
	assertPositiveInteger("chunkSize", config.chunkSize ?? 900);
	assertPositiveInteger("chunkOverlap", config.chunkOverlap ?? 120);
	assertPositiveInteger("maxFileBytes", config.maxFileBytes ?? 5242880);
	const chunkSize = config.chunkSize ?? 900;
	const chunkOverlap = config.chunkOverlap ?? 120;
	if (chunkSize > 4e3) throw new TypeError(`dsh-library: chunkSize must not exceed ${MAX_CHUNK_CHARS}, got ${chunkSize}`);
	if (chunkOverlap >= chunkSize) throw new TypeError(`dsh-library: chunkOverlap (${chunkOverlap}) must be smaller than chunkSize (${chunkSize})`);
	const embedding = config.embedding ?? {};
	const dims = embedding.dims ?? 256;
	if (!Number.isSafeInteger(dims) || dims < 8) throw new TypeError(`dsh-library: embedding.dims must be an integer ≥ 8, got ${String(dims)}`);
	for (const [name, value] of [
		["embedding.timeoutMs", embedding.timeoutMs ?? 3e4],
		["embedding.graceMs", embedding.graceMs ?? 1e3],
		["embedding.maxOutputBytes", embedding.maxOutputBytes ?? 1048576],
		["embedding.maxBatchItems", embedding.maxBatchItems ?? 64]
	]) assertPositiveInteger(name, value);
	const rawCommand = embedding.command;
	const command = rawCommand === void 0 || rawCommand.trim().length === 0 ? void 0 : rawCommand.trim();
	const rawProvider = embedding.provider;
	let provider;
	if (command !== void 0) provider = "command";
	else if (rawProvider === void 0 || rawProvider === "hash") provider = "hash";
	else if (rawProvider === "command") throw new TypeError("dsh-library: embedding.provider=command requires embedding.command to be set");
	else if (rawProvider === "ollama") provider = "ollama";
	else throw new TypeError(`dsh-library: embedding.provider must be hash|command|ollama, got ${JSON.stringify(rawProvider)}`);
	const ollamaUrl = (embedding.ollamaUrl ?? "http://127.0.0.1:11434").trim();
	const ollamaModel = (embedding.ollamaModel ?? "nomic-embed-text").trim();
	if (provider === "ollama") {
		if (ollamaUrl.length === 0) throw new TypeError("dsh-library: embedding.ollamaUrl must be a non-empty URL when provider=ollama");
		if (ollamaModel.length === 0) throw new TypeError("dsh-library: embedding.ollamaModel must be a non-empty model name when provider=ollama");
	}
	const search = config.search ?? {};
	const topK = search.topK ?? 8;
	assertPositiveInteger("search.topK", topK);
	for (const [name, value] of [
		["search.hybridWeight", search.hybridWeight ?? .6],
		["search.minRelevance", search.minRelevance ?? .15],
		["search.diversityLambda", search.diversityLambda ?? .5],
		["search.maxResultChars", search.maxResultChars ?? 16e3]
	]) assertFinite(name, value);
	const hybridWeight = search.hybridWeight ?? .6;
	if (hybridWeight < 0 || hybridWeight > 1) throw new TypeError(`dsh-library: search.hybridWeight must be within 0..1, got ${hybridWeight}`);
	const minRelevance = search.minRelevance ?? .15;
	if (minRelevance < 0 || minRelevance > 1) throw new TypeError(`dsh-library: search.minRelevance must be within 0..1, got ${minRelevance}`);
	const diversityLambda = search.diversityLambda ?? .5;
	if (diversityLambda < 0 || diversityLambda > 1) throw new TypeError(`dsh-library: search.diversityLambda must be within 0..1, got ${diversityLambda}`);
	const lostMiddleHead = search.lostMiddleHead ?? 1;
	const lostMiddleTail = search.lostMiddleTail ?? 1;
	if (!Number.isSafeInteger(lostMiddleHead) || lostMiddleHead < 0 || !Number.isSafeInteger(lostMiddleTail) || lostMiddleTail < 0 || lostMiddleHead + lostMiddleTail > topK) throw new TypeError(`dsh-library: search.lostMiddleHead + search.lostMiddleTail (${lostMiddleHead} + ${lostMiddleTail}) must not exceed search.topK (${topK})`);
	const injection = config.injection ?? {};
	assertPositiveInteger("injection.maxChars", injection.maxChars ?? 12e3);
	const citation = config.citation ?? {};
	assertPositiveInteger("citation.windowChars", citation.windowChars ?? 150);
	const minScore = citation.minScore ?? 40;
	if (!Number.isFinite(minScore) || minScore < 0 || minScore > 100) throw new TypeError(`dsh-library: citation.minScore must be within 0..100, got ${String(minScore)}`);
	const minSemantic = citation.minSemantic ?? .1;
	if (!Number.isFinite(minSemantic) || minSemantic < 0 || minSemantic > 1) throw new TypeError(`dsh-library: citation.minSemantic must be within 0..1, got ${String(minSemantic)}`);
	const purge = config.purge ?? {};
	assertPositiveInteger("purge.signatureLength", purge.signatureLength ?? 4);
	assertPositiveInteger("purge.maxProbes", purge.maxProbes ?? 24);
	const diagnose = config.diagnose ?? {};
	assertPositiveInteger("diagnose.maxDuplicatePairs", diagnose.maxDuplicatePairs ?? 24);
	assertPositiveInteger("diagnose.sampleCap", diagnose.sampleCap ?? 200);
	const positionBins = diagnose.positionBins ?? 5;
	if (!Number.isSafeInteger(positionBins) || positionBins < 2) throw new TypeError(`dsh-library: diagnose.positionBins must be an integer ≥ 2, got ${String(positionBins)}`);
	return {
		chunkSize,
		chunkOverlap,
		maxFileBytes: config.maxFileBytes ?? 5242880,
		embedding: {
			dims,
			provider,
			command: command === void 0 ? void 0 : command.trim(),
			ollamaUrl,
			ollamaModel,
			timeoutMs: embedding.timeoutMs ?? 3e4,
			graceMs: embedding.graceMs ?? 1e3,
			maxOutputBytes: embedding.maxOutputBytes ?? 1048576,
			maxBatchItems: embedding.maxBatchItems ?? 64
		},
		search: {
			topK,
			hybridWeight,
			minRelevance,
			diversityLambda,
			lostMiddleHead,
			lostMiddleTail,
			maxResultChars: search.maxResultChars ?? 16e3
		},
		injection: {
			enabled: injection.enabled ?? true,
			maxChars: injection.maxChars ?? 12e3
		},
		citation: {
			windowChars: citation.windowChars ?? 150,
			minScore,
			minSemantic
		},
		purge: {
			signatureLength: purge.signatureLength ?? 4,
			maxProbes: purge.maxProbes ?? 24
		},
		diagnose: {
			maxDuplicatePairs: diagnose.maxDuplicatePairs ?? 24,
			sampleCap: diagnose.sampleCap ?? 200,
			positionBins
		}
	};
}
//#endregion
//#region src/text.ts
/**
* Shared text utilities for the quality modules: tokenization, term
* frequencies, and n-gram windows. Pure and deterministic — every scoring
* module builds on this vocabulary.
* @module dsh-library/text
*/
/**
* Normalize prose for scoring: lowercase and collapse whitespace.
* Does NOT strip punctuation (token boundaries still cut on it).
* @param text - input text.
* @returns the normalized text.
*/
function normalize(text) {
	return text.toLowerCase().replace(/\s+/gu, " ").trim();
}
/**
* Tokenize into lowercase word tokens. ASCII words keep their boundaries;
* every other run of letters counts as one token so CJK text still scores.
* @param text - input text.
* @returns the token list.
*/
function tokenize(text) {
	const tokens = [];
	for (const match of normalize(text).matchAll(/[a-z0-9]+|[\u00c0-\uffff]+/giu)) tokens.push(match[0]);
	return tokens;
}
/**
* CJK-aware scoring tokenization: like {@link tokenize}, but every CJK run
* contributes its unigrams plus its adjacent bigrams, so a query and a
* document overlap on sub-phrases instead of only on identical whole runs.
* @param text - input text.
* @returns the expanded token list.
*/
function cjkTokenize(text) {
	const tokens = [];
	for (const match of normalize(text).matchAll(/[a-z0-9]+|[\u00c0-\uffff]+/giu)) {
		const run = match[0];
		if (/^[\u4e00-\u9fff]+$/u.test(run)) {
			for (const char of run) tokens.push(char);
			for (let index = 0; index < run.length - 1; index += 1) tokens.push(run.slice(index, index + 2));
		} else tokens.push(run);
	}
	return tokens;
}
/**
* Term-frequency map of a token list: token → occurrence count.
* @param tokens - the token list.
* @returns the frequency map (plain object, no prototype).
*/
function termFrequenciesOf(tokens) {
	const frequencies = Object.create(null);
	for (const token of tokens) frequencies[token] = (frequencies[token] ?? 0) + 1;
	return frequencies;
}
/**
* Term-frequency map of one text: token → occurrence count.
* @param text - input text.
* @returns the frequency map (plain object, no prototype).
*/
function termFrequencies(text) {
	return termFrequenciesOf(tokenize(text));
}
/**
* Character n-grams of a normalized text, for the built-in hash embedder.
* A space-padded form adds leading/trailing boundary markers so prefixes and
* suffixes still contribute.
* @param text - input text.
* @param n - n-gram width.
* @returns the n-gram array.
*/
function charNGrams(text, n) {
	const padded = ` ${normalize(text)} `;
	if (padded.length <= n) return [padded];
	const grams = [];
	for (let index = 0; index <= padded.length - n; index += 1) grams.push(padded.slice(index, index + n));
	return grams;
}
/**
* Token n-grams of a tokenized text (the purge signature vocabulary).
* @param tokens - token list from {@link tokenize}.
* @param n - n-gram width.
* @returns n-gram tokens joined by spaces, deduplicated.
*/
function tokenNGrams(tokens, n) {
	if (tokens.length === 0) return [];
	const grams = [];
	const end = Math.max(tokens.length - n + 1, 1);
	for (let index = 0; index < end; index += 1) grams.push(tokens.slice(index, Math.min(index + n, tokens.length)).join(" "));
	return [...new Set(grams)];
}
/**
* FNV-1a 32-bit string hash — the deterministic bucket of the hash embedder.
* @param text - string to hash.
* @returns an unsigned 32-bit integer.
*/
function fnv1a(text) {
	let hash = 2166136261;
	for (let index = 0; index < text.length; index += 1) {
		hash ^= text.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
//#endregion
//#region src/embedding.ts
/**
* Embed one text with the built-in hash embedder. Each word token and each
* character tri-gram hashes (FNV-1a) to a signed bucket: the index is the
* hash modulo `dims` and the sign is the hash's high bit. The result is
* L2-normalized so cosine similarity is a dot product.
* @param text - input text.
* @param dims - vector dimensionality (≥ 1).
* @returns the normalized embedding as a plain number array.
*/
function embedHash(text, dims) {
	const vector = new Float64Array(dims);
	const features = [...tokenize(text), ...charNGrams(text, 3)];
	for (const feature of features) {
		const hash = fnv1a(feature);
		const index = hash % dims;
		const sign = (hash & 2147483648) === 0 ? 1 : -1;
		vector[index] = vector[index] + sign;
	}
	return normalizeVector(vector);
}
/** L2-normalize a vector in place; a zero vector stays zero. */
function normalizeVector(vector) {
	let squared = 0;
	for (const value of vector) squared += value * value;
	const norm = Math.sqrt(squared);
	const result = new Array(vector.length);
	for (let index = 0; index < vector.length; index += 1) result[index] = norm === 0 ? 0 : vector[index] / norm;
	return result;
}
/**
* Cosine similarity of two equal-length vectors (already-normalized vectors
* make this a plain dot product, but the function normalizes anyway).
* @param a - first vector.
* @param b - second vector.
* @returns similarity within 0..1 for non-negative-input vectors.
*/
function cosine(a, b) {
	if (a.length !== b.length) throw new TypeError(`vector dimension mismatch: ${a.length} vs ${b.length}`);
	let dot = 0;
	let normA = 0;
	let normB = 0;
	for (let index = 0; index < a.length; index += 1) {
		dot += a[index] * b[index];
		normA += a[index] * a[index];
		normB += b[index] * b[index];
	}
	if (normA === 0 || normB === 0) return 0;
	return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
/** Parse one embedder stdout line into an index/vector pair, or null when malformed. */
function parseEmbeddingLine(line, dims) {
	const trimmed = line.trim();
	if (trimmed.length === 0) return null;
	try {
		const parsed = JSON.parse(trimmed);
		if (typeof parsed !== "object" || parsed === null) return null;
		const record = parsed;
		if (typeof record["index"] !== "number" || !Array.isArray(record["vector"])) return null;
		const vector = record["vector"];
		if (vector.length !== dims || vector.some((value) => typeof value !== "number" || !Number.isFinite(value))) return null;
		return {
			index: record["index"],
			vector: normalizeVector(Float64Array.from(vector))
		};
	} catch {
		return null;
	}
}
/**
* Run the configured external embedder command once over a text batch.
* The protocol is JSON lines both ways: each stdin line is
* `{"index": <n>, "text": "..."}` and each stdout line is
* `{"index": <n>, "vector": [<number>, ...]}`. Every requested index must be
* answered exactly once or the call fails closed (misconfiguration must
* surface, not silently degrade retrieval).
* @param subprocess - the mounted `ctx.subprocess` service.
* @param argv - the configured command line split into argv (argv[0] = program).
* @param cwd - working directory for the child.
* @param texts - the texts to embed, in index order.
* @param dims - expected vector dimensionality.
* @param caps - timeout, grace, and output caps.
* @returns embeddings in the same order as {@link texts}.
* @throws Error on spawn failure, non-zero exit, or an incomplete/oversized answer.
*/
async function embedWithCommand(subprocess, argv, cwd, texts, dims, caps) {
	const payload = texts.map((text, index) => JSON.stringify({
		index,
		text
	})).join("\n");
	const abort = AbortSignal.timeout(caps.timeoutMs);
	const spec = {
		argv,
		cwd,
		stdio: {
			stdin: { data: `${payload}\n` },
			stdout: { maxBytes: caps.maxOutputBytes },
			stderr: { maxBytes: caps.maxOutputBytes }
		},
		graceMs: caps.graceMs,
		signal: abort
	};
	const handle = subprocess.spawn(spec);
	const outcome = await handle.done;
	if (outcome.exitCode !== 0 || outcome.signal !== null) throw new Error(`dsh-library: embedder command exited abnormally (exit ${String(outcome.exitCode)}, signal ${String(outcome.signal)})`);
	const stdout = handle.collected.stdout;
	if (stdout === void 0) throw new Error("dsh-library: embedder stdout was not collected");
	const read = stdout.readFrom(0);
	if (read.lossy) throw new Error("dsh-library: embedder output exceeded the configured cap");
	const answers = /* @__PURE__ */ new Map();
	let malformed = 0;
	for (const line of read.text.split("\n")) {
		const parsed = parseEmbeddingLine(line, dims);
		if (parsed === null) {
			malformed += 1;
			continue;
		}
		answers.set(parsed.index, parsed.vector);
	}
	const missing = texts.map((_, index) => index).filter((index) => !answers.has(index));
	if (missing.length > 0 || answers.size !== texts.length) throw new Error(`dsh-library: embedder answered ${answers.size} of ${texts.length} indices` + (missing.length > 0 ? `; missing: ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? "…" : ""}` : "") + (malformed > 0 ? `; ${malformed} malformed line(s)` : ""));
	return texts.map((_, index) => answers.get(index));
}
/**
* Split a flat command line into argv without shell interpretation.
* Whitespace separates; quotes are NOT processed (documented: no shell).
* @param command - the configured command string.
* @returns the argv vector; an empty string yields an empty vector.
*/
function splitCommandLine(command) {
	return command.trim().split(/\s+/u).filter((part) => part.length > 0);
}
/** Built-in deterministic hash embedder: zero downloads, pure local hashing. */
var HashEmbedder = class {
	dims;
	name = "hash";
	/**
	* @param dims - vector dimensionality (≥ 1).
	*/
	constructor(dims) {
		this.dims = dims;
	}
	async embed(texts) {
		return texts.map((text) => embedHash(text, this.dims));
	}
};
/** External command embedder over the JSON-lines subprocess protocol. */
var CommandEmbedder = class {
	subprocess;
	argv;
	cwd;
	dims;
	caps;
	maxBatchItems;
	name = "command";
	/**
	* @param subprocess - the mounted subprocess seam.
	* @param argv - the command line split into argv (argv[0] = program).
	* @param cwd - working directory for the child.
	* @param dims - expected vector dimensionality.
	* @param caps - timeout, grace, and output caps.
	* @param maxBatchItems - texts per subprocess invocation; larger batches split.
	*/
	constructor(subprocess, argv, cwd, dims, caps, maxBatchItems) {
		this.subprocess = subprocess;
		this.argv = argv;
		this.cwd = cwd;
		this.dims = dims;
		this.caps = caps;
		this.maxBatchItems = maxBatchItems;
	}
	async embed(texts) {
		const out = [];
		for (let index = 0; index < texts.length; index += this.maxBatchItems) out.push(...await embedWithCommand(this.subprocess, this.argv, this.cwd, texts.slice(index, index + this.maxBatchItems), this.dims, this.caps));
		return out;
	}
};
/**
* Local Ollama embedder over the `/api/embed` endpoint. Zero cloud: the model
* runs on a localhost Ollama server. A non-2xx response or a malformed vector
* fails the batch (misconfiguration must surface, not silently degrade
* retrieval); availability is probed up front by {@link probeOllama}.
*/
var OllamaEmbedder = class {
	url;
	model;
	dims;
	timeoutMs;
	maxBatchItems;
	name = "ollama";
	/**
	* @param url - the Ollama base URL (e.g. `http://127.0.0.1:11434`).
	* @param model - the embedding model name (e.g. `nomic-embed-text`).
	* @param dims - the probed embedding dimensionality.
	* @param timeoutMs - per-request timeout.
	* @param maxBatchItems - texts per `/api/embed` call; larger batches split.
	*/
	constructor(url, model, dims, timeoutMs, maxBatchItems) {
		this.url = url;
		this.model = model;
		this.dims = dims;
		this.timeoutMs = timeoutMs;
		this.maxBatchItems = maxBatchItems;
	}
	async embed(texts) {
		const out = [];
		for (let index = 0; index < texts.length; index += this.maxBatchItems) out.push(...await this.embedBatch(texts.slice(index, index + this.maxBatchItems)));
		return out;
	}
	/** POST one batch to `/api/embed` and validate the returned vectors. */
	async embedBatch(texts) {
		let response;
		try {
			response = await fetch(`${this.url}/api/embed`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					model: this.model,
					input: [...texts]
				}),
				signal: AbortSignal.timeout(this.timeoutMs)
			});
		} catch (error) {
			throw new Error(`dsh-library: ollama embed request failed: ${error instanceof Error ? error.message : String(error)}`);
		}
		if (!response.ok) throw new Error(`dsh-library: ollama embed failed (HTTP ${response.status})`);
		const embeddings = (await response.json())["embeddings"];
		if (!Array.isArray(embeddings) || embeddings.length !== texts.length) throw new Error(`dsh-library: ollama answered ${Array.isArray(embeddings) ? embeddings.length : 0} of ${texts.length} inputs`);
		return embeddings.map((vector) => {
			if (!Array.isArray(vector) || vector.length !== this.dims || vector.some((value) => typeof value !== "number" || !Number.isFinite(value))) throw new Error("dsh-library: ollama returned a malformed embedding vector");
			return normalizeVector(Float64Array.from(vector));
		});
	}
};
/**
* Probe a local Ollama server for one embedding model. Sends a single-word
* probe through `/api/embed` and returns the model's vector dimensionality, or
* undefined when the server is unreachable, the model is unknown, or the
* response is malformed. Zero cloud — only the configured local URL is ever
* contacted.
* @param url - the Ollama base URL.
* @param model - the embedding model name.
* @param timeoutMs - probe timeout.
* @returns the model's dimensionality, or undefined when unavailable.
*/
async function probeOllama(url, model, timeoutMs) {
	try {
		const response = await fetch(`${url}/api/embed`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				model,
				input: ["probe"]
			}),
			signal: AbortSignal.timeout(timeoutMs)
		});
		if (!response.ok) return void 0;
		const embeddings = (await response.json())["embeddings"];
		if (!Array.isArray(embeddings) || embeddings.length !== 1 || !Array.isArray(embeddings[0])) return void 0;
		return embeddings[0].length;
	} catch {
		return;
	}
}
/**
* Resolve the embedder backend from the resolved config: the configured
* command wins (fail loud without a subprocess seam), the `ollama` provider is
* probed and degrades gracefully to the built-in hash embedder when the server
* is unreachable, and the built-in hash embedder is the zero-download default.
* @param config - the resolved embedding config.
* @param subprocess - the optional subprocess seam (command provider only).
* @param cwd - working directory for the command provider.
* @returns the backend plus its degradation note.
*/
async function resolveEmbedder(config, subprocess, cwd) {
	if (config.provider === "command") {
		if (subprocess === void 0) throw new Error("dsh-library: embedding.provider=command but ctx.subprocess is not mounted — the external embedder cannot run");
		return {
			embedder: new CommandEmbedder(subprocess, splitCommandLine(config.command), cwd, config.dims, {
				timeoutMs: config.timeoutMs,
				graceMs: config.graceMs,
				maxOutputBytes: config.maxOutputBytes
			}, config.maxBatchItems),
			degraded: false
		};
	}
	if (config.provider === "ollama") {
		const dims = await probeOllama(config.ollamaUrl, config.ollamaModel, config.timeoutMs);
		if (dims === void 0) return {
			embedder: new HashEmbedder(config.dims),
			degraded: true,
			reason: `ollama unavailable at ${config.ollamaUrl} (model ${config.ollamaModel}); degraded to the built-in hash embedder`
		};
		return {
			embedder: new OllamaEmbedder(config.ollamaUrl, config.ollamaModel, dims, config.timeoutMs, config.maxBatchItems),
			degraded: false
		};
	}
	return {
		embedder: new HashEmbedder(config.dims),
		degraded: false
	};
}
//#endregion
//#region src/ids.ts
/**
* Identity minting for dsh-library records: content-derived document ids,
* per-chunk ids, and the unique ids that link injected model-visible text
* back to its `library/inject` session event (model-visible ⟺ logged).
* @module dsh-library/ids
*/
/** Stable document id: first 16 hex chars of the SHA-256 of its content. */
function documentIdOf(content) {
	return createHash("sha256").update(content, "utf8").digest("hex").slice(0, 16);
}
/** Chunk id: the owning document id plus the chunk sequence. */
function chunkIdOf(documentId, seq) {
	return `${documentId}#${seq}`;
}
/** One purge-verification run's identity, recorded in the purges table. */
function purgeId() {
	return `purge-${randomUUID()}`;
}
/**
* One injection's identity: embedded in the injected marker text so the
* model-visible message is reconstructable from the `library/inject` event.
*/
function injectId() {
	return randomUUID();
}
/** Domain record key of one document inside the `documents` table. */
function documentKey(library, documentId) {
	return `${library}:${documentId}`;
}
/** Domain record key of one chunk inside the `chunks` table. */
function chunkKey(library, chunkId) {
	return `${library}:${chunkId}`;
}
//#endregion
//#region src/quality/chunk-visual.ts
/**
* Port of RAG-Chunk-Visualizer (upstream/PerryLink, Apache-2.0): the
* sliding-window `chunk_text` algorithm plus the structured diagnostics that
* power `library_diagnose`. Pure functions — no I/O, no model.
* @module dsh-library/quality/chunk-visual
*/
/**
* Slice one text into sliding-window chunks — the exact algorithm of the
* upstream `chunk_text`. Validation matches upstream: `chunkSize` > 0,
* `overlap` ≥ 0 and strictly smaller than `chunkSize`.
* @param text - the text to slice.
* @param chunkSize - window width in characters.
* @param overlap - overlap between consecutive windows in characters.
* @returns the chunk list (empty for empty input).
* @throws TypeError on invalid parameters.
*/
function chunkText(text, chunkSize, overlap) {
	if (chunkSize <= 0) throw new TypeError("chunkSize must be greater than 0");
	if (overlap < 0) throw new TypeError("overlap must be at least 0");
	if (overlap >= chunkSize) throw new TypeError("overlap must be smaller than chunkSize");
	const chunks = [];
	let position = 0;
	let chunkIndex = 0;
	while (position < text.length) {
		const end = Math.min(position + chunkSize, text.length);
		chunks.push({
			text: text.slice(position, end),
			startPos: position,
			endPos: end,
			index: chunkIndex,
			overlapChars: chunkIndex > 0 ? overlap : 0
		});
		position += chunkSize - overlap;
		chunkIndex += 1;
	}
	return chunks;
}
/** Size-bucket boundary: powers of two from 256 chars up (diagnose histogram). */
const CHUNK_SIZE_BUCKETS = [
	256,
	512,
	1024,
	2048,
	4096
];
/**
* Bucket one chunk list into size classes and fold the basic size facts.
* @param chunks - the chunks to analyze.
* @returns the histogram and size summary.
*/
function chunkSizeHistogram(chunks) {
	const bounds = [...CHUNK_SIZE_BUCKETS, Number.POSITIVE_INFINITY];
	const counts = CHUNK_SIZE_BUCKETS.map(() => 0);
	let totalChars = 0;
	let minChars = Number.POSITIVE_INFINITY;
	let maxChars = 0;
	for (const chunk of chunks) {
		totalChars += chunk.text.length;
		if (chunk.text.length < minChars) minChars = chunk.text.length;
		if (chunk.text.length > maxChars) maxChars = chunk.text.length;
		for (let index = 0; index < bounds.length; index += 1) if (chunk.text.length <= bounds[index]) {
			counts[index] = (counts[index] ?? 0) + 1;
			break;
		}
	}
	return {
		buckets: CHUNK_SIZE_BUCKETS.map((min, index) => ({
			label: index === CHUNK_SIZE_BUCKETS.length - 1 ? `${min}+` : `${min}-${CHUNK_SIZE_BUCKETS[index + 1] - 1}`,
			min,
			max: index === CHUNK_SIZE_BUCKETS.length - 1 ? null : CHUNK_SIZE_BUCKETS[index + 1] - 1,
			count: counts[index]
		})),
		minChars: chunks.length === 0 ? 0 : minChars,
		maxChars,
		meanChars: chunks.length === 0 ? 0 : Math.round(totalChars / chunks.length),
		totalChars
	};
}
/**
* Stable per-chunk content hash (FNV-1a) — the duplicate-detection key.
* @param chunk - the chunk to hash.
* @returns the hex hash.
*/
function chunkHash(chunk) {
	return fnv1a(chunk.text).toString(16).padStart(8, "0");
}
/**
* Find exact and near-duplicate chunk pairs by cosine similarity over the
* pair's shared token vocabulary (the diversity module's measure). The scan
* is quadratic, so callers bound the input.
* @param chunks - the chunks to scan.
* @param threshold - similarity above which a pair counts as duplicate.
* @param maxPairs - cap on reported pairs (the scan still computes the count).
* @returns reported pairs and the duplicate count.
*/
function findDuplicateChunks(chunks, threshold, maxPairs) {
	const pairs = [];
	let duplicateCount = 0;
	const texts = chunks.map((chunk) => chunk.text);
	for (let i = 0; i < texts.length; i += 1) for (let j = i + 1; j < texts.length; j += 1) {
		const similarity = pairSimilarity(texts[i], texts[j]);
		if (similarity > threshold) {
			duplicateCount += 1;
			if (pairs.length < maxPairs) pairs.push({
				indexA: i,
				indexB: j,
				similarity
			});
		}
	}
	return {
		pairs,
		duplicateCount
	};
}
/** Cosine similarity over the union token set of two texts (TF-IDF-lite). */
function pairSimilarity(a, b) {
	const tokensA = tokenMap(a);
	const tokensB = tokenMap(b);
	if (tokensA.size === 0 || tokensB.size === 0) return 0;
	let dot = 0;
	let normA = 0;
	let normB = 0;
	for (const count of tokensA.values()) normA += count * count;
	for (const count of tokensB.values()) normB += count * count;
	for (const [token, countA] of tokensA) {
		const countB = tokensB.get(token) ?? 0;
		dot += countA * countB;
	}
	return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
/** Raw term-count map of one text (same vocabulary as {@link termFrequencies}). */
function tokenMap(text) {
	const map = /* @__PURE__ */ new Map();
	for (const match of text.toLowerCase().matchAll(/[a-z0-9]+|[\u00c0-\uffff]+/giu)) map.set(match[0], (map.get(match[0]) ?? 0) + 1);
	return map;
}
//#endregion
//#region src/quality/diversity.ts
/**
* Port of Retrieval-Diversity-Check (upstream/PerryLink, Apache-2.0): the
* TF-IDF cosine duplicate scan (`check_diversity`) plus the maximal-marginal
* relevance re-ranking that `library_search` applies to its hybrid-ranked
* candidates. Pure functions — the upstream numpy/sklearn calls are replaced
* by the shared token vocabulary.
* @module dsh-library/quality/diversity
*/
/**
* Check a text list for near-duplicates — the upstream `check_diversity`.
* TF-IDF-lite vectors share one token vocabulary; pairs whose cosine
* similarity is STRICTLY above `threshold` are duplicates (upstream uses
* `>`). Fewer than two texts throw, like upstream.
* @param texts - the texts to compare.
* @param threshold - similarity threshold (0..1).
* @returns the diversity report.
* @throws TypeError on fewer than two texts.
*/
function checkDiversity(texts, threshold = .9) {
	if (texts.length < 2) throw new TypeError("at least 2 texts are required for comparison");
	const vectors = texts.map((text) => termFrequencies(text));
	const matrix = [];
	const duplicates = [];
	const duplicateIndices = /* @__PURE__ */ new Set();
	for (let i = 0; i < texts.length; i += 1) {
		const row = [];
		matrix.push(row);
		for (let j = 0; j < texts.length; j += 1) {
			const similarity = j === i ? 1 : cosineTf(vectors[i], vectors[j]);
			row.push(similarity);
			if (j > i && similarity > threshold) {
				duplicates.push({
					first: i,
					second: j,
					similarity
				});
				duplicateIndices.add(i);
				duplicateIndices.add(j);
			}
		}
	}
	const duplicateCount = duplicateIndices.size;
	const tokenSavings = texts.length > 0 ? duplicateCount / texts.length * 100 : 0;
	return {
		totalTexts: texts.length,
		duplicateCount,
		tokenSavings,
		duplicates,
		similarityMatrix: matrix
	};
}
/** Cosine over two raw term-frequency maps. */
function cosineTf(a, b) {
	let dot = 0;
	let normA = 0;
	let normB = 0;
	for (const count of Object.values(a)) normA += count * count;
	for (const count of Object.values(b)) normB += count * count;
	for (const [token, countA] of Object.entries(a)) {
		const countB = b[token] ?? 0;
		dot += countA * countB;
	}
	if (normA === 0 || normB === 0) return 0;
	return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
/**
* Maximal marginal relevance over {@link RerankCandidate}s: greedily pick the
* candidate maximizing `lambda * relevance - (1 - lambda) * maxSimilarity`.
* `lambda = 1` is pure relevance order, `lambda = 0` pure diversity.
* @param candidates - the ranked candidate pool.
* @param lambda - relevance/diversity trade-off within 0..1.
* @param topK - how many to pick.
* @returns the picked candidates in selection order.
*/
function maximalMarginalRelevance(candidates, lambda, topK) {
	const pool = [...candidates];
	const selected = [];
	while (selected.length < topK && pool.length > 0) {
		let bestIndex = -1;
		let bestScore = Number.NEGATIVE_INFINITY;
		for (let index = 0; index < pool.length; index += 1) {
			const candidate = pool[index];
			let maxSimilarity = 0;
			for (const chosen of selected) {
				const similarity = candidate.similarityTo(chosen);
				if (similarity > maxSimilarity) maxSimilarity = similarity;
			}
			const score = lambda * candidate.relevance - (1 - lambda) * maxSimilarity;
			if (score > bestScore) {
				bestScore = score;
				bestIndex = index;
			}
		}
		selected.push(pool.splice(bestIndex, 1)[0]);
	}
	return selected;
}
//#endregion
//#region src/quality/lost-middle.ts
/** Default probe prefix, mirroring the upstream `SECRET_CODE_` convention. */
const PROBE_PREFIX = "SECRET_CODE_";
/**
* Deterministic probe text for one trial. The upstream generator draws 4
* random chars; here the caller supplies the suffix so tests replay.
* @param suffix - the 4-character uppercase/digit suffix.
* @returns the full probe string.
*/
function makeProbe(suffix) {
	return `${PROBE_PREFIX}${suffix}`;
}
/**
* Insert a probe sentence into one paragraph — the upstream
* `PasswordInserter.insert`, deterministic instead of random.
* @param paragraphs - the paragraph list.
* @param position - relative position within 0..1 (clamped to the list).
* @param probe - the probe string to insert.
* @returns the modified list, the probe, and the insertion index.
*/
function insertProbe(paragraphs, position, probe) {
	if (paragraphs.length === 0) throw new TypeError("insertProbe requires at least one paragraph");
	let insertIndex = Math.round((paragraphs.length - 1) * Math.min(Math.max(position, 0), 1));
	if (insertIndex < 0) insertIndex = 0;
	if (insertIndex > paragraphs.length - 1) insertIndex = paragraphs.length - 1;
	const modified = [...paragraphs];
	modified[insertIndex] = `${modified[insertIndex]} The verification code is ${probe}.`;
	return {
		modified,
		probe,
		index: insertIndex
	};
}
/** Success counts keyed by position (the upstream statistics dictionary). */
function successByPosition(results) {
	const totals = /* @__PURE__ */ new Map();
	for (const result of results) {
		const slot = totals.get(result.position) ?? {
			success: 0,
			total: 0
		};
		slot.total += 1;
		if (result.found) slot.success += 1;
		totals.set(result.position, slot);
	}
	const stats = /* @__PURE__ */ new Map();
	for (const [position, data] of totals) stats.set(position, {
		successRate: data.success / data.total,
		successCount: data.success,
		totalCount: data.total
	});
	return stats;
}
/**
* The upstream prompt template used to test whether a model can surface a
* probe at a given position.
* @param document - the joined document text.
* @returns the model prompt.
*/
function buildProbePrompt(document) {
	return `Below is a long document. Please read it carefully and find the verification code mentioned in the text. The code follows the format "${PROBE_PREFIX}XXXX".\n\nDocument:\n${document}\n\nQuestion: What is the verification code mentioned in the document? Please respond with ONLY the code itself, nothing else.`;
}
/**
* Lost-in-the-middle avoidance: reorder a ranked list so the strongest items
* sit at the head and the tail of the context window (the positions models
* read most reliably), leaving the weakest in the middle. Within each zone
* the score order is preserved.
* @param ranked - the items ranked by score, descending.
* @param head - how many strongest items to pin to the head.
* @param tail - how many next-strongest items to pin to the tail.
* @returns the reordered list (same length, same members).
*/
function avoidLostMiddle(ranked, head, tail) {
	const sorted = [...ranked].sort((a, b) => b.score - a.score);
	const headItems = sorted.slice(0, head);
	const tailItems = sorted.slice(head, head + tail);
	const middleItems = sorted.slice(head + tail);
	return [
		...headItems,
		...middleItems,
		...tailItems
	];
}
/**
* Bin one ranked list by relative position and fold each bin's mean score —
* the middle-penalty report: a score trough in the middle bins is the
* lost-in-the-middle risk signal `library_diagnose` reports.
* @param ranked - the items in their final context order.
* @param bins - how many equal-width bins to use.
* @returns one entry per bin.
*/
function positionBins(ranked, bins) {
	if (ranked.length === 0) return [];
	const result = [];
	for (let index = 0; index < bins; index += 1) {
		const startIndex = Math.floor(ranked.length * index / bins);
		const endIndex = Math.floor(ranked.length * (index + 1) / bins);
		const slice = ranked.slice(startIndex, endIndex);
		let sum = 0;
		for (const item of slice) sum += item.score;
		result.push({
			start: index / bins,
			end: (index + 1) / bins,
			count: slice.length,
			meanScore: slice.length === 0 ? 0 : sum / slice.length
		});
	}
	return result;
}
/**
* The middle-penalty magnitude: how much the middle bins' mean score drops
* below the best bin's mean. 0 means no penalty (flat distribution); larger
* values mean strong content sits at the edges and weak content in the middle.
* @param bins - a {@link positionBins} report.
* @returns the penalty within 0..1, or 0 for an empty report.
*/
function middlePenalty(bins) {
	if (bins.length === 0) return 0;
	let best = 0;
	for (const bin of bins) if (bin.meanScore > best) best = bin.meanScore;
	if (best <= 0) return 0;
	const middle = bins.filter((_, index) => index > 0 && index < bins.length - 1);
	if (middle.length === 0) return 0;
	let mean = 0;
	for (const bin of middle) mean += bin.meanScore;
	return Math.max(0, (best - mean / middle.length) / best);
}
//#endregion
//#region src/quality/relevance.ts
/**
* Port of Context-Relevance-Scorer (upstream/PerryLink, Apache-2.0): the
* relevance scoring/filtering pipeline that `library_search` runs after
* retrieval. The upstream cross-encoder model is replaced by a local-rules
* lexical scorer (zero downloads): token overlap weighted toward rarer
* query terms, normalized to 0..1 — same `(document, score, passed)` API
* shape as the upstream `score_batch`/`filter_documents`. Scoring tokenizes
* CJK runs into unigrams plus adjacent bigrams so partial phrase overlaps
* count, instead of whole runs matching only on exact equality.
* @module dsh-library/quality/relevance
*/
/**
* Score one document's relevance to a query with the local-rules scorer.
* Each query token contributes its document frequency share: a query term
* the document covers at least once contributes fully; the score is the
* covered-query-weight fraction. Repeated query terms are down-weighted
* (1/count) so spam cannot inflate coverage.
* @param query - the query text.
* @param document - the candidate document text.
* @returns relevance within 0..1 (0 for an empty query or document).
*/
function scoreRelevance(query, document) {
	const queryTokens = cjkTokenize(query);
	if (queryTokens.length === 0) return 0;
	const documentTerms = termFrequenciesOf(cjkTokenize(document));
	const queryTerms = termFrequenciesOf(queryTokens);
	let covered = 0;
	let total = 0;
	for (const [token, count] of Object.entries(queryTerms)) {
		const weight = 1 / count;
		total += weight;
		if ((documentTerms[token] ?? 0) > 0) covered += weight;
	}
	return total === 0 ? 0 : covered / total;
}
/**
* Score a batch of documents against one query — the upstream `score_batch`.
* @param query - the query text.
* @param documents - the candidate documents.
* @param threshold - the pass threshold (0..1); score ≥ threshold passes.
* @returns one entry per document, in input order.
*/
function scoreBatch(query, documents, threshold = .5) {
	return documents.map((document) => {
		const score = scoreRelevance(query, document);
		return {
			document,
			score,
			passed: score >= threshold
		};
	});
}
/**
* Keep only documents that pass the threshold — the upstream
* `filter_documents`, with the local-rules scorer substituted for the model.
* @param query - the query text.
* @param documents - the candidate documents.
* @param threshold - the pass threshold (0..1).
* @returns the passing documents in input order.
*/
function filterDocuments(query, documents, threshold = .5) {
	return scoreBatch(query, documents, threshold).filter((entry) => entry.passed).map((entry) => entry.document);
}
//#endregion
//#region src/quality/citation.ts
/**
* Port of Citation-Validator-Lite (upstream/PerryLink, Apache-2.0): citation
* extraction (`[n]` markers), sentence-bounded claim windows, and fuzzy
* validation against the cited source. The upstream `fuzzywuzzy`
* `partial_ratio` is reimplemented as a bounded token-sequence partial ratio
* (zero dependencies) — the shorter text slides over every token window of
* the longer one and the best ratio wins, matching the upstream semantics.
* @module dsh-library/quality/citation
*/
/**
* Extract every `[<digits>]` citation marker as (number, start, end) — the
* upstream `extract_citations` (`r'\[(\d+)\]'`).
* @param text - the answer text.
* @returns the markers in scan order.
*/
function extractCitationNumbers(text) {
	const markers = [];
	for (const match of text.matchAll(/\[(\d+)\]/gu)) markers.push({
		number: match[1],
		start: match.index,
		end: match.index + match[0].length
	});
	return markers;
}
/**
* Extract the sentence around a citation position — the upstream
* `extract_sentence_with_citation`: scan backwards to the nearest sentence
* ending (`.`, `!`, `?`, newline) and forwards the same way, bounded by the
* window.
* @param text - the answer text.
* @param citationPos - the citation marker position.
* @param window - maximum half-window in characters.
* @returns the trimmed sentence context.
*/
function extractSentenceWithCitation(text, citationPos, window = 150) {
	const sentenceEndings = /* @__PURE__ */ new Set([
		".",
		"!",
		"?",
		"\n"
	]);
	let start = citationPos;
	for (let index = citationPos - 1; index >= Math.max(0, citationPos - window); index -= 1) {
		if (sentenceEndings.has(text[index])) {
			start = index + 1;
			break;
		}
		if (index === Math.max(0, citationPos - window)) start = Math.max(0, citationPos - window);
	}
	let end = citationPos;
	for (let index = citationPos; index < Math.min(text.length, citationPos + window); index += 1) {
		if (sentenceEndings.has(text[index])) {
			end = index + 1;
			break;
		}
		if (index === Math.min(text.length, citationPos + window) - 1) end = Math.min(text.length, citationPos + window);
	}
	return text.slice(start, end).trim();
}
/** Bounds keeping the fuzzy ratio quadratic budget predictable. */
const MAX_CLAIM_TOKENS = 120;
const MAX_SOURCE_TOKENS = 600;
/**
* Sequence ratio of two token lists — `2 * matches / (lenA + lenB)` where
* `matches` is the longest-common-subsequence length (difflib-style).
* @param a - first token list.
* @param b - second token list.
* @returns ratio within 0..1.
*/
function sequenceRatio(a, b) {
	if (a.length === 0 && b.length === 0) return 1;
	if (a.length === 0 || b.length === 0) return 0;
	const shorter = a.length <= b.length ? a : b;
	const longer = a.length <= b.length ? b : a;
	let previous = new Array(shorter.length + 1).fill(0);
	for (let i = 1; i <= longer.length; i += 1) {
		const current = new Array(shorter.length + 1).fill(0);
		for (let j = 1; j <= shorter.length; j += 1) current[j] = longer[i - 1] === shorter[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], current[j - 1]);
		previous = current;
	}
	return 2 * previous[shorter.length] / (a.length + b.length);
}
/**
* Bounded port of `fuzz.partial_ratio`: the best sequence ratio between one
* text and every token window of the other. Both sides are token-capped so
* hostilely long sources stay within a fixed quadratic budget.
* @param claim - the claim text.
* @param source - the source text.
* @returns the best ratio as a 0..100 integer score.
*/
function fuzzyPartialRatio(claim, source) {
	const claimTokens = tokenize(claim).slice(0, MAX_CLAIM_TOKENS);
	const sourceTokens = tokenize(source).slice(0, MAX_SOURCE_TOKENS);
	if (claimTokens.length === 0 || sourceTokens.length === 0) return 0;
	if (sourceTokens.length <= claimTokens.length) return Math.round(sequenceRatio(claimTokens, sourceTokens) * 100);
	let best = 0;
	const windowLength = claimTokens.length;
	for (let start = 0; start + windowLength <= sourceTokens.length; start += 1) {
		const ratio = sequenceRatio(claimTokens, sourceTokens.slice(start, start + windowLength));
		if (ratio > best) best = ratio;
	}
	return Math.round(best * 100);
}
/**
* Validate one citation claim against its source — the upstream
* `validate_citation` (`fuzz.partial_ratio(claim, source) >= threshold`).
* @param claim - the claim context.
* @param source - the cited source text.
* @param threshold - pass score (0..100).
* @returns `[isValid, score]`.
*/
function validateCitation(claim, source, threshold = 80) {
	const score = fuzzyPartialRatio(claim, source);
	return [score >= threshold, score];
}
/**
* Validate every citation in an answer — the upstream `validate_citations`.
* Unknown source numbers are invalid with score 0 and reason
* "Source not found"; low scores carry a "Low match score: N%" reason.
* @param answer - the answer text with `[n]` markers.
* @param sources - source text keyed by citation number.
* @param threshold - pass score (0..100).
* @returns the validation result.
*/
function validateCitations(answer, sources, threshold = 80) {
	return {
		results: extractCitationNumbers(answer).map((marker) => {
			const context = extractSentenceWithCitation(answer, marker.start);
			const source = sources[marker.number];
			if (source === void 0) return {
				number: marker.number,
				context,
				is_valid: false,
				score: 0,
				start_pos: marker.start,
				end_pos: marker.end,
				reason: "Source not found"
			};
			const [isValid, score] = validateCitation(context, source, threshold);
			return {
				number: marker.number,
				context,
				is_valid: isValid,
				score,
				start_pos: marker.start,
				end_pos: marker.end,
				reason: isValid ? "" : `Low match score: ${score}%`
			};
		}),
		threshold
	};
}
//#endregion
//#region src/quality/reference.ts
/**
* Port of RAG-Reference-Checker (upstream/PerryLink, Apache-2.0): citation
* extraction (`[n]` markers), the surrounding-context window, and the
* verify loop that marks each citation valid / suspicious / missing. The
* upstream SentenceTransformer model (and its `download_model.py`) is
* replaced by the plugin's deterministic hash embedder — zero downloads, and
* the similarity threshold is the resolved `citation.minSemantic` config.
* @module dsh-library/quality/reference
*/
/**
* Extract every `[<digits>]` citation marker — the upstream
* `extract_citations` (`r'\[(\d+)\]'`), with the numeric id returned as a
* number like the upstream `int(match.group(1))`.
* @param text - the answer text.
* @returns the markers in scan order.
*/
function extractCitations(text) {
	const markers = [];
	for (const match of text.matchAll(/\[(\d+)\]/gu)) markers.push({
		refId: Number(match[1]),
		start: match.index,
		end: match.index + match[0].length
	});
	return markers;
}
/**
* Extract the character window around a citation position — the upstream
* `extract_context` (`position ± window`, trimmed).
* @param text - the answer text.
* @param position - the citation marker position.
* @param window - half-window size in characters.
* @returns the trimmed context.
*/
function extractContext(text, position, window = 50) {
	const start = Math.max(0, position - window);
	const end = Math.min(text.length, position + window);
	return text.slice(start, end).trim();
}
/**
* Verify every citation in an answer against the reference list — the
* upstream `verify_references` with the hash embedder substituted for the
* model. Unknown reference ids are `missing`; known ids whose context
* similarity falls below the threshold are `suspicious`.
* @param answer - the answer text containing `[n]` markers.
* @param references - the reference documents keyed by numeric id.
* @param options - verification options.
* @returns the verification report.
*/
function verifyReferences(answer, references, options = {}) {
	const threshold = options.threshold ?? .5;
	const dims = options.dims ?? 256;
	const referenceById = new Map(references.map((reference) => [reference.id, reference]));
	const details = extractCitations(answer).map((marker) => {
		const context = extractContext(answer, marker.start);
		const reference = referenceById.get(marker.refId);
		if (reference === void 0) return {
			refId: marker.refId,
			status: "missing",
			similarity: 0,
			context,
			reason: "The referenced document does not exist"
		};
		const similarity = cosine(embedHash(context, dims), embedHash(reference.content, dims));
		const status = similarity >= threshold ? "valid" : "suspicious";
		return {
			refId: marker.refId,
			status,
			similarity: Math.round(similarity * 100) / 100,
			context,
			...status === "suspicious" ? { reason: "Low similarity" } : {}
		};
	});
	return {
		total: details.length,
		valid: details.filter((verdict) => verdict.status === "valid").length,
		suspicious: details.filter((verdict) => verdict.status === "suspicious").length,
		details
	};
}
//#endregion
//#region src/quality/purge.ts
/**
* Port of RAG-Purge-Verify (upstream/PerryLink, Apache-2.0): after a
* document is removed, probe the remaining index with deterministic
* signatures of the removed content and report any residue. The upstream
* metadata-filter and payload-text engine probes become token n-gram
* signature probes over the remaining chunks; `passed` requires zero hits,
* exactly like the upstream `total_found == 0` gate.
* @module dsh-library/quality/purge
*/
/**
* Deterministically pick up to `maxProbes` signatures from a list: indices
* are spread evenly across the list so long documents are sampled end to end.
* @param signatures - the full signature list.
* @param maxProbes - the probe budget.
* @returns the sampled signatures in original order.
*/
function sampleSignatures(signatures, maxProbes) {
	if (signatures.length <= maxProbes) return [...signatures];
	const picked = [];
	for (let index = 0; index < maxProbes; index += 1) {
		const sourceIndex = maxProbes === 1 ? 0 : Math.round(index * (signatures.length - 1) / (maxProbes - 1));
		picked.push(signatures[sourceIndex]);
	}
	return picked;
}
/**
* Verify that a removed document left no residue in the remaining index —
* the upstream `Verifier.verify` flow. Signatures are token n-grams of the
* removed content; a chunk is residue when it contains every token of one
* signature (as token-subsequence containment is too strict for chunk
* boundaries, exact phrase containment is used).
* @param remaining - the chunks that should remain after removal.
* @param removedContent - the removed document text.
* @param options - purge options.
* @returns the purge report; `passed` is true only on zero residue.
*/
function verifyPurge(remaining, removedContent, options = {}) {
	const signatureLength = options.signatureLength ?? 4;
	const maxProbes = options.maxProbes ?? 24;
	const probes = sampleSignatures(tokenNGrams(tokenize(removedContent), signatureLength), maxProbes).map((signature) => {
		const residueIds = remaining.filter((chunk) => chunk.text.includes(signature)).map((chunk) => chunk.id);
		return {
			signature,
			foundCount: residueIds.length,
			residueIds
		};
	});
	const totalFound = probes.reduce((sum, probe) => sum + probe.foundCount, 0);
	return {
		passed: totalFound === 0,
		totalFound,
		probes
	};
}
//#endregion
//#region src/events.ts
/**
* Session audit events for dsh-library (declaration merging into the harness's
* `SessionEventMap`) and the adaptive append gate. Both events are log-only;
* tool arguments and rendered results are already logged by the tool runtime
* as `tool/call` + `tool/result`, and these events carry the audit facts that
* exist outside them: the inject id linking the injected marker text back to
* the search that produced it, and each purge-verification verdict.
*
* The gate appends only when the host can carry the events safely, and the
* host's capability is OBSERVED at mount time rather than inferred from an
* append implementation's source text:
* - hosts whose known-type set covers the vocabulary append plainly;
* - hosts observed to stamp the `ignorable` envelope (see
*   {@link probeMarkerSupport}) append with the marker, so builds that do not
*   know the type skip the event on restore;
* - every other host — envelope-less builds such as 0.1.0-rc.6/rc.8,
*   0.1.1-rc.2 and the 0.1.2-alpha line, which fails closed on unknown types at
*   read, and the 0.1.6-alpha.2 line, whose third append parameter is a
*   `SurfaceIntent` that exists only for surface-eligible types — gets no
*   append, with one visible warning instead of a silent skip; the tool
*   results remain the reconstructable audit trail.
*
* @module dsh-library/events
*/
/** The injection audit event type. */
const INJECT_EVENT = "library/inject";
/** The purge audit event type. */
const PURGE_EVENT = "library/purge";
/**
* The host capability, decided by {@link probeMarkerSupport} at mount time and
* cached for the process (the append surface cannot change within one). Tests
* adopt a verdict explicitly through {@link adoptMarkerSupport}.
*/
let markerSupport = "unknown";
/** Whether the one-time skip notice has been emitted. */
let warnedUnmarkedHost = false;
/** Adopt the probed verdict (called once by `apply`; tests inject it directly). */
function adoptMarkerSupport(verdict) {
	markerSupport = verdict;
	warnedUnmarkedHost = false;
}
/**
* Observe whether this host stamps the `ignorable` envelope, by appending one
* audit event on a scratch session and reading the returned record back. The
* judgement is observed rather than inferred from an append implementation's
* source text (a source-text probe cannot see through a wrapper, a minifier or
* a future options bag), and it is safe: the scratch session is discarded, so
* an unmarked write there harms nothing.
*
* Folded context: `Session.append` optionally returns the appended record; a
* host that honours `{ ignorable: true }` returns it with `ignorable === true`,
* one that drops the options bag returns a record without the field, and a
* host that rejects the type outright throws — all three map to a verdict, and
* anything ambiguous or throwing fails closed to `'unsupported'`.
* @param createSession - builds the throwaway session to probe with.
* @returns the observed capability.
*/
async function probeMarkerSupport(createSession) {
	try {
		const session = createSession();
		return isMarkedRecord(session.append.call(session, "library/inject", {
			injectId: "probe",
			library: "probe",
			query: "probe",
			chunks: [],
			chars: 0
		}, { ignorable: true })) ? "supported" : "unsupported";
	} catch {
		return "unsupported";
	}
}
/** Whether a returned append record carries the stamped marker. */
function isMarkedRecord(record) {
	return typeof record === "object" && record !== null && record.ignorable === true;
}
/**
* Append one dsh-library audit event when the host can carry it safely, and
* report what happened instead of skipping silently (the `tool/call` +
* `tool/result` events remain the model-visible log either way). The full rule
* set lives in the module doc; in short: known-vocabulary hosts append
* plainly, hosts observed to stamp the `ignorable` envelope append with the
* marker, and every other host gets no append plus one visible warning.
* @param session - the calling session.
* @param type - the audit event type.
* @param data - the audit payload.
* @returns which branch ran.
*/
function appendAuditEvent(session, type, data) {
	if (KNOWN_SESSION_EVENT_TYPES.has(type)) {
		if (type === "library/inject") session.append(type, data);
		else session.append(type, data);
		return "appended";
	}
	if (markerSupport === "supported") {
		session.append.call(session, type, data, { ignorable: true });
		return "appended-marked";
	}
	if (!warnedUnmarkedHost) {
		warnedUnmarkedHost = true;
		console.warn("dsh-library: this host does not admit dsh-library audit events (its append surface cannot stamp the ignorable envelope and its vocabulary does not cover the type), so library/inject and library/purge are not written; the tool/call + tool/result events remain the audit trail");
	}
	return "skipped-unmarked-host";
}
//#endregion
//#region src/quality/few-shot.ts
/**
* Port of Few-Shot-Selector (upstream/PerryLink, Apache-2.0): the
* similarity-ranked example selection and the prompt formatter. The upstream
* ChromaDB collection + SentenceTransformer model are replaced by the
* plugin's deterministic hash embedder (zero downloads) — same
* "embed question, cosine-rank, top-n" pipeline and the same prompt layout.
* @module dsh-library/quality/few-shot
*/
/** Whether a QA pair is usable, ported from upstream `validate_qa_pair`. */
function validateQaPair(question, answer) {
	return question.trim().length > 0 && answer.trim().length > 0;
}
/**
* Rank the example store by cosine similarity to the query and return the
* top `n` — the upstream `search_similar` with the hash embedder in place of
* the SentenceTransformer model. An empty query or store throws, like
* upstream (`ValueError` / `DatabaseNotInitializedError`).
* @param query - the query text.
* @param examples - the QA store.
* @param options - selection options.
* @returns the selected examples, best first.
* @throws TypeError on an empty query or empty store.
*/
function selectFewShot(query, examples, options = {}) {
	if (query.trim().length === 0) throw new TypeError("query must not be empty");
	if (examples.length === 0) throw new TypeError("the example store is empty; add examples first");
	const n = options.n ?? 3;
	const dims = options.dims ?? 256;
	if (!Number.isSafeInteger(n) || n <= 0) throw new TypeError(`n must be a positive integer, got ${String(n)}`);
	const queryVector = embedHash(query, dims);
	return examples.map((example) => ({
		example,
		score: cosine(queryVector, embedHash(example.question, dims))
	})).sort((a, b) => b.score - a.score).slice(0, Math.min(n, examples.length));
}
/**
* Format the upstream few-shot prompt: an intro line, one numbered
* question/answer block per example, then the query — ported 1:1 from
* `format_prompt`.
* @param query - the query text.
* @param selected - the selected examples, in order.
* @returns the formatted prompt text.
*/
function formatFewShotPrompt(query, selected) {
	let prompt = "Relevant examples:\n\n";
	selected.forEach((entry, index) => {
		prompt += `Example ${index + 1}:\n`;
		prompt += `Question: ${entry.example.question}\n`;
		prompt += `Answer: ${entry.example.answer}\n\n`;
	});
	prompt += `Now answer: ${query}`;
	return prompt;
}
//#endregion
//#region src/index.ts
/**
* `dsh-library` — the local-first knowledge base for DeepSeek Harness:
* import md/txt documents into a storage-domain index, retrieve with a
* hybrid semantic+keyword pipeline (diversity re-rank, relevance filter,
* lost-in-the-middle avoidance), verify citations against retrieved chunks,
* and diagnose chunk/retrieval quality. Everything model-visible carries a
* source marker. The `library/inject` and `library/purge` audit events are
* appended through the adaptive host gate (see `events.ts`); where the host
* cannot carry them, the logged `tool/call` + `tool/result` events remain the
* reconstructable trail. Document paths and embeddings never reach the log.
*
* Function plugin — no default export (the Loader unwraps
* `exports.default ?? exports`).
* @module dsh-library
*/
const name = "dsh-library";
/** Hard services: the durable index lives in the storage domain; tools and the command register here. */
const inject = [
	"storageDomain",
	"tools",
	"commands"
];
/** Durable document record. */
const documentSchema = object({
	library: string(),
	documentId: string(),
	name: string(),
	contentHash: string(),
	chunks: array(string()),
	chars: number().int().nonnegative(),
	createdAt: number().int().nonnegative()
});
/** Durable chunk record: text plus its precomputed embedding. */
const chunkSchema = object({
	library: string(),
	chunkId: string(),
	documentId: string(),
	seq: number().int().nonnegative(),
	text: string(),
	embedding: array(number())
});
/** Durable purge-verification record. */
const purgeSchema = object({
	purgeId: string(),
	library: string(),
	documentId: string(),
	passed: boolean(),
	totalFound: number().int().nonnegative(),
	at: number().int().nonnegative()
});
/** The dsh-library storage-domain declaration (unit names allow `[a-z][a-z0-9_]*` only). */
const libraryDomainSpec = defineDomain({
	name: "dsh_library",
	version: 1,
	tables: {
		documents: { valueSchema: documentSchema },
		chunks: { valueSchema: chunkSchema },
		purges: { valueSchema: purgeSchema }
	}
});
/** Whether a library name is usable as a domain key. */
function assertLibraryName(library) {
	const trimmed = library.trim();
	if (!LIBRARY_NAME.test(trimmed)) throw new Error(`library name must match ${String(LIBRARY_NAME)}, got ${JSON.stringify(library)}`);
	return trimmed;
}
/** Bound one snippet for display: control characters stripped, length capped. */
function snippetOf(text, maxChars = 200) {
	const cleaned = text.replace(/[\u0000-\u001f\u007f]/gu, " ").replace(/\s+/gu, " ").trim();
	return cleaned.length <= maxChars ? cleaned : `${cleaned.slice(0, maxChars - 1)}…`;
}
/** Safety bound on the MMR candidate pool (quadratic step; not a user tunable). */
const MAX_CANDIDATE_BOUND = 500;
/**
* The index runtime over one open storage domain: add/remove/list/search/
* cite/diagnose. All record shapes are validated by the domain at the
* durable boundary; this class never logs text or embeddings.
*/
var LibraryStore = class {
	config;
	deps;
	documents;
	chunks;
	purges;
	/**
	* @param domain - the opened dsh-library domain.
	* @param config - resolved plugin config.
	* @param deps - optional subprocess seam for the external embedder.
	*/
	constructor(domain, config, deps) {
		this.config = config;
		this.deps = deps;
		this.documents = domain.table("documents");
		this.chunks = domain.table("chunks");
		this.purges = domain.table("purges");
	}
	/** Embed a text batch with the resolved embedder backend. */
	async embed(texts) {
		return this.deps.embedder.embed(texts);
	}
	/**
	* Import one document: chunk it, embed the chunks, and store the records.
	* @param library - target library name.
	* @param docName - display name.
	* @param content - full document text.
	* @returns the add summary.
	*/
	async add(library, docName, content) {
		const trimmedLibrary = assertLibraryName(library);
		const bytes = Buffer.byteLength(content, "utf8");
		if (bytes > this.config.maxFileBytes) throw new Error(`document is ${bytes} bytes; the cap is ${this.config.maxFileBytes} (config maxFileBytes)`);
		const documentId = documentIdOf(content);
		const slices = chunkText(content, this.config.chunkSize, this.config.chunkOverlap);
		const embeddings = await this.embed(slices.map((slice) => slice.text));
		const chunkIds = slices.map((_slice, index) => chunkIdOf(documentId, index));
		for (let index = 0; index < slices.length; index += 1) await this.chunks.put(chunkKey(trimmedLibrary, chunkIds[index]), {
			library: trimmedLibrary,
			chunkId: chunkIds[index],
			documentId,
			seq: index,
			text: slices[index].text,
			embedding: embeddings[index]
		});
		await this.documents.put(documentKey(trimmedLibrary, documentId), {
			library: trimmedLibrary,
			documentId,
			name: docName.trim() || documentId,
			contentHash: documentId,
			chunks: chunkIds,
			chars: content.length,
			createdAt: Date.now()
		});
		return {
			library: trimmedLibrary,
			documentId,
			name: docName.trim() || documentId,
			chunks: chunkIds.length,
			chars: content.length
		};
	}
	/**
	* Remove one document and verify the purge: the removed content must leave
	* no residue in the remaining chunks of the library.
	* @param library - owning library name.
	* @param documentId - stable document id.
	* @returns the removal summary plus the purge verdict.
	*/
	async remove(library, documentId) {
		const trimmedLibrary = assertLibraryName(library);
		const record = this.documents.get(documentKey(trimmedLibrary, documentId));
		if (record === void 0) throw new Error(`document ${JSON.stringify(documentId)} does not exist in library ${JSON.stringify(trimmedLibrary)}`);
		const removedTexts = [];
		for (const chunkId of record.chunks) {
			const chunk = this.chunks.get(chunkKey(trimmedLibrary, chunkId));
			if (chunk !== void 0) removedTexts.push(chunk.text);
			await this.chunks.delete(chunkKey(trimmedLibrary, chunkId));
		}
		await this.documents.delete(documentKey(trimmedLibrary, documentId));
		const report = verifyPurge([...this.chunks.entries()].filter(([key]) => key.startsWith(`${trimmedLibrary}:`)).map(([, chunk]) => ({
			id: chunk.chunkId,
			text: chunk.text
		})), removedTexts.join("\n"), {
			signatureLength: this.config.purge.signatureLength,
			maxProbes: this.config.purge.maxProbes
		});
		const id = purgeId();
		await this.purges.put(id, {
			purgeId: id,
			library: trimmedLibrary,
			documentId,
			passed: report.passed,
			totalFound: report.totalFound,
			at: Date.now()
		});
		return {
			library: trimmedLibrary,
			documentId,
			removedChunks: record.chunks.length,
			purgePassed: report.passed,
			purgeTotalFound: report.totalFound
		};
	}
	/** List documents (metadata only, never text) of one library or every library. */
	list(library) {
		const filter = library === void 0 ? void 0 : assertLibraryName(library);
		const entries = [];
		for (const [key, record] of this.documents.entries()) {
			if (filter !== void 0 && record.library !== filter) continue;
			entries.push({
				library: record.library,
				documentId: record.documentId,
				name: record.name,
				chunks: record.chunks.length,
				chars: record.chars,
				createdAt: record.createdAt
			});
		}
		return entries.sort((a, b) => a.library.localeCompare(b.library) || a.documentId.localeCompare(b.documentId));
	}
	/** All chunk records of one library, in document/seq order. */
	chunksOf(library) {
		const trimmedLibrary = assertLibraryName(library);
		return [...this.chunks.entries()].filter(([key]) => key.startsWith(`${trimmedLibrary}:`)).map(([, chunk]) => chunk).sort((a, b) => a.documentId.localeCompare(b.documentId) || a.seq - b.seq);
	}
	/**
	* The hybrid retrieval pipeline: keyword + semantic scores, diversity
	* re-rank, relevance filter, lost-in-the-middle reorder, character budget.
	* @param library - library to search.
	* @param query - the query text.
	* @param topK - result cap (default from config).
	* @returns ranked hits.
	*/
	async search(library, query, topK) {
		const trimmedLibrary = assertLibraryName(library);
		const k = topK ?? this.config.search.topK;
		const queryEmbedding = (await this.embed([query]))[0];
		const candidates = this.chunksOf(trimmedLibrary).map((chunk) => {
			const semantic = cosine(queryEmbedding, chunk.embedding);
			const keyword = scoreRelevance(query, chunk.text);
			return {
				chunk,
				hybrid: this.config.search.hybridWeight * semantic + (1 - this.config.search.hybridWeight) * keyword
			};
		});
		const filtered = maximalMarginalRelevance(candidates.map((candidate) => ({
			id: candidate.chunk.chunkId,
			relevance: candidate.hybrid,
			chunk: candidate.chunk,
			similarityTo: (other) => cosine(candidate.chunk.embedding, other.chunk.embedding)
		})), this.config.search.diversityLambda, Math.min(candidates.length, MAX_CANDIDATE_BOUND)).filter((entry) => entry.relevance >= this.config.search.minRelevance).slice(0, 500);
		const reordered = avoidLostMiddle(filtered.map((entry) => ({
			id: entry.chunk.chunkId,
			score: entry.relevance
		})), this.config.search.lostMiddleHead, this.config.search.lostMiddleTail);
		const byId = new Map(filtered.map((entry) => [entry.chunk.chunkId, entry]));
		let budget = this.config.search.maxResultChars;
		const hits = [];
		for (const item of reordered) {
			const entry = byId.get(item.id);
			if (entry === void 0) continue;
			const snippet = snippetOf(entry.chunk.text);
			budget -= snippet.length;
			if (budget < 0 && hits.length > 0) break;
			hits.push({
				chunkId: entry.chunk.chunkId,
				documentId: entry.chunk.documentId,
				seq: entry.chunk.seq,
				snippet,
				score: entry.relevance
			});
			if (hits.length >= k) break;
		}
		return hits;
	}
	/** The citation sources for one query: the search pipeline result in order. */
	async citeCheck(library, query, answer) {
		const trimmedLibrary = assertLibraryName(library);
		const hits = await this.search(trimmedLibrary, query, 20);
		const sources = {};
		const byId = /* @__PURE__ */ new Map();
		hits.forEach((hit, index) => {
			sources[String(index + 1)] = this.chunks.get(chunkKey(trimmedLibrary, hit.chunkId))?.text ?? hit.snippet;
			byId.set(String(index + 1), hit);
		});
		const fuzzy = validateCitations(answer, sources, this.config.citation.minScore);
		const semantic = verifyReferences(answer, hits.map((_hit, index) => ({
			id: index + 1,
			content: sources[String(index + 1)]
		})), {
			threshold: this.config.citation.minSemantic,
			dims: this.config.embedding.dims
		});
		const semanticById = new Map(semantic.details.map((detail) => [String(detail.refId), detail]));
		const details = fuzzy.results.map((match) => {
			const source = byId.get(match.number);
			const semanticDetail = semanticById.get(match.number);
			const valid = match.is_valid && (semanticDetail?.status ?? "missing") === "valid";
			return {
				citation: `[${match.number}]`,
				sourceDocumentId: source?.documentId ?? "",
				sourceSeq: source?.seq ?? -1,
				valid,
				fuzzyScore: match.score,
				semanticSimilarity: semanticDetail?.similarity ?? 0,
				reason: source === void 0 ? "Source not found" : valid ? "" : match.reason || "Low semantic similarity"
			};
		});
		return {
			library: trimmedLibrary,
			query,
			total: details.length,
			valid: details.filter((detail) => detail.valid).length,
			details
		};
	}
	/** Diagnose one library: chunk stats, duplicates, self-retrieval, middle penalty. */
	async diagnose(library) {
		const trimmedLibrary = assertLibraryName(library);
		const records = this.chunksOf(trimmedLibrary);
		const slices = records.map((chunk, index) => ({
			text: chunk.text,
			startPos: 0,
			endPos: chunk.text.length,
			index,
			overlapChars: 0
		}));
		const histogram = chunkSizeHistogram(slices);
		const duplicatePairs = findDuplicateChunks(slices.slice(0, this.config.diagnose.sampleCap), .9, this.config.diagnose.maxDuplicatePairs).pairs.length;
		const probes = Math.min(5, records.length);
		let topKHit = 0;
		const sampled = records.filter((_, index) => index % Math.max(1, Math.floor(records.length / probes)) === 0).slice(0, probes);
		for (const sample of sampled) if ((await this.search(trimmedLibrary, snippetOf(sample.text, 120), 3)).some((hit) => hit.chunkId === sample.chunkId)) topKHit += 1;
		const bins = positionBins(records.map((chunk) => ({
			id: chunk.chunkId,
			score: scoreRelevance(trimmedLibrary, chunk.text)
		})), this.config.diagnose.positionBins);
		return {
			library: trimmedLibrary,
			documents: this.list(trimmedLibrary).length,
			chunks: records.length,
			histogram,
			duplicatePairs,
			selfRetrieval: {
				probes: sampled.length,
				topKHit
			},
			middlePenalty: middlePenalty(bins)
		};
	}
};
/** Resolve the embedder backend at mount; a degraded Ollama falls back to hash with a logged reason. */
async function storeDepsOf(ctx, config) {
	const subprocess = ctx.get("subprocess");
	const resolution = await resolveEmbedder(config.embedding, subprocess, process.cwd());
	if (resolution.degraded) ctx.logger("dsh-library").warn(`embedder: ${resolution.reason}`);
	return { embedder: resolution.embedder };
}
/** Append one audit event through the adaptive host gate; a failed append never changes the outcome. */
function audit(exec, type, event) {
	const session = exec.agent?.session;
	if (session === void 0) return;
	try {
		appendAuditEvent(session, type, event);
	} catch {}
}
/**
* Mount the plugin: open the storage domain, build the store, register the
* tool family and the `/library` command. One effect owns the domain handle;
* every registration is its own reversible effect.
* @param ctx - the plugin context.
* @param config - raw loader config; defaults applied through {@link resolveConfig}.
*/
async function apply(ctx, config = {}) {
	const resolved = resolveConfig(config);
	const domain = await ctx.storageDomain.open(libraryDomainSpec);
	ctx.effect(() => () => domain.close(), "dsh-library: storage domain");
	const deps = await storeDepsOf(ctx, resolved);
	if (ctx.fiber.uid === null) return;
	try {
		const probeContext = new Context();
		const probeFiber = await probeContext.plugin(SessionStore);
		try {
			const probeSession = probeContext.sessions.create(SessionId("dsh-library-marker-probe"));
			adoptMarkerSupport(await probeMarkerSupport(() => probeSession));
		} finally {
			await probeFiber.dispose();
		}
	} catch {
		adoptMarkerSupport("unsupported");
	}
	const store = new LibraryStore(domain, resolved, deps);
	const services = {
		ctx,
		config: resolved,
		store
	};
	for (const tool of allTools(services)) ctx.effect(() => ctx.tools.register(tool), `dsh-library: ${tool.name} tool`);
	ctx.effect(() => ctx.commands.register({
		name: "library",
		description: "Local knowledge base: list libraries, count chunks, and check index health",
		handler: async (invocation) => {
			try {
				const argument = invocation.rawInput.trim();
				const entries = store.list(argument === "" ? void 0 : argument);
				if (entries.length === 0) return {
					kind: "success",
					text: argument === "" ? "No documents indexed yet — use library_add to import md/txt files." : `Library ${JSON.stringify(argument)} has no documents.`
				};
				const byLibrary = /* @__PURE__ */ new Map();
				for (const entry of entries) {
					const agg = byLibrary.get(entry.library) ?? {
						documents: 0,
						chunks: 0,
						chars: 0
					};
					agg.documents += 1;
					agg.chunks += entry.chunks;
					agg.chars += entry.chars;
					byLibrary.set(entry.library, agg);
				}
				return {
					kind: "success",
					text: [...byLibrary.entries()].map(([library, agg]) => `${library}: ${agg.documents} document(s), ${agg.chunks} chunk(s), ${agg.chars} chars`).join("\n")
				};
			} catch (error) {
				return {
					kind: "error",
					text: error instanceof Error ? error.message : String(error)
				};
			}
		}
	}), "dsh-library: /library command");
}
/** Every tool definition, in registration order. */
function allTools(services) {
	return [
		libraryAddTool(services),
		libraryRemoveTool(services),
		libraryListTool(services),
		librarySearchTool(services),
		libraryCiteCheckTool(services),
		libraryDiagnoseTool(services)
	];
}
/** `library_add` — import one md/txt document by path into a library. */
function libraryAddTool(services) {
	const { store, ctx } = services;
	return defineTool({
		name: "library_add",
		description: "Import a local markdown or plain-text document into the dsh-library knowledge base: chunk it, embed it, and index it under a library name. The file must be readable through the harness filesystem service and stay under the configured size cap. Returns the document id later used by library_remove/library_list.",
		parameters: {
			path: {
				type: "string",
				description: "Path to the md/txt file (workspace-relative or absolute).",
				required: true
			},
			library: {
				type: "string",
				description: "Target library name (lowercase letters, digits, hyphens).",
				required: true
			},
			name: {
				type: "string",
				description: "Optional display name; defaults to the content-derived id."
			}
		},
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					library: { type: "string" },
					documentId: { type: "string" },
					name: { type: "string" },
					chunks: { type: "integer" },
					chars: { type: "integer" }
				},
				additionalProperties: false
			},
			render(_args, value) {
				const result = value;
				return [{
					type: "text",
					text: `Indexed ${JSON.stringify(result.name)} into library ${result.library}: ${result.chunks} chunk(s), ${result.chars} chars. documentId: ${result.documentId}`
				}];
			}
		},
		async execute(args, exec) {
			const parsed = args;
			if (ctx.get("fs") === void 0) throw new Error("ctx.fs is not mounted — library_add cannot read local files");
			const fs = ctx.get("fs");
			const sessionHeader = (exec.agent?.session)?.header;
			const cwd = typeof sessionHeader?.cwd === "string" ? sessionHeader.cwd : void 0;
			const target = await fs.resolve(parsed.path, {
				...cwd === void 0 ? {} : { cwd },
				signal: exec.signal
			});
			const content = await fs.readText(target, exec.signal);
			return {
				ok: true,
				...await store.add(parsed.library, parsed.name ?? parsed.path, content)
			};
		}
	});
}
/** `library_remove` — remove one document and verify the purge left no residue. */
function libraryRemoveTool(services) {
	const { store } = services;
	return defineTool({
		name: "library_remove",
		description: "Remove one document from a dsh-library index and verify the purge: deterministic signatures of the removed content are probed against the remaining chunks, and residue is reported. Returns the purge verdict.",
		parameters: {
			library: {
				type: "string",
				description: "Owning library name.",
				required: true
			},
			documentId: {
				type: "string",
				description: "Document id from library_add or library_list.",
				required: true
			}
		},
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					library: { type: "string" },
					documentId: { type: "string" },
					removedChunks: { type: "integer" },
					purgePassed: { type: "boolean" },
					purgeTotalFound: { type: "integer" }
				},
				additionalProperties: false
			},
			render(_args, value) {
				const result = value;
				return [{
					type: "text",
					text: `Removed ${result.documentId} from library ${result.library} (${result.removedChunks} chunk(s)). Purge verification: ${result.purgePassed ? "passed — no residue" : `FAILED — ${result.purgeTotalFound} residue hit(s)`}`
				}];
			}
		},
		async execute(args, exec) {
			const parsed = args;
			const result = await store.remove(parsed.library, parsed.documentId);
			audit(exec, "library/purge", {
				purgeId: purgeId(),
				library: result.library,
				documentId: result.documentId,
				passed: result.purgePassed,
				totalFound: result.purgeTotalFound
			});
			return {
				ok: true,
				...result
			};
		}
	});
}
/** `library_list` — document metadata of one library or every library. */
function libraryListTool(services) {
	const { store } = services;
	return defineTool({
		name: "library_list",
		description: "List the documents indexed in one library (or every library when omitted). Metadata only — document text is never returned.",
		parameters: { library: {
			type: "string",
			description: "Optional library name filter."
		} },
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					entries: {
						type: "array",
						items: {
							type: "object",
							properties: {
								library: { type: "string" },
								documentId: { type: "string" },
								name: { type: "string" },
								chunks: { type: "integer" },
								chars: { type: "integer" },
								createdAt: { type: "integer" }
							},
							additionalProperties: false
						}
					}
				},
				additionalProperties: false
			},
			render(_args, value) {
				const entries = value.entries;
				return [{
					type: "text",
					text: entries.length === 0 ? "No documents match." : entries.map((entry) => `${entry.library}/${entry.documentId} ${JSON.stringify(entry.name)} — ${entry.chunks} chunk(s)`).join("\n")
				}];
			}
		},
		async execute(args) {
			const parsed = args;
			return {
				ok: true,
				entries: store.list(parsed.library)
			};
		}
	});
}
/** `library_search` — the hybrid retrieval pipeline with optional injection. */
function librarySearchTool(services) {
	const { config, store } = services;
	return defineTool({
		name: "library_search",
		description: "Search a dsh-library index: hybrid semantic+keyword ranking, diversity re-rank, relevance filter, and lost-in-the-middle avoidance. Each hit carries a source marker ([1]...[n] over the result page). With inject: true the result page is injected into the calling agent (config injection.enabled) and logged as a library/inject session event.",
		parameters: {
			query: {
				type: "string",
				description: "The search query.",
				required: true
			},
			library: {
				type: "string",
				description: "Library to search.",
				required: true
			},
			topK: {
				type: "integer",
				description: "Result cap; defaults to the configured search.topK."
			},
			inject: {
				type: "boolean",
				description: "Inject the result page into the calling agent (default false)."
			}
		},
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					library: { type: "string" },
					query: { type: "string" },
					results: {
						type: "array",
						items: {
							type: "object",
							properties: {
								chunkId: { type: "string" },
								documentId: { type: "string" },
								seq: { type: "integer" },
								snippet: { type: "string" },
								score: { type: "number" }
							},
							additionalProperties: false
						}
					},
					injected: { type: "boolean" }
				},
				additionalProperties: false
			},
			render(_args, value) {
				const result = value;
				const lines = [`Library ${result.library}: ${result.results.length} result(s) for ${JSON.stringify(result.query)}`];
				result.results.forEach((hit, index) => {
					lines.push(`[${index + 1}] ${hit.snippet}`);
				});
				return [{
					type: "text",
					text: lines.join("\n")
				}];
			}
		},
		async execute(args, exec) {
			const parsed = args;
			const hits = await store.search(parsed.library, parsed.query, parsed.topK);
			const wantInject = parsed.inject === true && config.injection.enabled;
			let injected = false;
			let page = "";
			if (wantInject && hits.length > 0 && exec.agent !== void 0) {
				const id = injectId();
				page = hits.map((hit, index) => `[${index + 1}] ${hit.snippet}`).join("\n\n");
				if (page.length > config.injection.maxChars) page = `${page.slice(0, config.injection.maxChars - 1)}…`;
				const message = {
					id: MessageId(`library-inject-${id}`),
					role: "user",
					content: [{
						type: "text",
						text: `Library results for ${JSON.stringify(parsed.query)} (library ${parsed.library}, injectId ${id}):\n\n${page}`
					}],
					source: { kind: "dsh-library" }
				};
				exec.agent.inject(message);
				audit(exec, "library/inject", {
					injectId: id,
					library: parsed.library,
					query: parsed.query,
					chunks: hits.map((hit) => hit.chunkId),
					chars: page.length
				});
				injected = true;
			}
			return {
				ok: true,
				library: parsed.library,
				query: parsed.query,
				results: hits,
				injected
			};
		}
	});
}
/** `library_cite_check` — verify `[n]` citations against the search result page. */
function libraryCiteCheckTool(services) {
	const { store } = services;
	return defineTool({
		name: "library_cite_check",
		description: "Verify the [n] citations in an answer against the library: the sources are the search result page for the given query (the same pipeline library_search runs), and each citation is checked with a fuzzy token match AND a semantic similarity against its chunk. Returns one verdict per citation.",
		parameters: {
			library: {
				type: "string",
				description: "Library the citations should point into.",
				required: true
			},
			query: {
				type: "string",
				description: "The query whose result page the answer cites.",
				required: true
			},
			answer: {
				type: "string",
				description: "The answer text containing [n] citation markers.",
				required: true
			}
		},
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					library: { type: "string" },
					query: { type: "string" },
					total: { type: "integer" },
					valid: { type: "integer" },
					details: {
						type: "array",
						items: {
							type: "object",
							properties: {
								citation: { type: "string" },
								sourceDocumentId: { type: "string" },
								sourceSeq: { type: "integer" },
								valid: { type: "boolean" },
								fuzzyScore: { type: "integer" },
								semanticSimilarity: { type: "number" },
								reason: { type: "string" }
							},
							additionalProperties: false
						}
					}
				},
				additionalProperties: false
			},
			render(_args, value) {
				const report = value;
				const lines = [`Citation check: ${report.valid}/${report.total} valid (query ${JSON.stringify(report.query)})`];
				for (const detail of report.details) lines.push(`${detail.citation} ${detail.valid ? "valid" : "INVALID"} — fuzzy ${detail.fuzzyScore}, semantic ${detail.semanticSimilarity}${detail.reason === "" ? "" : ` (${detail.reason})`}`);
				return [{
					type: "text",
					text: lines.join("\n")
				}];
			}
		},
		async execute(args) {
			const parsed = args;
			return {
				ok: true,
				...await store.citeCheck(parsed.library, parsed.query, parsed.answer)
			};
		}
	});
}
/** `library_diagnose` — chunk/duplicate/self-retrieval/middle-penalty report. */
function libraryDiagnoseTool(services) {
	const { store } = services;
	return defineTool({
		name: "library_diagnose",
		description: "Diagnose one library: chunk-size histogram, near-duplicate chunk pairs, a self-retrieval probe (sampled chunks searched with their own text), and the lost-in-the-middle penalty over the ranked chunk list.",
		parameters: { library: {
			type: "string",
			description: "Library to diagnose.",
			required: true
		} },
		output: {
			schema: {
				type: "object",
				properties: {
					ok: {
						type: "boolean",
						const: true
					},
					library: { type: "string" },
					documents: { type: "integer" },
					chunks: { type: "integer" },
					histogram: {
						type: "object",
						properties: {
							buckets: {
								type: "array",
								items: {
									type: "object",
									properties: {
										label: { type: "string" },
										min: { type: "integer" },
										max: { oneOf: [{ type: "integer" }, { type: "null" }] },
										count: { type: "integer" }
									},
									additionalProperties: false
								}
							},
							minChars: { type: "integer" },
							maxChars: { type: "integer" },
							meanChars: { type: "number" },
							totalChars: { type: "integer" }
						},
						additionalProperties: false
					},
					duplicatePairs: { type: "integer" },
					selfRetrieval: {
						type: "object",
						properties: {
							probes: { type: "integer" },
							topKHit: { type: "integer" }
						},
						additionalProperties: false
					},
					middlePenalty: { type: "number" }
				},
				additionalProperties: false
			},
			render(_args, value) {
				const report = value;
				return [{
					type: "text",
					text: `Library ${report.library}: ${report.documents} document(s), ${report.chunks} chunk(s), mean chunk ${Math.round(report.histogram.meanChars)} chars, ${report.duplicatePairs} duplicate pair(s), self-retrieval ${report.selfRetrieval.topKHit}/${report.selfRetrieval.probes}, middle penalty ${report.middlePenalty.toFixed(2)}.`
				}];
			}
		},
		async execute(args) {
			const parsed = args;
			const report = await store.diagnose(parsed.library);
			return {
				ok: true,
				library: report.library,
				documents: report.documents,
				chunks: report.chunks,
				histogram: {
					...report.histogram,
					buckets: [...report.histogram.buckets]
				},
				duplicatePairs: report.duplicatePairs,
				selfRetrieval: report.selfRetrieval,
				middlePenalty: report.middlePenalty
			};
		}
	});
}
//#endregion
export { CHUNK_SIZE_BUCKETS, CommandEmbedder, Config, HashEmbedder, INJECT_EVENT, LIBRARY_NAME, LibraryStore, OllamaEmbedder, PROBE_PREFIX, PURGE_EVENT, allTools, appendAuditEvent, apply, avoidLostMiddle, buildProbePrompt, checkDiversity, chunkHash, chunkSizeHistogram, chunkText, cosine, embedHash, extractCitationNumbers, extractCitations, extractContext, extractSentenceWithCitation, filterDocuments, findDuplicateChunks, formatFewShotPrompt, fuzzyPartialRatio, inject, insertProbe, libraryDomainSpec, makeProbe, maximalMarginalRelevance, middlePenalty, name, positionBins, probeOllama, resolveConfig, resolveEmbedder, sampleSignatures, scoreBatch, scoreRelevance, selectFewShot, splitCommandLine, successByPosition, validateCitation, validateCitations, validateQaPair, verifyPurge, verifyReferences };

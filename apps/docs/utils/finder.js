"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);
var import_fs = require("fs");
var import_path = require("path");

// src/utils.ts
var import_debug = __toESM(require("debug"));
var log = {
  init: (0, import_debug.default)("@pq:finder:init"),
  validate: (0, import_debug.default)("@pq:finder:validate"),
  getFiles: (0, import_debug.default)("@pq:finder:getFiles"),
  type: (0, import_debug.default)("@pq:finder:type"),
  dates: (0, import_debug.default)("@pq:finder:dates"),
  filter: (0, import_debug.default)("@pq:finder:filter"),
  sort: (0, import_debug.default)("@pq:finder:sort")
};
var colors = {
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  // dim:"\x1b[2m",
  // underscore:"\x1b[4m",
  // red:"\x1b[31m",
  // green:"\x1b[32m",
  yellow: "\x1B[33m"
  // blue:"\x1b[34m",
  // magenta:"\x1b[35m",
  // cyan:"\x1b[36m",
  // white:"\x1b[37m",
  // grey:"\x1b[2m",
  // RED:"\x1b[31m\x1b[1m",
  // GREEN:"\x1b[32m\x1b[1m",
  // YELLOW:"\x1b[33m\x1b[1m",
  // BLUE:"\x1b[34m\x1b[1m",
  // MAGENTA:"\x1b[35m\x1b[1m",
  // CYAN:"\x1b[36m\x1b[1m",
  // WHITE:"\x1b[37m\x1b[1m",
  // GREY:"\x1b[2m\x1b[1m",
};

// src/validateConfig.ts
function getDateFromNegativeUnixTimestampOrString(negativeUnixTimestampOrString) {
  if (!negativeUnixTimestampOrString) {
    log.validate("no timestamp, returning...");
    return;
  }
  log.validate("Getting date from time:", negativeUnixTimestampOrString);
  let timestampInMilliseconds;
  if (typeof negativeUnixTimestampOrString === "number" && negativeUnixTimestampOrString < 0) {
    timestampInMilliseconds = -negativeUnixTimestampOrString * 1e3;
  } else if (typeof negativeUnixTimestampOrString === "string" && negativeUnixTimestampOrString.startsWith("-")) {
    const match = negativeUnixTimestampOrString.match(/(-?\d+)([dhm])/);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      switch (unit) {
        case "d":
          timestampInMilliseconds = -value * 24 * 60 * 60 * 1e3;
          break;
        case "h":
          timestampInMilliseconds = -value * 60 * 60 * 1e3;
          break;
        case "m":
          timestampInMilliseconds = -value * 60 * 1e3;
          break;
        default:
          throw new Error(`Invalid time unit: ${unit}`);
      }
    } else {
      throw new Error(`Invalid time string: ${negativeUnixTimestampOrString}`);
    }
  } else {
    return new Date(negativeUnixTimestampOrString);
  }
  return new Date(timestampInMilliseconds);
}
function validateConfig(config) {
  log.validate(`Validating config object...`);
  const defaultConfig = {
    paths: ["."],
    ignorePaths: ["node_modules", ".git"],
    ignoreTypes: ["lock"],
    onlyTypes: [],
    maxDepth: 100
  };
  const finalConfig = { ...defaultConfig, ...config };
  if (!Array.isArray(finalConfig.paths)) {
    throw new TypeError('Config Validation Error:\n"paths" must be an array of strings');
  }
  if (finalConfig.ignorePaths && !Array.isArray(finalConfig.ignorePaths)) {
    throw new TypeError('Config Validation Error:\n"ignorePaths" must be an array of strings');
  }
  if (finalConfig.ignoreTypes && !Array.isArray(finalConfig.ignoreTypes)) {
    throw new TypeError('Config Validation Error:\n"ignoreTypes" must be an array of strings');
  }
  if (finalConfig.onlyTypes && !Array.isArray(finalConfig.onlyTypes)) {
    throw new TypeError('Config Validation Error:\n"onlyTypes" must be an array of strings');
  }
  if (finalConfig.maxDepth && (typeof finalConfig.maxDepth !== "number" || finalConfig.maxDepth < 0)) {
    throw new TypeError('Config Validation Error:\n"maxDepth" must be a non-negative number');
  }
  const dateEntryTypes = ["string", "number", "object"];
  ["modifiedAfter", "modifiedBefore", "createdAfter", "createdBefore"].forEach(
    (dateKey) => {
      const dateValue = finalConfig[dateKey];
      if (dateValue && !dateEntryTypes.includes(typeof dateValue) && !(dateValue instanceof Date) && !Array.isArray(dateValue)) {
        throw new TypeError(
          `Config Validation Error:
"${dateKey}" must be a valid FinderDateEntry (Date | string | [number, number, number] | {year:number, month:number, date:number})`
        );
      }
      let key = dateKey;
      let val = finalConfig[key];
      finalConfig[key] = getDateFromNegativeUnixTimestampOrString(val);
    }
  );
  if (finalConfig.sortBy && !["name", "size", "date", "type", "created", "modified"].includes(finalConfig.sortBy)) {
    throw new TypeError(
      'Config Validation Error:\n"sortBy" must be a valid SortMethod value (name | type | size | created | modified)'
    );
  }
  if (finalConfig.sortOrder && !["asc", "desc"].includes(finalConfig.sortOrder)) {
    throw new TypeError(
      'Config Validation Error:\n"sortOrder" must be a valid SortOrder value (asc | desc)'
    );
  }
  if (finalConfig.replaceBase && typeof finalConfig.replaceBase !== "string") {
    throw new TypeError('Config Validation Error:\n"replaceBase" must be a string');
  }
  const DEFAULTS = {
    ignorePaths: ["node_modules", ".git"],
    ignoreTypes: ["lock"]
  };
  log.validate(`Parsed and validated config object:`, finalConfig);
  return finalConfig;
}

// src/main.ts
var finder = (config = { paths: ["."] }) => {
  try {
    const basePath = (0, import_fs.realpathSync)(".");
    log.init("Base path:", basePath);
    const direntCache = [];
    const getDirents = (_path) => {
      let dirStat = (0, import_fs.lstatSync)(_path);
      if (dirStat.isSymbolicLink()) {
        const resolvedPath = (0, import_fs.readlinkSync)(_path);
        dirStat = (0, import_fs.lstatSync)(resolvedPath);
        _path = resolvedPath;
      }
      return dirStat.isDirectory() ? (0, import_fs.readdirSync)(_path, { withFileTypes: true }) : [_path];
    };
    const getPathDetails = (dirent, _path) => {
      const pathName = typeof dirent === "string" ? dirent : dirent.name;
      const resolvedPath = (0, import_path.resolve)(_path === dirent ? "" : _path, pathName);
      const resolvedPathStats = (0, import_fs.lstatSync)(resolvedPath);
      return { resolvedPath, isDirectory: resolvedPathStats.isDirectory() };
    };
    const getFileData = (resolvedPath, resolvedPathStats) => {
      const finalPath = resolvedPath.split("/").pop() ?? "";
      const split = finalPath.split(".");
      const numberOfPeriods = (finalPath.match(/\./g) ?? []).length;
      let _type;
      if (numberOfPeriods === 0) {
        _type = (0, import_path.extname)(finalPath) !== "" ? (0, import_path.extname)(finalPath) : "txt";
      } else if (numberOfPeriods === 1 && finalPath.startsWith(".")) {
        _type = finalPath;
      } else if (numberOfPeriods === 1) {
        _type = split[split.length - 1];
      } else {
        _type = split.filter(Boolean).slice(1).join(".");
      }
      return {
        path: resolvedPath,
        name: finalPath,
        type: _type,
        size: resolvedPathStats.size,
        modified: resolvedPathStats.mtime,
        created: resolvedPathStats.birthtime ?? resolvedPathStats.ctime
      };
    };
    let SETTINGS = { paths: [] };
    if (typeof config === "string") {
      SETTINGS = validateConfig({
        paths: [config]
      });
    } else {
      SETTINGS = validateConfig(config);
    }
    var dateFuncs = {
      convert: function(d) {
        return d instanceof Date ? d : new Date(d);
      },
      compare: function(a, b) {
        if (typeof b === "number" && b < 0) {
          b = Date.now() + b * 1e3;
        }
        return isFinite(this.convert(a).valueOf()) && isFinite(this.convert(b).valueOf()) ? (
          //@ts-ignore
          (a > b) - (a < b)
        ) : NaN;
      },
      inRange: function(d, start, end) {
        return isFinite(this.convert(d).valueOf()) && isFinite(this.convert(start).valueOf()) && isFinite(this.convert(end).valueOf()) ? start <= d && d <= end : NaN;
      }
    };
    const getFiles = (_path) => {
      try {
        log.getFiles("Getting files from path:", _path);
        let direntsArray = getDirents(_path);
        const files2 = direntsArray.map((dirent) => {
          let filePath = typeof dirent === "string" ? dirent : dirent.name;
          if (SETTINGS.ignorePaths?.includes(filePath)) {
            log.getFiles("Ignoring path:", filePath);
            return;
          }
          const { resolvedPath, isDirectory } = getPathDetails(dirent, _path);
          log.getFiles("Resolved path:", resolvedPath);
          if (isDirectory) {
            log.getFiles("Path is directory");
            let currentDepth = 1;
            if (resolvedPath.includes(basePath)) {
              let pathSegment = resolvedPath?.trim()?.split(basePath)[1] ?? "/";
              let trimmedPath = pathSegment.startsWith("/") ? pathSegment.substring(1) : pathSegment;
              currentDepth = trimmedPath.split("/").length;
            }
            if (SETTINGS.maxDepth && currentDepth <= SETTINGS.maxDepth) {
              log.getFiles(`Recursing at depth:`, currentDepth);
              return getFiles(resolvedPath);
            } else {
              log.getFiles(`Max recurse depth, returning empty array`);
              return [];
            }
          } else {
            log.getFiles("Path is directory");
            const resolvedPathStats = (0, import_fs.lstatSync)(resolvedPath);
            return getFileData(resolvedPath, resolvedPathStats);
          }
        });
        return Array.prototype.concat(...files2);
      } catch (ERR) {
        const err = ERR;
        if (err.message && err.message.includes("lstat '")) {
          console.log(
            colors.yellow + `FINDER | PATH ERROR:
` + colors.reset + `   Unable to locate path ` + colors.bright + `"${err.message.split("lstat '")[1].replace("'", "")}"
` + colors.reset + `   in ` + colors.bright + `"${basePath}"
` + colors.reset
          );
        } else {
          console.log("FINDER | PATH ERROR:\n", err.message ?? err);
        }
        console.log(ERR);
      }
    };
    const runFilter = (path) => {
      let files2 = getFiles(path) || [];
      files2 = files2.filter((file) => {
        if (!file) {
          log.filter("Filtering - no file found");
          return false;
        }
        log.filter("Filtering data for file:", file.name, "with file type:", file.type);
        if (SETTINGS.ignoreTypes?.includes(file.type)) {
          log.filter(`File type ignored via "ignoreTypes"`);
          return false;
        }
        if (SETTINGS.ignorePaths?.includes(file.name)) {
          log.filter(`File path ignored via "ignorePaths"`);
          return false;
        }
        if (SETTINGS.onlyTypes?.length) {
          if (SETTINGS.onlyTypes.includes(file.type)) {
            log.filter(`File type matches "onlyTypes"`);
            return true;
          } else {
            log.filter(`File type does not match "onlyTypes"`);
            return false;
          }
        } else {
          log.filter(`File passed ignore filter`);
          return true;
        }
      });
      if (SETTINGS.createdAfter || SETTINGS.createdBefore || SETTINGS.modifiedAfter || SETTINGS.modifiedBefore) {
        log.dates(`Comparing provided dates:`, {
          createdAfter: SETTINGS.createdAfter,
          createdBefore: SETTINGS.createdBefore,
          modifiedAfter: SETTINGS.modifiedAfter,
          modifiedBefore: SETTINGS.modifiedBefore
        });
        files2 = files2.filter((file) => {
          if (SETTINGS.modifiedAfter) {
            let compare = dateFuncs.compare(file.modified, SETTINGS.modifiedAfter) >= 0;
            log.dates(`Modified after: ${file.modified} :${compare}`);
            return compare;
          }
          if (SETTINGS.modifiedBefore) {
            let compare = dateFuncs.compare(file.modified, SETTINGS.modifiedBefore) <= 0;
            log.dates(`Modified before: ${file.modified} :${compare}`);
            return compare;
          }
          if (SETTINGS.createdAfter) {
            let compare = dateFuncs.compare(file.created, SETTINGS.createdAfter) >= 0;
            log.dates(`Created after: ${file.created} : ${compare}`);
            return compare;
          }
          if (SETTINGS.createdBefore) {
            let compare = dateFuncs.compare(file.created, SETTINGS.createdBefore) <= 0;
            log.dates(`Created before: ${file.created} : ${compare}`);
            return compare;
          }
          log.dates("No date restrictions set, returning true");
          return true;
        });
      }
      return files2;
    };
    log.init(`Accumulating files...`);
    const files = SETTINGS.paths.map((path) => runFilter(path));
    const baseDirRegExp = new RegExp(basePath, "g");
    let uniqueFiles = [];
    const filePathMap = [];
    files.flat().forEach((file) => {
      if (!filePathMap.includes(file.path)) {
        uniqueFiles.push(SETTINGS.replaceBase ? { ...file, path: file.path.replace(baseDirRegExp, SETTINGS.replaceBase) } : file);
        filePathMap.push(file.path);
      }
    });
    if (SETTINGS.sortBy) {
      let sortX = 1;
      let sortY = -1;
      if (SETTINGS.sortOrder === "asc") {
        sortX = -1;
        sortY = 1;
        log.sort("Sort order: ASC");
      } else {
        log.sort("Sort order: DESC");
      }
      const normalize = (str) => str.trim().toLowerCase();
      if (SETTINGS.sortBy === "name") {
        log.sort("Sorting by: name");
        uniqueFiles = uniqueFiles.sort((a, b) => normalize(a.name) > normalize(b.name) ? sortX : sortY);
      }
      if (SETTINGS.sortBy === "size") {
        log.sort("Sorting by: size");
        uniqueFiles = uniqueFiles.sort((a, b) => a.size > b.size ? sortX : sortY);
      }
      if (SETTINGS.sortBy === "created") {
        log.sort("Sorting by: created date");
        uniqueFiles = uniqueFiles.sort((a, b) => a.ctime > b.ctime ? sortX : sortY);
      }
      if (SETTINGS.sortBy === "modified" || SETTINGS.sortBy === "date") {
        log.sort("Sorting by: modified date");
        uniqueFiles = uniqueFiles.sort((a, b) => a.mtime > b.mtime ? sortX : sortY);
      }
      if (SETTINGS.sortBy === "type") {
        log.sort("Sorting by: type");
        uniqueFiles = uniqueFiles.sort((a, b) => normalize(a.type) > normalize(b.type) ? sortX : sortY);
      }
    }
    let newest = null;
    let oldest = null;
    let names = uniqueFiles.map((x) => x.name);
    let types = [];
    const fileDirectoryMap = {};
    uniqueFiles.forEach((file) => {
      if (!newest || file.mtime > newest.mtime) {
        newest = file;
      }
      if (!oldest || file.mtime < newest.mtime) {
        oldest = file;
      }
      if (!types.includes(file.type)) {
        types.push(file.type);
      }
      let currentObj = fileDirectoryMap;
      let filePath;
      if (SETTINGS.replaceBase) {
        filePath = file.path.replace(baseDirRegExp, SETTINGS.replaceBase).split("/");
      } else {
        filePath = file.path.split("/");
      }
      filePath.forEach((pathSegment, index) => {
        if (!currentObj[pathSegment]) {
          if (names.includes(pathSegment)) {
            currentObj[pathSegment] = file.path;
          } else {
            currentObj[pathSegment] = {};
          }
        }
        currentObj = currentObj[pathSegment];
      });
    });
    log.init(`File accumulation and filtering complete.`);
    return {
      length: uniqueFiles.length,
      baseDir: basePath,
      dirMap: fileDirectoryMap,
      types,
      names,
      newest,
      oldest,
      files: uniqueFiles
    };
  } catch (ERR) {
    const err = ERR;
    console.log(
      colors.yellow + `FINDER | ` + err.message || err
    );
    log.init(ERR);
    return {
      length: 0,
      types: [],
      names: [],
      files: [],
      newest: null,
      oldest: null,
      baseDir: null,
      dirMap: {},
      err
    };
  }
};
var main_default = finder;
//! No current logic for recursive link resolving
//! Add array of visited paths to compare against

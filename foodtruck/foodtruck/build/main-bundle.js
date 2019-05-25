/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "./hot/hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "./hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "62cba1307a12eedf3638";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./game/js/app.js")(__webpack_require__.s = "./game/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./game/js/app.js":
/*!************************!*\
  !*** ./game/js/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(riot) {/* harmony import */ var _tags_app_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tags/app.tag */ \"./game/tags/app.tag\");\n/* harmony import */ var _tags_app_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tags/app.styl */ \"./game/tags/app.styl\");\n/* harmony import */ var _tags_app_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tags_app_styl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\");\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(riot__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nriot.mount('app');\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")))\n\n//# sourceURL=webpack:///./game/js/app.js?");

/***/ }),

/***/ "./game/js/store.js":
/*!**************************!*\
  !*** ./game/js/store.js ***!
  \**************************/
/*! exports provided: state, retrieve, create, update, destroy, activate_career, activate_section */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(riot) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"retrieve\", function() { return retrieve; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"destroy\", function() { return destroy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"activate_career\", function() { return activate_career; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"activate_section\", function() { return activate_section; });\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\");\n/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(riot__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst state = {};\nriot.observable(state);\n\nconst retrieve = async (name) => {\n  try {\n    const response = await fetch(`/api/${name}/`, {\n      method: 'get',\n      credentials: 'same-origin',\n      headers: {\n        'X-CSRFToken': window.django.csrf,\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    });\n\n    state[name] = await response.json();\n    state.trigger('update');\n    console.log(state)\n  }\n  catch (err) {\n    console.log('Failed', err);\n  }\n};\n\nconst create = async (name, data) => {\n  try {\n    const response = await fetch(`/api/${name}/`, {\n      method: 'post',\n      body: JSON.stringify(data),\n      credentials: 'same-origin',\n      headers: {\n        'X-CSRFToken': window.django.csrf,\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    });\n\n    console.log(await response.json());\n\n    retrieve('careers');\n  }\n  catch (err) {\n    console.log('Failed', err);\n  }\n};\n\nconst update = async (name, id, data) => {\n  try {\n    const response = await fetch(`/api/${name}/${id}/`, {\n      method: 'put',\n      body: JSON.stringify(data),\n      credentials: 'same-origin',\n      headers: {\n        'X-CSRFToken': window.django.csrf,\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    });\n\n    const text = await response.text();\n    let result = '';\n    try {\n      result = JSON.parse(text);\n    }\n    catch (error) {\n      console.log(error);\n      result = text;\n    }\n\n    console.log(result)\n\n    retrieve('careers');\n  }\n  catch (err) {\n    console.log('Failed', err);\n  }\n};\n\nconst destroy = async (name, id) => {\n  try {\n    const response = await fetch(`/api/${name}/${id}/`, {\n      method: 'delete',\n      credentials: 'same-origin',\n      headers: {\n        'X-CSRFToken': window.django.csrf,\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    });\n\n    retrieve('careers');\n  }\n  catch (err) {\n    console.log('Failed', err);\n  }\n};\n\nconst activate_career = (career_id) => {\n  state.active_career_id = Number(career_id);\n  state.active_section_name = 'menu-items';\n  state.trigger('update');\n};\n\nconst activate_section = (section_name) => {\n  if (section_name === 'careers') {\n    state.active_career_id = null;\n  }\n\n  state.active_section_name = section_name;\n  state.trigger('update');\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")))\n\n//# sourceURL=webpack:///./game/js/store.js?");

/***/ }),

/***/ "./game/tags/app.styl":
/*!****************************!*\
  !*** ./game/tags/app.styl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./app.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/app.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./app.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/app.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./app.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/app.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/app.styl?");

/***/ }),

/***/ "./game/tags/app.tag":
/*!***************************!*\
  !*** ./game/tags/app.tag ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.tag */ \"./game/tags/header.tag\");\n/* harmony import */ var _header_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _header_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.styl */ \"./game/tags/header.styl\");\n/* harmony import */ var _header_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_header_styl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _game_body_game_body_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-body/game-body.tag */ \"./game/tags/game-body/game-body.tag\");\n/* harmony import */ var _game_body_game_body_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-body/game-body.styl */ \"./game/tags/game-body/game-body.styl\");\n/* harmony import */ var _game_body_game_body_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_game_body_game_body_styl__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _game_overview_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-overview.tag */ \"./game/tags/game-overview.tag\");\n/* harmony import */ var _game_overview_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_game_overview_tag__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _game_overview_styl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-overview.styl */ \"./game/tags/game-overview.styl\");\n/* harmony import */ var _game_overview_styl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_game_overview_styl__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ \"./game/tags/components/index.js\");\n/* harmony import */ var _js_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/store */ \"./game/js/store.js\");\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/app.tag\n\n\n\n\n\n\n\n\n\nriot.tag2('app',\n  '<header></header> <game-body if=\"{django.user}\" store=\"{store}\"></game-body> <game-overview if=\"{!django.user}\"></game-overview>',\n  '',\n  '', function(opts) {\n\n    this.store = _js_store__WEBPACK_IMPORTED_MODULE_7__;\n\n    this.on('mount', async () => {\n      _js_store__WEBPACK_IMPORTED_MODULE_7__[\"state\"].on('update', this.update);\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('careers');\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('menu_items');\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('equipment');\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('resources');\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('trucks');\n      await _js_store__WEBPACK_IMPORTED_MODULE_7__[\"retrieve\"]('locations');\n      _js_store__WEBPACK_IMPORTED_MODULE_7__[\"activate_section\"]('careers');\n    });\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('app')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/app.tag?");

/***/ }),

/***/ "./game/tags/components/index.js":
/*!***************************************!*\
  !*** ./game/tags/components/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.tag */ \"./game/tags/components/modal.tag\");\n/* harmony import */ var _modal_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modal_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.styl */ \"./game/tags/components/modal.styl\");\n/* harmony import */ var _modal_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal_styl__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack:///./game/tags/components/index.js?");

/***/ }),

/***/ "./game/tags/components/modal.styl":
/*!*****************************************!*\
  !*** ./game/tags/components/modal.styl ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./modal.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/components/modal.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./modal.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/components/modal.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./modal.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/components/modal.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/components/modal.styl?");

/***/ }),

/***/ "./game/tags/components/modal.tag":
/*!****************************************!*\
  !*** ./game/tags/components/modal.tag ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/components/modal.tag\n\nriot.tag2('modal',\n  '<div><yield></yield></div>',\n  '',\n  'show=\"{visible}\"', function(opts) {\n    this.visible = false;\n\n    this.on('mount', () => {\n      const confirm = this.root.querySelector('.confirm');\n      if (confirm) {\n        confirm.addEventListener('click', (ev) => {\n          if (this.opts.onConfirm) {\n            this.opts.onConfirm(ev, this.data);\n          }\n\n          this.hide();\n          this.update();\n          ev.stopPropagation();\n          this.trigger('confirm');\n        });\n      }\n\n      const cancel = this.root.querySelector('.cancel');\n      if (cancel) {\n        cancel.addEventListener('click', (ev) => {\n          if (this.opts.onCancel) {\n            this.opts.onCancel(ev);\n          }\n\n          this.hide();\n          this.update();\n          ev.stopPropagation();\n          this.trigger('cancel');\n        });\n      }\n    });\n\n    this.show = (data) => {\n      if (this.opts.onShow) {\n        this.opts.onShow();\n      }\n\n      this.data = data;\n      this.visible = true;\n      this.update();\n\n      const first_input = this.root.querySelector('input');\n      if (first_input) {\n        first_input.focus();\n      }\n    };\n\n    this.hide = () => {\n      this.visible = false;\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('modal')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/components/modal.tag?");

/***/ }),

/***/ "./game/tags/game-body/day/day.styl":
/*!******************************************!*\
  !*** ./game/tags/game-body/day/day.styl ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./day.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/day/day.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./day.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/day/day.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./day.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/day/day.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/day/day.styl?");

/***/ }),

/***/ "./game/tags/game-body/day/day.tag":
/*!*****************************************!*\
  !*** ./game/tags/game-body/day/day.tag ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/day/day.tag\n\nriot.tag2('day',\n  '<p>Display is here</p>',\n  '',\n  '', function(opts) {\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('day')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/day/day.tag?");

/***/ }),

/***/ "./game/tags/game-body/game-body.styl":
/*!********************************************!*\
  !*** ./game/tags/game-body/game-body.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-body.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-body.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-body.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-body.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-body.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-body.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/game-body.styl?");

/***/ }),

/***/ "./game/tags/game-body/game-body.tag":
/*!*******************************************!*\
  !*** ./game/tags/game-body/game-body.tag ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_header_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-header.tag */ \"./game/tags/game-body/game-header.tag\");\n/* harmony import */ var _game_header_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_game_header_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _game_header_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-header.styl */ \"./game/tags/game-body/game-header.styl\");\n/* harmony import */ var _game_header_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_game_header_styl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _day_day_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./day/day.tag */ \"./game/tags/game-body/day/day.tag\");\n/* harmony import */ var _day_day_tag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_day_day_tag__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _day_day_styl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./day/day.styl */ \"./game/tags/game-body/day/day.styl\");\n/* harmony import */ var _day_day_styl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_day_day_styl__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _menu_menu_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu/menu.tag */ \"./game/tags/game-body/menu/menu.tag\");\n/* harmony import */ var _menu_menu_styl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu/menu.styl */ \"./game/tags/game-body/menu/menu.styl\");\n/* harmony import */ var _menu_menu_styl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_menu_menu_styl__WEBPACK_IMPORTED_MODULE_4__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/game-body.tag\n\n\n\n\n\n\n\nriot.tag2('game-body',\n  '<game-header store=\"{opts.store}\"></game-header> <div id=\"menu-and-day\"> <menu store=\"{opts.store}\"></menu> <day></day> </div>',\n  '',\n  '', function(opts) {\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('game-body')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/game-body.tag?");

/***/ }),

/***/ "./game/tags/game-body/game-header.styl":
/*!**********************************************!*\
  !*** ./game/tags/game-body/game-header.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-header.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-header.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/stylus-loader!./game-header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-header.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/game-header.styl?");

/***/ }),

/***/ "./game/tags/game-body/game-header.tag":
/*!*********************************************!*\
  !*** ./game/tags/game-body/game-header.tag ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/game-header.tag\n\nriot.tag2('game-header',\n  '<div class=\"cash\" if=\"{cash}\">${cash}</div> <div class=\"cash\" if=\"{!cash}\">---</div>',\n  '',\n  '', function(opts) {\n    this.on('update', () => {\n      const state = this.opts.store.state;\n      const active_career_id = state.active_career_id;\n      if (!active_career_id) {\n        this.cash = null;\n        return;\n      }\n\n      const active_career = state.careers.find(c => c.id === active_career_id);\n      this.cash = active_career.cash.toFixed(2);\n    });\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('game-header')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/game-header.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/career-details.tag":
/*!******************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/career-details.tag ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/career-details.tag\n\nriot.tag2('career-details',\n  '<p>Create a new career, or continue a previous one.</p> <button onclick=\"{open_new_career_modal}\">New Career</button> <h2>Careers:</h2> <h1 if=\"{opts.store.state.careers.length &lt;= 0}\">You don\\'t have any careers.</h1> <table if=\"{opts.store.state.careers.length &gt; 0}\"> <tbody> <tr each=\"{career in opts.store.state.careers}\"> <td> <p>{career.name}</p> </td> <td> <button onclick=\"{activate_career}\" riot-value=\"{career.id}\">Load</button> </td> <td> <button onclick=\"{open_destroy_career_modal}\" riot-value=\"{career.id}\">Delete</button> </td> </tr> </tbody> </table> <modal ref=\"new_career_modal\" on-confirm=\"{new_career}\"> <div class=\"title\">New Career</div> <div class=\"content\">Enter the name of your new food truck! <input ref=\"new_career_name\" type=\"text\"> <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Create</button> </div> </div> </modal> <modal ref=\"destroy_career_modal\" on-confirm=\"{destroy_career}\"> <div class=\"title\">Destroy Career</div> <div class=\"content\">Are you sure you want to destroy this career? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Destroy</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.open_new_career_modal = () => {\n      this.refs.new_career_modal.show();\n    };\n\n    this.new_career = () => {\n      const name = this.refs.new_career_modal.refs.new_career_name.value;\n      this.opts.store.create('careers', { name });\n    };\n\n    this.open_destroy_career_modal = (ev) => {\n      const career_id = ev.target.value;\n      this.refs.destroy_career_modal.show(career_id);\n    };\n\n    this.destroy_career = (ev, career_id) => {\n      this.opts.store.destroy('careers', career_id);\n    };\n\n    this.activate_career = (ev) => {\n      const career_id = ev.target.value;\n      this.opts.store.activate_career(career_id);\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('career-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/career-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/equipment-details.tag":
/*!*********************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/equipment-details.tag ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/equipment-details.tag\n\nriot.tag2('equipment-details',\n  '<p>Pick the equipment for your truck</p> <button onclick=\"{open_new_equipment_modal}\">Buy Equipment</button> <h2>Equipment:</h2> <h1 if=\"{career_equipment.length === 0}\">Your truck is empty!</h1> <table if=\"{career_equipment.length &gt; 0}\"> <tbody> <tr each=\"{career_equipment}\"> <td> <p>{state.equipment[equipment].name}</p> </td> <td> <p>${state.equipment[equipment].cost}</p> </td> <td> <button onclick=\"{open_destroy_equipment_modal}\" riot-value=\"{id}\">Delete</button> </td> </tr> </tbody> </table> <modal ref=\"new_equipment_modal\" on-confirm=\"{new_equipment}\"> <div class=\"title\">Buy Equipment</div> <div class=\"content\">Buy some equipment for your truck! <table> <tbody> <tr each=\"{equipment in parent.state.equipment}\"> <td> <p>{equipment.name}</p> </td> <td> <p>${equipment.cost}</p> </td> <td> <input ref=\"equipment_{equipment.id}\" type=\"checkbox\" name=\"equipment\" riot-value=\"{equipment.id}\"> </td> </tr> </tbody> </table> <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Buy Equipment</button> </div> </div> </modal> <modal ref=\"destroy_equipment_modal\" on-confirm=\"{destroy_equipment}\"> <div class=\"title\">Destroy Equipment</div> <div class=\"content\">Are you sure you want to destroy this equipment? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Destroy</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.state = this.opts.store.state;\n\n    this.on('before-mount', () => {\n      this.update_career_equipment();\n    });\n\n    this.on('update', () => {\n      this.update_career_equipment();\n    });\n\n    this.update_career_equipment = () => {\n      this.active_career_id = this.state.active_career_id;\n      for (let career of this.state.careers) {\n        if (career.id === this.active_career_id) {\n          this.active_career = career\n          this.career_equipment = career.career_equipment;\n          break;\n        }\n      }\n    };\n\n    this.open_new_equipment_modal = () => {\n      this.refs.new_equipment_modal.show();\n    };\n\n    this.new_equipment = () => {\n      const checkboxes = this.refs.new_equipment_modal.refs;\n      for (let checkbox_name in checkboxes) {\n        if (checkboxes[checkbox_name].checked) {\n          this.opts.store.create('career_equipment', {\n            equipment: checkboxes[checkbox_name].value,\n            career: this.active_career.id\n          });\n\n          checkboxes[checkbox_name].checked = false;\n        }\n      }\n    };\n\n    this.open_destroy_equipment_modal = (ev) => {\n      const career_equipment_id = ev.target.value;\n      this.refs.destroy_equipment_modal.show(career_equipment_id);\n    };\n\n    this.destroy_menu_item = (ev, career_equipment_id) => {\n      this.opts.store.destroy('career_equipment', career_equipment_id);\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('equipment-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/equipment-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/location-detials.tag":
/*!********************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/location-detials.tag ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/location-detials.tag\n\nriot.tag2('location-details',\n  '<p>Go to the right location to get more business.</p> <div class=\"location\"> <h2>{location.name}</h2> <div class=\"rent-row\"> <h2 class=\"{red: active_career.cash &lt; location.cost}\">${location.cost}</h2> <button disabled=\"{active_career.location === location.id ||           active_career.cash &lt; location.cost}\">Rent</button> <h2 class=\"red\" if=\"{active_career.location === location.id}\">Current location.</h2> </div><img riot-src=\"/static/{get_image_name()}.png\"> </div> <div class=\"buttons\"> <button class=\"last\" onclick=\"{last_location}\" disabled=\"{location_index &lt;= 0}\">Last</button> <button class=\"next\" onclick=\"{next_location}\" disabled=\"{location_index &gt;= Object.keys(state.locations).length - 1}\">Next</button> </div> <modal ref=\"rent_modal\" on-confirm=\"{rent}\"> <div class=\"title\">Rent Location</div> <div class=\"content\">Are you sure you want pay ${} to rent this location? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Rent</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.state = this.opts.store.state;\n\n    this.location_index = 0;\n\n    this.on('before-mount', () => {\n      this.update_career();\n      this.location = Object.values(this.state.locations)[this.location_index];\n    });\n\n    this.on('update', () => {\n      this.update_career();\n    });\n\n    this.update_career = () => {\n      this.active_career_id = this.state.active_career_id;\n      for (let career of this.state.careers) {\n        if (career.id === this.active_career_id) {\n          this.active_career = career\n          break;\n        }\n      }\n    };\n\n    this.open_rent_modal = () => {\n      this.refs.rent_modal.show();\n    };\n\n    this.rent = () => {\n      this.opts.store.update('career', this.active_career_id, {\n        location: this.location.id\n      });\n    };\n\n    this.get_image_name = () => {\n      return this.location.name.toLowerCase().replace(/ /g, '-');\n    };\n\n    this.last_location = () => {\n      this.location_index -= 1;\n      this.location = Object.values(this.state.locations)[this.location_index];\n      this.update();\n    }\n\n    this.next_location = () => {\n      this.location_index += 1;\n      this.location = Object.values(this.state.locations)[this.location_index];\n      this.update();\n    }\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('location-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/location-detials.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/menu-details.styl":
/*!*****************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/menu-details.styl ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader!./menu-details.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-details/menu-details.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader!./menu-details.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-details/menu-details.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/stylus-loader!./menu-details.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-details/menu-details.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/menu-details.styl?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/menu-details.tag":
/*!****************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/menu-details.tag ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _career_details_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./career-details.tag */ \"./game/tags/game-body/menu/menu-details/career-details.tag\");\n/* harmony import */ var _career_details_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_career_details_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _equipment_details_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equipment-details.tag */ \"./game/tags/game-body/menu/menu-details/equipment-details.tag\");\n/* harmony import */ var _equipment_details_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_equipment_details_tag__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _truck_details_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./truck-details.tag */ \"./game/tags/game-body/menu/menu-details/truck-details.tag\");\n/* harmony import */ var _truck_details_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_truck_details_tag__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _menu_item_details_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-item-details.tag */ \"./game/tags/game-body/menu/menu-details/menu-item-details.tag\");\n/* harmony import */ var _menu_item_details_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_menu_item_details_tag__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _resource_details_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resource-details.tag */ \"./game/tags/game-body/menu/menu-details/resource-details.tag\");\n/* harmony import */ var _resource_details_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_resource_details_tag__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _location_detials_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./location-detials.tag */ \"./game/tags/game-body/menu/menu-details/location-detials.tag\");\n/* harmony import */ var _location_detials_tag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_location_detials_tag__WEBPACK_IMPORTED_MODULE_5__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/menu-details.tag\n\n\n\n\n\n\n\nriot.tag2('menu-details',\n  '<career-details if=\"{active_section_name === \\'careers\\'}\" store=\"{opts.store}\"></career-details> <equipment-details if=\"{active_section_name === \\'equipment\\'}\" store=\"{opts.store}\"></equipment-details> <truck-details if=\"{active_section_name === \\'trucks\\'}\" store=\"{opts.store}\"></truck-details> <menu-item-details if=\"{active_section_name === \\'menu-items\\'}\" store=\"{opts.store}\"></menu-item-details> <resource-details if=\"{active_section_name === \\'resources\\'}\" store=\"{opts.store}\"></resource-details> <location-details if=\"{active_section_name === \\'locations\\'}\" store=\"{opts.store}\"></location-details>',\n  '',\n  '', function(opts) {\n\n    this.on('update', () => {\n      this.active_section_name = this.opts.store.state.active_section_name;\n    });\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('menu-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/menu-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/menu-item-details.tag":
/*!*********************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/menu-item-details.tag ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/menu-item-details.tag\n\nriot.tag2('menu-item-details',\n  '<p>Make your menu, Chef!</p> <button onclick=\"{open_new_menu_items_modal}\">New Menu Item</button> <h2>Menu Items:</h2> <h1 if=\"{career_menu_items.length === 0}\">Your menu is empty!</h1> <table if=\"{career_menu_items.length &gt; 0}\"> <tbody> <tr each=\"{career_menu_items}\"> <td> <p>{state.menu_items[menu_item].name}</p> </td> <td> <ul> <li each=\"{menu_item_resource in state.menu_items[menu_item].menu_item_resources}\"> {menu_item_resource.quantity} {menu_item_resource.resource.unit} {menu_item_resource.resource.name} </li> </ul> </td> <td> <ul> <li each=\"{equipment in state.menu_items[menu_item].equipment}\">{equipment.name}</li> </ul> </td> <td> <button onclick=\"{open_destroy_menu_item_modal}\" riot-value=\"{id}\">Delete</button> </td> </tr> </tbody> </table> <modal ref=\"new_menu_items_modal\" on-confirm=\"{new_menu_items}\"> <div class=\"title\">New Menu Items</div> <div class=\"content\">Add some stuff to your menu! <table> <tbody> <tr each=\"{menu_item in parent.state.menu_items}\"> <td> <p>{menu_item.name}</p> </td> <td> <ul> <li each=\"{menu_item_resource in menu_item.menu_item_resources}\"> {menu_item_resource.quantity} {menu_item_resource.resource.unit} {menu_item_resource.resource.name} </li> </ul> </td> <td> <ul> <li class=\"{parent.parent.parent.has_equipment(equipment) ? \\'\\' : \\'red\\'}\" each=\"{equipment in menu_item.equipment}\">{equipment.name}</li> </ul> </td> <td> <input ref=\"menu_item_{menu_item.id}\" type=\"checkbox\" name=\"menu_items\" disabled=\"{!parent.parent.has_all_equipment(menu_item)}\" riot-value=\"{menu_item.id}\"> </td> </tr> </tbody> </table> <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Add Items</button> </div> </div> </modal> <modal ref=\"destroy_menu_item_modal\" on-confirm=\"{destroy_menu_item}\"> <div class=\"title\">Destroy Menu Item</div> <div class=\"content\">Are you sure you want to destroy this menu item? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Destroy</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.state = this.opts.store.state;\n\n    this.on('before-mount', () => {\n      this.update_career_menu_items();\n    });\n\n    this.on('update', () => {\n      this.update_career_menu_items();\n    });\n\n    this.update_career_menu_items = () => {\n      this.active_career_id = this.state.active_career_id;\n      for (let career of this.state.careers) {\n        if (career.id === this.active_career_id) {\n          this.active_career = career\n          this.career_menu_items = career.career_menu_items;\n          break;\n        }\n      }\n    };\n\n    this.open_new_menu_items_modal = () => {\n      this.refs.new_menu_items_modal.show();\n    };\n\n    this.new_menu_items = () => {\n      const checkboxes = this.refs.new_menu_items_modal.refs;\n      for (let checkbox_name in checkboxes) {\n        if (checkboxes[checkbox_name].checked) {\n          this.opts.store.create('career_menu_items', {\n            menu_item: checkboxes[checkbox_name].value,\n            career: this.active_career.id\n          });\n\n          checkboxes[checkbox_name].checked = false;\n        }\n      }\n    };\n\n    this.open_destroy_menu_item_modal = (ev) => {\n      const career_menu_item_id = ev.target.value;\n      this.refs.destroy_menu_item_modal.show(career_menu_item_id);\n    };\n\n    this.destroy_menu_item = (ev, career_menu_item_id) => {\n      this.opts.store.destroy('career_menu_items', career_menu_item_id);\n    };\n\n    this.has_equipment = (equipment) => {\n      if (!this.active_career) {\n        return false;\n      }\n\n      for (let career_equipment of this.active_career.career_equipment) {\n        if (career_equipment.equipment === equipment.id) {\n          return true;\n        }\n      }\n\n      return false;\n    };\n\n    this.has_all_equipment = (menu_item) => {\n      if (!this.active_career) {\n        return false;\n      }\n\n      const career_equipment = this.active_career.career_equipment;\n      const career_equipment_ids = career_equipment.map(e => e.equipment);\n\n      for (let required_equipment of menu_item.equipment) {\n        if (!career_equipment_ids.includes(required_equipment.id)) {\n          return false;\n        }\n      }\n\n      return true;\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('menu-item-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/menu-item-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/resource-details.tag":
/*!********************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/resource-details.tag ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/resource-details.tag\n\nriot.tag2('resource-details',\n  '<p>Order supplies!</p> <button onclick=\"{open_new_resources_modal}\">New Menu Item</button> <h2>Ingredients & Supplies:</h2> <h1 if=\"{out_of_everything}\">You\\'re out of everything!</h1> <table if=\"{!out_of_everything}\"> <tbody> <tr if=\"{quantity &gt; 0}\" each=\"{career_resources}\"> <td> <p>{state.resources[resource].name}</p> </td> <td> <p>{quantity} {state.resources[resource].unit}</p> </td> </tr> </tbody> </table> <modal ref=\"new_resources_modal\" on-confirm=\"{new_resources}\"> <div class=\"title\">Buy Ingredients & Supplies</div> <div class=\"content\">Get what you need for your menu! <table> <tbody> <tr each=\"{resource in parent.state.resources}\"> <td> <p>{resource.name}</p> </td> <td> <p>${resource.cost}/{resource.unit}</p> </td> <td> <input ref=\"resource_{resource.id}\" oninput=\"{parent.parent.calculate_total}\" type=\"text\"> </td> </tr> </tbody> </table> <h3 class=\"{red: parent.over_spent}\">Total: ${parent.total.toFixed(2)}</h3> <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\" disabled=\"{parent.over_spent}\">Buy</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.state = this.opts.store.state;\n    this.out_of_everything = true;\n    this.over_spent = false;\n    this.total = 0;\n\n    this.on('before-mount', () => {\n      this.update_career_resources();\n    });\n\n    this.on('update', () => {\n      this.update_career_resources();\n    });\n\n    this.update_career_resources = () => {\n      this.active_career_id = this.state.active_career_id;\n      for (let career of this.state.careers) {\n        if (career.id === this.active_career_id) {\n          this.active_career = career\n          this.career_resources = career.career_resources;\n          this.out_of_everything = true;\n          for (let career_resource of this.career_resources) {\n            if (career_resource.quantity > 0) {\n              this.out_of_everything = false;\n              break;\n            }\n          }\n\n          break;\n        }\n      }\n    };\n\n    this.open_new_resources_modal = () => {\n      this.refs.new_resources_modal.show();\n    };\n\n    this.new_resources = () => {\n      const fields = this.refs.new_resources_modal.refs;\n      for (let field_name in fields) {\n        const field = fields[field_name];\n        if (field.value !== '' && !isNaN(Number(field.value))) {\n          const resource_id = Number(field_name.split('_')[1]);\n          const career_resource = this.career_resources.find((career_resource) => {\n            return career_resource.resource === resource_id\n          });\n\n          this.opts.store.update('career_resources', career_resource.id, {\n            resource: resource_id,\n            career: this.active_career.id,\n            quantity: career_resource.quantity + Number(field.value)\n          });\n\n          field.value = '';\n        }\n      }\n    };\n\n    this.calculate_total = () => {\n      const fields = this.refs.new_resources_modal.refs;\n      this.total = 0;\n      for (let field_name in fields) {\n        const resource_id = field_name.split('_')[1];\n        const resource = this.state.resources[resource_id];\n        const field = fields[field_name];\n        if (field.value !== '' && !isNaN(Number(field.value))) {\n          this.total += resource.cost * Number(field.value);\n        }\n      }\n\n      this.over_spent = false;\n      if (this.total > this.active_career.cash) {\n        this.over_spent = true;\n      }\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('resource-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/resource-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-details/truck-details.tag":
/*!*****************************************************************!*\
  !*** ./game/tags/game-body/menu/menu-details/truck-details.tag ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-details/truck-details.tag\n\nriot.tag2('truck-details',\n  '<p>Get a bigger truck to do more business.</p> <div class=\"truck\"> <h2>{truck.name} Capacity: {truck.capacity}lbs</h2> <div class=\"buy-row\"> <h2 class=\"{red: active_career.cash &lt; truck.cost}\">${truck.cost}</h2> <button onclick=\"{}\" disabled=\"{active_career.truck === truck.id ||           active_career.cash &lt; truck.cost}\">Buy</button> <h2 class=\"red\" if=\"{active_career.truck === truck.id}\">You own this truck.</h2> </div><img riot-src=\"/static/{get_image_name()}.png\"> </div> <div class=\"buttons\"> <button class=\"last\" onclick=\"{last_truck}\" disabled=\"{truck_index &lt;= 0}\">Last</button> <button class=\"next\" onclick=\"{next_truck}\" disabled=\"{truck_index &gt;= Object.keys(state.trucks).length - 1}\">Next</button> </div> <modal ref=\"upgrade_modal\" on-confirm=\"{buy}\"> <div class=\"title\">Upgrade Truck</div> <div class=\"content\">Are you sure you want pay ${} to upgrade your truck? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Upgrade</button> </div> </div> </modal> <modal ref=\"downgrade_modal\" on-confirm=\"{buy}\"> <div class=\"title\">Downgrade Truck</div> <div class=\"content\">Are you sure you want to downgrade your truck and receive ${}? <div class=\"buttons\"> <button class=\"cancel\">Cancel</button> <button class=\"confirm\">Downgrade</button> </div> </div> </modal>',\n  '',\n  '', function(opts) {\n    this.state = this.opts.store.state;\n\n    this.truck_index = 0;\n\n    this.on('before-mount', () => {\n      this.update_career();\n      this.truck = Object.values(this.state.trucks)[this.truck_index];\n    });\n\n    this.on('update', () => {\n      this.update_career();\n    });\n\n    this.update_career = () => {\n      this.active_career_id = this.state.active_career_id;\n      for (let career of this.state.careers) {\n        if (career.id === this.active_career_id) {\n          this.active_career = career\n          break;\n        }\n      }\n    };\n\n    this.open_upgrade_modal = () => {\n      this.refs.upgrade_modal.show();\n    };\n\n    this.open_downgrade_modal = () => {\n      this.refs.downgrade_modal.show();\n    };\n\n    this.buy = () => {\n      this.opts.store.update('career', this.active_career_id, {\n        truck: this.truck.id\n      });\n    };\n\n    this.get_image_name = () => {\n      return this.truck.name.toLowerCase().replace(/ /g, '-');\n    };\n\n    this.last_truck = () => {\n      this.truck_index -= 1;\n      this.truck = Object.values(this.state.trucks)[this.truck_index];\n      this.update();\n    }\n\n    this.next_truck = () => {\n      this.truck_index += 1;\n      this.truck = Object.values(this.state.trucks)[this.truck_index];\n      this.update();\n    }\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('truck-details')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/truck-details.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-navigation.styl":
/*!*******************************************************!*\
  !*** ./game/tags/game-body/menu/menu-navigation.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu-navigation.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-navigation.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu-navigation.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-navigation.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu-navigation.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-navigation.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-navigation.styl?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu-navigation.tag":
/*!******************************************************!*\
  !*** ./game/tags/game-body/menu/menu-navigation.tag ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu-navigation.tag\n\nriot.tag2('menu-navigation',\n  '<button class=\"{activated: active_section_name === \\'careers\\'}\" onclick=\"{activate_section}\" value=\"careers\">Careers</button> <button class=\"{activated: active_section_name === \\'menu-items\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"menu-items\">Menu</button> <button class=\"{activated: active_section_name === \\'resources\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"resources\">Supplies</button> <button class=\"{activated: active_section_name === \\'equipment\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"equipment\">Equipment</button> <button class=\"{activated: active_section_name === \\'trucks\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"trucks\">Trucks</button> <button class=\"{activated: active_section_name === \\'locations\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"locations\">Location</button> <button class=\"{activated: active_section_name === \\'employees\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"employees\">Staff</button> <button class=\"{activated: active_section_name === \\'sales\\'}\" disabled=\"{!active_career_id}\" onclick=\"{activate_section}\" value=\"sales\">Sales</button>',\n  '',\n  '', function(opts) {\n    this.on('update', () => {\n      this.active_career_id = this.opts.store.state.active_career_id;\n      this.active_section_name = this.opts.store.state.active_section_name;\n    });\n\n    this.activate_section = (ev) => {\n      const section_name = ev.target.value;\n      this.opts.store.activate_section(section_name);\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('menu-navigation')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-navigation.tag?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu.styl":
/*!********************************************!*\
  !*** ./game/tags/game-body/menu/menu.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/stylus-loader!./menu.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu.styl?");

/***/ }),

/***/ "./game/tags/game-body/menu/menu.tag":
/*!*******************************************!*\
  !*** ./game/tags/game-body/menu/menu.tag ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _menu_navigation_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-navigation.tag */ \"./game/tags/game-body/menu/menu-navigation.tag\");\n/* harmony import */ var _menu_navigation_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_menu_navigation_tag__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _menu_navigation_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-navigation.styl */ \"./game/tags/game-body/menu/menu-navigation.styl\");\n/* harmony import */ var _menu_navigation_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_menu_navigation_styl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _menu_details_menu_details_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-details/menu-details.tag */ \"./game/tags/game-body/menu/menu-details/menu-details.tag\");\n/* harmony import */ var _menu_details_menu_details_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-details/menu-details.styl */ \"./game/tags/game-body/menu/menu-details/menu-details.styl\");\n/* harmony import */ var _menu_details_menu_details_styl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_menu_details_menu_details_styl__WEBPACK_IMPORTED_MODULE_3__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-body/menu/menu.tag\n\n\n\n\n\nriot.tag2('menu',\n  '<menu-navigation store=\"{opts.store}\"></menu-navigation> <menu-details store=\"{opts.store}\"></menu-details>',\n  '',\n  '', function(opts) {\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('menu')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu.tag?");

/***/ }),

/***/ "./game/tags/game-overview.styl":
/*!**************************************!*\
  !*** ./game/tags/game-overview.styl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./game-overview.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-overview.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./game-overview.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-overview.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./game-overview.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-overview.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/game-overview.styl?");

/***/ }),

/***/ "./game/tags/game-overview.tag":
/*!*************************************!*\
  !*** ./game/tags/game-overview.tag ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/game-overview.tag\n\nriot.tag2('game-overview',\n  '<h1>Log in or create a new account!</h1>',\n  '',\n  '', function(opts) {\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('game-overview')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/game-overview.tag?");

/***/ }),

/***/ "./game/tags/header.styl":
/*!*******************************!*\
  !*** ./game/tags/header.styl ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/header.styl\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/header.styl\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/stylus-loader!./header.styl */ \"./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/header.styl\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./game/tags/header.styl?");

/***/ }),

/***/ "./game/tags/header.tag":
/*!******************************!*\
  !*** ./game/tags/header.tag ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")\n    //src: game/tags/header.tag\n\nriot.tag2('header',\n  '<div class=\"greeting\"> <h1>Hello {django.user ? django.user.username : \\'there\\'}!</h1> </div> <div class=\"logo\"> <h1>Food Truckin\\'</h1> </div> <button if=\"{django.user}\" onclick=\"{logout}\">Logout</button> <div class=\"login\" if=\"{form_showing === \\'login\\'}\"> <form action=\"{django.urls.login}\" method=\"POST\"> <input type=\"hidden\" name=\"csrfmiddlewaretoken\" riot-value=\"{django.csrf}\"> <input id=\"username-field\" name=\"username\" type=\"text\"> <input id=\"password-field\" name=\"password\" type=\"password\"> <button type=\"submit\">Login</button> </form> </div> <div class=\"signup\" if=\"{form_showing === \\'signup\\'}\"> <form action=\"{django.urls.signup}\" method=\"POST\"> <input type=\"hidden\" name=\"csrfmiddlewaretoken\" riot-value=\"{django.csrf}\"> <input id=\"username-field\" name=\"username\" type=\"text\"> <input id=\"password1-field\" name=\"password1\" type=\"password\"> <input id=\"password2-field\" name=\"password2\" type=\"password\"> <button type=\"submit\">Sign Up</button> </form> </div> <div class=\"form-buttons\" if=\"{!django.user}\"> <button if=\"{form_showing !== \\'login\\'}\" onclick=\"{show_form}\" value=\"login\">Login</button> <button if=\"{form_showing !== \\'signup\\'}\" onclick=\"{show_form}\" value=\"signup\">Sign Up</button> </div>',\n  '',\n  '', function(opts) {\n    this.form_showing = null;\n\n    this.show_form = (ev) => {\n      this.update({ form_showing: ev.target.value });\n    };\n\n    this.logout = () => {\n      location.href = django.urls.logout;\n    };\n});\n    \n  if (true) {\n    module.hot.accept()\n    if (module.hot.data) {\n      riot.reload('header')\n    }\n  }\n  \n\n//# sourceURL=webpack:///./game/tags/header.tag?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/app.styl":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/app.styl ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"html,\\nbody {\\n  height: 100%;\\n  margin: 0;\\n  font-size: 1em;\\n  color: #f8f9e5;\\n}\\napp {\\n  display: flex;\\n  flex-flow: column;\\n  height: 100%;\\n  color: #f8f9e5;\\n  background: repeating-linear-gradient(45deg, #109c2f, #109c2f 15px, #07a52a 15px, #07a52a 30px);\\n}\\nh1,\\nh2 {\\n  margin: 0;\\n}\\np {\\n  font-size: 120%;\\n}\\n.red {\\n  color: #ffee35;\\n}\\nbutton {\\n  padding: 6px 10px;\\n  position: relative;\\n  border: none;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  color: #f8f9e5;\\n  font-size: 20px;\\n  background-color: #109c2f;\\n  box-shadow: 2px 2px 8px rgba(0,0,0,0.4);\\n  border-radius: 8px;\\n  cursor: pointer;\\n}\\nbutton:after {\\n  content: \\\"\\\";\\n  position: absolute;\\n  border-radius: 8px;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  box-shadow: 4px 4px 8px #07a52a inset;\\n}\\nbutton:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  border-radius: 8px;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  box-shadow: -4px -4px 8px rgba(0,0,0,0.2) inset;\\n}\\nbutton:not(:last-of-type) {\\n  margin-right: 20px;\\n}\\nbutton:hover:not(:disabled) {\\n  background-color: #11a833;\\n}\\nbutton.activated {\\n  background-color: #12ae35;\\n}\\nbutton:active {\\n  background-color: #0f902b;\\n  box-shadow: none;\\n}\\nbutton:active:after {\\n  content: \\\"\\\";\\n  box-shadow: 4px 4px 8px rgba(0,0,0,0.3) inset;\\n}\\nbutton:active:before {\\n  content: \\\"\\\";\\n  box-shadow: -4px -4px 8px rgba(7,165,42,0.8) inset;\\n}\\nbutton:focus {\\n  outline: 0;\\n}\\nbutton:disabled {\\n  opacity: 0.5;\\n}\\ntable {\\n  border-spacing: 0;\\n}\\ntable tbody tr:nth-child(odd) {\\n  background-color: #156b29;\\n}\\ntable tbody tr:nth-child(even) {\\n  background-color: #16712b;\\n}\\ntable tbody td {\\n  padding: 10px 10px;\\n  border: none;\\n}\\ntable tbody td ul {\\n  margin: 0;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/app.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/components/modal.styl":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/components/modal.styl ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"modal {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  justify-content: center;\\n  align-items: center;\\n  background: rgba(0,0,0,0.5);\\n  display: flex;\\n  z-index: 10000;\\n  overflow: auto;\\n  font-size: 120%;\\n}\\nmodal > div {\\n  margin: auto;\\n  text-align: left;\\n  color: #f8f9e5;\\n  background: repeating-linear-gradient(45deg, #109c2f, #109c2f 15px, #07a52a 15px, #07a52a 30px);\\n}\\nmodal > div tbody {\\n  display: block;\\n  max-height: calc(100vh - 300px);\\n  overflow: auto;\\n}\\nmodal > div .title:first-child {\\n  font-weight: bold;\\n  margin: 0;\\n  width: 100%;\\n  padding: 15px;\\n}\\nmodal > div .content {\\n  background-color: #17772d;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  flex-direction: column;\\n  width: 100%;\\n  padding: 15px;\\n  line-height: 1.4em;\\n  box-sizing: border-box;\\n}\\nmodal > div .content .error-message {\\n  color: #f8f9e5;\\n  font-size: 90%;\\n}\\nmodal > div .content .buttons {\\n  margin-top: 15px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\nmodal > div .content .buttons button,\\nmodal > div .content .buttons input[type=submit],\\nmodal > div .content .buttons input[type=button] {\\n  display: inline;\\n  margin: 0 5px 0 0;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/components/modal.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/day/day.styl":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/day/day.styl ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/day/day.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-body.styl":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/game-body.styl ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"game-body {\\n  margin: 20px;\\n  display: flex;\\n  flex-flow: column;\\n}\\ngame-body #menu-and-day {\\n  display: flex;\\n  flex-direction: row;\\n  height: 100%;\\n}\\ngame-body #menu-and-day day,\\ngame-body #menu-and-day menu {\\n  padding: 10px;\\n  flex: 1 1 0;\\n  background-color: #17772d;\\n  border-radius: 10px;\\n  box-shadow: rgba(0,0,0,0.4) 0 0 30px inset;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/game-body.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/game-header.styl":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/game-header.styl ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"game-header {\\n  padding: 10px;\\n  background-color: #063f13;\\n  border-radius: 10px;\\n  margin-bottom: 20px;\\n  display: flex;\\n  font-weight: bold;\\n}\\ngame-header .cash {\\n  margin-left: auto;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/game-header.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-details/menu-details.styl":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/menu/menu-details/menu-details.styl ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"menu-details truck-details .buy-row {\\n  display: flex;\\n}\\nmenu-details truck-details .buy-row button {\\n  margin-left: 20px;\\n}\\nmenu-details truck-details .buttons {\\n  margin-top: 10px;\\n  display: flex;\\n}\\nmenu-details truck-details .buttons .next {\\n  margin-left: 5px;\\n}\\nmenu-details location-details img {\\n  max-width: 20%;\\n}\\nmenu-details location-details .rent-row {\\n  display: flex;\\n}\\nmenu-details location-details .rent-row button {\\n  margin-left: 20px;\\n}\\nmenu-details location-details .buttons {\\n  margin-top: 10px;\\n  display: flex;\\n}\\nmenu-details location-details .buttons .next {\\n  margin-left: 5px;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-details/menu-details.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu-navigation.styl":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/menu/menu-navigation.styl ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"menu-navigation {\\n  display: flex;\\n}\\nmenu-navigation button {\\n  padding: 0 20px;\\n  height: 90px;\\n}\\nmenu-navigation button:not(:first-of-type) {\\n  margin-left: auto;\\n}\\nmenu-navigation button:not(:last-of-type) {\\n  margin-right: auto;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu-navigation.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-body/menu/menu.styl":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-body/menu/menu.styl ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"menu {\\n  margin-top: 0;\\n  margin-bottom: 0;\\n  margin-left: 0;\\n  margin-right: 20px;\\n  display: flex;\\n  flex-direction: column;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-body/menu/menu.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/game-overview.styl":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/game-overview.styl ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"game-overview {\\n  margin: 20px;\\n  display: flex;\\n  flex-flow: column;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/game-overview.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/stylus-loader/index.js!./game/tags/header.styl":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/stylus-loader!./game/tags/header.styl ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"header {\\n  flex: 0 0 auto;\\n  padding: 20px;\\n  background-color: #04280c;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\nheader .greeting {\\n  margin-right: auto;\\n}\\nheader .logo {\\n  margin-right: auto;\\n  padding: 5px;\\n  border: 2px solid #f8f9e5;\\n}\\nheader form {\\n  margin-bottom: 0;\\n  margin-right: 20px;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./game/tags/header.styl?./node_modules/css-loader!./node_modules/stylus-loader");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/riot/riot.min.js":
/*!***************************************!*\
  !*** ./node_modules/riot/riot.min.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(riot) {/* Riot v3.13.2, @license MIT */\nvar e,t;e=this,t=function(e){\"use strict\";function a(e,t){return(t||document).querySelector(e)}var t,n,y=[],$={},s=\"yield\",_=\"__global_mixin\",N=\"riot-\",u=[\"ref\",\"data-ref\"],p=\"data-is\",f=\"if\",d=\"each\",r=\"no-reorder\",C=\"show\",O=\"hide\",i=\"key\",x=\"__riot-events__\",o=\"string\",H=\"object\",l=\"undefined\",c=\"function\",h=\"http://www.w3.org/1999/xlink\",m=\"http://www.w3.org/2000/svg\",g=/^xlink:(\\w+)/,v=typeof window===l?void 0:window,b=/^on/,w=/([-\\w]+) ?= ?(?:\"([^\"]*)|'([^']*)|({[^}]*}))/g,k={viewbox:\"viewBox\",preserveaspectratio:\"preserveAspectRatio\"},A=/^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,E=0|(v&&v.document||{}).documentMode;function L(e){return\"svg\"===e?document.createElementNS(m,e):document.createElement(e)}function T(e,t,n){var r=g.exec(t);r&&r[1]?e.setAttributeNS(h,r[1],n):e.setAttribute(t,n)}var j,M,S={},I=!1;v&&(j=L(\"style\"),M=a(\"style[type=riot]\"),T(j,\"type\",\"text/css\"),M?(M.id&&(j.id=M.id),M.parentNode.replaceChild(j,M)):document.head.appendChild(j),n=(t=j).styleSheet);var R={styleNode:t,add:function(e,t){S[t]=e,I=!0},inject:function(){if(v&&I){I=!1;var e=Object.keys(S).map(function(e){return S[e]}).join(\"\\n\");n?n.cssText=e:t.innerHTML=e}},remove:function(e){delete S[e],I=!0}},P=function(){var u=[\"case\",\"default\",\"do\",\"else\",\"in\",\"instanceof\",\"prefix\",\"return\",\"typeof\",\"void\",\"yield\"],l=u.reduce(function(e,t){return e+t.slice(-1)},\"\"),c=/^\\/(?=[^*>/])[^[/\\\\]*(?:(?:\\\\.|\\[(?:\\\\.|[^\\]\\\\]*)*\\])[^[\\\\/]*)*?\\/[gimuy]*/,p=/[$\\w]/;function f(e,t){for(;0<=--t&&/\\s/.test(e[t]););return t}return function(e,t){var n=/.*/g,r=n.lastIndex=t++,i=n.exec(e)[0].match(c);if(i){var o=r+i[0].length,a=e[r=f(e,r)];if(r<0||~\"[{(,;:?=|&!^~>%*/\".indexOf(a))return o;if(\".\"===a)\".\"===e[r-1]&&(t=o);else if(\"+\"===a||\"-\"===a)(e[--r]!==a||(r=f(e,r))<0||!p.test(e[r]))&&(t=o);else if(~l.indexOf(a)){for(var s=r+1;0<=--r&&p.test(e[r]););~u.indexOf(e.slice(r+1,s))&&(t=o)}}return t}}(),V=function(e){var t,n,r=\"g\",i=/\"[^\"\\\\]*(?:\\\\[\\S\\s][^\"\\\\]*)*\"|'[^'\\\\]*(?:\\\\[\\S\\s][^'\\\\]*)*'|`[^`\\\\]*(?:\\\\[\\S\\s][^`\\\\]*)*`/g,o=i.source+\"|\"+/(?:\\breturn\\s+|(?:[$\\w\\)\\]]|\\+\\+|--)\\s*(\\/)(?![*\\/]))/.source+\"|\"+/\\/(?=[^*\\/])[^[\\/\\\\]*(?:(?:\\[(?:\\\\.|[^\\]\\\\]*)*\\]|\\\\.)[^[\\/\\\\]*)*?([^<]\\/)[gim]*/.source,a=RegExp(\"[\\\\x00-\\\\x1F<>a-zA-Z0-9'\\\",;\\\\\\\\]\"),s=/(?=[[\\]()*+?.^$|])/g,u=i.source+\"|\"+/(\\/)(?![*\\/])/.source,y={\"(\":RegExp(\"([()])|\"+u,r),\"[\":RegExp(\"([[\\\\]])|\"+u,r),\"{\":RegExp(\"([{}])|\"+u,r)},l=\"{ }\",c=[\"{\",\"}\",\"{\",\"}\",/{[^}]*}/,/\\\\([{}])/g,/\\\\({)|{/g,RegExp(\"\\\\\\\\(})|([[({])|(})|\"+u,r),l,/^\\s*{\\^?\\s*([$\\w]+)(?:\\s*,\\s*(\\S+))?\\s+in\\s+(\\S.*)\\s*}/,/(^|[^\\\\]){=[\\S\\s]*?}/],p=void 0,_=[];function f(e){return e}function d(e,t){return t||(t=_),new RegExp(e.source.replace(/{/g,t[2]).replace(/}/g,t[3]),e.global?r:\"\")}function h(e){if(e===l)return c;var t=e.split(\" \");if(2!==t.length||a.test(e))throw new Error('Unsupported brackets \"'+e+'\"');return(t=t.concat(e.replace(s,\"\\\\\").split(\" \")))[4]=d(1<t[1].length?/{[\\S\\s]*?}/:c[4],t),t[5]=d(3<e.length?/\\\\({|})/g:c[5],t),t[6]=d(c[6],t),t[7]=RegExp(\"\\\\\\\\(\"+t[3]+\")|([[({])|(\"+t[3]+\")|\"+u,r),t[8]=e,t}function m(e){return e instanceof RegExp?t(e):_[e]}function g(e){(e||(e=l))!==_[8]&&(_=h(e),t=e===l?f:d,_[9]=t(c[9])),p=e}return m.split=function(r,i,t){t||(t=_);var e,n,o,a,s,u,l=[],c=t[6],p=[],f=\"\";for(n=o=c.lastIndex=0;e=c.exec(r);){if(u=c.lastIndex,a=e.index,n){if(e[2]){var d=e[2],h=y[d],m=1;for(h.lastIndex=u;e=h.exec(r);)if(e[1]){if(e[1]===d)++m;else if(!--m)break}else h.lastIndex=v(e.index,h.lastIndex,e[2]);c.lastIndex=m?r.length:h.lastIndex;continue}if(!e[3]){c.lastIndex=v(a,u,e[4]);continue}}e[1]||(g(r.slice(o,a)),o=c.lastIndex,(c=t[6+(n^=1)]).lastIndex=o)}return r&&o<r.length&&g(r.slice(o)),l.qblocks=p,l;function g(e){f&&(e=f+e,f=\"\"),i||n?l.push(e&&e.replace(t[5],\"$1\")):l.push(e)}function v(e,t,n){return n&&(t=P(r,e)),i&&e+2<t&&(s=\"⁗\"+p.length+\"~\",p.push(r.slice(e,t)),f+=r.slice(o,e)+s,o=t),t}},m.hasExpr=function(e){return _[4].test(e)},m.loopKeys=function(e){var t=e.match(_[9]);return t?{key:t[1],pos:t[2],val:_[0]+t[3].trim()+_[1]}:{val:e.trim()}},m.array=function(e){return e?h(e):_},Object.defineProperty(m,\"settings\",{set:function(e){var t;t=(e=e||{}).brackets,Object.defineProperty(e,\"brackets\",{set:g,get:function(){return p},enumerable:!0}),n=e,g(t)},get:function(){return n}}),m.settings=\"undefined\"!=typeof riot&&riot.settings||{},m.set=g,m.skipRegex=P,m.R_STRINGS=i,m.R_MLCOMMS=/\\/\\*[^*]*\\*+(?:[^*\\/][^*]*\\*+)*\\//g,m.S_QBLOCKS=o,m.S_QBLOCK2=u,m}(),U=function(){var n={};function r(e,t){return e?(n[e]||(n[e]=function(e){var t=function(e){var t,n=V.split(e.replace(s,'\"'),1),r=n.qblocks;if(2<n.length||n[0]){var i,o,a=[];for(i=o=0;i<n.length;++i)(t=n[i])&&(t=1&i?l(t,1,r):'\"'+t.replace(/\\\\/g,\"\\\\\\\\\").replace(/\\r\\n?|\\n/g,\"\\\\n\").replace(/\"/g,'\\\\\"')+'\"')&&(a[o++]=t);t=o<2?a[0]:\"[\"+a.join(\",\")+'].join(\"\")'}else t=l(n[1],0,r);r.length&&(t=t.replace(u,function(e,t){return r[t].replace(/\\r/g,\"\\\\r\").replace(/\\n/g,\"\\\\n\")}));return t}(e);\"try{return \"!==t.slice(0,11)&&(t=\"return \"+t);return new Function(\"E\",t+\";\")}(e))).call(t,function(e,t){e.riotData={tagName:t&&t.__&&t.__.tagName,_riot_id:t&&t._riot_id},r.errorHandler?r.errorHandler(e):\"undefined\"!=typeof console&&\"function\"==typeof console.error&&(console.error(e.message),console.log(\"<%s> %s\",e.riotData.tagName||\"Unknown tag\",this.tmpl),console.log(this.data))}.bind({data:t,tmpl:e})):e}r.hasExpr=V.hasExpr,r.loopKeys=V.loopKeys,r.clearCache=function(){n={}},r.errorHandler=null;var s=/\\u2057/g,u=/\\u2057(\\d+)~/g;var c=/^(?:(-?[_A-Za-z\\xA0-\\xFF][-\\w\\xA0-\\xFF]*)|\\u2057(\\d+)~):/,p={\"(\":/[()]/g,\"[\":/[[\\]]/g,\"{\":/[{}]/g};function l(o,e,t){if(o=o.replace(/\\s+/g,\" \").trim().replace(/\\ ?([[\\({},?\\.:])\\ ?/g,\"$1\")){for(var n,r=[],i=0;o&&(n=o.match(c))&&!n.index;){var a,s,u=/,|([[{(])|$/g;for(o=RegExp.rightContext,a=n[2]?t[n[2]].slice(1,-1).trim().replace(/\\s+/g,\" \"):n[1];s=(n=u.exec(o))[1];)l(s,u);s=o.slice(0,n.index),o=RegExp.rightContext,r[i++]=d(s,1,a)}o=i?1<i?\"[\"+r.join(\",\")+'].join(\" \").trim()':r[0]:d(o,e)}return o;function l(e,t){var n,r=1,i=p[e];for(i.lastIndex=t.lastIndex;n=i.exec(o);)if(n[0]===e)++r;else if(!--r)break;t.lastIndex=r?o.length:i.lastIndex}}var a='\"in this?this:'+(\"object\"!=typeof window?\"global\":\"window\")+\").\",i=/[,{][\\$\\w]+(?=:)|(^ *|[^$\\w\\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\\w]))([$_A-Za-z][$\\w]*)/g,f=/^(?=(\\.[$\\w]+))\\1(?:[^.[(]|$)/;function d(e,t,n){var o;return e=e.replace(i,function(e,t,n,r,i){return n&&(r=o?0:r+e.length,\"this\"!==n&&\"global\"!==n&&\"window\"!==n?(e=t+'(\"'+n+a+n,r&&(o=\".\"===(i=i[r])||\"(\"===i||\"[\"===i)):r&&(o=!f.test(i.slice(r)))),e}),o&&(e=\"try{return \"+e+\"}catch(e){E(e,this)}\"),n?e=(o?\"function(){\"+e+\"}.call(this)\":\"(\"+e+\")\")+'?\"'+n+'\":\"\"':t&&(e=\"function(v){\"+(o?e.replace(\"return \",\"v=\"):\"v=(\"+e+\")\")+';return v||v===0?v:\"\"}.call(this)'),e}return r.version=V.version=\"v3.0.8\",r}(),B=function(s){s=s||{};var u={},l=Array.prototype.slice;return Object.defineProperties(s,{on:{value:function(e,t){return\"function\"==typeof t&&(u[e]=u[e]||[]).push(t),s},enumerable:!1,writable:!1,configurable:!1},off:{value:function(e,t){if(\"*\"!=e||t)if(t)for(var n,r=u[e],i=0;n=r&&r[i];++i)n==t&&r.splice(i--,1);else delete u[e];else u={};return s},enumerable:!1,writable:!1,configurable:!1},one:{value:function(t,n){return s.on(t,function e(){s.off(t,e),n.apply(s,arguments)})},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(e){var t,n,r,i=arguments,o=arguments.length-1,a=new Array(o);for(r=0;r<o;r++)a[r]=i[r+1];for(t=l.call(u[e]||[],0),r=0;n=t[r];++r)n.apply(s,a);return u[\"*\"]&&\"*\"!=e&&s.trigger.apply(s,[\"*\",e].concat(a)),s},enumerable:!1,writable:!1,configurable:!1}}),s};function z(e,t){return Object.getOwnPropertyDescriptor(e,t)}function D(e){return typeof e===l}function F(e,t){var n=z(e,t);return D(e[t])||n&&n.writable}function K(e){for(var t,n=1,r=arguments,i=r.length;n<i;n++)if(t=r[n])for(var o in t)F(e,o)&&(e[o]=t[o]);return e}function q(e){return Object.create(e)}var W=K(q(V.settings),{skipAnonymousTags:!0,keepValueAttributes:!1,autoUpdate:!0});function Z(e,t){return[].slice.call((t||document).querySelectorAll(e))}function G(){return document.createTextNode(\"\")}function Q(e,t){e.style.display=t?\"\":\"none\",e.hidden=!t}function J(e,t){return e.getAttribute(t)}function X(e,t){e.removeAttribute(t)}function Y(e,t,n){if(n){var r=e.ownerDocument.importNode((new DOMParser).parseFromString('<svg xmlns=\"'+m+'\">'+t+\"</svg>\",\"application/xml\").documentElement,!0);e.appendChild(r)}else e.innerHTML=t}function ee(e,t){if(e)for(var n;n=w.exec(e);)t(n[1].toLowerCase(),n[2]||n[3]||n[4])}function te(){return document.createDocumentFragment()}function ne(e,t,n){e.insertBefore(t,n.parentNode&&n)}function re(n){return Object.keys(n).reduce(function(e,t){return e+\" \"+t+\": \"+n[t]+\";\"},\"\")}function ie(e,t,n){if(e){var r,i=t(e,n);if(!1===i)return;for(e=e.firstChild;e;)r=e.nextSibling,ie(e,t,i),e=r}}var oe=Object.freeze({$$:Z,$:a,createDOMPlaceholder:G,mkEl:L,setAttr:T,toggleVisibility:Q,getAttr:J,remAttr:X,setInnerHTML:Y,walkAttrs:ee,createFrag:te,safeInsert:ne,styleObjectToString:re,walkNodes:ie});function ae(e){return D(e)||null===e}function se(e){return ae(e)||\"\"===e}function ue(e){return typeof e===c}function le(e){return e&&typeof e===H}function ce(e){var t=e.ownerSVGElement;return!!t||null===t}function pe(e){return Array.isArray(e)||e instanceof Array}function fe(e){return A.test(e)}function de(e){return typeof e===o}var he=Object.freeze({isBlank:se,isFunction:ue,isObject:le,isSvg:ce,isWritable:F,isArray:pe,isBoolAttr:fe,isNil:ae,isString:de,isUndefined:D});function me(e,t){return-1!==e.indexOf(t)}function ge(e,t){for(var n=e?e.length:0,r=0;r<n;r++)t(e[r],r);return e}function ve(e,t){return e.slice(0,t.length)===t}var ye,_e=(ye=-1,function(){return++ye});function xe(e,t,n,r){return Object.defineProperty(e,t,K({value:n,enumerable:!1,writable:!1,configurable:!0},r)),e}function be(e){return e.replace(/-(\\w)/g,function(e,t){return t.toUpperCase()})}function we(e){console&&console.warn&&console.warn(e)}var Ae=Object.freeze({contains:me,each:ge,getPropDescriptor:z,startsWith:ve,uid:_e,defineProperty:xe,objectCreate:q,extend:K,toCamel:be,warn:we});function Ne(e,t,n,r,i){var o=e[t],a=pe(o),s=!D(i);if(!o||o!==n)if(!o&&r)e[t]=[n];else if(o)if(a){var u=o.indexOf(n);if(u===i)return;-1!==u&&o.splice(u,1),s?o.splice(i,0,n):o.push(n)}else e[t]=[o,n];else e[t]=n}function Ce(e){return e.tagName&&$[J(e,p)||J(e,p)||e.tagName.toLowerCase()]}function Oe(e,t){var n=Ce(e),r=!t&&J(e,p);return r&&!U.hasExpr(r)?r:n?n.name:e.tagName.toLowerCase()}function ke(){return this.parent?K(q(this),this.parent):this}var Ee=/<yield\\b/i,Le=/<yield\\s*(?:\\/>|>([\\S\\s]*?)<\\/yield\\s*>|>)/gi,Te=/<yield\\s+to=['\"]([^'\">]*)['\"]\\s*>([\\S\\s]*?)<\\/yield\\s*>/gi,je=/<yield\\s+from=['\"]?([-\\w]+)['\"]?\\s*(?:\\/>|>([\\S\\s]*?)<\\/yield\\s*>)/gi,Me={tr:\"tbody\",th:\"tr\",td:\"tr\",col:\"colgroup\"},Se=E&&E<10?/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/:/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,Ie=\"div\",Re=\"svg\";function Pe(e,t,n){var r=e&&e.match(/^\\s*<([-\\w]+)/),i=r&&r[1].toLowerCase(),o=L(n?Re:Ie);return e=function(e,n){if(!Ee.test(e))return e;var r={};return n=n&&n.replace(Te,function(e,t,n){return r[t]=r[t]||n,\"\"}).trim(),e.replace(je,function(e,t,n){return r[t]||n||\"\"}).replace(Le,function(e,t){return n||t||\"\"})}(e,t),Se.test(i)?o=function(e,t,n){var r=\"o\"===n[0],i=r?\"select>\":\"table>\";if(e.innerHTML=\"<\"+i+t.trim()+\"</\"+i,i=e.firstChild,r)i.selectedIndex=-1;else{var o=Me[n];o&&1===i.childElementCount&&(i=a(o,i))}return i}(o,e,i):Y(o,e,n),o}var Ve=/^on/;function $e(e){for(var t=e;t.__.isAnonymous&&t.parent;)t=t.parent;return t}function He(e,t,n,r){var i,o=function(e,t,n){var r=this.__.parent,i=this.__.item;if(!i)for(;r&&!i;)i=r.__.item,r=r.__.parent;if(F(n,\"currentTarget\")&&(n.currentTarget=e),F(n,\"target\")&&(n.target=n.srcElement),F(n,\"which\")&&(n.which=n.charCode||n.keyCode),n.item=i,t.call(this,n),W.autoUpdate&&!n.preventUpdate){var o=$e(this);o.isMounted&&o.update()}}.bind(r,n,t);n[e]=null,i=e.replace(b,\"\"),me(r.__.listeners,n)||r.__.listeners.push(n),n[x]||(n[x]={}),n[x][e]&&n.removeEventListener(i,n[x][e]),n[x][e]=o,n.addEventListener(i,o,!1)}function Ue(e,t,n,r){var i=yt(e,t,n),o=t.tagName||Oe(t.root,!0),a=$e(r);return xe(i,\"parent\",a),i.__.parent=r,Ne(a.tags,o,i),a!==r&&Ne(r.tags,o,i),i}function Be(e,t,n,r){if(pe(e[t])){var i=e[t].indexOf(n);-1!==i&&e[t].splice(i,1),e[t].length?1!==e[t].length||r||(e[t]=e[t][0]):delete e[t]}else e[t]===n&&delete e[t]}function ze(e,t){var n,r,i=G(),o=G(),a=te();for(this.root.insertBefore(i,this.root.firstChild),this.root.appendChild(o),this.__.head=r=i,this.__.tail=o;r;)n=r.nextSibling,a.appendChild(r),this.__.virts.push(r),r=n;t?e.insertBefore(a,t.__.head):e.appendChild(a)}function De(e,t){if(t.parentNode){var n=te();ze.call(e,n),t.parentNode.replaceChild(n,t)}}function Fe(e){if(!this.root||!J(this.root,\"virtualized\")){var t,n,r=e.dom,i=(t=e.attr)?(t=t.replace(N,\"\"),k[t]&&(t=k[t]),t):null,o=me([C,O],i),a=e.root&&\"VIRTUAL\"===e.root.tagName,s=this.__.isAnonymous,u=r&&(e.parent||r.parentNode),l=W.keepValueAttributes,c=\"style\"===i,p=\"class\"===i,f=\"value\"===i;if(e._riot_id)e.__.wasCreated?e.update():(e.mount(),a&&De(e,e.root));else{if(e.update)return e.update();var d,h,m,g,v,y,_,x=o&&!s?ke.call(this):this,b=!se(n=U(e.expr,x)),w=le(n);if(w&&(p?n=U(JSON.stringify(n),this):c&&(n=re(n))),!e.attr||e.wasParsedOnce&&!1!==n&&(b||f&&(!f||l))||X(r,J(r,e.attr)?e.attr:i),e.bool&&(n=!!n&&i),e.isRtag)return h=this,m=n,v=(d=e).tag||d.dom._tag,y=(v?v.__:{}).head,_=\"VIRTUAL\"===d.dom.tagName,void(v&&d.tagName===m?v.update():(v&&(_&&(g=G(),y.parentNode.insertBefore(g,y)),v.unmount(!0)),de(m)&&(d.impl=$[m],d.impl&&(d.tag=v=Ue(d.impl,{root:d.dom,parent:h,tagName:m},d.dom.innerHTML,h),ge(d.attrs,function(e){return T(v.root,e.name,e.value)}),d.tagName=m,v.mount(),_&&De(v,g||v.root),h.__.onUnmount=function(){var e=v.opts.dataIs;Be(v.parent.tags,e,v),Be(v.__.parent.tags,e,v),v.unmount()}))));if((!e.wasParsedOnce||e.value!==n)&&(e.value=n,e.wasParsedOnce=!0,!w||p||c||o)){if(b||(n=\"\"),!i)return n+=\"\",void(u&&(\"TEXTAREA\"===(e.parent=u).tagName?(u.value=n,E||(r.nodeValue=n)):r.nodeValue=n));switch(!0){case ue(n):A=i,Ve.test(A)&&He(i,n,r,this);break;case o:Q(r,i===O?!n:n);break;default:e.bool&&(r[i]=n),f&&r.value!==n?r.value=n:b&&!1!==n&&T(r,i,n),c&&r.hidden&&Q(r,!1)}var A}}}}function Ke(e){ge(e,Fe.bind(this))}function qe(e,t,n,r,i){if(!e||!n){var o=e?ke.call(this):t||this;ge(i,function(e){e.expr&&Fe.call(o,e.expr),r[be(e.name).replace(N,\"\")]=e.expr?e.expr.value:e.value})}}function We(e){if(e)return e.filter(function(e){return!/[^-\\w]/.test(e)}).reduce(function(e,t){var n=t.trim().toLowerCase();return e+\",[\"+p+'=\"'+n+'\"]'},\"\");var t=Object.keys($);return t+We(t)}function Ze(e,t){var n=this,r=n.name,i=n.tmpl,o=n.css,a=n.attrs,s=n.onCreate;return $[r]||(Ge(r,i,o,a,s),$[r].class=this.constructor),_t(e,r,t,this),o&&R.inject(),this}function Ge(e,t,n,r,i){return ue(r)&&(i=r,/^[\\w-]+\\s?=/.test(n)?(r=n,n=\"\"):r=\"\"),n&&(ue(n)?i=n:R.add(n,e)),e=e.toLowerCase(),$[e]={name:e,tmpl:t,attrs:r,fn:i},e}function Qe(e,t,n,r,i){return n&&R.add(n,e),$[e]={name:e,tmpl:t,attrs:r,fn:i},e}function Je(e,i,o){var t,n,a=[];if(R.inject(),(le(i)||ue(i))&&(o=i,i=0),t=de(e)?(e=\"*\"===e?n=We():e+We(e.split(/, */)))?Z(e):[]:e,\"*\"===i){if(i=n||We(),t.tagName)t=Z(i,t);else{var r=[];ge(t,function(e){return r.push(Z(i,e))}),t=r}i=0}return function e(t){if(t.tagName){var n,r=J(t,p);i&&r!==i&&T(t,p,r=i),(n=_t(t,r||t.tagName.toLowerCase(),ue(o)?o():o))&&a.push(n)}else t.length&&ge(t,e)}(t),a}var Xe={},Ye=Xe[_]={},et=0;function tt(e,t,n){if(le(e))tt(\"__\"+et+++\"__\",e,!0);else{var r=n?Ye:Xe;if(!t){if(D(r[e]))throw new Error(\"Unregistered mixin: \"+e);return r[e]}r[e]=ue(t)?K(t.prototype,r[e]||{})&&t:K(r[e]||{},t)}}function nt(){return ge(y,function(e){return e.update()})}function rt(e){return R.remove(e),delete $[e]}var it=Object.freeze({Tag:Ze,tag:Ge,tag2:Qe,mount:Je,mixin:tt,update:nt,unregister:rt,version:\"v3.13.2\"});function ot(e,t){var n,r=this.parent;r&&(pe(n=r.tags[e])?n.splice(t,0,n.splice(n.indexOf(this),1)[0]):Ne(r.tags,e,this))}function at(e,t){for(var n,r=this.__.head,i=te();r;)if(n=r.nextSibling,i.appendChild(r),(r=n)===this.__.tail){i.appendChild(r),e.insertBefore(i,t.__.head);break}}function st(e,t,n){var r={};return r[e.key]=t,e.pos&&(r[e.pos]=n),r}function ut(e,t){e.splice(t,1),this.unmount(),Be(this.parent,this,this.__.tagName,!0)}function lt(A,N,C){var O=typeof J(A,r)!==o||X(A,r),k=J(A,i),E=!!k&&U.hasExpr(k),L=Oe(A),T=$[L],e=A.parentNode,t=G(),j=Ce(A),M=J(A,f),S=[],I=A.innerHTML,R=!$[L],P=\"VIRTUAL\"===A.tagName,V=[];return X(A,d),X(A,i),(C=U.loopKeys(C)).isLoop=!0,M&&X(A,f),e.insertBefore(t,A),e.removeChild(A),C.update=function(){C.value=U(C.val,N);var g=C.value,v=te(),y=!pe(g)&&!de(g),_=t.parentNode,x=[],b=y&&!!g;if(_){y&&(g=g?Object.keys(g).map(function(e){return st(C,g[e],e)}):[]);var w=0;ge(g,function(e,t){var n=t-w,r=!b&&C.key?st(C,e,t):e;if(!M||U(M,K(q(N),r))){var i,o,a,s,u=(o=e,a=r,s=E,(i=k)?s?U(i,a):o[i]:o),l=!y&&O&&typeof e===H||k,c=V.indexOf(u),p=-1===c,f=!p&&l?c:n,d=S[f],h=n>=V.length,m=l&&p||!l&&!d||!S[n];m?((d=yt(T,{parent:N,isLoop:!0,isAnonymous:R,tagName:L,root:A.cloneNode(R),item:r,index:n},I)).mount(),h?function(e,t){t?ze.call(this,e):e.appendChild(this.root)}.apply(d,[v||_,P]):function(e,t,n){n?ze.apply(this,[e,t]):ne(e,this.root,t.root)}.apply(d,[_,S[n],P]),h||V.splice(n,0,r),S.splice(n,0,d),j&&Ne(N.tags,L,d,!0)):f!==n&&l&&((k||me(g,V[f]))&&(function(e,t,n){n?at.apply(this,[e,t]):ne(e,this.root,t.root)}.apply(d,[_,S[n],P]),S.splice(n,0,S.splice(f,1)[0]),V.splice(n,0,V.splice(f,1)[0])),C.pos&&(d[C.pos]=n),!j&&d.tags&&function(t){var n=this;ge(Object.keys(this.tags),function(e){ot.apply(n.tags[e],[e,t])})}.call(d,n)),K(d.__,{item:r,index:n,parent:N}),x[n]=u,m||d.update(r)}else w++}),function(e,t,n){for(var r=t.length,i=e.length-n;i<r;)ut.apply(t[--r],[t,r])}(g,S,w),V=x.slice(),_.insertBefore(v,t)}},C.unmount=function(){ge(S,function(e){e.unmount()})},C}var ct={init:function(e,t,n,r){return this.dom=e,this.attr=n,this.rawValue=r,this.parent=t,this.hasExp=U.hasExpr(r),this},update:function(){var e=this.value,t=this.parent&&$e(this.parent),n=this.dom.__ref||this.tag||this.dom;this.value=this.hasExp?U(this.rawValue,this.parent):this.rawValue,!se(e)&&t&&Be(t.refs,e,n),!se(this.value)&&de(this.value)?(t&&Ne(t.refs,this.value,n,null,this.parent.__.index),this.value!==e&&T(this.dom,this.attr,this.value)):X(this.dom,this.attr),this.dom.__ref||(this.dom.__ref=n)},unmount:function(){var e=this.tag||this.dom,t=this.parent&&$e(this.parent);!se(this.value)&&t&&Be(t.refs,this.value,e)}};function pt(e,t,n,r){return q(ct).init(e,t,n,r)}function ft(e){ge(e,function(e){e.unmount?e.unmount(!0):e.tagName?e.tag.unmount(!0):e.unmount&&e.unmount()})}var dt={init:function(e,t,n){X(e,f),K(this,{tag:t,expr:n,stub:G(),pristine:e});var r=e.parentNode;return r.insertBefore(this.stub,e),r.removeChild(e),this},update:function(){this.value=U(this.expr,this.tag),this.stub.parentNode&&(this.value&&!this.current?(this.current=this.pristine.cloneNode(!0),this.stub.parentNode.insertBefore(this.current,this.stub),this.expressions=mt.apply(this.tag,[this.current,!0])):!this.value&&this.current&&(this.unmount(),this.current=null,this.expressions=[]),this.value&&Ke.call(this.tag,this.expressions))},unmount:function(){this.current&&(this.current._tag?this.current._tag.unmount():this.current.parentNode&&this.current.parentNode.removeChild(this.current)),ft(this.expressions||[])}};function ht(e,t,n){return q(dt).init(e,t,n)}function mt(s,u){var l=this,c=[];return ie(s,function(e){var t,n,r=e.nodeType;if((u||e!==s)&&(3===r&&\"STYLE\"!==e.parentNode.tagName&&U.hasExpr(e.nodeValue)&&c.push({dom:e,expr:e.nodeValue}),1===r)){var i=\"VIRTUAL\"===e.tagName;if(t=J(e,d))return i&&T(e,\"loopVirtual\",!0),c.push(lt(e,l,t)),!1;if(t=J(e,f))return c.push(ht(e,l,t)),!1;if((t=J(e,p))&&U.hasExpr(t))return c.push({isRtag:!0,expr:t,dom:e,attrs:[].slice.call(e.attributes)}),!1;if(n=Ce(e),i&&(J(e,\"virtualized\")&&e.parentElement.removeChild(e),n||J(e,\"virtualized\")||J(e,\"loopVirtual\")||(n={tmpl:e.outerHTML})),n&&(e!==s||u)){var o=J(e,p);if(!i||o)return o&&i&&we(\"Virtual tags shouldn't be used together with the \\\"\"+p+'\" attribute - https://github.com/riot/riot/issues/2511'),c.push(Ue(n,{root:e,parent:l},e.innerHTML,l)),!1;T(e,\"virtualized\",!0);var a=yt({tmpl:e.outerHTML},{root:e,parent:l},e.innerHTML);c.push(a)}gt.apply(l,[e,e.attributes,function(e,t){t&&c.push(t)}])}}),c}function gt(i,e,o){var a=this;ge(e,function(e){if(!e)return!1;var t,n=e.name,r=fe(n);me(u,n)&&i.tagName.toLowerCase()!==s?t=pt(i,a,n,e.value):U.hasExpr(e.value)&&(t={dom:i,expr:e.value,attr:n,bool:r}),o(e,t)})}function vt(e){var t=this.__,n=t.isAnonymous,r=t.skipAnonymous;xe(this,\"isMounted\",e),n&&r||(e?this.trigger(\"mount\"):(this.trigger(\"unmount\"),this.off(\"*\"),this.__.wasCreated=!1))}function yt(e,t,n){void 0===e&&(e={}),void 0===t&&(t={});var r,s=t.context||{},i=t.opts||{},o=t.parent,a=t.isLoop,u=!!t.isAnonymous,l=W.skipAnonymousTags&&u,c=t.item,p=t.index,f=e.tmpl,d=[],h=t.root,m=t.tagName||Oe(h),g=\"virtual\"===m,v=!g&&!f;return r=v||a&&u?h:(g||(h.innerHTML=\"\"),Pe(f,n,ce(h))),l||B(s),e.name&&h._tag&&h._tag.unmount(!0),xe(s,\"__\",{impl:e,root:h,skipAnonymous:l,implAttrs:[],isAnonymous:u,instAttrs:[],innerHTML:n,tagName:m,index:p,isLoop:a,isInline:v,item:c,parent:o,listeners:[],virts:[],wasCreated:!1,tail:null,head:null}),[[\"isMounted\",!1],[\"_riot_id\",_e()],[\"root\",h],[\"opts\",i,{writable:!0,enumerable:!0}],[\"parent\",o||null],[\"tags\",{}],[\"refs\",{}],[\"update\",function(e){return n=e,r=d,i=(t=s).__,o={},a=t.isMounted&&!i.skipAnonymous,i.isAnonymous&&i.parent&&K(t,i.parent),K(t,n),qe.apply(t,[i.isLoop,i.parent,i.isAnonymous,o,i.instAttrs]),a&&t.isMounted&&ue(t.shouldUpdate)&&!t.shouldUpdate(n,o)||(K(t.opts,o),a&&t.trigger(\"update\",n),Ke.call(t,r),a&&t.trigger(\"updated\")),t;var t,n,r,i,o,a}],[\"mixin\",function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return function(a){for(var e=[],t=arguments.length-1;0<t--;)e[t]=arguments[t+1];return ge(e,function(e){var r,t,n=[],i=[\"init\",\"__proto__\"];e=de(e)?tt(e):e,r=ue(e)?new e:e;for(var o=Object.getPrototypeOf(r);n=n.concat(Object.getOwnPropertyNames(t||r)),t=Object.getPrototypeOf(t||r););ge(n,function(e){if(!me(i,e)){var t=z(r,e)||z(o,e),n=t&&(t.get||t.set);!a.hasOwnProperty(e)&&n?Object.defineProperty(a,e,t):a[e]=ue(r[e])?r[e].bind(a):r[e]}}),r.init&&r.init.bind(a)(a.opts)}),a}.apply(void 0,[s].concat(e))}],[\"mount\",function(){return function(n,e,r,t){var i=n.__,o=i.root;o._tag=n,gt.apply(i.parent,[o,o.attributes,function(e,t){!i.isAnonymous&&ct.isPrototypeOf(t)&&(t.tag=n),e.expr=t,i.instAttrs.push(e)}]),ee(i.impl.attrs,function(e,t){i.implAttrs.push({name:e,value:t})}),gt.apply(n,[o,i.implAttrs,function(e,t){t?r.push(t):T(o,e.name,e.value)}]),qe.apply(n,[i.isLoop,i.parent,i.isAnonymous,t,i.instAttrs]);var a=tt(_);if(a&&!i.skipAnonymous)for(var s in a)a.hasOwnProperty(s)&&n.mixin(a[s]);if(i.impl.fn&&i.impl.fn.call(n,t),i.skipAnonymous||n.trigger(\"before-mount\"),ge(mt.apply(n,[e,i.isAnonymous]),function(e){return r.push(e)}),n.update(i.item),!i.isAnonymous&&!i.isInline)for(;e.firstChild;)o.appendChild(e.firstChild);if(xe(n,\"root\",o),!i.skipAnonymous&&n.parent){var u=$e(n.parent);u.one(u.isMounted?\"updated\":\"mount\",function(){vt.call(n,!0)})}else vt.call(n,!0);return n.__.wasCreated=!0,n}(s,r,d,i)}],[\"unmount\",function(e){return function(t,e,n){var r=t.__,i=r.root,o=y.indexOf(t),a=i.parentNode;if(r.skipAnonymous||t.trigger(\"before-unmount\"),ee(r.impl.attrs,function(e){ve(e,N)&&(e=e.slice(N.length)),X(i,e)}),t.__.listeners.forEach(function(t){Object.keys(t[x]).forEach(function(e){t.removeEventListener(e,t[x][e])})}),-1!==o&&y.splice(o,1),r.parent&&!r.isAnonymous){var s=$e(r.parent);r.isVirtual?Object.keys(t.tags).forEach(function(e){return Be(s.tags,e,t.tags[e])}):Be(s.tags,r.tagName,t)}return t.__.virts&&ge(t.__.virts,function(e){e.parentNode&&e.parentNode.removeChild(e)}),ft(n),ge(r.instAttrs,function(e){return e.expr&&e.expr.unmount&&e.expr.unmount()}),e?Y(i,\"\"):a&&a.removeChild(i),r.onUnmount&&r.onUnmount(),t.isMounted||vt.call(t,!0),vt.call(t,!1),delete i._tag,t}(s,e,d)}]].reduce(function(e,t){var n=t[0],r=t[1],i=t[2];return xe(s,n,r,i),e},K(s,c))}function _t(e,t,n,r){var i,o=$[t],a=$[t].class,s=r||(a?q(a.prototype):{}),u=e._innerHTML=e._innerHTML||e.innerHTML,l=K({root:e,opts:n,context:s},{parent:n?n.parent:null});return o&&e&&(i=yt(o,l,u)),i&&i.mount&&(i.mount(!0),me(y,i)||y.push(i)),i}var xt=Object.freeze({arrayishAdd:Ne,getTagName:Oe,inheritParentProps:ke,mountTo:_t,selectTags:We,arrayishRemove:Be,getTag:Ce,initChildTag:Ue,moveChildTag:ot,makeReplaceVirtual:De,getImmediateCustomParentTag:$e,makeVirtual:ze,moveVirtual:at,unmountAll:ft,createIfDirective:ht,createRefDirective:pt}),bt=W,wt={tmpl:U,brackets:V,styleManager:R,vdom:y,styleNode:R.styleNode,dom:oe,check:he,misc:Ae,tags:xt},At=Ze,Nt=Ge,Ct=Qe,Ot=Je,kt=tt,Et=nt,Lt=rt,Tt=B,jt=K({},it,{observable:B,settings:bt,util:wt});e.settings=bt,e.util=wt,e.Tag=At,e.tag=Nt,e.tag2=Ct,e.mount=Ot,e.mixin=kt,e.update=Et,e.unregister=Lt,e.version=\"v3.13.2\",e.observable=Tt,e.default=jt,Object.defineProperty(e,\"__esModule\",{value:!0})}, true?t(exports):undefined;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! riot */ \"./node_modules/riot/riot.min.js\")))\n\n//# sourceURL=webpack:///./node_modules/riot/riot.min.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ })

/******/ });
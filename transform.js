'use strict';
const builtInModules = require('./lib/builtInModules').default;
const dependencyModules = require('./lib/dependencyModules').default;
const devDependencyModules = require('./lib/devDependencyModules').default;
const reactModules = require('./lib/reactModules').default;
const mattermostModules = require('./lib/mattermostModules').default;
const importSortFunc = require('./lib/importSort').default;
const jscodeshift = require('jscodeshift');

function createImportStatement(moduleName, variableName, propName, kind) {
    let declaration;

    const variableIds = variableName.map(function(v) {
        return jscodeshift.importSpecifier(
            jscodeshift.identifier(v.imported),
            jscodeshift.identifier(v.local)
        );
    });

    if (propName) {
        const namespace = propName.namespace;
        const name = propName.name;
        let identifier;
        if (name) {
            identifier = jscodeshift.identifier(name);
            variableIds.unshift(jscodeshift.importDefaultSpecifier(identifier, identifier));
        }
        else if (namespace) {
            identifier = jscodeshift.identifier(namespace);
            variableIds.unshift(jscodeshift.importNamespaceSpecifier(identifier, identifier));
        }
    }

    declaration = jscodeshift.importDeclaration(variableIds, jscodeshift.literal(moduleName));
    declaration.importKind = kind;

    return declaration;
}

module.exports = function(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    const imports = root.find(j.ImportDeclaration);

    // No imports, leave as is
    if (imports.size() === 0) {
        return file.source;
    }

    // Load all imports
    // Object is separated by type
    const newImports = {};

    imports.forEach(i => {
        const node = i.node;
        const source = node.source.value;
        const kind = node.importKind || 'value';

        if (!newImports[kind]) {
            newImports[kind] = {
            };
        }

        if (!newImports[kind][source]) {
            newImports[kind][source] = {
                default: null,
                specifiers: [],
            };
        }

        node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier') {
                newImports[kind][source].default = {
                    name: specifier.local.name
                };
            }
            else if (specifier.type === 'ImportNamespaceSpecifier') {
                newImports[kind][source].default = {
                    namespace: specifier.local.name,
                };
            }
            else {
                // Check the specifier has not all ready been placed in
                let found = false;
                newImports[kind][source].specifiers.forEach(spec => {
                    if (spec.local === specifier.local.name) {
                        found = true;
                    }
                    if (spec.imported === specifier.imported.name) {
                        found = true;
                    }
                });

                if (!found) {
                    newImports[kind][source].specifiers.push({
                        local: specifier.local.name,
                        imported: specifier.imported.name
                    });
                }
            }
        });
    });

    let outputImports = [];
    outputImports = outputImports.concat(createOutputImports(newImports['type'], 'type'));
    outputImports = outputImports.concat(createOutputImports(newImports['value'], 'value'));

    const comments = root.find(j.Program).get('body', 0).node.comments;
    root.find(j.ImportDeclaration).remove();
    outputImports.forEach(x => {
        const body = root.get().value.program.body;
        body.unshift(x);
    });

    root.get().node.comments = comments;
    let source = root.toSource({ quote: 'single', objectCurlySpacing: false });
    source = source.replace(/\/\/\$\$BLANK_LINE\n\n/g, '//$$$BLANK_LINE\n');
    return source.replace(/\/\/\$\$BLANK_LINE/g, '');
};

function createOutputImports(newImports, kind) {
    if (!newImports) {
        return [];
    }

    const jqueryImport = {};
    const nodeImports = {};
    const reactImports = {};
    const dependencyImports = {};
    const devDependencyImports = {};
    const mattermostImports = {};
    const nonNpmDependencyImports = {};
    const localImports1 = {};
    const localImports2 = {};
    const localImports3 = {};
    const localImports4 = {};
    const localImports5 = {};
    const parentImports = {};
    const siblingImports = {};
    const otherImports = {};

    const outputImports = [];

    Object.keys(newImports).forEach((key) => {
        const splitKey = key.split("/");
        const k = splitKey.length > 1 ? splitKey[0] : key;
        if (["jquery"].indexOf(k) > -1) {
            jqueryImport[key] = newImports[key];
        } else if (builtInModules.indexOf(k) > -1) {
            nodeImports[key] = newImports[key];
        } else if (reactModules.indexOf(k) > -1) {
            reactImports[key] = newImports[key];
        } else if (dependencyModules.indexOf(k) > -1) {
            dependencyImports[key] = newImports[key];
        } else if (devDependencyModules.indexOf(k) > -1) {
            devDependencyImports[key] = newImports[key];
        } else if (mattermostModules.indexOf(k) > -1) {
            mattermostImports[key] = newImports[key];
        }  else if (["janus", "jquery-dragster", "katex"].indexOf(k) > -1) {
            nonNpmDependencyImports[key] = newImports[key];
        }  else if (["actions", "dispatcher", "reducers", "selectors", "store", "stores"].indexOf(k) > -1) {
            localImports1[key] = newImports[key];
        }  else if (["client", "config", "plugins", "routes"].indexOf(k) > -1) {
            localImports2[key] = newImports[key];
        }  else if (["utils", "tests",].indexOf(k) > -1) {
            localImports3[key] = newImports[key];
        }  else if (["fonts", "i18n", "images", "sass"].indexOf(k) > -1) {
            localImports4[key] = newImports[key];
        }  else if (["components"].indexOf(k) > -1) {
            localImports5[key] = newImports[key];
        } else if (key.startsWith('../')) {
            parentImports[key] = newImports[key]
        } else if (key.startsWith('./')) {
            siblingImports[key] = newImports[key]
        } else {
            otherImports[key] = newImports[key];
        }
    });

    const jqueryKeys = Object.keys(jqueryImport).sort(importSortFunc).reverse();
    const nodeKeys = Object.keys(nodeImports).sort(importSortFunc).reverse();
    const reactKeys = Object.keys(reactImports).sort(importSortFunc).reverse();
    const dependencyKeys = Object.keys(dependencyImports).sort(importSortFunc).reverse();
    const devDependencyKeys = Object.keys(devDependencyImports).sort(importSortFunc).reverse();
    const mattermostKeys = Object.keys(mattermostImports).sort(importSortFunc).reverse();
    const nonNpmDependencyKeys = Object.keys(nonNpmDependencyImports).sort(importSortFunc).reverse();
    const localKeys1 = Object.keys(localImports1).sort(importSortFunc).reverse();
    const localKeys2 = Object.keys(localImports2).sort(importSortFunc).reverse();
    const localKeys3 = Object.keys(localImports3).sort(importSortFunc).reverse();
    const localKeys4 = Object.keys(localImports4).sort(importSortFunc).reverse();
    const localKeys5 = Object.keys(localImports5).sort(importSortFunc).reverse();
    const parentKeys = Object.keys(parentImports).sort(importSortFunc).reverse();
    const siblingKeys = Object.keys(siblingImports).sort(importSortFunc).reverse();
    const otherKeys = Object.keys(otherImports).sort(importSortFunc).reverse();

    const blankLine = '//$$BLANK_LINE';

    function pushImports(keys) {
        if (keys.length > 0) {
            outputImports.push(blankLine);
        }

        keys.forEach(key => {
            outputImports.push(
                createImportStatement(key,
                    newImports[key].specifiers.sort((a, b) => (a.imported.localeCompare(b.imported))),
                    newImports[key].default,
                    kind)
            );
        });
    }

    pushImports(otherKeys);
    pushImports(siblingKeys);
    pushImports(parentKeys);
    pushImports(localKeys5);
    pushImports(localKeys4);
    pushImports(localKeys3);
    pushImports(localKeys2);
    pushImports(localKeys1);
    pushImports(nonNpmDependencyKeys);
    pushImports(mattermostKeys);
    pushImports(devDependencyKeys);
    pushImports(dependencyKeys);
    pushImports(reactKeys);
    pushImports(nodeKeys);
    pushImports(jqueryKeys)

    if (otherKeys.length > 0) {
        console.log("\nCheck transformed files! This should be empty.\n", otherKeys)
    }

    return outputImports;
}

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.17](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.16...mcp-server-azure-devops-v0.1.17) (2025-04-05)


### Features

* implement get_me tool ([2a3849d](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/2a3849da063f6ce0877dd672992a8bc19f88230e))

## [0.1.16](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.15...mcp-server-azure-devops-v0.1.16) (2025-04-05)


### Features

* limit search results to 10 when includeContent is true ([827e4e6](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/827e4e65be353125f5ae595b7e68d80f614f8c07))
* make projectId optional in search features for organization-wide search ([1ca1e0e](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/1ca1e0e146bf880d367078b02a2ddaebf6f54a2a))


### Bug Fixes

* correct [Object Object] display in search_code includeContent ([bdabd6b](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/bdabd6bbeb3f60347c37499bdcb621f5c206dfe0))
* resolve parameter conflict in getItemContent function ([38d624c](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/38d624c10dcfad26bab6d04a9290ad05097f5052))
* simplify content handling in search_code to properly process ReadableStream ([136a90a](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/136a90a94f446e2c4227d87286b8d71ef8223212))


### Performance Improvements

* optimize git hooks with lint-staged ([ba953d8](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/ba953d84706893d56a82573c8d9e8ecdf3b09591))

## [0.1.15](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.14...mcp-server-azure-devops-v0.1.15) (2025-04-02)


### Bug Fixes

* search_work_items authentication with Azure Identity ([cdb2e72](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/cdb2e722ee3abf6be465adcad7dc294f7c623103))

## [0.1.14](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.13...mcp-server-azure-devops-v0.1.14) (2025-04-02)


### Bug Fixes

* add zod-to-json-schema dependency and remove unused packages from package-lock.json ([c9c117f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/c9c117fd388e228c1116d9249698d931557877b7))

## [0.1.13](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.12...mcp-server-azure-devops-v0.1.13) (2025-04-02)


### Features

* add 'expand' option to get_work_item ([6bee365](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6bee365d9b37f7e197eaff03065e713ab0ee1c5f))
* Add npm publish to release.yml ([50d0368](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/50d0368c090adc39a9b3ece67d198cabcd18c6ce))
* add pre-commit hook for prettier and eslint ([1b4ddff](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/1b4ddff90e3c3ab9954d041398d224f03c632f63))
* enhance GitHub release notes with changelog content ([2fb275d](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/2fb275d38acbc9c092584573a549466ccd5482bc))
* implement automated release workflow ([9e5a5df](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/9e5a5dfacdd87ca933ed02efbd0aa8035239332d))
* implement get_project_details core functionality ([6d93d98](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6d93d9820c4bd3ce8bc257d05ff04b39d1370a19)), closes [#101](https://github.com/Tiberriver256/mcp-server-azure-devops/issues/101)
* implement get_repository_details core functionality ([dcef80b](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/dcef80b922ef338f6d3704ab30f59c1b126c70ee))
* implement manage work item link handler ([72cd641](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/72cd6419cf804eb0d72d5ba7763ad5b46bc35650))
* implement search_wiki handler with tests ([286598c](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/286598c47052ade3b6a524938046b3e3b9341b3a))
* implement search_work_items handler with tests ([e244658](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/e2446587e6f82fb7e2dbfe47d2d034ecfdfc3189))
* **search:** add code search functionality for Azure DevOps repos ([0680102](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/068010236b10d8ed444ec01bd6820b27c5c9dcdc))


### Bug Fixes

* add bin field to make package executable with npx ([2d3d5fa](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/2d3d5fa31a9ba741c4a85d7ef21d72ff46270695))
* add build step to workflow and ensure dist files are included in package ([6e12d3c](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6e12d3ca666937c7b24c7c5d8b161fbb8e34798c))
* add parent-child relationship support for createWorkItem ([31d5efe](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/31d5efef49c162772e64eabd1e4012d8143dc270))
* add tag_name parameter to GitHub release action ([68cfa43](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/68cfa43839c5975cdf9c2ec8a5348ace6138d1c2))
* improve cross-platform CLI compatibility for Windows ([0f6ed3f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/0f6ed3fe7c72ba63ec5485047ce52e06278457ab))
* make AZURE_DEVOPS_AUTH_METHOD parameter case-insensitive ([9bbf53f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/9bbf53ffcc1a9170e6ba038fee182da0621be777))
* only request max 200 by default ([296de35](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/296de3584346bd05c14dec3b39dff9a5ec0036a5))
* resolve npm publish authentication and package content issues ([96e91d0](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/96e91d04ec620ad77fc35fea31c2b7795fb73d9e))
* restore tests/setup.ts to fix test suite ([5e23eab](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/5e23eab1228f3949c431f1b8509ad5fbf829e528))
* revert to direct execution of index.js to fix main module detection ([82efa90](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/82efa90852f56db3a0b028ec50eb5230072da88a))
* Typo in release.yaml workflow ([e0de15f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/e0de15fd220ef2141466cf0530383921ed99253d))

## [0.1.12](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/mcp-server-azure-devops-v0.1.11...mcp-server-azure-devops-v0.1.12) (2025-04-02)


### Features

* add 'expand' option to get_work_item ([6bee365](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6bee365d9b37f7e197eaff03065e713ab0ee1c5f))
* Add npm publish to release.yml ([50d0368](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/50d0368c090adc39a9b3ece67d198cabcd18c6ce))
* add pre-commit hook for prettier and eslint ([1b4ddff](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/1b4ddff90e3c3ab9954d041398d224f03c632f63))
* enhance GitHub release notes with changelog content ([2fb275d](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/2fb275d38acbc9c092584573a549466ccd5482bc))
* implement automated release workflow ([9e5a5df](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/9e5a5dfacdd87ca933ed02efbd0aa8035239332d))
* implement get_project_details core functionality ([6d93d98](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6d93d9820c4bd3ce8bc257d05ff04b39d1370a19)), closes [#101](https://github.com/Tiberriver256/mcp-server-azure-devops/issues/101)
* implement get_repository_details core functionality ([dcef80b](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/dcef80b922ef338f6d3704ab30f59c1b126c70ee))
* implement manage work item link handler ([72cd641](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/72cd6419cf804eb0d72d5ba7763ad5b46bc35650))
* implement search_wiki handler with tests ([286598c](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/286598c47052ade3b6a524938046b3e3b9341b3a))
* implement search_work_items handler with tests ([e244658](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/e2446587e6f82fb7e2dbfe47d2d034ecfdfc3189))
* **search:** add code search functionality for Azure DevOps repos ([0680102](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/068010236b10d8ed444ec01bd6820b27c5c9dcdc))


### Bug Fixes

* add bin field to make package executable with npx ([2d3d5fa](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/2d3d5fa31a9ba741c4a85d7ef21d72ff46270695))
* add build step to workflow and ensure dist files are included in package ([6e12d3c](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6e12d3ca666937c7b24c7c5d8b161fbb8e34798c))
* add parent-child relationship support for createWorkItem ([31d5efe](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/31d5efef49c162772e64eabd1e4012d8143dc270))
* add tag_name parameter to GitHub release action ([68cfa43](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/68cfa43839c5975cdf9c2ec8a5348ace6138d1c2))
* improve cross-platform CLI compatibility for Windows ([0f6ed3f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/0f6ed3fe7c72ba63ec5485047ce52e06278457ab))
* make AZURE_DEVOPS_AUTH_METHOD parameter case-insensitive ([9bbf53f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/9bbf53ffcc1a9170e6ba038fee182da0621be777))
* only request max 200 by default ([296de35](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/296de3584346bd05c14dec3b39dff9a5ec0036a5))
* resolve npm publish authentication and package content issues ([96e91d0](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/96e91d04ec620ad77fc35fea31c2b7795fb73d9e))
* restore tests/setup.ts to fix test suite ([5e23eab](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/5e23eab1228f3949c431f1b8509ad5fbf829e528))
* revert to direct execution of index.js to fix main module detection ([82efa90](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/82efa90852f56db3a0b028ec50eb5230072da88a))
* Typo in release.yaml workflow ([e0de15f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/e0de15fd220ef2141466cf0530383921ed99253d))

### [0.1.11](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/v0.1.10...v0.1.11) (2025-04-01)


### Features

* **search:** add code search functionality for Azure DevOps repos ([0680102](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/068010236b10d8ed444ec01bd6820b27c5c9dcdc))

### [0.1.10](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/v0.1.9...v0.1.10) (2025-04-01)


### Features

* add 'expand' option to get_work_item ([6bee365](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/6bee365d9b37f7e197eaff03065e713ab0ee1c5f))


### Bug Fixes

* only request max 200 by default ([296de35](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/296de3584346bd05c14dec3b39dff9a5ec0036a5))

### [0.1.9](https://github.com/Tiberriver256/mcp-server-azure-devops/compare/v0.1.8...v0.1.9) (2025-03-31)


### Features

* add pre-commit hook for prettier and eslint ([1b4ddff](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/1b4ddff90e3c3ab9954d041398d224f03c632f63))
* implement manage work item link handler ([72cd641](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/72cd6419cf804eb0d72d5ba7763ad5b46bc35650))


### Bug Fixes

* add parent-child relationship support for createWorkItem ([31d5efe](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/31d5efef49c162772e64eabd1e4012d8143dc270))
* make AZURE_DEVOPS_AUTH_METHOD parameter case-insensitive ([9bbf53f](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/9bbf53ffcc1a9170e6ba038fee182da0621be777))
* restore tests/setup.ts to fix test suite ([5e23eab](https://github.com/Tiberriver256/mcp-server-azure-devops/commit/5e23eab1228f3949c431f1b8509ad5fbf829e528))

### [0.1.8](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.7...v0.1.8) (2025-03-26)


### Bug Fixes

* revert to direct execution of index.js to fix main module detection ([82efa90](https://github.com/Tiberriver256/azure-devops-mcp/commit/82efa90852f56db3a0b028ec50eb5230072da88a))

### [0.1.7](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.6...v0.1.7) (2025-03-26)


### Bug Fixes

* add build step to workflow and ensure dist files are included in package ([6e12d3c](https://github.com/Tiberriver256/azure-devops-mcp/commit/6e12d3ca666937c7b24c7c5d8b161fbb8e34798c))

### [0.1.6](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.5...v0.1.6) (2025-03-26)


### Bug Fixes

* improve cross-platform CLI compatibility for Windows ([0f6ed3f](https://github.com/Tiberriver256/azure-devops-mcp/commit/0f6ed3fe7c72ba63ec5485047ce52e06278457ab))

### [0.1.5](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.4...v0.1.5) (2025-03-26)


### Bug Fixes

* add bin field to make package executable with npx ([2d3d5fa](https://github.com/Tiberriver256/azure-devops-mcp/commit/2d3d5fa31a9ba741c4a85d7ef21d72ff46270695))

### [0.1.4](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.3...v0.1.4) (2025-03-26)


### Bug Fixes

* resolve npm publish authentication and package content issues ([96e91d0](https://github.com/Tiberriver256/azure-devops-mcp/commit/96e91d04ec620ad77fc35fea31c2b7795fb73d9e))

### [0.1.3](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.2...v0.1.3) (2025-03-26)


### Features

* Add npm publish to release.yml ([50d0368](https://github.com/Tiberriver256/azure-devops-mcp/commit/50d0368c090adc39a9b3ece67d198cabcd18c6ce))


### Bug Fixes

* Typo in release.yaml workflow ([e0de15f](https://github.com/Tiberriver256/azure-devops-mcp/commit/e0de15fd220ef2141466cf0530383921ed99253d))

### [0.1.2](https://github.com/Tiberriver256/azure-devops-mcp/compare/v0.1.1...v0.1.2) (2025-03-26)


### Bug Fixes

* add tag_name parameter to GitHub release action ([68cfa43](https://github.com/Tiberriver256/azure-devops-mcp/commit/68cfa43839c5975cdf9c2ec8a5348ace6138d1c2))

### 0.1.1 (2025-03-26)


### Features

* enhance GitHub release notes with changelog content ([2fb275d](https://github.com/Tiberriver256/azure-devops-mcp/commit/2fb275d38acbc9c092584573a549466ccd5482bc))
* implement automated release workflow ([9e5a5df](https://github.com/Tiberriver256/azure-devops-mcp/commit/9e5a5dfacdd87ca933ed02efbd0aa8035239332d))

## 0.1.0 (2025-03-26)


### Features

* enhance GitHub release notes with changelog content ([dcaf554](https://github.com/Tiberriver256/azure-devops-mcp/commit/dcaf5542fc08cbb9bd665623d305ae7879758f4e))
* implement automated release workflow ([6fbf41e](https://github.com/Tiberriver256/azure-devops-mcp/commit/6fbf41e5a52c4db054355d4aced33744f6b1a6eb))



## [0.7.0](https://github.com/nuxt-modules/ionic/compare/0.6.1...0.7.0) (2022-09-07)


### Features

* middleware support ([#59](https://github.com/nuxt-modules/ionic/issues/59)) ([1f9ea29](https://github.com/nuxt-modules/ionic/commit/1f9ea2941456db4b9dde0b587ea40d76e7a1d4e1))

## [0.6.1](https://github.com/nuxt-modules/ionic/compare/0.6.0...0.6.1) (2022-08-31)


### Bug Fixes

* add missing import to `<IonAnimation>` ([ea23ac6](https://github.com/nuxt-modules/ionic/commit/ea23ac647b84bcfc0c59234b68504631e0fb1bc5))

## [0.6.0](https://github.com/nuxt-modules/ionic/compare/0.5.1...0.6.0) (2022-08-30)


### Features

* add IonAnimation component ([#40](https://github.com/nuxt-modules/ionic/issues/40)) ([24b1869](https://github.com/nuxt-modules/ionic/commit/24b186922e96731fd1ecef33fec956f548cf1a14))

## [0.5.1](https://github.com/nuxt-modules/ionic/compare/0.5.0...0.5.1) (2022-08-17)


### Bug Fixes

* optimize `@ionic/vue` ([664d5ad](https://github.com/nuxt-modules/ionic/commit/664d5ad7d2ebb211c68cd88aff18375aa2445237))

## [0.5.0](https://github.com/nuxt-modules/ionic/compare/0.4.0...0.5.0) (2022-08-17)


### Features

* **router:** add support for custom router options ([acfe7f1](https://github.com/nuxt-modules/ionic/commit/acfe7f127caba7560f4e5c69d00ef1b4fd5b0c9a))


### Bug Fixes

* remove prerendering workaround ([3b18f8f](https://github.com/nuxt-modules/ionic/commit/3b18f8f609cf159ee77f927fc26efc1e6bbd87ef))
* transpile `ionicons` ([a9ef0d7](https://github.com/nuxt-modules/ionic/commit/a9ef0d73c116dd1b33a7f80716e8c5edce36c87e))
* update transpile ([619518f](https://github.com/nuxt-modules/ionic/commit/619518f68129eda830483d18e22dd10d27935a16))
* use `useRoute` and `useRouter` from `vue-router ` ([1aec323](https://github.com/nuxt-modules/ionic/commit/1aec323da99c89bea447125592a3eb2ec5723d2e))

## [0.4.0](https://github.com/nuxt-modules/ionic/compare/0.3.1...0.4.0) (2022-08-17)


### Features

* add option and interface for `@ionic/vue` global config ([#38](https://github.com/nuxt-modules/ionic/issues/38)) ([7df1aae](https://github.com/nuxt-modules/ionic/commit/7df1aaef29229c358772f79a1c4366c7f687b4e9))

## [0.3.1](https://github.com/nuxt-modules/ionic/compare/0.3.0...0.3.1) (2022-08-15)


### Bug Fixes

* transpile `[@stencil](https://github.com/stencil)` deps ([f02ef6a](https://github.com/nuxt-modules/ionic/commit/f02ef6af00e77ef7e38308375bb16be4da35035b)), closes [#33](https://github.com/nuxt-modules/ionic/issues/33)

## [0.3.0](https://github.com/nuxt-modules/ionic/compare/0.2.2...0.3.0) (2022-07-28)


### Features

* :sparkles: add interface for accessing ionic icons ([#27](https://github.com/nuxt-modules/ionic/issues/27)) ([9cd2417](https://github.com/nuxt-modules/ionic/commit/9cd2417596ea6f2a3409aefae2feb86c31188f28))
* upgrade to new version of `nuxt-pwa-module` ([#25](https://github.com/nuxt-modules/ionic/issues/25)) ([04fae3e](https://github.com/nuxt-modules/ionic/commit/04fae3e25fe8d7d6ba51bfe0f13ed44d74aa8bd0))


### Bug Fixes

* add `ionicons` dependency ([8a1a6bd](https://github.com/nuxt-modules/ionic/commit/8a1a6bd726c59cd5922cf8cf921b14edc74f45d2))

## [0.2.2](https://github.com/nuxt-modules/ionic/compare/0.2.1...0.2.2) (2022-06-23)


### Bug Fixes

* correct viewport meta tag ([cfd2d90](https://github.com/nuxt-modules/ionic/commit/cfd2d906686f4eddcc3481e83d4e8e35fd80c6d4)), closes [#15](https://github.com/nuxt-modules/ionic/issues/15)
* remove extraneous div wrapper ([9cdf360](https://github.com/nuxt-modules/ionic/commit/9cdf3608226b9969add5fd3866530f5af82a844b))
* remove hard-coded `md` class ([a7f8ab4](https://github.com/nuxt-modules/ionic/commit/a7f8ab48aaf4e5de11f73fe0f920ceb6aa2aa0ec)), closes [#12](https://github.com/nuxt-modules/ionic/issues/12)
* type error ([020fff2](https://github.com/nuxt-modules/ionic/commit/020fff23d6b36f37d9c14cbd5e850e925b3472f2))
* use `app:resolve` for latest possible exclusion of vue router ([064cf49](https://github.com/nuxt-modules/ionic/commit/064cf49df2c22c53d33a0d736e447acbbed43af7))

## [0.2.1](https://github.com/nuxt-modules/ionic/compare/0.2.0...0.2.1) (2022-06-22)


### Bug Fixes

* use pwa module for ios splash screen ([686ba68](https://github.com/nuxt-modules/ionic/commit/686ba687650b35a47b1997537d2508a113578f29))

## [0.2.0](https://github.com/nuxt-modules/ionic/compare/0.1.3...0.2.0) (2022-06-21)


### Features

* create `ionic.config.json` if it doesn't already exist ([3d8e84a](https://github.com/nuxt-modules/ionic/commit/3d8e84a0b0ff9e46cd9e970b012dfc14228b47d1))
* install capacitor packages by default ([3f3e247](https://github.com/nuxt-modules/ionic/commit/3f3e2473aabe4af96f325e4e3ae39b50535fa81e))


### Bug Fixes

* disable router integration if `pages/` is missing ([d3e3eb6](https://github.com/nuxt-modules/ionic/commit/d3e3eb6674fbadf9e1b34deb4279b1aabf936f79)), closes [#10](https://github.com/nuxt-modules/ionic/issues/10)

## [0.1.3](https://github.com/nuxt-modules/ionic/compare/0.1.2...0.1.3) (2022-06-19)


### Bug Fixes

* always generate `/` route ([cfe155f](https://github.com/nuxt-modules/ionic/commit/cfe155f7dc63e06aa792fbe17088981ce21969a4))

## [0.1.2](https://github.com/nuxt-modules/ionic/compare/0.1.1...0.1.2) (2022-06-18)


### Bug Fixes

* generate full paths for nested routes ([d8b3f68](https://github.com/nuxt-modules/ionic/commit/d8b3f6806a37acf11ac7ba6cced7782ebd68a22e))

## [0.1.1](https://github.com/nuxt-modules/ionic/compare/0.1.0...0.1.1) (2022-06-18)


### Bug Fixes

* disable icon integration on stackblitz ([5bf0fe2](https://github.com/nuxt-modules/ionic/commit/5bf0fe2546055531a6988413140980901884eb3e))

## [0.1.0](https://github.com/nuxt-modules/ionic/compare/0.0.3...0.1.0) (2022-06-18)


### Features

* add more ionic hooks ([1147ffe](https://github.com/nuxt-modules/ionic/commit/1147ffe4f62035a6bf0ffaf313151c4c49221bbe))
* add pwa and meta tag configuration ([c5fad7e](https://github.com/nuxt-modules/ionic/commit/c5fad7ea06092d82e27f38f33bce3c54c52fc15b))
* pre-render all non-dynamic pages ([21e765f](https://github.com/nuxt-modules/ionic/commit/21e765f17fcba8fd0129efe1f80cadf51bfbd214))

## [0.0.3](https://github.com/nuxt-modules/ionic/compare/0.0.2...0.0.3) (2022-06-17)


### Bug Fixes

* add ionic router to `optimizeDeps` ([27ed559](https://github.com/nuxt-modules/ionic/commit/27ed55944fea65bfdfd8e0edcb3f87351f9c39b5))
* use app baseURL for configuring ion router ([5ae2e0d](https://github.com/nuxt-modules/ionic/commit/5ae2e0d186a58a377248ef0f7accb8eecd4ca9bd))

## [0.0.2](https://github.com/nuxt-modules/ionic/compare/0.0.1...0.0.2) (2022-06-17)


### Bug Fixes

* explicitly import nuxt composables ([351c7f9](https://github.com/nuxt-modules/ionic/commit/351c7f9ca34e12a11d9f98530bec53ce317fd267))

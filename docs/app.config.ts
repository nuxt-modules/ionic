export default defineAppConfig({
  docus: {
    title: 'nuxt/ionic',
    url: 'https://ionic.nuxtjs.org/',
    description: 'Batteries-included Ionic integration for Nuxt.',
    socials: {
      twitter: 'danielcroe',
      github: 'nuxt-modules/ionic',
    },
    cover: {
      src: '/cover.jpg',
      alt: 'Nuxt Ionic module.',
    },
    github: {
      owner: 'nuxt-modules',
      repo: 'ionic',
      branch: 'main',
      root: 'docs/content',
      edit: true,
    },
    header: {
      logo: true,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com',
      },
      iconLinks: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          icon: 'IconNuxt',
        },
      ],
    },
  },
})

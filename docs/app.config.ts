export default defineAppConfig({
  docus: {
    title: 'nuxt/ionic',
    layout: 'docs',
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
      root: 'docs/content',
      edit: true,
    },
    header: {
      title: false,
      logo: true,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com',
      },
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          component: 'IconNuxt',
        },
      ],
    },
  },
})

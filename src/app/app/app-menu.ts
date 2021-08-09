import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/app/dashboard',
  //   home: true,
  // },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Events',
    icon: 'bell-outline',
    link: '/app/events'
  },
  {
    title: 'Customer requests',
    icon: 'paper-plane-outline',
    link: '/app/requests'
  },
  {
    title: 'Blog',
    icon: 'edit-2-outline',
    link: '/app/blog',
    children: [
      {
        title: 'Posts',
        icon: 'edit-outline',
        link: '/app/blog/posts',
        // children: [
        //   {
        //     title: 'Add new post',
        //     icon: 'plus-outline',
        //     link: '/app/blog/posts/add'
        //   }
        // ]
      },
      {
        title: 'Comments',
        icon: 'message-square-outline',
        link: '/app/blog/comments'
      }
    ]
  },
  {
    title: 'Pages',
    icon: 'browser-outline',
    link: '/app/pages'
  },
  {
    title: 'Media',
    icon: 'image-outline',
    link: '/app/media'
  },
  {
    title: 'Listings',
    icon: 'pin-outline',
    link: '/app/listings'
  },
  {
    title: 'Appearance',
    icon: 'brush-outline',
    link: '/app/appearance',
    children: [
      {
        title: 'Theme settings',
        icon: 'color-palette-outline',
        link: '/app/appearance/theme-settings',
      },
      {
        title: 'Home page settings',
        icon: 'home-outline',
        link: '/app/appearance/home-page-settings',
      },
    ]
  },
  {
    title: 'Settings',
    icon: 'settings-2-outline',
    link: '/app/settings',
    children: [
      {
        title: 'Profile',
        icon: 'person-outline',
        link: '/app/settings/profile',
      },
      {
        title: 'Website',
        icon: 'globe-outline',
        link: '/app/settings/website',
      },
      {
        title: 'SMTP',
        icon: 'email-outline',
        link: '/app/settings/smtp'
      },
      {
        title: 'Geo',
        icon: 'globe-2-outline',
        link: '/app/settings/geocoding'
      },
      {
        title: 'Analytics',
        icon: 'bar-chart-outline',
        link: '/app/settings/analytics'
      },
      {
        title: 'Social',
        icon: 'facebook-outline',
        link: '/app/settings/social'
      },
      {
        title: 'Listings',
        icon: 'pin-outline',
        link: '/app/settings/listings'
      },
      {
        title: 'Listing sources',
        icon: 'arrow-circle-right-outline',
        link: '/app/settings/listing-sources'
      },
      {
        title: 'Change password',
        icon: 'lock-outline',
        link: '/app/settings/change-password'
      }
    ]
  },
];

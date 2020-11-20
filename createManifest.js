/* eslint-disable */
const fs = require('fs');
const isProduction = process.argv.includes('--env=production');
const basePath = isProduction ? '.' : 'build';

const manifest = {
  manifest_version: 1,
  type: 'WebApp',
  meta: {
    name: 'overwolf-react',
    version: '2.0.0',
    'minimum-overwolf-version': '0.98.00',
    author: 'Hacksore',
    icon: `${basePath}/img/IconMouseOver.png`,
    icon_gray: `${basePath}/img/IconMouseNormal.png`,
    description: 'A CRA boilerplate for using react for overlays',
  },
  permissions: ['Hotkeys'],
  data: {
    hotkeys: {
      open_ui: {
        title: 'Open the custom UI',
        'action-type': 'custom',
        passthrough: true,
        default: 'Ctrl+1',
      },
    },
    start_window: 'in_game_overlay',
    windows: {
      in_game_overlay: {
        in_game_only: true,
        debug_url: 'http://localhost:3000',
        file: `${basePath}/index.html`,
        transparent: true,
        clickthrough: false,
        size: {
          width: 300,
          height: 600,
        },
        start_position: {
          top: 10,
          left: 10,
        },
      },
    },
    game_events: [5426],
    game_targeting: { type: 'dedicated', game_ids: [5426] },
    launch_events: [
      {
        event: 'GameLaunch',
        event_data: { game_ids: [5426, 10902, 21584] },
        start_minimized: false,
      },
    ],
  },
};

const manifestPath = isProduction ? 'build' : '.';
fs.writeFileSync(`${manifestPath}/manifest.json`, JSON.stringify(manifest, null, 2));

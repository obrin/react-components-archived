import path from 'path';
import copy from './lib/copy';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
export default async () => {
  console.log('copy');
  await Promise.all([
    // Static files
    copy('src/public', 'build/public'),

    // Files with content (e.g. *.md files)
    copy('src/content', 'build/content'),

    // Website and email templates
    copy('src/templates', 'build/templates')
  ]);

  if (global.WATCH) {
    const watcher = await watch('src/content/**/*.*');
    watcher.on('changed', async (file) => {
      file = file.substr(path.join(__dirname, '../src/content/').length);
      await copy(`src/content/${file}`, `build/content/${file}`);
    });
  }
};

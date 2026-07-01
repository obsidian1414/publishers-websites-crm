import { exec } from 'child_process';
import { Logger } from '@nestjs/common';
import { promisify } from 'util';

const execAsync = promisify(exec);
const logger = new Logger('[Migration]');

export async function runMigrations() {
    try {
        logger.log('🔄 Building and running migrations...');

        const { stdout, stderr } = await execAsync('npm run migration:run', {
            cwd: process.cwd(),
            timeout: 300000,
        });

        if (stdout) logger.log(stdout);
        if (stderr) logger.warn(stderr);

        logger.log('✅ Build and migrations completed successfully');
    } catch (error: any) {
        logger.error('❌ Build and migration failed:', error.message);
        if (error.stdout) logger.log('stdout:', error.stdout);
        if (error.stderr) logger.error('stderr:', error.stderr);
        process.exit(1);
    }
}

import { type ExecSyncOptions, execSync } from 'node:child_process';
import { join } from 'node:path';

describe('Test Run', () => {
    beforeEach(() => {
        process.env.GITHUB_OUTPUT = '';
    });

    it('should run successfully', () => {
        const options: ExecSyncOptions = {
            env: {
                ...process.env,
                INPUT_INPUT: 'some-input',
            },
            cwd: __dirname,
            encoding: 'utf-8',
        };

        const action = join(__dirname, '..', 'src', 'main.ts');

        // eslint-disable-next-line sonarjs/os-command -- OK for tests
        const response = execSync(`npx ts-node "${action}"`, options).toString();
        expect(response).toContain('::set-output name=echoedInput::some-input');
    });
});

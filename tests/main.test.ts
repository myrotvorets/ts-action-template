import { ExecSyncOptions, execSync } from 'child_process';
import { join } from 'path';

describe('Test Run', () => {
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

        try {
            const response = execSync(`npx ts-node "${action}"`, options);

            expect(response).toContain('::set-output name=echoedInput::some-input');
        } catch (e) {
            fail(e);
        }
    });
});

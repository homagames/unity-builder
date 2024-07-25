import { getExecOutput } from '@actions/exec';
import fs from 'node:fs/promises';

class MacBuilder {
  public static async run(actionFolder: string, silent: boolean = false): Promise<number> {
    const result = await getExecOutput('bash', [`${actionFolder}/platforms/mac/entrypoint.sh`], {
      silent,
    });

    if (result.stdout) {
      try {
        await fs.writeFile('mac-build-logs.log', result.stdout);
      } catch (err) {
        console.log(err);
      }
    }
    return result.exitCode;
  }
}

export default MacBuilder;

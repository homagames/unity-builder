import { exec } from '@actions/exec';
import fs from 'node:fs/promises';

class MacBuilder {
  public static async run(actionFolder: string, silent: boolean = false): Promise<number> {
    const options = {
      listeners: {
        stdout: (data: Buffer) => {
          fs.writeFile('unity-execution-logs.log', data.toString(), { flag: 'a' });
        },
      },
      silent,
    };
    return await exec('bash', [`${actionFolder}/platforms/mac/entrypoint.sh`], options);
  }
}

export default MacBuilder;

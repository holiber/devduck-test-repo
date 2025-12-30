/**
 * Smogcheck module hooks
 * 
 * Defines installation hooks for the smogcheck test module.
 */

import fs from 'fs';
import path from 'path';
import type { HookContext, HookResult } from '../../../../projects/devduck/scripts/install/module-hooks.js';

export default {
  /**
   * Install hook: Create smogchecked.txt file in workspace root
   */
  async 'install'(context: HookContext): Promise<HookResult> {
    const smogcheckedPath = path.join(context.workspaceRoot, 'smogchecked.txt');
    const content = `Smogcheck module installed successfully at ${new Date().toISOString()}\nModule: smogcheck\nWorkspace: ${context.workspaceRoot}\n`;
    
    try {
      fs.writeFileSync(smogcheckedPath, content, 'utf8');
      return {
        success: true,
        createdFiles: ['smogchecked.txt'],
        message: 'Created smogchecked.txt file in workspace root'
      };
    } catch (error: unknown) {
      const err = error as { message?: string };
      return {
        success: false,
        errors: [`Failed to create smogchecked.txt: ${err.message || String(error)}`]
      };
    }
  }
};


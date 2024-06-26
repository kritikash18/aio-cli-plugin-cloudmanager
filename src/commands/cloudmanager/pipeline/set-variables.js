/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const BasePipelineVariablesCommand = require('../../../base-pipeline-variables-command')
const BaseVariablesCommand = require('../../../base-variables-command')
const { initSdk } = require('../../../cloudmanager-helpers')
const commonFlags = require('../../../common-flags')
const { pipelineServices } = require('../../../constants')

class SetPipelineVariablesCommand extends BasePipelineVariablesCommand {
  getFlagDefs () {
    return super.getFlagDefs(pipelineServices)
  }

  async run () {
    const { args, flags } = this.parse(SetPipelineVariablesCommand)

    return this.runSet(args, flags)
  }

  async setVariables (programId, args, variables, imsContextName = null) {
    const sdk = await initSdk(imsContextName)
    return sdk.setPipelineVariables(programId, args.pipelineId, variables)
  }
}

SetPipelineVariablesCommand.description = 'sets variables set on a pipeline. These are build-time variables available during the build process. Use set-environment-variables to set runtime variables on a environment.'

SetPipelineVariablesCommand.args = [
  { name: 'pipelineId', required: true, description: 'the pipeline id' },
]

SetPipelineVariablesCommand.flags = {
  ...commonFlags.global,
  ...commonFlags.programId,
  ...BaseVariablesCommand.setterFlags(pipelineServices),
}

SetPipelineVariablesCommand.aliases = [
  'cloudmanager:set-pipeline-variables',
]

SetPipelineVariablesCommand.permissionInfo = {
  operation: 'patchPipelineVariables',
}

module.exports = SetPipelineVariablesCommand

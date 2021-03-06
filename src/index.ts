// Copyright 2019 Kaggle Inc
//
// Licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";

import { IStateDB } from "@jupyterlab/coreutils";
import { IDocumentManager } from "@jupyterlab/docmanager";
import { KaggleWidget } from "./widget";
import { KaggleService } from "./service";

/**
 * The plugin registration information.
 */
const kaggleDatasetPlugin: JupyterFrontEndPlugin<void> = {
  id: KaggleService.PLUGIN_ID,
  activate,
  autoStart: true,
  requires: [IDocumentManager, ILayoutRestorer, IStateDB],
};

/**
 * Activate the extension.
 */
function activate(
  app: JupyterFrontEnd,
  manager: IDocumentManager,
  restorer: ILayoutRestorer,
  stateDB: IStateDB
): void {
  const kaggleService: KaggleService = new KaggleService(app, manager, stateDB);
  const kaggleWidget: KaggleWidget = new KaggleWidget(kaggleService);

  restorer.add(kaggleWidget, KaggleService.NAMESPACE);
  app.shell.add(kaggleWidget, "left", { rank: 1001 });
}

/**
 * Export the plugin as default.
 */
export default kaggleDatasetPlugin;

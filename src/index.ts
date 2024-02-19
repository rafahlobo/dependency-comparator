import { dependencyReader, sort } from "./utils";
import analyzeDependencies from "./functions/analyzer";
import SpreadsheetOutputBuilder from "./output-builder/spreadsheet-output-builder";
import { Command } from "commander";

async function analyzeAndExportToSpreadsheet(
  packageFile1: string,
  packageFile2: string,
  appName1: string,
  appName2: string
) {
  const [app1, app2] = sort(
    dependencyReader(packageFile1, appName1),
    dependencyReader(packageFile2, appName2)
  );

  const result = analyzeDependencies(app1, app2);
  const spreadsheetBuilder = new SpreadsheetOutputBuilder();
  await spreadsheetBuilder.generate(app1, app2, result);
}

const program = new Command();
program
  .name("dependency comparator")
  .description("compare dependencies between package.json files");

program
  .command("analyze")
  .description("Analisa e exporta resultado.")
  .argument("pathToFile1", "Caminho para package.json 1")
  .argument("pathToFile2", "Caminho para package.json 2")
  .option(
    "--appName1 <string>",
    "Nome do aplicativo 1 (Será usado para referenciar no relatório.)",
    "App 1"
  )
  .option(
    "--appName2 <string>",
    "Nome do aplicativo 1 (Será usado para referenciar no relatório.)",
    "App 2"
  )
  .action(async (pathToFile1, pathToFile2, options) => {
    await analyzeAndExportToSpreadsheet(
      pathToFile1,
      pathToFile2,
      options.appName1,
      options.appName2
    );
  });

program.parse();

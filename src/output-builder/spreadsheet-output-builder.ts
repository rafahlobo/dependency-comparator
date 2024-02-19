import { AnalysisResult, Dependencies, OutputBuilder } from "../types";
import * as ExcelJS from "exceljs";
import path from "node:path";

export default class SpreadsheetOutputBuilder implements OutputBuilder {
  constructor(
    protected outputDir: string = "./",
    protected customFilename: string = "spreadsheet-dependency-analysis-output"
  ) {}
  async generate(
    deps1: Dependencies,
    deps2: Dependencies,
    analysisResult: AnalysisResult[]
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Comparação de dependências");
    sheet.columns = [
      { header: "Dependência", key: "dependency", width: 10 },
      { header: deps1.getAppName(), key: deps1.getAppName(), width: 10 },
      { header: deps2.getAppName(), key: deps2.getAppName(), width: 10 },
      {
        header: "Detentor da versão mais recente",
        key: "mostRecentVersion",
        width: 10,
      },
    ];

    analysisResult.forEach((r, index) => {
      const row = sheet.getRow(index + 2);
      row.values = r;
      row.commit();
    });

    await workbook.xlsx.writeFile(
      path.join(this.outputDir, `${this.customFilename}.xlsx`)
    );
  }
}

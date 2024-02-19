import { AnalysisResult, Dependencies } from "../types";
import { compareVersion } from "../utils";

export default function analyzeDependencies(
  app1: Dependencies,
  app2: Dependencies
): AnalysisResult[] {
  const generator = app1.getNextDependency();
  const data: AnalysisResult[] = [];
  do {
    const { value: dependencyName, done } = generator.next();
    if (done) break;

    const existInApp2 = app2.exist(dependencyName);
    let mostRecentVersion = app1.getAppName();
    if (existInApp2) {
      app2.markDep(dependencyName, true);
      const mostRecent = compareVersion(
        app1.getVersion(dependencyName),
        app2.getVersion(dependencyName)
      );
      if (mostRecent === 2) {
        mostRecentVersion = app2.getAppName();
      } else if (mostRecent === -1) {
        mostRecentVersion = "iguais";
      }
    }
    data.push({
      dependency: dependencyName,
      [app1.getAppName()]: app1.getVersion(dependencyName),
      [app2.getAppName()]: existInApp2
        ? app2.getVersion(dependencyName)
        : "Não possui.",
      mostRecentVersion,
    });
  } while (true);

  const uncheckedDeps = app2.getUnCheckedDeps();
  Object.keys(uncheckedDeps).forEach((dependencyName) => {
    data.push({
      dependency: dependencyName,
      [app1.getAppName()]: "Não possui.",
      [app2.getAppName()]: uncheckedDeps[dependencyName],
      mostRecentVersion: app2.getAppName(),
    });
  });

  return data;
}

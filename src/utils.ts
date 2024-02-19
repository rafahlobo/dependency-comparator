import { readFileSync } from "fs";

import JsonDependencies from "./dependency";
import { DependencyName, type Dependencies, DependencyVersion } from "./types";

export function dependencyReader(
  filename: string,
  appName: string
): Dependencies {
  const rawData = readFileSync(filename, { encoding: "utf-8" });
  const pkg = JSON.parse(rawData);
  let dependencies: Record<DependencyName, DependencyVersion> = {};

  if ("dependencies" in pkg) {
    dependencies = { ...pkg.dependencies };
  }
  if ("devDependencies" in pkg) {
    dependencies = { ...dependencies, ...pkg.devDependencies };
  }
  return new JsonDependencies(dependencies).setAppName(appName);
}

export function sort(
  depWrapper1: Dependencies,
  depWrapper2: Dependencies
): [Dependencies, Dependencies] {
  return depWrapper1.getSize() > depWrapper2.getSize()
    ? [depWrapper1, depWrapper2]
    : [depWrapper2, depWrapper1];
}

export function compareVersion(version1: string, version2: string): number {
  const partVersion1 = version1.split(".").map(Number);
  const partVersion2 = version2.split(".").map(Number);

  for (let i = 0; i < partVersion1.length; i++) {
    if (partVersion1[i] > partVersion2[i]) {
      // Version 1 is more recent.
      return 1;
    } else if (partVersion1[i] < partVersion2[i]) {
      // Version 2 is more recent.
      return 2;
    }
  }

  // they are equal.
  return -1;
}

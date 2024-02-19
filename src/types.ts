export type DependencyName = string;
export type DependencyVersion = string;
export type DependencyWrapper = Record<
  DependencyName,
  {
    checked: boolean;
    version: DependencyVersion;
  }
>;
export interface Dependencies {
  setAppName: (appName: DependencyName) => Dependencies;
  getAppName: () => DependencyName;
  exist: (name: DependencyName) => boolean;
  getVersion: (name: DependencyName) => DependencyVersion;
  getNextDependency: () => Generator<DependencyName>;
  getSize: () => number;
  markDep: (name: DependencyName, checked: boolean) => void;
  getUnCheckedDeps: () => Record<DependencyName, DependencyVersion>;
}

export type AppName = string;

export interface AnalysisResult {
  dependency: DependencyName;
  mostRecentVersion: AppName;
  [appNameN: AppName]: DependencyVersion;
}

export interface OutputBuilder {
  generate(
    deps1: Dependencies,
    deps2: Dependencies,
    analysisResult: AnalysisResult[]
  ): Promise<void>;
}

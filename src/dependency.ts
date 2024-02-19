import {
  type DependencyName,
  type DependencyVersion,
  type Dependencies,
  type DependencyWrapper,
} from "./types";

export class DependencyNotFound extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DependencyNotFound";
  }
}

export default class JsonDependencies implements Dependencies {
  protected appName: string = "";
  protected dependencies: DependencyWrapper;
  constructor(dependencies: Record<DependencyName, DependencyVersion>) {
    this.dependencies = Object.keys(dependencies).reduce<DependencyWrapper>(
      (acc, name) => {
        acc[name] = {
          checked: false,
          version: dependencies[name],
        };
        return acc;
      },
      {}
    );
  }

  setAppName(appName: string): Dependencies {
    this.appName = appName;
    return this;
  }

  getAppName(): string {
    return this.appName;
  }

  exist(name: DependencyName): boolean {
    return name in this.dependencies;
  }

  getVersion(name: DependencyName): DependencyVersion {
    if (!this.exist(name)) throw new DependencyNotFound("Dependency no exist!");
    const version = this.dependencies[name].version;
    const sanitized = version.split(".").map((v) => {
      const split2 = v.split("-");
      let content = v;
      if (split2.length > 1) {
        content = split2[0];
      }
      return content.replace(/\D+/g, "");
    });

    return sanitized.join(".");
  }

  getNextDependency(): Generator<string, any, unknown> {
    const self = this;
    const _generator = function* () {
      const alldeps = Object.keys(self.dependencies);
      for (let i = 0; i < alldeps.length; i++) {
        yield alldeps[i];
      }
    };

    return _generator();
  }

  getSize() {
    return Object.keys(this.dependencies).length;
  }

  markDep(name: string, checked: boolean): void {
    if (!this.exist(name)) throw new DependencyNotFound("Dependency no exist!");
    this.dependencies[name].checked = checked;
  }

  getUnCheckedDeps(): Record<DependencyName, DependencyVersion> {
    return Object.keys(this.dependencies).reduce<
      Record<DependencyName, DependencyVersion>
    >((acc, name) => {
      if (!this.dependencies[name].checked) {
        acc[name] = this.dependencies[name].version;
      }
      return acc;
    }, {});
  }
}

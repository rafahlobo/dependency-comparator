# Comparador de Dependências Node.js
### Este repositório fornece uma ferramenta para comparar as dependências entre dois arquivos package.json.

## Uso

dependency-comparator [options] [command]

Opções -h, --help - Exibe a ajuda para o comando

> **Comando analyze**

```bash
yarn start analyze [options] <pathToFile1> <pathToFile2> - Analisa e exporta o resultado.
```

Analisa as dependências dos arquivos package.json e gera um relatório comparativo.

> Argumentos:

pathToFile1 - Caminho para o primeiro arquivo package.json.

pathToFile2 - Caminho para o segundo arquivo package.json.

> Opções:

* --appName1 <string> - Nome do primeiro aplicativo (usado para referência no relatório). Padrão: "App 1".

* --appName2 <string> - Nome do segundo aplicativo (usado para referência no relatório). Padrão: "App 2".

> **Exemplo de uso**

```bash
yarn start analyze path1/package.json path2/package.json --appName1 "Meu App" --appName2 "App Externo"
```


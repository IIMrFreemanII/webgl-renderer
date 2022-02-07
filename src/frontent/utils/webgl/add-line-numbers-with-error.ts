export const addLineNumbersWithError = (src: string, log = "") => {
  // Note: Error message formats are not defined by any spec so this may or may not work.
  const matches = [...log.matchAll(/ERROR:\s*\d+:(\d+)/gi)];

  const lineNoToErrorMap = new Map(
    matches.map((m, ndx) => {
      const lineNo = parseInt(m[1]);
      const next = matches[ndx + 1];
      const end = next ? next.index : log.length;
      const msg = log.substring(m.index || 0, end);
      return [lineNo - 1, msg];
    }),
  );

  return src
    .split("\n")
    .map((line, lineNo) => {
      const err = lineNoToErrorMap.get(lineNo);
      return `${lineNo + 1}: ${line}${err ? `\n\n^^^ ${err}` : ""}`;
    })
    .join("\n");
};

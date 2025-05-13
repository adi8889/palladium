import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
const mcpServer = new McpServer({
  name: "Palladium",
  version: "1.0.0",
});
//1. Resources | get -> files
mcpServer.resource("Palladium", "palladium://details", async (uri, extras) => {
  return {
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify({
          name: "Palladium",
          symbol: "Pd",
          atomicNumber: 46,
          atomicMass: 106.42,
          appearance: "Silvery-white metallic",
          category: "Transition metal",
          phase: "Solid",
          meltingPointK: 1828.05,
          boilingPointK: 3236,
          density: 12.02,
          description:
            `Palladium is a rare and lustrous silvery-white metal discovered in 1803 by
William Hyde Wollaston. It belongs to the platinum group metals (PGMs)
and is highly valued for its excellent catalytic properties. Palladium
is primarily used in catalytic converters for automobiles, electronics,
dentistry, and hydrogen purification. It is chemically stable, resistant
to corrosion, and plays a vital role in clean energy technologies due
to its ability to absorb hydrogen.`,
        }),
        mimeType: "application.json",
      },
    ],
  };
});
const transport = new StdioServerTransport();
await mcpServer.connect(transport);

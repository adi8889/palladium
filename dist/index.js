import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { periodicTable } from "./periodic-table.js";
import { students } from "./student.js";
const mcpServer = new McpServer({
    name: "Palladium",
    version: "1.0.0",
});
// 1. Resources | GET -> Files
mcpServer.resource("Palladium Metal", "palladium://details", async (uri, extras) => {
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
                    description: "Palladium is a rare and lustrous silvery-white metal discovered in 1803 by William Hyde Wollaston. It belongs to the platinum group metals (PGMs) and is highly valued for its excellent catalytic properties. Palladium is primarily used in catalytic converters for automobiles, electronics, dentistry, and hydrogen purification. It is chemically stable, resistant to corrosion, and plays a vital role in clean energy technologies due to its ability to absorb hydrogen.",
                }),
                mimeType: "application/json",
            },
        ],
    };
});
// 2. Tools | POST -> Files | Side-Effects
mcpServer.tool("Elements", "Details about all the elements in the world", {
    name: z.string().min(1).describe("Name of the metal that you want the data for"),
}, ({ name }) => {
    const element = periodicTable.find((element) => element.name.toLowerCase() === name.toLocaleLowerCase());
    if (!element) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        error: `Element with name "${name}" not found!`,
                    }),
                },
            ],
        };
    }
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(element),
            },
        ],
    };
});
mcpServer.tool("People", "Quick bio of people", {
    name: z.string().min(1).describe("Name of the person that you want the bio for"),
}, ({ name }) => {
    const student = students.find((student) => {
        return student.Name.includes(name.toLowerCase());
    });
    if (!student) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        error: `Student with name "${name}" not found!`,
                    }),
                },
            ],
        };
    }
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(student),
            },
        ],
    };
});
const transport = new StdioServerTransport();
await mcpServer.connect(transport);

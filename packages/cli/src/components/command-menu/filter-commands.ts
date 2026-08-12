import type { Command } from "./types";
import { COMMANDS } from "./commands";

export function getFilteredCommands(query: string): Command[] {
    const lcQuery = query.toLowerCase();
    if (query.trim().length === 0) return COMMANDS;

    return COMMANDS.filter(command =>
        command.name.toLowerCase().startsWith(lcQuery)
    );
}
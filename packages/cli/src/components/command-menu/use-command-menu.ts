import { useRef, useState, useMemo, type RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { getFilteredCommands } from "./filter-commands";
import type { Command } from "./types";
import { useKeyboardLayer } from "../../providers/keyboard-layer";

export function useCommandMenu() {
    const [textValue, setTextValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCommandMenu, setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable>(null);
    const { push, pop, isTopLayer } = useKeyboardLayer();

    const hideCommandMenu = () => {
        setShowCommandMenu(false);
        pop("command");
    };

    const commandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";
    const filteredCommands = useMemo(() => getFilteredCommands(commandQuery), [commandQuery]);

    const handleContentChange = (text: string) => {
        setTextValue(text);
        setSelectedIndex(0);



        // jump back to the top of the list when the query changes
        const scrollbox = scrollRef.current;
        if (scrollbox) {
            scrollbox.scrollTo(0);
        }

        const prefix = text.startsWith("/") ? text.slice(1) : null;

        if (prefix !== null && !prefix.includes(" ")) {
            setShowCommandMenu(true);

            push("command", () => {
                hideCommandMenu();
                return true;
            });
        } else {
            hideCommandMenu();
        }
    };

    // resolve a command at a specific index (returns the command, caller handles the execution)
    const resolveCommand = (index: number) => {
        const command = filteredCommands[index];

        if (command) {
            hideCommandMenu();
        }

        return command;
    };

    useKeyboard((key) => {
        if (!showCommandMenu || !isTopLayer("command")) return;

        if (key.name === "escape") {
            key.preventDefault();
            hideCommandMenu();
        } else if (key.name === "up") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                const newIndex = Math.max(0, i - 1);

                const sb = scrollRef.current;
                if (sb && newIndex < sb.scrollTop) {
                    sb.scrollTo(newIndex);
                }

                return newIndex;
            });
        } else if (key.name === "down") {
            setSelectedIndex((i: number) => {
                key.preventDefault();
                if (filteredCommands.length === 0) return 0;
                const newIndex = Math.min(filteredCommands.length - 1, i + 1);

                const sb = scrollRef.current;
                if (sb) {
                    const viewportHeight = sb.viewport.height;
                    const visibleEnd = sb.scrollTop + viewportHeight - 1;
                    if (newIndex > visibleEnd) {
                        sb.scrollTo(newIndex - viewportHeight + 1);
                    }
                }
                return newIndex;
            })
        }
    });

    return {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    }
}
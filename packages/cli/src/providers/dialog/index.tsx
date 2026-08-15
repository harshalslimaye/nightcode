import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { TextAttributes, RGBA } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { DialogConfig } from "./types";
import { useKeyboardLayer } from "../keyboard-layer";
import { useTheme } from "../theme";

export type DialogContextValue = {
    open: (config: DialogConfig) => void;
    close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

type DialogProviderProps = {
    children: ReactNode;
};

type DialogProps = {
    currentDialog: DialogConfig | null;
    close: () => void;
};

export function useDialog(): DialogContextValue {
    const value = useContext(DialogContext);

    if (!value) {
        throw new Error("useDialog must be used within a DialogProvider");
    }

    return value;
}

export function DialogProvider({ children }: DialogProviderProps) {
    const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);
    const { push, pop } = useKeyboardLayer();

    const close = useCallback(() => {
        setCurrentDialog(null);
        pop("dialog");
    }, [pop]);

    const open = useCallback((config: DialogConfig) => {
        setCurrentDialog(config);
        push("dialog", () => {
            close();
            return true;
        });
    }, [push, close]);

    const value: DialogContextValue = {
        open,
        close,
    };

    return (
        <DialogContext.Provider value={value}>
            {children}
            <Dialog currentDialog={currentDialog} close={close} />
        </DialogContext.Provider>
    )
}

function Dialog({ currentDialog, close }: DialogProps) {
    const { isTopLayer } = useKeyboardLayer();
    const dimensions = useTerminalDimensions();
    const { colors } = useTheme();

    useKeyboard((key) => {
        if (!currentDialog || !isTopLayer("dialog")) return;

        if (key.name === "escape") {
            close();
        }
    });

    if (!currentDialog) return null;

    const { title, children } = currentDialog;

    return (
        <box
            position="absolute"
            top={0}
            left={0}
            width={dimensions.width}
            height={dimensions.height}
            justifyContent="center"
            alignItems="center"
            backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
            zIndex={100}
            onMouseDown={(event) => close()}
        >
            <box
                width={Math.min(60, dimensions.width - 4)}
                height="auto"
                backgroundColor={colors.dialogSurface}
                paddingX={4}
                paddingY={1}
                flexDirection="column"
                gap={1}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <box
                    paddingBottom={1}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                     <text attributes={TextAttributes.BOLD}>{title}</text>
                    <text attributes={TextAttributes.DIM} onMouseDown={(event) => close()}>esc</text>
                </box>
                <box flexGrow={1}>{children}</box>
            </box>
        </box>
    )
}
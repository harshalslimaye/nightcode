import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import type { ReactNode } from "react";
import { useTerminalDimensions } from "@opentui/react";
import type { ToastOptions, ToastVariant } from "./types";
import { DEFAULT_DURATION } from "./types";
import { useTheme } from "../theme";

export type ToastContextValue = {
    show: (options: ToastOptions) => void;
};

type ToastProviderProps = {
    children: ReactNode;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
    const value = useContext(ToastContext);
    if (!value) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return value;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
    const timeouthandleRef = useRef<NodeJS.Timeout | null>(null);

    const clearCurrentTimeout = useCallback(() => {
        if (timeouthandleRef.current) {
            clearTimeout(timeouthandleRef.current);
            timeouthandleRef.current = null;
        }
    }, [])

    const show = useCallback((options: ToastOptions) => {
        const duration = options.duration ?? DEFAULT_DURATION;

        clearCurrentTimeout();

        setCurrentToast({
            variant: options.variant ?? "info",
            ...options,
            duration
        });

        timeouthandleRef.current = setTimeout(() => {
            setCurrentToast(null);
        }, duration).unref();
    }, []);

    const value = useMemo(() => ({ show }), [show]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {currentToast && (
                <Toast
                    currentToast={currentToast}
                />
            )}
        </ToastContext.Provider>
    );
}

type ToastProps = {
    currentToast: ToastOptions | null;
}

function Toast({ currentToast }: ToastProps) {
    const { width } = useTerminalDimensions();
    const { colors } = useTheme();

    if (!currentToast) return null;

    const varientColors: Record<ToastVariant, string> = {
        success: colors.success,
        error: colors.error,
        info: colors.info,
    };

    const borderColor = varientColors[currentToast.variant ?? "info"];

    return (
        <box
            position="absolute"
            justifyContent="center"
            alignItems="flex-start"
            top={2}
            right={2}
            width={Math.max(1, Math.min(60, width -  6))}
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={1}
            backgroundColor={colors.surface}
            borderColor={borderColor}
            border={["left", "right"]}
        >
            <box flexDirection="column" gap={1} width="100%">
                <text fg="#E1E1E1" wrapMode="word" width="100%">
                    {currentToast.message}
                </text>
            </box>
        </box>
    );
}
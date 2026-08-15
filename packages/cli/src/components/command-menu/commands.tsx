import type { Command } from "./types";
import { ThemeDialogContent } from "../dialogs";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "start a new conversation",
        value: "/new",
        action: (ctx) => {
            ctx.toast.show({
                message: "Starting a new conversation...",
                variant: "info"
            });
        }
    },
    {
        name: "agents",
        description: "switch agents",
        value: "/agents",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Switch Agents",
                children: <text>Agent switching functionality is not implemented yet.</text>
            });
        }
    },
    {
        name: "models",
        description: "list available models",
        value: "/models",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Available Models",
                children: <text>Model listing functionality is not implemented yet.</text>
            }); 
        }
    },
    {
        name: "sessions",
        description: "list all sessions",
        value: "/sessions",
        action: (ctx) => {
            ctx.toast.show({
                message: "Listing all sessions...",
                variant: "info"
            });
        }
    },
    {
        name: "theme",
        description: "change the theme",
        value: "/theme",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Change Theme",
                children: <ThemeDialogContent />
            });
        }
    },
    {
        name: "login",
        description: "log in to your account",
        value: "/login",
        action: (ctx) => {
            ctx.toast.show({
                message: "Logging in...",
                variant: "info"
            });
        }
    },
    {
        name: "logout",
        description: "log out of your account",
        value: "/logout",
        action: (ctx) => {
            ctx.toast.show({
                message: "Logging out...",
                variant: "info"
            });
        }
    },
    {
        name: "upgrade",
        description: "upgrade to the latest version",
        value: "/upgrade",
        action: (ctx) => {
            ctx.toast.show({
                message: "Upgrading to the latest version...",
                variant: "info"
            });
        }
    },
    {
        name: "usage",
        description: "show usage statistics",
        value: "/usage",
        action: (ctx) => {
            ctx.toast.show({
                message: "Showing usage statistics...",
                variant: "info"
            });
        }
    },
    {
        name: "exit",
        description: "exit the application",
        value: "/exit",
        action: (ctx) => {
            ctx.exit();
        }
    }
];
import type { Command } from "./types";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "start a new conversation",
        value: "/new"
    },
    {
        name: "agents",
        description: "switch agents",
        value: "/agents"
    },
    {
        name: "models",
        description: "list available models",
        value: "/models"
    },
    {
        name: "sessions",
        description: "list all sessions",
        value: "/sessions"
    },
    {
        name: "theme",
        description: "change the theme",
        value: "/theme"
    },
    {
        name: "login",
        description: "log in to your account",
        value: "/login"
    },
    {
        name: "logout",
        description: "log out of your account",
        value: "/logout"
    },
    {
        name: "upgrade",
        description: "upgrade to the latest version",
        value: "/upgrade"
    },
    {
        name: "usage",
        description: "show usage statistics",
        value: "/usage"
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
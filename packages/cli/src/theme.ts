export type ThemeColors = {
    primary: string;
    planMode: string;
    selection: string;
    thinking: string;
    success: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    dialogSurface: string;
    thinkingBorder: string;
    dimSeparator: string;
};

export type Theme = {
    name: string;
    colors: ThemeColors;
};

export const THEMES: Theme[] = [
    {
        name: "Nightfox",
        colors: {
            primary: "#56D6C2",
            planMode: "#CF8EF4",
            selection: "#89B4FA",
            thinking: "#CF8EF4",
            success: "#82E0AA",
            error: "#E74C5E",
            info: "#56D6C2",
            background: "#0D0D12",
            surface: "#1A1A24",
            dialogSurface: "#0A0A10",
            thinkingBorder: "#34344A",
            dimSeparator: "#4E4E66"
        }
    },
    {
        name: "Solarized Dark",
        colors: {
            primary: "#268BD2",
            planMode: "#2AA198",
            selection: "#B58900",
            thinking: "#D33682",
            success: "#859900",
            error: "#DC322F",
            info: "#2AA198",
            background: "#002B36",
            surface: "#073642",
            dialogSurface: "#001F25",
            thinkingBorder: "#073642",
            dimSeparator: "#586E75"
        }
    },
    {
        name: "Dracula",
        colors: {
            primary: "#6272A4",
            planMode: "#BD93F9",
            selection: "#50FA7B",
            thinking: "#FF79C6",
            success: "#50FA7B",
            error: "#FF5555",
            info: "#8BE9FD",
            background: "#282A36",
            surface: "#44475A",
            dialogSurface: "#21222C",
            thinkingBorder: "#3B3A47",
            dimSeparator: "#5B5A68"
        }
    },
    {
        name: "Gruvbox Dark",
        colors: {
            primary: "#FB4934",
            planMode: "#FABD2F",
            selection: "#83A598",
            thinking: "#D3869B",
            success: "#B8BB26",
            error: "#FB4934",
            info: "#83A598",
            background: "#282828",
            surface: "#3C3836",
            dialogSurface: "#1C1C1C",
            thinkingBorder: "#504945",
            dimSeparator: "#665C54"
        }
    },
    {
        name: "One Dark",
        colors: {
            primary: "#61AFEF",
            planMode: "#C678DD",
            selection: "#98C379",
            thinking: "#E06C75",
            success: "#98C379",
            error: "#E06C75",
            info: "#56B6C2",
            background: "#282C34",
            surface: "#21252B",
            dialogSurface: "#1C1F26",
            thinkingBorder: "#2C313A",
            dimSeparator: "#4B5263"
        }
    },
    {
        name: "Palenight",
        colors: {
            primary: "#82AAFF",
            planMode: "#C792EA",
            selection: "#C3E88D",
            thinking: "#C792EA",
            success: "#C3E88D",
            error: "#FF5370",
            info: "#82AAFF",
            background: "#292D3E",
            surface: "#232634",
            dialogSurface: "#1F2130",
            thinkingBorder: "#373B54",
            dimSeparator: "#4B5166"
        }
    },
    {
        name: "Nord",
        colors: {
            primary: "#88C0D0",
            planMode: "#B48EAD",
            selection: "#81A1C1",
            thinking: "#8FBCBB",
            success: "#A3BE8C",
            error: "#BF616A",
            info: "#88C0D0",
            background: "#2E3440",
            surface: "#3B4252",
            dialogSurface: "#2A2F3A",
            thinkingBorder: "#434C5E",
            dimSeparator: "#4C566A"
        }
    },
    {
        name: "Monokai",
        colors: {
            primary: "#FD971F",
            planMode: "#A678DD",
            selection: "#A6E22E",
            thinking: "#F92672",
            success: "#A6E22E",
            error: "#F92672",
            info: "#66D9EF",
            background: "#272822",
            surface: "#3E3D31",
            dialogSurface: "#1E1E1E",
            thinkingBorder: "#45403A",
            dimSeparator: "#5A5249"
        }
    },
    {
        name: "Oceanic Next",
        colors: {
            primary: "#56B6C2",
            planMode: "#9A86FD",
            selection: "#9CC4FF",
            thinking: "#FF79C6",
            success: "#A6E3A1",
            error: "#FF6B6B",
            info: "#56B6C2",
            background: "#1B2B34",
            surface: "#22313A",
            dialogSurface: "#0F1B22",
            thinkingBorder: "#2A3B44",
            dimSeparator: "#4A5B62"
        }
    },
    {
        name: "Synthwave",
        colors: {
            primary: "#FF6EC7",
            planMode: "#FFD86B",
            selection: "#6FF0D6",
            thinking: "#FF8C69",
            success: "#7EF3A4",
            error: "#FF5C7C",
            info: "#FF6EC7",
            background: "#0B0A19",
            surface: "#1A122A",
            dialogSurface: "#0A0714",
            thinkingBorder: "#2B1533",
            dimSeparator: "#4B3347"
        }
    },
    {
        name: "Saffron Dark",
        colors: {
            primary: "#CC785C",
            planMode: "#E09B6F",
            selection: "#B89176",
            thinking: "#9D7DB8",
            success: "#82C4A0",
            error: "#E07A7A",
            info: "#7FB5C9",
            background: "#1A1511",
            surface: "#2B2420",
            dialogSurface: "#120F0C",
            thinkingBorder: "#3A3128",
            dimSeparator: "#4A4139"
        }
    }
]

export const DEFAULT_THEME: Theme = THEMES.find(theme => theme.name === "Nightfox")! as Theme;
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../providers/theme";
import { SessionShell } from "../components/session-shell";
import { ErrorMessage, UserMessage, BotMessage } from "../components/messages";

export function NewSession() {
    const navigate = useNavigate();
    const location = useLocation();
    const { colors } = useTheme();

    const state = location.state as { message: string } | undefined;

    useEffect(() => {
        if (!state?.message) {
            navigate("/", { replace: true });
        }
    }, [state, navigate]);

    if (!state?.message) return null;

    return (
        <SessionShell onSubmit={() => {}} inputDisabled loading>
            <UserMessage message={state.message} />
            <BotMessage 
                content="This is a sample bot message to demonstrate the message layout." 
                model="opus-5" 
            />
            <ErrorMessage message="This is an error message." />
        </SessionShell>
    );
};
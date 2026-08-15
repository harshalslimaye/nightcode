import { useCallback, useEffect, useRef } from 'react';
import { useDialog } from '../../providers/dialog';
import { useTheme } from '../../providers/theme';
import { DialogSearchList } from '../dialog-search-list';
import { THEMES } from '../../theme';
import type { Theme } from '../../theme';

export const ThemeDialogContent = () => {
    const dialog = useDialog();
    const { currentTheme, setTheme } = useTheme();
    const originalThemeRef = useRef<Theme>(currentTheme);
    const confirmedRef = useRef<boolean>(false);

    useEffect(() => {
        return () => {
            if (!confirmedRef.current) {
                setTheme(originalThemeRef.current);
            }
        };
    }, [setTheme]);

    const handleSelect = useCallback(
        (theme: Theme) => {
            confirmedRef.current = true;
            setTheme(theme);
            dialog.close();
        },
        [setTheme, dialog]
    );

    const handleHighlight = useCallback(
        (theme: Theme) => {
            setTheme(theme);
        },
        [setTheme]
    );

    return (
        <DialogSearchList
            items={THEMES}
            selectedItem={currentTheme}
            onSelect={handleSelect}
            onHighlight={handleHighlight}
            filterFn={(theme: any, query) => theme.name.toLowerCase().includes(query.toLowerCase())}
            renderItem={(theme: any, isSelected) => (
                <text selectable={false} fg={isSelected ? "black" : "white"}>
                    {
                        theme.name === originalThemeRef.current.name ? `\u0020\u2022\u0020` : `\u0020\u0020\u0020`
                    }
                    {theme.name}
                </text>
            )}
            getKey={(theme: any) => theme.name}
            placeholder="Search themes..."
            emptyText="No matching themes found"
        />
    );
}
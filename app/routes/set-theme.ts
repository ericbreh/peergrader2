import { createThemeAction } from "remix-themes"
import { themeSessionResolver } from "../sessions.server"

// Action function to handle theme changes
export const action = createThemeAction(themeSessionResolver)

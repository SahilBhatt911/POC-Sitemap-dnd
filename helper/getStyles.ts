import { styleMapper } from "@/utils/mapper";


export default function getMappedStyles(componentKey: string, viewMode: ViewMode) {
    const componentConfig = styleMapper[componentKey];
  
    if (!componentConfig) {
      throw new Error(`Component style configuration not found for: ${componentKey}`);
    }
  
    const { shared, ...viewModes } = componentConfig;
    const viewModeStyles = viewModes[viewMode];
  
    if (!viewModeStyles) {
      throw new Error(`View mode '${viewMode}' configuration not found for component: ${componentKey}`);
    }

    return { ...shared, ...viewModeStyles };
}
  
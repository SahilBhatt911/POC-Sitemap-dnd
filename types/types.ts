// Define possible view modes
type ViewMode = 'desktop' | 'tablet' | 'mobile';

// Define the structure for each view mode's style configuration
type ComponentStyleConfig = {
  width: string;
  layout: string;
  buttonGrouping: string;
  h1: string;
  p: string;
};

// Define the structure for shared styles (applies across all view modes)
type SharedStyleConfig = {
  leftContent: string;
  rightContent: string;
};

// Define the structure for each component with shared styles and view modes
type ViewModeConfig = {
  shared: SharedStyleConfig;
  desktop: ComponentStyleConfig;
  tablet: ComponentStyleConfig;
  mobile: ComponentStyleConfig;
};

// Define the main style mapper type to map components to their configurations
type StyleMapperType = {
  [componentName: string]: ViewModeConfig;
};

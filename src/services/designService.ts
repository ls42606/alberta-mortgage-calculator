import { DesignSystem } from './contentManagementService';
import { ComponentProps, VariantTestConfig } from '../types/services';

export interface DesignVariation {
  id: string;
  name: string;
  system: DesignSystem;
  performance: {
    conversionRate: number;
    timeOnPage: number;
    bounceRate: number;
    userSatisfaction: number;
  };
  isActive: boolean;
  createdAt: Date;
}

export interface UIComponent {
  id: string;
  name: string;
  type: 'button' | 'form' | 'card' | 'header' | 'footer' | 'calculator' | 'navigation';
  variants: ComponentVariant[];
  currentVariant: string;
  testResults: A_BTestResult[];
}

export interface ComponentVariant {
  id: string;
  name: string;
  code: string;
  styles: string;
  props: ComponentProps;
  performance: {
    clickThroughRate: number;
    conversionRate: number;
    userEngagement: number;
  };
}

export interface A_BTestResult {
  id: string;
  variantA: string;
  variantB: string;
  startDate: Date;
  endDate?: Date;
  results: {
    winner: 'A' | 'B' | 'inconclusive';
    confidence: number;
    metrics: Record<string, number>;
    sampleSize: number;
  };
  status: 'running' | 'completed' | 'stopped';
}

export class DesignService {
  private static instance: DesignService;
  private designVariations: DesignVariation[] = [];
  private components: UIComponent[] = [];
  private activeTests: A_BTestResult[] = [];

  static getInstance(): DesignService {
    if (!DesignService.instance) {
      DesignService.instance = new DesignService();
    }
    return DesignService.instance;
  }

  constructor() {
    this.initializeDefaultDesigns();
    this.initializeComponents();
  }

  private initializeDefaultDesigns(): void {
    const defaultDesign: DesignVariation = {
      id: 'default',
      name: 'Default Design',
      system: {
        colors: {
          primary: ['#003f7f', '#0056b3', '#007bff', '#339af0'],
          secondary: ['#6c757d', '#868e96', '#adb5bd', '#ced4da'],
          accent: ['#28a745', '#20c997', '#17a2b8', '#ffc107'],
          neutral: ['#212529', '#495057', '#6c757d', '#f8f9fa']
        },
        typography: {
          headings: ['Inter', 'Roboto', 'Open Sans'],
          body: ['Inter', 'Roboto', 'Source Sans Pro'],
          sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
          }
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem'
        },
        components: {
          button: {
            borderRadius: '0.375rem',
            padding: '0.5rem 1rem',
            fontWeight: '600'
          },
          card: {
            borderRadius: '0.5rem',
            padding: '1.5rem',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }
        }
      },
      performance: {
        conversionRate: 3.2,
        timeOnPage: 185,
        bounceRate: 45,
        userSatisfaction: 7.8
      },
      isActive: true,
      createdAt: new Date()
    };

    this.designVariations.push(defaultDesign);
  }

  private initializeComponents(): void {
    // Calculator button variations
    const calculatorButton: UIComponent = {
      id: 'calculator-button',
      name: 'Calculator Button',
      type: 'button',
      variants: [
        {
          id: 'default',
          name: 'Default Button',
          code: `<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Calculate Now
          </button>`,
          styles: '',
          props: { variant: 'default' },
          performance: {
            clickThroughRate: 12.5,
            conversionRate: 8.2,
            userEngagement: 6.8
          }
        },
        {
          id: 'gradient',
          name: 'Gradient Button',
          code: `<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Calculate Now
          </button>`,
          styles: '',
          props: { variant: 'gradient' },
          performance: {
            clickThroughRate: 15.8,
            conversionRate: 9.7,
            userEngagement: 8.1
          }
        },
        {
          id: 'outlined',
          name: 'Outlined Button',
          code: `<button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
            Calculate Now
          </button>`,
          styles: '',
          props: { variant: 'outlined' },
          performance: {
            clickThroughRate: 10.3,
            conversionRate: 6.9,
            userEngagement: 5.4
          }
        }
      ],
      currentVariant: 'default',
      testResults: []
    };

    this.components.push(calculatorButton);
  }

  async generateDesignVariation(
    baseDesign: DesignVariation,
    theme: 'modern' | 'classic' | 'minimal' | 'bold'
  ): Promise<DesignVariation> {
    const newVariation: DesignVariation = {
      id: Date.now().toString(),
      name: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`,
      system: { ...baseDesign.system },
      performance: {
        conversionRate: 0,
        timeOnPage: 0,
        bounceRate: 0,
        userSatisfaction: 0
      },
      isActive: false,
      createdAt: new Date()
    };

    switch (theme) {
      case 'modern':
        newVariation.system.colors.primary = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
        newVariation.system.typography.headings = ['Poppins', 'Montserrat', 'Nunito'];
        newVariation.system.components.button.borderRadius = '2rem';
        break;
      case 'classic':
        newVariation.system.colors.primary = ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6'];
        newVariation.system.typography.headings = ['Georgia', 'Times New Roman', 'serif'];
        newVariation.system.components.button.borderRadius = '0.25rem';
        break;
      case 'minimal':
        newVariation.system.colors.primary = ['#000000', '#333333', '#666666', '#999999'];
        newVariation.system.typography.headings = ['Helvetica', 'Arial', 'sans-serif'];
        newVariation.system.components.button.borderRadius = '0';
        break;
      case 'bold':
        newVariation.system.colors.primary = ['#ff4757', '#ff6b81', '#ff9ff3', '#54a0ff'];
        newVariation.system.typography.headings = ['Oswald', 'Roboto Condensed', 'Impact'];
        newVariation.system.components.button.borderRadius = '0.5rem';
        break;
    }

    this.designVariations.push(newVariation);
    return newVariation;
  }

  async createComponentVariant(
    componentId: string,
    variantName: string,
    code: string,
    styles: string,
    props: ComponentProps
  ): Promise<ComponentVariant> {
    const component = this.components.find(c => c.id === componentId);
    if (!component) {
      throw new Error(`Component with id ${componentId} not found`);
    }

    const newVariant: ComponentVariant = {
      id: Date.now().toString(),
      name: variantName,
      code,
      styles,
      props,
      performance: {
        clickThroughRate: 0,
        conversionRate: 0,
        userEngagement: 0
      }
    };

    component.variants.push(newVariant);
    return newVariant;
  }

  async startA_BTest(
    componentId: string,
    variantAId: string,
    variantBId: string,
    duration: number = 14 // days
  ): Promise<A_BTestResult> {
    const component = this.components.find(c => c.id === componentId);
    if (!component) {
      throw new Error(`Component with id ${componentId} not found`);
    }

    const test: A_BTestResult = {
      id: Date.now().toString(),
      variantA: variantAId,
      variantB: variantBId,
      startDate: new Date(),
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
      results: {
        winner: 'inconclusive',
        confidence: 0,
        metrics: {},
        sampleSize: 0
      },
      status: 'running'
    };

    this.activeTests.push(test);
    component.testResults.push(test);

    return test;
  }

  async analyzeTestResults(testId: string): Promise<A_BTestResult | null> {
    const test = this.activeTests.find(t => t.id === testId);
    if (!test) return null;

    // Simulate test results analysis
    const sampleSize = Math.floor(Math.random() * 10000) + 1000;
    const variantAPerformance = Math.random() * 20 + 5; // 5-25%
    const variantBPerformance = Math.random() * 20 + 5; // 5-25%

    const difference = Math.abs(variantAPerformance - variantBPerformance);
    const confidence = Math.min(difference * 5, 99); // Simplified confidence calculation

    test.results = {
      winner: variantAPerformance > variantBPerformance ? 'A' : 'B',
      confidence,
      metrics: {
        variantA_conversion: variantAPerformance,
        variantB_conversion: variantBPerformance,
        improvement: difference
      },
      sampleSize
    };

    // If test is complete and has enough confidence, mark as completed
    if (test.endDate && test.endDate < new Date() && confidence > 95) {
      test.status = 'completed';
    }

    return test;
  }

  async optimizeDesignForConversion(
    currentDesign: DesignVariation,
    targetMetric: 'conversion' | 'engagement' | 'retention'
  ): Promise<DesignVariation> {
    // AI-powered design optimization
    const optimizedDesign: DesignVariation = {
      ...currentDesign,
      id: Date.now().toString(),
      name: `${currentDesign.name} - Optimized for ${targetMetric}`,
      createdAt: new Date()
    };

    switch (targetMetric) {
      case 'conversion':
        // Optimize for conversions
        optimizedDesign.system.colors.primary = ['#ff6b35', '#f7931e', '#ffd60a', '#003566'];
        optimizedDesign.system.components.button.padding = '1rem 2rem';
        optimizedDesign.system.components.button.fontWeight = '700';
        break;
      case 'engagement':
        // Optimize for engagement
        optimizedDesign.system.colors.primary = ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
        optimizedDesign.system.components.card.padding = '2rem';
        break;
      case 'retention':
        // Optimize for retention
        optimizedDesign.system.colors.primary = ['#2d3436', '#636e72', '#74b9ff', '#00b894'];
        optimizedDesign.system.typography.body = ['Georgia', 'Times New Roman', 'serif'];
        break;
    }

    this.designVariations.push(optimizedDesign);
    return optimizedDesign;
  }

  async generateResponsiveDesign(
    baseDesign: DesignVariation,
    breakpoints: Record<string, number>
  ): Promise<Record<string, DesignSystem>> {
    const responsiveDesigns: Record<string, DesignSystem> = {};

    for (const [breakpoint, width] of Object.entries(breakpoints)) {
      const responsiveSystem = { ...baseDesign.system };

      // Adjust typography for different screen sizes
      if (width < 768) { // Mobile
        responsiveSystem.typography.sizes = {
          xs: '0.7rem',
          sm: '0.8rem',
          base: '0.9rem',
          lg: '1rem',
          xl: '1.1rem',
          '2xl': '1.3rem',
          '3xl': '1.5rem',
          '4xl': '1.8rem'
        };
        responsiveSystem.spacing = {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '0.75rem',
          lg: '1rem',
          xl: '1.5rem',
          '2xl': '2rem'
        };
      } else if (width < 1024) { // Tablet
        responsiveSystem.typography.sizes = {
          xs: '0.75rem',
          sm: '0.85rem',
          base: '0.95rem',
          lg: '1.05rem',
          xl: '1.2rem',
          '2xl': '1.4rem',
          '3xl': '1.7rem',
          '4xl': '2rem'
        };
      }

      responsiveDesigns[breakpoint] = responsiveSystem;
    }

    return responsiveDesigns;
  }

  async exportDesignSystem(designId: string, format: 'css' | 'scss' | 'json' | 'tailwind'): Promise<string> {
    const design = this.designVariations.find(d => d.id === designId);
    if (!design) {
      throw new Error(`Design with id ${designId} not found`);
    }

    switch (format) {
      case 'css':
        return this.generateCSS(design.system);
      case 'scss':
        return this.generateSCSS(design.system);
      case 'json':
        return JSON.stringify(design.system, null, 2);
      case 'tailwind':
        return this.generateTailwindConfig(design.system);
      default:
        return JSON.stringify(design.system);
    }
  }

  private generateCSS(system: DesignSystem): string {
    return `
:root {
  /* Colors */
  --primary-100: ${system.colors.primary[0]};
  --primary-200: ${system.colors.primary[1]};
  --primary-300: ${system.colors.primary[2]};
  --primary-400: ${system.colors.primary[3]};
  
  /* Typography */
  --font-heading: ${system.typography.headings[0]};
  --font-body: ${system.typography.body[0]};
  
  /* Spacing */
  --spacing-xs: ${system.spacing.xs};
  --spacing-sm: ${system.spacing.sm};
  --spacing-md: ${system.spacing.md};
  --spacing-lg: ${system.spacing.lg};
  --spacing-xl: ${system.spacing.xl};
  --spacing-2xl: ${system.spacing['2xl']};
}

.btn {
  border-radius: ${system.components.button.borderRadius};
  padding: ${system.components.button.padding};
  font-weight: ${system.components.button.fontWeight};
}

.card {
  border-radius: ${system.components.card.borderRadius};
  padding: ${system.components.card.padding};
  box-shadow: ${system.components.card.shadow};
}
    `;
  }

  private generateSCSS(system: DesignSystem): string {
    return `
$colors: (
  primary: (
    100: ${system.colors.primary[0]},
    200: ${system.colors.primary[1]},
    300: ${system.colors.primary[2]},
    400: ${system.colors.primary[3]}
  )
);

$typography: (
  headings: ${system.typography.headings[0]},
  body: ${system.typography.body[0]}
);

$spacing: (
  xs: ${system.spacing.xs},
  sm: ${system.spacing.sm},
  md: ${system.spacing.md},
  lg: ${system.spacing.lg},
  xl: ${system.spacing.xl},
  2xl: ${system.spacing['2xl']}
);
    `;
  }

  private generateTailwindConfig(system: DesignSystem): string {
    return `
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: '${system.colors.primary[0]}',
          200: '${system.colors.primary[1]}',
          300: '${system.colors.primary[2]}',
          400: '${system.colors.primary[3]}'
        }
      },
      fontFamily: {
        heading: ['${system.typography.headings[0]}', 'sans-serif'],
        body: ['${system.typography.body[0]}', 'sans-serif']
      },
      spacing: {
        xs: '${system.spacing.xs}',
        sm: '${system.spacing.sm}',
        md: '${system.spacing.md}',
        lg: '${system.spacing.lg}',
        xl: '${system.spacing.xl}',
        '2xl': '${system.spacing['2xl']}'
      }
    }
  }
}
    `;
  }

  getDesignVariations(): DesignVariation[] {
    return [...this.designVariations];
  }

  getActiveDesign(): DesignVariation | null {
    return this.designVariations.find(d => d.isActive) || null;
  }

  getComponents(): UIComponent[] {
    return [...this.components];
  }

  getActiveTests(): A_BTestResult[] {
    return this.activeTests.filter(t => t.status === 'running');
  }

  getCompletedTests(): A_BTestResult[] {
    return this.activeTests.filter(t => t.status === 'completed');
  }

  async setActiveDesign(designId: string): Promise<void> {
    this.designVariations.forEach(d => {
      d.isActive = d.id === designId;
    });
  }

  async deleteDesignVariation(designId: string): Promise<void> {
    this.designVariations = this.designVariations.filter(d => d.id !== designId);
  }

  async cloneDesignVariation(designId: string, newName: string): Promise<DesignVariation> {
    const originalDesign = this.designVariations.find(d => d.id === designId);
    if (!originalDesign) {
      throw new Error(`Design with id ${designId} not found`);
    }

    const clonedDesign: DesignVariation = {
      ...originalDesign,
      id: Date.now().toString(),
      name: newName,
      isActive: false,
      createdAt: new Date()
    };

    this.designVariations.push(clonedDesign);
    return clonedDesign;
  }
}
'use client';

import { useState, useEffect } from "react";
import { ReactFlow } from "@xyflow/react";
import HeroHeader from "@/components/hero-header";
import { Monitor, Smartphone } from "lucide-react";

// Create a styled wrapper component to handle responsive overrides
const ResponsiveComponent = ({ viewMode, children }: { viewMode: string, children: React.ReactNode }) => {
//   useEffect(() => {
//     // Lock the viewport meta tag
//     const viewportMeta = document.querySelector('meta[name="viewport"]');
//     if (!viewportMeta) {
//       const meta = document.createElement('meta');
//       meta.name = 'viewport';
//       meta.content = 'width=1440, initial-scale=1'; // Set to your desired desktop width
//       document.head.appendChild(meta);
//     } else {
//       viewportMeta.setAttribute('content', 'width=1440, initial-scale=1');
//     }

//     // Add a CSS rule to force desktop layout
//     const style = document.createElement('style');
//     style.innerHTML = `
//       /* Force desktop layout */
//       html, body {
//         min-width: 1440px !important;
//         width: 1440px !important;
//         overflow-x: auto !important;
//       }
      
//       /* Only apply mobile styles when explicitly set to mobile mode */
//       @media screen and (max-width: 1440px) {
//         html, body {
//           zoom: ${window.innerWidth / 1440};
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

  // CSS to override Tailwind's responsive classes
//   const responsiveOverrides = `
//     ${viewMode === 'desktop' ? `
//       /* Disable all responsive classes regardless of screen size */
//       .md\\:text-md,
//       .md\\:mb-6,
//       .md\\:text-9xl,
//       .md\\:mt-8,
//       .md\\:py-24,
//       .md\\:gap-y-16,
//       .lg\\:text-10xl,
//       .lg\\:grid-cols-2,
//       .lg\\:items-center,
//       .lg\\:py-28 {
//         /* Reset to base styles */
//         all: revert !important;
//       }
      
//       /* Force specific desktop values */
//       .grid-cols-1 {
//         grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
//       }
//       .text-6xl {
//         font-size: 3.75rem !important;
//         line-height: 1 !important;
//       }
//       .mb-5 {
//         margin-bottom: 1.25rem !important;
//       }
//       .py-16 {
//         padding-top: 4rem !important;
//         padding-bottom: 4rem !important;
//       }
//     ` : `
//       /* Mobile mode styles */
//       .container {
//         max-width: 640px !important;
//         margin-left: auto !important;
//         margin-right: auto !important;
//       }
//     `}
//   `;

  return (
    <div className={viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}>
      {/* <style>{responsiveOverrides}</style> */}
      {children}
    </div>
  );
};

export default ResponsiveComponent
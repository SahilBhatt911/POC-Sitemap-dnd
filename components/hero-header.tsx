import getMappedStyles from '@/helper/getStyles';
import React from 'react';

const HeroHeader = ({ viewMode }: { viewMode: any }) => {
  const componentKey = "hero-header";
  const styles = getMappedStyles(componentKey, viewMode);

  return (
    <section id="relume" className={`${styles.width} bg-white global_overflow px-[2%] py-8 md:py-12 lg:py-28`}>
      <div className="w-full global_overflow">
        <div className={styles.layout}>
          <div className={styles.leftContent}>
            <h1 className={styles.h1}>
              Medium length hero heading goes here
            </h1>
            <p className={`${styles.p} global_overflow`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
              elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
              commodo diam libero vitae erat.
            </p>
            <div className={`${styles.p} global_overflow`}>
              <button
                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                title="Button"
              >
                Button
              </button>
              <button
                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                title="Button"
              >
                Button
              </button>
            </div>
          </div>
          <div className={`${styles.p} global_overflow`}>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;

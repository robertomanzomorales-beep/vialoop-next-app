"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
} from "react";

import "./LogoLoop.css";

type ImageLogo = {
  src: string;
  alt: string;
  title?: string;
  href?: string;
  width?: number;
  height?: number;
};

type NodeLogo = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

export type LogoItem = ImageLogo | NodeLogo;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value;

function LogoLoopComponent({
  logos,
  speed = 55,
  direction = "left",
  width = "100%",
  logoHeight = 72,
  gap = 72,
  pauseOnHover,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = true,
  ariaLabel = "Empresas que confían en Vialoop",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLUListElement | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [sequenceHeight, setSequenceHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(
    ANIMATION_CONFIG.MIN_COPIES
  );
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === "up" || direction === "down";

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;

    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);

    const directionMultiplier = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;

    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [direction, isVertical, speed]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;

    if (!container || !sequence) return;

    const containerWidth = container.clientWidth;
    const sequenceRect = sequence.getBoundingClientRect();

    const measuredWidth = Math.ceil(sequenceRect.width);
    const measuredHeight = Math.ceil(sequenceRect.height);

    if (isVertical) {
      if (measuredHeight <= 0) return;

      setSequenceHeight(measuredHeight);

      const viewportHeight =
        container.parentElement?.clientHeight ||
        container.clientHeight ||
        measuredHeight;

      const copiesNeeded =
        Math.ceil(viewportHeight / measuredHeight) +
        ANIMATION_CONFIG.COPY_HEADROOM;

      setCopyCount(
        Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
      );

      return;
    }

    if (measuredWidth <= 0) return;

    setSequenceWidth(measuredWidth);

    const copiesNeeded =
      Math.ceil(containerWidth / measuredWidth) +
      ANIMATION_CONFIG.COPY_HEADROOM;

    setCopyCount(
      Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
    );
  }, [isVertical]);

  useEffect(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;

    if (!container || !sequence) return;

    const observer = new ResizeObserver(updateDimensions);

    observer.observe(container);
    observer.observe(sequence);

    updateDimensions();

    return () => observer.disconnect();
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const sequence = sequenceRef.current;

    if (!sequence) return;

    const images = Array.from(sequence.querySelectorAll("img"));

    if (images.length === 0) {
      updateDimensions();
      return;
    }

    const handleLoad = () => updateDimensions();

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", handleLoad);
        image.addEventListener("error", handleLoad);
      }
    });

    updateDimensions();

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleLoad);
        image.removeEventListener("error", handleLoad);
      });
    };
  }, [logos, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const sequenceSize = isVertical
      ? sequenceHeight
      : sequenceWidth;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;

      lastTimestampRef.current = timestamp;

      const currentTarget =
        isHovered && effectiveHoverSpeed !== undefined
          ? effectiveHoverSpeed
          : targetVelocity;

      const easingFactor =
        1 -
        Math.exp(
          -deltaTime / ANIMATION_CONFIG.SMOOTH_TAU
        );

      velocityRef.current +=
        (currentTarget - velocityRef.current) * easingFactor;

      if (sequenceSize > 0) {
        let nextOffset =
          offsetRef.current +
          velocityRef.current * deltaTime;

        nextOffset =
          ((nextOffset % sequenceSize) + sequenceSize) %
          sequenceSize;

        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-nextOffset}px, 0)`
          : `translate3d(${-nextOffset}px, 0, 0)`;
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      lastTimestampRef.current = null;
    };
  }, [
    effectiveHoverSpeed,
    isHovered,
    isVertical,
    sequenceHeight,
    sequenceWidth,
    targetVelocity,
  ]);

  const rootClassName = [
    "logoLoop",
    isVertical
      ? "logoLoop--vertical"
      : "logoLoop--horizontal",
    fadeOut && "logoLoop--fade",
    scaleOnHover && "logoLoop--scale",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerStyle = {
    width: isVertical
      ? toCssLength(width) === "100%"
        ? undefined
        : toCssLength(width)
      : toCssLength(width),
    "--logo-loop-gap": `${gap}px`,
    "--logo-loop-height": `${logoHeight}px`,
    ...(fadeOutColor
      ? { "--logo-loop-fade": fadeOutColor }
      : {}),
    ...style,
  } as CSSProperties;

  const renderLogo = (
    item: LogoItem,
    key: Key
  ) => {
    const isNodeLogo = "node" in item;

    const content = isNodeLogo ? (
      <span className="logoLoop__node">
        {item.node}
      </span>
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        title={item.title}
        width={item.width ?? 700}
        height={item.height ?? 240}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    return (
      <li
        className="logoLoop__item"
        key={key}
        role="listitem"
      >
        {item.href ? (
          <a
            className="logoLoop__link"
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={
              isNodeLogo
                ? item.ariaLabel ?? item.title
                : item.alt
            }
          >
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        ref={trackRef}
        className="logoLoop__track"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from(
          { length: copyCount },
          (_, copyIndex) => (
            <ul
              className="logoLoop__list"
              key={`copy-${copyIndex}`}
              role="list"
              aria-hidden={copyIndex > 0}
              ref={
                copyIndex === 0
                  ? sequenceRef
                  : undefined
              }
            >
              {logos.map((item, itemIndex) =>
                renderLogo(
                  item,
                  `${copyIndex}-${itemIndex}`
                )
              )}
            </ul>
          )
        )}
      </div>
    </div>
  );
}

const LogoLoop = memo(LogoLoopComponent);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
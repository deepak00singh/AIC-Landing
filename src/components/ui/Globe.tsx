/* eslint-disable */
// Globe — Originkit (Optimized with Local Bundled GeoJSON & Instant Theme Switching)

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    MeshBasicMaterial,
    Color,
    Mesh,
    Group,
    InstancedMesh,
    Matrix4,
    Raycaster,
    Vector2,
    TubeGeometry,
    CatmullRomCurve3,
    Vector3,
    CanvasTexture,
} from "three";
import { geoEquirectangular, geoPath } from "d3-geo";

type Rgba = { r: number; g: number; b: number; a: number };

function parseColorToRgba(input: string): Rgba {
    if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
    const str = input.trim();
    const rgbaMatch = str.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
    );
    if (rgbaMatch) {
        const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
        const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
        const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
        const a =
            rgbaMatch[4] !== undefined
                ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
                : 1;
        return { r, g, b, a };
    }
    const hex = str.replace(/^#/, "");
    if (hex.length === 8) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: parseInt(hex.slice(6, 8), 16) / 255,
        };
    }
    if (hex.length === 6) {
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
            a: 1,
        };
    }
    if (hex.length === 4) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: parseInt(hex[3] + hex[3], 16) / 255,
        };
    }
    if (hex.length === 3) {
        return {
            r: parseInt(hex[0] + hex[0], 16) / 255,
            g: parseInt(hex[1] + hex[1], 16) / 255,
            b: parseInt(hex[2] + hex[2], 16) / 255,
            a: 1,
        };
    }
    return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    if (inMax === inMin) return outMin;
    const t = (value - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
}

function mapSpeedUiToInternal(ui: number): number {
    if (ui === 0) return 0;
    const clamped = Math.max(0, Math.min(10, ui));
    return mapLinear(clamped, 0, 10, 0, 0.9);
}
function mapDensityUiToSpacing(ui: number): number {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 24, 8);
}
function mapScaleUiToMultiplier(ui: number): number {
    const clamped = Math.max(1, Math.min(20, ui));
    return mapLinear(clamped, 1, 20, 0.2, 2);
}
function mapDotSizeUiToMultiplier(ui: number): number {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 0.1, 0.5);
}
function mapMarkerDotSizeUiToMultiplier(ui: number): number {
    const clamped = Math.max(0, Math.min(100, ui));
    return mapLinear(clamped, 0, 100, 0.1, 2.5);
}
function normalizeSmoothing(ui: number): number {
    return Math.max(0, Math.min(1, ui / 10));
}
function mapDragSpeedUiToSensitivity(ui: number): number {
    return mapLinear(Math.max(0, Math.min(10, ui)), 0, 10, 0.001, 0.02);
}
function mapDetailToStepSize(ui: number): number {
    const clamped = Math.max(1, Math.min(10, ui));
    return mapLinear(clamped, 1, 10, 10, 1);
}

function simplifyRing(ring: number[][], detail: number): number[][] {
    if (ring.length < 2) return ring;
    if (detail >= 10) return ring;
    const stepSize = Math.max(1, Math.floor(mapDetailToStepSize(detail)));
    const simplified: number[][] = [];
    simplified.push(ring[0]);
    for (let i = stepSize; i < ring.length - 1; i += stepSize) {
        const idx = Math.min(i, ring.length - 1);
        simplified.push(ring[idx]);
    }
    const lastPoint = ring[ring.length - 1];
    const firstPoint = ring[0];
    const isClosed =
        Math.abs(lastPoint[0] - firstPoint[0]) < 1e-4 &&
        Math.abs(lastPoint[1] - firstPoint[1]) < 1e-4;
    if (!isClosed) {
        simplified.push(lastPoint);
    }
    return simplified.length >= 2 ? simplified : ring;
}

function latLngToPosition(
    lat: number,
    lng: number
): { x: number; y: number; z: number } {
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);
    const x = Math.cos(latRad) * Math.sin(lngRad);
    const y = Math.sin(latRad);
    const z = Math.cos(latRad) * Math.cos(lngRad);
    return { x, y, z };
}

export interface Marker {
    lat: number;
    lng: number;
}
export interface MarkerConfig {
    markers: Marker[];
    color: string;
    size: number;
}
export interface ArcConfig {
    show?: boolean;
    color?: string;
    width?: number;
    altitude?: number;
    opacity?: number;
    connectAllMarkers?: boolean;
}
export interface DotsConfig {
    color: string;
    size: number;
    density: number;
    allDots: boolean;
}
export interface GlobeProps {
    speed?: number;
    smoothing?: number;
    dots?: DotsConfig;
    fill?: "dots" | "solid";
    fillColor?: string;
    scale?: number;
    stopOnHover?: boolean;
    markerConfig?: MarkerConfig;
    arcConfig?: ArcConfig;
    direction?: "left" | "right";
    initialLatitude?: number;
    initialLongitude?: number;
    oceanColor?: string;
    outlineColor?: string;
    showOutline?: boolean;
    graticuleColor?: string;
    showGrid?: boolean;
    outlineWidth?: number;
    dragSpeed?: number;
    detail?: number;
    style?: CSSProperties;
}

// Module-level caches for instant loading & 0ms theme toggling
let cachedLandFeatures: any = null;
let landFetchPromise: Promise<any> | null = null;
const cachedLandRingsMap = new Map<number, number[][][]>();
const cachedDotPositionsMap = new Map<string, number[][]>();

async function getLandFeatures(): Promise<any> {
    if (cachedLandFeatures) return cachedLandFeatures;
    if (!landFetchPromise) {
        landFetchPromise = fetch("/data/ne_50m_land.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load local land data");
                return res.json();
            })
            .catch(() => {
                // Fallback to GitHub raw if local file is missing
                return fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json"
                ).then((res) => res.json());
            })
            .then((data) => {
                cachedLandFeatures = data;
                return data;
            });
    }
    return landFetchPromise;
}

export function Globe({
    speed = 2,
    smoothing = 8,
    dots = { color: "#ffffff", size: 5, density: 8, allDots: false },
    fill = "dots",
    fillColor = "#ffffff",
    scale = 8,
    stopOnHover = true,
    markerConfig = { markers: [], color: "#00f7ff", size: 40 },
    arcConfig = { show: true, color: "#FF4B32", width: 1.2, altitude: 0.16, opacity: 0.85, connectAllMarkers: true },
    direction = "left",
    initialLatitude = 23,
    initialLongitude = -23,
    oceanColor = "#000000",
    outlineColor = "#ffffff",
    showOutline = true,
    graticuleColor = "#D4D4D4",
    showGrid = true,
    outlineWidth = 1,
    dragSpeed = 5,
    detail = 5,
    style,
}: GlobeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Refs for instant, zero-re-render material updates on theme toggle
    const oceanMaterialRef = useRef<MeshBasicMaterial | null>(null);
    const graticuleMaterialRef = useRef<MeshBasicMaterial | null>(null);
    const outlineMaterialsRef = useRef<MeshBasicMaterial[]>([]);
    const dotMaterialRef = useRef<MeshBasicMaterial | null>(null);
    const markerMaterialsRef = useRef<MeshBasicMaterial[]>([]);
    const arcMaterialsRef = useRef<MeshBasicMaterial[]>([]);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const isMountedRef = useRef<boolean>(false);

    const dotColor = dots.color;
    const dotSize = dots.size;
    const density = dots.density;
    const allDots = dots.allDots;
    const gridWidth = 1;
    const smoothingN = normalizeSmoothing(smoothing);

    const baseRotationSpeed = mapSpeedUiToInternal(speed);
    const rotationSpeed =
        direction === "left" ? -baseRotationSpeed : baseRotationSpeed;
    const dotSpacing = mapDensityUiToSpacing(density);
    const dotSizeMultiplier = mapDotSizeUiToMultiplier(dotSize);
    const markerRadiusMultiplier = mapMarkerDotSizeUiToMultiplier(
        markerConfig.size
    );
    const scaleMultiplier = mapScaleUiToMultiplier(scale);

    // Dynamic material color update: Runs in 0ms on theme change without remounting Three.js!
    useEffect(() => {
        if (!isMountedRef.current) return;

        // 1. Update Ocean Material
        if (oceanMaterialRef.current) {
            const oc = parseColorToRgba(oceanColor);
            oceanMaterialRef.current.color.set(oceanColor);
            oceanMaterialRef.current.opacity = oc.a;
            oceanMaterialRef.current.transparent = oc.a < 1 || oc.a === 0;
            oceanMaterialRef.current.needsUpdate = true;
        }

        // 2. Update Graticule Material
        if (graticuleMaterialRef.current) {
            const gc = parseColorToRgba(graticuleColor);
            graticuleMaterialRef.current.color.set(graticuleColor);
            graticuleMaterialRef.current.opacity = gc.a;
            graticuleMaterialRef.current.transparent = gc.a < 1 || gc.a === 0;
            graticuleMaterialRef.current.needsUpdate = true;
        }

        // 3. Update Outline Materials
        const olc = parseColorToRgba(outlineColor);
        outlineMaterialsRef.current.forEach((mat) => {
            mat.color.set(outlineColor);
            mat.opacity = olc.a;
            mat.transparent = olc.a < 1;
            mat.needsUpdate = true;
        });

        // 4. Update Dot Material
        if (dotMaterialRef.current) {
            const dc = parseColorToRgba(dotColor);
            dotMaterialRef.current.color.set(dotColor);
            dotMaterialRef.current.opacity = dc.a;
            dotMaterialRef.current.transparent = dc.a < 1 || dc.a === 0;
            dotMaterialRef.current.needsUpdate = true;
        }

        // 5. Update Marker Materials
        markerMaterialsRef.current.forEach((mat) => {
            mat.color.set(markerConfig.color);
            mat.needsUpdate = true;
        });

        // 6. Update Arc Materials
        const resolvedArcCol = arcConfig?.color || markerConfig.color || "#FF4B32";
        arcMaterialsRef.current.forEach((mat) => {
            mat.color.set(resolvedArcCol);
            mat.needsUpdate = true;
        });

        // Immediate single-frame render
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    }, [oceanColor, dotColor, outlineColor, graticuleColor, markerConfig.color, arcConfig?.color]);

    // Main initialization effect: Only runs when structural properties change, NOT on theme color toggle!
    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const containerWidth =
            container.clientWidth || container.offsetWidth || 800;
        const containerHeight =
            container.clientHeight || container.offsetHeight || 600;

        const scene = new Scene();
        sceneRef.current = scene;

        const camera = new PerspectiveCamera(
            50,
            containerWidth / containerHeight,
            0.1,
            1e3
        );
        cameraRef.current = camera;

        const baseRadius = 1;
        const globeRadius = baseRadius * scaleMultiplier;
        const minSafeDistance = globeRadius / 0.385;
        const cameraDistance = Math.max(minSafeDistance, 2.5 / scaleMultiplier);
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);

        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = "srgb";

        const canvas = renderer.domElement;
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        canvas.style.transition = "opacity 0.2s ease";
        canvas.style.opacity = "0";
        canvas.style.visibility = "hidden";
        container.appendChild(canvas);

        const resolvedOceanColor = oceanColor;
        const resolvedOutlineColor = outlineColor;
        const resolvedDotColor = dotColor;
        const resolvedMarkerColor = markerConfig.color;
        const resolvedGraticuleColor = graticuleColor;
        const resolvedFillColor = fillColor;
        const oceanRgba = parseColorToRgba(resolvedOceanColor);
        const outlineRgba = parseColorToRgba(resolvedOutlineColor);
        const dotRgba = parseColorToRgba(resolvedDotColor);
        const graticuleRgba = parseColorToRgba(resolvedGraticuleColor);
        const fillRgba = parseColorToRgba(resolvedFillColor);

        // Ocean Sphere
        const oceanGeometry = new SphereGeometry(globeRadius, 64, 64);
        const oceanColorObj = resolvedOceanColor
            ? new Color(resolvedOceanColor)
            : new Color(0, 0, 0);
        const oceanMaterial = new MeshBasicMaterial({
            color: oceanColorObj,
            transparent: oceanRgba.a < 1 || oceanRgba.a === 0,
            opacity: oceanRgba.a,
        });
        oceanMaterialRef.current = oceanMaterial;
        const oceanMesh = new Mesh(oceanGeometry, oceanMaterial);
        scene.add(oceanMesh);

        // Graticule Grid
        const graticuleGroup = new Group();
        if (showGrid && resolvedGraticuleColor && graticuleRgba.a > 0) {
            const graticuleColorObj = resolvedGraticuleColor
                ? new Color(resolvedGraticuleColor)
                : new Color(1, 1, 1);
            const graticuleMaterial = new MeshBasicMaterial({
                color: graticuleColorObj,
                transparent: graticuleRgba.a < 1 || graticuleRgba.a === 0,
                opacity: graticuleRgba.a,
            });
            graticuleMaterialRef.current = graticuleMaterial;
            const gridSpacing = 15;
            for (let lat = -90; lat <= 90; lat += gridSpacing) {
                const positions: number[] = [];
                const segments = 64;
                for (let i = 0; i <= segments; i++) {
                    const lng = (i / segments) * 360 - 180;
                    const pos = latLngToPosition(lat, lng);
                    positions.push(
                        pos.x * globeRadius,
                        pos.y * globeRadius,
                        pos.z * globeRadius
                    );
                }
                if (positions && positions.length >= 6) {
                    const points: Vector3[] = [];
                    for (let i = 0; i < positions.length; i += 3) {
                        points.push(
                            new Vector3(
                                positions[i],
                                positions[i + 1],
                                positions[i + 2]
                            )
                        );
                    }
                    if (points.length >= 2) {
                        const curve = new CatmullRomCurve3(points);
                        const radius = (gridWidth / 10) * 0.01;
                        const tubeGeometry = new TubeGeometry(
                            curve,
                            points.length * 2,
                            radius,
                            8,
                            false
                        );
                        const tubeMesh = new Mesh(
                            tubeGeometry,
                            graticuleMaterial
                        );
                        tubeMesh.renderOrder = 0;
                        graticuleGroup.add(tubeMesh);
                    }
                }
            }
            for (let lng = -180; lng <= 180; lng += gridSpacing) {
                const positions: number[] = [];
                const segments = 64;
                for (let i = 0; i <= segments; i++) {
                    const lat = (i / segments) * 180 - 90;
                    const pos = latLngToPosition(lat, lng);
                    positions.push(
                        pos.x * globeRadius,
                        pos.y * globeRadius,
                        pos.z * globeRadius
                    );
                }
                if (positions && positions.length >= 6) {
                    const points: Vector3[] = [];
                    for (let i = 0; i < positions.length; i += 3) {
                        points.push(
                            new Vector3(
                                positions[i],
                                positions[i + 1],
                                positions[i + 2]
                            )
                        );
                    }
                    if (points.length >= 2) {
                        const curve = new CatmullRomCurve3(points);
                        const radius = (gridWidth / 10) * 0.01;
                        const tubeGeometry = new TubeGeometry(
                            curve,
                            points.length * 2,
                            radius,
                            8,
                            false
                        );
                        const tubeMesh = new Mesh(
                            tubeGeometry,
                            graticuleMaterial
                        );
                        tubeMesh.renderOrder = 0;
                        graticuleGroup.add(tubeMesh);
                    }
                }
            }
        }

        const continentOutlineGroup = new Group();
        outlineMaterialsRef.current = [];
        markerMaterialsRef.current = [];
        arcMaterialsRef.current = [];

        let dotInstances: InstancedMesh | Mesh | null = null;
        let markerMeshes: Mesh[] = [];
        let arcMeshes: Mesh[] = [];
        let arcAnimItems: Array<{
            coreMesh: Mesh;
            glowMesh: Mesh;
            totalIndices: number;
            glowIndices: number;
            staggerStart: number;
            staggerDuration: number;
        }> = [];
        let arcCycleTime = 0;
        let lastTime = performance.now();
        let baseArcOpacity = 0.88;
        let baseGlowOpacity = 0.25;
        let arcCoreMaterial: MeshBasicMaterial | null = null;
        let arcGlowMaterial: MeshBasicMaterial | null = null;

        const loadWorldData = async () => {
            try {
                setIsLoading(true);
                const landFeatures = await getLandFeatures();

                while (continentOutlineGroup.children.length > 0) {
                    continentOutlineGroup.remove(
                        continentOutlineGroup.children[0]
                    );
                }

                // 1. Process Outlines using cached rings or compute once
                if (showOutline && outlineColor && outlineRgba.a > 0) {
                    const outlineColorObj = new Color(resolvedOutlineColor);
                    const outlineMaterial = new MeshBasicMaterial({
                        color: outlineColorObj,
                        transparent: outlineRgba.a < 1,
                        opacity: outlineRgba.a,
                        depthTest: true,
                        depthWrite: true,
                    });
                    outlineMaterialsRef.current = [outlineMaterial];

                    let rings = cachedLandRingsMap.get(detail);
                    if (!rings) {
                        rings = [];
                        landFeatures.features.forEach((feature: any) => {
                            const featureType =
                                feature.properties?.featurecla ||
                                feature.properties?.type ||
                                "";
                            const featureName = feature.properties?.name || "";
                            if (
                                featureType.toLowerCase().includes("graticule") ||
                                featureType.toLowerCase().includes("grid") ||
                                featureType.toLowerCase().includes("line") ||
                                featureName.toLowerCase().includes("graticule") ||
                                featureName.toLowerCase().includes("grid") ||
                                featureName.toLowerCase().includes("line")
                            ) {
                                return;
                            }
                            const geometry = feature.geometry;
                            if (!geometry || !geometry.coordinates) return;

                            const collectRing = (ring: number[][]) => {
                                if (ring.length < 2) return;
                                const simplifiedRing = simplifyRing(ring, detail);
                                if (simplifiedRing.length >= 2) {
                                    rings!.push(simplifiedRing);
                                }
                            };

                            if (
                                geometry.type === "Polygon" &&
                                geometry.coordinates.length > 0
                            ) {
                                collectRing(geometry.coordinates[0]);
                            } else if (geometry.type === "MultiPolygon") {
                                geometry.coordinates.forEach((polygon: any) => {
                                    if (polygon.length > 0) {
                                        collectRing(polygon[0]);
                                    }
                                });
                            }
                        });
                        cachedLandRingsMap.set(detail, rings);
                    }

                    // Build tube geometry from rings
                    rings.forEach((ring) => {
                        const positions: number[] = [];
                        ring.forEach((coord) => {
                            const [lng, lat] = coord;
                            const pos = latLngToPosition(lat, lng);
                            positions.push(
                                pos.x * globeRadius,
                                pos.y * globeRadius,
                                pos.z * globeRadius
                            );
                        });
                        if (positions.length >= 6) {
                            const points: Vector3[] = [];
                            for (let i = 0; i < positions.length; i += 3) {
                                points.push(
                                    new Vector3(
                                        positions[i],
                                        positions[i + 1],
                                        positions[i + 2]
                                    )
                                );
                            }
                            if (
                                points.length > 0 &&
                                points[0].distanceTo(points[points.length - 1]) > 0.001
                            ) {
                                points.push(points[0].clone());
                            }
                            if (points.length >= 2) {
                                const curve = new CatmullRomCurve3(points);
                                const radius = (outlineWidth / 10) * 0.01;
                                const tubeGeometry = new TubeGeometry(
                                    curve,
                                    points.length * 2,
                                    radius,
                                    8,
                                    false
                                );
                                const tubeMesh = new Mesh(
                                    tubeGeometry,
                                    outlineMaterial
                                );
                                tubeMesh.renderOrder = 0;
                                continentOutlineGroup.add(tubeMesh);
                            }
                        }
                    });
                }

                // 2. Dots on Land using cached dot coordinates or rasterize once
                if (fill === "solid") {
                    const bitmapWidth = 2048;
                    const bitmapHeight = 1024;
                    const offscreenCanvas = document.createElement("canvas");
                    offscreenCanvas.width = bitmapWidth;
                    offscreenCanvas.height = bitmapHeight;
                    const ctx = offscreenCanvas.getContext("2d", {
                        willReadFrequently: true,
                    });
                    if (!ctx) throw new Error("Canvas not supported");
                    const projection = geoEquirectangular().fitSize(
                        [bitmapWidth, bitmapHeight],
                        { type: "Sphere" } as any
                    );
                    const pathGenerator = geoPath()
                        .projection(projection)
                        .context(ctx);
                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
                    ctx.fillStyle = "#fff";
                    ctx.beginPath();
                    landFeatures.features.forEach((feature: any) => {
                        pathGenerator(feature);
                    });
                    ctx.fill();
                    const imageData = ctx.getImageData(
                        0,
                        0,
                        bitmapWidth,
                        bitmapHeight
                    );
                    const pixels = imageData.data;
                    const isOnLand = (lng: number, lat: number) => {
                        const x =
                            Math.round(((lng + 180) / 360) * bitmapWidth) %
                            bitmapWidth;
                        const y = Math.round(((90 - lat) / 180) * bitmapHeight);
                        const clampedY = Math.max(0, Math.min(bitmapHeight - 1, y));
                        const idx = (clampedY * bitmapWidth + x) * 4;
                        return pixels[idx] > 128;
                    };

                    const texW = 1024;
                    const texH = 512;
                    const fillCanvas = document.createElement("canvas");
                    fillCanvas.width = texW;
                    fillCanvas.height = texH;
                    const fctx = fillCanvas.getContext("2d")!;
                    const img = fctx.createImageData(texW, texH);
                    const data = img.data;
                    const fr = Math.round(fillRgba.r * 255);
                    const fg = Math.round(fillRgba.g * 255);
                    const fb = Math.round(fillRgba.b * 255);
                    const fa = Math.round((fillRgba.a || 1) * 255);
                    for (let ty = 0; ty < texH; ty++) {
                        for (let tx = 0; tx < texW; tx++) {
                            const u = tx / texW;
                            const v = ty / texH;
                            let lng = (u - 0.25) * 360;
                            lng = ((((lng + 180) % 360) + 360) % 360) - 180;
                            const lat = (v - 0.5) * 180;
                            const onLand = allDots || isOnLand(lng, lat);
                            const idx = (ty * texW + tx) * 4;
                            if (onLand) {
                                data[idx] = fr;
                                data[idx + 1] = fg;
                                data[idx + 2] = fb;
                                data[idx + 3] = fa;
                            } else {
                                data[idx + 3] = 0;
                            }
                        }
                    }
                    fctx.putImageData(img, 0, 0);
                    const fillTexture = new CanvasTexture(fillCanvas);
                    fillTexture.flipY = false;
                    fillTexture.needsUpdate = true;
                    const fillGeometry = new SphereGeometry(
                        globeRadius * 1.002,
                        64,
                        64
                    );
                    const fillMaterial = new MeshBasicMaterial({
                        map: fillTexture,
                        transparent: true,
                    });
                    dotInstances = new Mesh(fillGeometry, fillMaterial);
                    globeGroup.add(dotInstances);
                } else {
                    const cacheKey = `${dotSpacing}_${allDots}`;
                    let dotCoordinates = cachedDotPositionsMap.get(cacheKey);

                    if (!dotCoordinates) {
                        const bitmapWidth = 2048;
                        const bitmapHeight = 1024;
                        const offscreenCanvas = document.createElement("canvas");
                        offscreenCanvas.width = bitmapWidth;
                        offscreenCanvas.height = bitmapHeight;
                        const ctx = offscreenCanvas.getContext("2d", {
                            willReadFrequently: true,
                        });
                        if (!ctx) throw new Error("Canvas not supported");
                        const projection = geoEquirectangular().fitSize(
                            [bitmapWidth, bitmapHeight],
                            { type: "Sphere" } as any
                        );
                        const pathGenerator = geoPath()
                            .projection(projection)
                            .context(ctx);
                        ctx.fillStyle = "#000";
                        ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
                        ctx.fillStyle = "#fff";
                        ctx.beginPath();
                        landFeatures.features.forEach((feature: any) => {
                            pathGenerator(feature);
                        });
                        ctx.fill();
                        const imageData = ctx.getImageData(
                            0,
                            0,
                            bitmapWidth,
                            bitmapHeight
                        );
                        const pixels = imageData.data;
                        const isOnLand = (lng: number, lat: number) => {
                            const x =
                                Math.round(((lng + 180) / 360) * bitmapWidth) %
                                bitmapWidth;
                            const y = Math.round(((90 - lat) / 180) * bitmapHeight);
                            const clampedY = Math.max(0, Math.min(bitmapHeight - 1, y));
                            const idx = (clampedY * bitmapWidth + x) * 4;
                            return pixels[idx] > 128;
                        };

                        dotCoordinates = [];
                        const baseStep = dotSpacing * 0.08;
                        for (let lat = -90; lat <= 90; lat += baseStep) {
                            const latRad = (Math.abs(lat) * Math.PI) / 180;
                            const cosLat = Math.cos(latRad);
                            const lngStep =
                                cosLat > 0.01
                                    ? baseStep / Math.max(0.3, cosLat)
                                    : 360;
                            for (let lng = -180; lng < 180; lng += lngStep) {
                                if (allDots || isOnLand(lng, lat)) {
                                    dotCoordinates.push([lng, lat]);
                                }
                            }
                        }
                        cachedDotPositionsMap.set(cacheKey, dotCoordinates);
                    }

                    if (dotCoordinates && dotCoordinates.length > 0) {
                        const dotGeometry = new SphereGeometry(
                            0.01 * dotSizeMultiplier,
                            4,
                            4
                        );
                        const dotColorObj = resolvedDotColor
                            ? new Color(resolvedDotColor)
                            : new Color(0.6, 0.6, 0.6);
                        const dotMaterial = new MeshBasicMaterial({
                            color: dotColorObj,
                            transparent: dotRgba.a < 1 || dotRgba.a === 0,
                            opacity: dotRgba.a,
                        });
                        dotMaterialRef.current = dotMaterial;

                        const instanced = new InstancedMesh(
                            dotGeometry,
                            dotMaterial,
                            dotCoordinates.length
                        );
                        const matrix = new Matrix4();
                        for (let i = 0; i < dotCoordinates.length; i++) {
                            const [lng, lat] = dotCoordinates[i];
                            const pos = latLngToPosition(lat, lng);
                            matrix.makeScale(1, 1, 1);
                            matrix.setPosition(
                                pos.x * globeRadius,
                                pos.y * globeRadius,
                                pos.z * globeRadius
                            );
                            instanced.setMatrixAt(i, matrix);
                        }
                        instanced.instanceMatrix.needsUpdate = true;
                        dotInstances = instanced;
                        globeGroup.add(dotInstances);
                    }
                }

                updateMarkers();
                renderer.render(scene, camera);
                canvas.style.opacity = "1";
                canvas.style.visibility = "visible";
                setIsLoading(false);
                isMountedRef.current = true;
            } catch (err) {
                console.error("[Globe] Error loading world data:", err);
                setError("Failed to load land map data");
                setIsLoading(false);
            }
        };

        const updateMarkers = () => {
            markerMeshes.forEach((mesh) => globeGroup.remove(mesh));
            markerMeshes = [];
            markerMaterialsRef.current = [];

            arcMeshes.forEach((mesh) => {
                globeGroup.remove(mesh);
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((m) => m.dispose());
                } else {
                    mesh.material.dispose();
                }
            });
            arcMeshes = [];
            arcMaterialsRef.current = [];
            arcAnimItems = [];
            arcCycleTime = 0;
            lastTime = performance.now();

            if (markerConfig.markers && markerConfig.markers.length > 0) {
                const markerSize = 0.01 * markerRadiusMultiplier;
                const markerGeometry = new SphereGeometry(markerSize, 16, 16);
                const markerGlowGeometry = new SphereGeometry(markerSize * 1.6, 16, 16);
                const markerColorObj = resolvedMarkerColor
                    ? new Color(resolvedMarkerColor)
                    : new Color(1, 1, 1);

                const validMarkerVectors: Vector3[] = [];

                markerConfig.markers.forEach((marker) => {
                    if (
                        !marker ||
                        typeof marker.lat !== "number" ||
                        typeof marker.lng !== "number"
                    )
                        return;
                    const pos = latLngToPosition(marker.lat, marker.lng);
                    const markerMat = new MeshBasicMaterial({
                        color: markerColorObj,
                    });
                    markerMaterialsRef.current.push(markerMat);

                    // 1. Core marker dot
                    const markerMesh = new Mesh(markerGeometry, markerMat);
                    markerMesh.position.set(
                        pos.x * globeRadius,
                        pos.y * globeRadius,
                        pos.z * globeRadius
                    );
                    globeGroup.add(markerMesh);
                    markerMeshes.push(markerMesh);

                    // 2. Subtle luminous halo around each point
                    const glowMat = new MeshBasicMaterial({
                        color: markerColorObj,
                        transparent: true,
                        opacity: 0.35,
                    });
                    markerMaterialsRef.current.push(glowMat);
                    const glowMesh = new Mesh(markerGlowGeometry, glowMat);
                    glowMesh.position.copy(markerMesh.position);
                    globeGroup.add(glowMesh);
                    markerMeshes.push(glowMesh);

                    validMarkerVectors.push(markerMesh.position.clone());
                });

                // Connect every point to each other with round 3D curved arcs
                if (validMarkerVectors.length > 1 && (arcConfig?.show ?? true)) {
                    const resolvedArcColor = arcConfig?.color || resolvedMarkerColor || "#FF4B32";
                    const arcColorObj = new Color(resolvedArcColor);
                    baseArcOpacity = arcConfig?.opacity ?? 0.88;
                    baseGlowOpacity = (arcConfig?.opacity ?? 0.88) * 0.25;

                    const arcMat = new MeshBasicMaterial({
                        color: arcColorObj,
                        transparent: true,
                        opacity: baseArcOpacity,
                    });
                    arcCoreMaterial = arcMat;
                    arcMaterialsRef.current.push(arcMat);

                    const glowArcMat = new MeshBasicMaterial({
                        color: arcColorObj,
                        transparent: true,
                        opacity: baseGlowOpacity,
                    });
                    arcGlowMaterial = glowArcMat;
                    arcMaterialsRef.current.push(glowArcMat);

                    const tubeRadius = (arcConfig?.width ?? 1.2) * globeRadius * 0.0035;
                    const glowRadius = tubeRadius * 2.2;
                    const maxAltitude = arcConfig?.altitude ?? 0.18;

                    const totalPairs = (validMarkerVectors.length * (validMarkerVectors.length - 1)) / 2;

                    for (let i = 0; i < validMarkerVectors.length; i++) {
                        for (let j = i + 1; j < validMarkerVectors.length; j++) {
                            const v1 = validMarkerVectors[i];
                            const v2 = validMarkerVectors[j];
                            const angle = v1.angleTo(v2);
                            if (angle < 0.01) continue;

                            const axis = new Vector3().crossVectors(v1, v2).normalize();
                            if (axis.lengthSq() < 0.001) continue;

                            const distance = v1.distanceTo(v2);
                            // Altitude rises gracefully in 3D round dome
                            const altitude = Math.min(globeRadius * maxAltitude, distance * 0.18);

                            const points: Vector3[] = [];
                            const segments = 36;
                            for (let s = 0; s <= segments; s++) {
                                const t = s / segments;
                                const pt = v1.clone().applyAxisAngle(axis, angle * t);
                                const currentRadius = globeRadius + Math.sin(t * Math.PI) * altitude;
                                pt.setLength(currentRadius);
                                points.push(pt);
                            }

                            const curve = new CatmullRomCurve3(points);

                            // Core neon tube line - start with 0 draw range so "phle se hi connect na rahe"
                            const tubeGeo = new TubeGeometry(curve, 32, tubeRadius, 8, false);
                            tubeGeo.setDrawRange(0, 0);
                            const tubeMesh = new Mesh(tubeGeo, arcMat);
                            globeGroup.add(tubeMesh);
                            arcMeshes.push(tubeMesh);

                            // Soft outer glow tube line
                            const glowGeo = new TubeGeometry(curve, 24, glowRadius, 8, false);
                            glowGeo.setDrawRange(0, 0);
                            const glowMesh = new Mesh(glowGeo, glowArcMat);
                            globeGroup.add(glowMesh);
                            arcMeshes.push(glowMesh);

                            const pairIdx = arcAnimItems.length;
                            const staggerStart = (pairIdx / Math.max(1, totalPairs)) * 0.35;
                            const staggerDuration = 0.65;

                            arcAnimItems.push({
                                coreMesh: tubeMesh,
                                glowMesh: glowMesh,
                                totalIndices: tubeGeo.index?.count || 1536,
                                glowIndices: glowGeo.index?.count || 1152,
                                staggerStart,
                                staggerDuration,
                            });
                        }
                    }
                }
            }
        };

        const initialLongitudeRad = (initialLongitude * Math.PI) / 180;
        const initialLatitudeRad = (initialLatitude * Math.PI) / 180;
        const rotation = { x: initialLongitudeRad, y: initialLatitudeRad };
        const targetRotation = {
            x: initialLongitudeRad,
            y: initialLatitudeRad,
        };
        const velocity = { x: 0, y: 0 };
        let isDragging = false;
        let isHovering = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let animationFrameId: number | null = null;
        const lerpFactor =
            smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
        const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

        const globeGroup = new Group();
        globeGroup.rotation.y = initialLongitudeRad;
        globeGroup.rotation.x = initialLatitudeRad;
        scene.add(globeGroup);
        globeGroup.add(oceanMesh);
        if (showGrid && graticuleColor && graticuleRgba.a > 0) {
            globeGroup.add(graticuleGroup);
        }
        globeGroup.add(continentOutlineGroup);
        markerMeshes.forEach((mesh) => globeGroup.add(mesh));

        const animate = () => {
            let needsRender = false;
            const threshold = 0.01;

            const now = performance.now();
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            const DRAW_DURATION = 2.0; // 2.0s to draw lines
            const WAIT_DURATION = 2.0; // 2.0s hold / wait when all lines are connected
            const FADE_DURATION = 0.4; // 0.4s clean fade out before restarting
            const TOTAL_CYCLE = DRAW_DURATION + WAIT_DURATION + FADE_DURATION;

            if (arcAnimItems.length > 0) {
                arcCycleTime = (arcCycleTime + dt) % TOTAL_CYCLE;

                let globalFade = 1.0;
                if (arcCycleTime >= DRAW_DURATION + WAIT_DURATION) {
                    const fadeT = (arcCycleTime - (DRAW_DURATION + WAIT_DURATION)) / FADE_DURATION;
                    globalFade = Math.max(0, 1 - fadeT);
                }

                if (arcCoreMaterial) {
                    arcCoreMaterial.opacity = baseArcOpacity * globalFade;
                }
                if (arcGlowMaterial) {
                    arcGlowMaterial.opacity = baseGlowOpacity * globalFade;
                }

                for (let k = 0; k < arcAnimItems.length; k++) {
                    const item = arcAnimItems[k];
                    let progress = 1;
                    if (arcCycleTime < DRAW_DURATION) {
                        const tNorm = arcCycleTime / DRAW_DURATION;
                        const lineT = Math.max(0, Math.min(1, (tNorm - item.staggerStart) / item.staggerDuration));
                        progress = 1 - Math.pow(1 - lineT, 3);
                    } else if (arcCycleTime >= DRAW_DURATION + WAIT_DURATION) {
                        progress = 1;
                    }

                    const count = Math.floor((progress * item.totalIndices) / 6) * 6;
                    item.coreMesh.geometry.setDrawRange(0, count);

                    const glowCount = Math.floor((progress * item.glowIndices) / 6) * 6;
                    item.glowMesh.geometry.setDrawRange(0, glowCount);
                }

                needsRender = true;
            }

            if (
                !isDragging &&
                rotationSpeed !== 0 &&
                (!stopOnHover || !isHovering)
            ) {
                targetRotation.x += rotationSpeed * 0.01;
            }
            if (!isDragging && smoothingN > 0) {
                if (
                    Math.abs(velocity.x) > threshold ||
                    Math.abs(velocity.y) > threshold
                ) {
                    targetRotation.x += velocity.x;
                    targetRotation.y += velocity.y;
                    targetRotation.y = Math.max(
                        -Math.PI / 2,
                        Math.min(Math.PI / 2, targetRotation.y)
                    );
                    velocity.x *= velocityDecay;
                    velocity.y *= velocityDecay;
                } else {
                    velocity.x = 0;
                    velocity.y = 0;
                }
            }
            const dx = targetRotation.x - rotation.x;
            const dy = targetRotation.y - rotation.y;
            if (
                Math.abs(dx) > threshold ||
                Math.abs(dy) > threshold ||
                rotationSpeed !== 0 ||
                isDragging
            ) {
                rotation.x += dx * lerpFactor;
                rotation.y += dy * lerpFactor;
                rotation.y = Math.max(
                    -Math.PI / 2,
                    Math.min(Math.PI / 2, rotation.y)
                );
                needsRender = true;
            }
            if (needsRender || rotationSpeed !== 0 || isDragging) {
                globeGroup.rotation.y = rotation.x;
                globeGroup.rotation.x = rotation.y;
                renderer.render(scene, camera);
            }
            const hasVelocity =
                Math.abs(velocity.x) > threshold ||
                Math.abs(velocity.y) > threshold;
            const hasLerpDelta =
                Math.abs(dx) > threshold || Math.abs(dy) > threshold;
            const needsContinue =
                isDragging || rotationSpeed !== 0 || hasVelocity || hasLerpDelta || arcAnimItems.length > 0;
            if (needsContinue) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                animationFrameId = null;
            }
        };

        const startAnimation = () => {
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        if (rotationSpeed !== 0 || arcAnimItems.length > 0) {
            startAnimation();
        }

        const handleMouseDown = (event: MouseEvent) => {
            isDragging = true;
            velocity.x = 0;
            velocity.y = 0;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            startAnimation();
            const handleMouseMoveDrag = (moveEvent: MouseEvent) => {
                const sensitivity = mapDragSpeedUiToSensitivity(dragSpeed);
                const dx = moveEvent.clientX - lastMouseX;
                const dy = moveEvent.clientY - lastMouseY;
                targetRotation.x += dx * sensitivity;
                targetRotation.y += dy * sensitivity;
                targetRotation.y = Math.max(
                    -Math.PI / 2,
                    Math.min(Math.PI / 2, targetRotation.y)
                );
                velocity.x = dx * sensitivity * 0.3;
                velocity.y = dy * sensitivity * 0.3;
                lastMouseX = moveEvent.clientX;
                lastMouseY = moveEvent.clientY;
            };
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMoveDrag);
                document.removeEventListener("mouseup", handleMouseUp);
                isDragging = false;
            };
            document.addEventListener("mousemove", handleMouseMoveDrag);
            document.addEventListener("mouseup", handleMouseUp);
        };
        canvas.addEventListener("mousedown", handleMouseDown);

        const raycaster = new Raycaster();
        const mouse = new Vector2();
        const handleMouseMove = (event: MouseEvent) => {
            if (!stopOnHover) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(oceanMesh);
            isHovering = intersects.length > 0;
        };
        canvas.addEventListener("mousemove", handleMouseMove);

        const resizeObserver = new ResizeObserver(() => {
            const newWidth =
                container.clientWidth || container.offsetWidth || 800;
            const newHeight =
                container.clientHeight || container.offsetHeight || 600;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            const newCameraDistance = Math.max(minSafeDistance, 2.5 / scaleMultiplier);
            camera.position.set(0, 0, newCameraDistance);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        });
        resizeObserver.observe(container);

        loadWorldData();

        return () => {
            isMountedRef.current = false;
            if (animationFrameId !== null)
                cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            resizeObserver.disconnect();
            renderer.dispose();
            if (container.contains(canvas)) {
                container.removeChild(canvas);
            }
            oceanMaterialRef.current = null;
            graticuleMaterialRef.current = null;
            dotMaterialRef.current = null;
            outlineMaterialsRef.current = [];
            markerMaterialsRef.current = [];
            arcMaterialsRef.current = [];
            rendererRef.current = null;
            sceneRef.current = null;
            cameraRef.current = null;
        };
    }, [
        speed,
        smoothing,
        fill,
        allDots,
        density,
        dotSize,
        scale,
        stopOnHover,
        direction,
        initialLatitude,
        initialLongitude,
        showOutline,
        showGrid,
        outlineWidth,
        dragSpeed,
        detail,
        rotationSpeed,
        dotSpacing,
        dotSizeMultiplier,
        markerRadiusMultiplier,
        scaleMultiplier,
    ]);

    const containerStyle: CSSProperties = {
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    if (error) {
        return (
            <div style={containerStyle}>
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        minWidth: 0,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        textAlign: "center",
                        padding: "16px",
                        fontFamily:
                            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                >
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>
                        Error loading Earth visualization
                    </div>
                    <div style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return <div ref={containerRef} style={containerStyle} />;
}

export default Globe;

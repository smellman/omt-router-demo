declare module 'omt-router' {
  export type TransportMode = 'car' | 'pedestrian' | 'bicycle';
  export type CostField = 'distance' | 'travelTime' | 'optimal';
  export type EngineId =
    | 'auto'
    | 'bidirectional-astar'
    | 'adaptive-barrier'
    | 'delta-stepping'
    | 'ultra-dijkstra';
  export type TileSchema = 'zxy' | 'tms';

  export interface LngLat {
    lng: number;
    lat: number;
  }

  export type LngLatLike = [number, number] | LngLat;

  export interface RoutePenalties {
    intersectionPenaltySec?: number;
    turnPenaltySec?: number;
    turnAngleThresholdDeg?: number;
  }

  export interface RouteOptions {
    zoom?: number;
    schema?: TileSchema;
    maxAutoRadius?: number;
    engineId?: EngineId;
    costField?: CostField;
    penalties?: RoutePenalties;
    maxAcceptableSnapDistanceM?: number;
    includeGraph?: boolean;
    tileProxyTemplate?: string;
    tileUrlTransform?: (url: string) => string;
    [key: string]: unknown;
  }

  export interface RouteResult {
    found: boolean;
    path: number[];
    coordinates: [number, number][];
    cost: number;
    costField: CostField;
    partialGraph: boolean;
    engine?: EngineId;
    fallback?: EngineId;
    startSnapDistanceM?: number;
    endSnapDistanceM?: number;
    hasMissingTiles?: boolean;
    missingTileErrors?: unknown[];
    reason?: string;
    [key: string]: unknown;
  }

  export interface TileCoord {
    z: number;
    x: number;
    y: number;
  }

  export interface PreparedGraph {
    [key: string]: unknown;
  }

  export function route(
    start: [number, number],
    end: [number, number],
    mode: TransportMode,
    urlTemplate: string,
    options?: RouteOptions
  ): Promise<RouteResult>;

  export function routeBatch(
    requests: Array<{
      start: [number, number];
      end: [number, number];
      mode: TransportMode;
      options?: RouteOptions;
    }>,
    urlTemplate: string,
    options?: RouteOptions
  ): Promise<RouteResult[]>;

  export function buildTileURL(
    urlTemplate: string,
    tile: TileCoord,
    options?: {
      tileProxyTemplate?: string;
      tileUrlTransform?: (url: string) => string;
      schema?: TileSchema;
    }
  ): string;

  export function buildGraphForTiles(
    tiles: TileCoord[],
    mode: TransportMode,
    options?: { urlTemplate?: string; [key: string]: unknown }
  ): Promise<PreparedGraph>;

  export function buildCH(graph: PreparedGraph, costField?: CostField): PreparedGraph;

  export function computeRoute(
    startCoords: [number, number],
    endCoords: [number, number],
    graph: PreparedGraph,
    options?: RouteOptions
  ): Promise<RouteResult>;

  export function queryRoute(
    startId: number,
    endId: number,
    prepared: PreparedGraph,
    options?: {
      engineId?: EngineId;
      useCache?: boolean;
      allowFallback?: boolean;
      [key: string]: unknown;
    }
  ): Promise<RouteResult>;

  export function nearestNode(
    coords: [number, number],
    graph: PreparedGraph,
    maxDistM?: number
  ): number | null;

  export function ensureAdjCostMap(graph: PreparedGraph, costField?: CostField): PreparedGraph;
  export function releaseGraph(graph: PreparedGraph): void;
  export function dispose(): void;
  export function shutdown(): void;
  export function cancelRunningEngine(): void;

  export interface EngineWorkerStatus {
    ready: boolean;
    busy?: boolean;
    [key: string]: unknown;
  }

  export function getEngineWorkerStatus(): EngineWorkerStatus;
  export function onEngineWorkerStatusChange(
    callback: (status: EngineWorkerStatus) => void
  ): () => void;

  export type RouteFunction = typeof route;

  export interface MapLibreRoutingControlOptions {
    routeFunction?: RouteFunction;
    getEngineWorkerStatus?: typeof getEngineWorkerStatus;
    onEngineWorkerStatusChange?: typeof onEngineWorkerStatusChange;
    cancelRunningEngine?: typeof cancelRunningEngine;
    tileJsonUrl?: string;
    urlTemplate?: string;
    maplibre?: unknown;
    defaultMode?: TransportMode;
    defaultCostField?: CostField;
    theme?: 'auto' | 'light' | 'dark';
    panelClassName?: string;
    routeTimeoutMs?: number;
    routeOptions?: RouteOptions;
    showGraph?: boolean;
    features?: 'routing' | 'isolines' | 'both';
    isolineMaxCost?: number;
    isolineSourceId?: string;
    locale_override?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export class MapLibreRoutingControl {
    constructor(options?: MapLibreRoutingControlOptions);
    onAdd(map: unknown): HTMLElement;
    onRemove(): void;
    setOrigin(lngLat: LngLatLike): void;
    setDest(lngLat: LngLatLike): void;
    setUrlTemplate(urlTemplate: string): void;
    setTileJsonUrl(url: string): void;
    dispose(): void;
    shutdown(): void;
  }
}

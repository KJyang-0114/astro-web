export type WireShape = "ribbon" | "orbit" | "wave";
export function wireFrames(shape: WireShape = "ribbon"): number[][][] {
  return Array.from({ length: 32 }, (_, i) => {
    const angle = i / 32 * Math.PI * 2;
    if (shape === "ribbon") {
      return [[-.24, -.38], [.24, -.38], [.24, .38], [-.24, .38]].map(([x, y]) => {
        const radial = 1 + x * Math.cos(angle / 2) - y * Math.sin(angle / 2);
        return [radial * Math.cos(angle), x * Math.sin(angle / 2) + y * Math.cos(angle / 2), radial * Math.sin(angle)];
      });
    }
    return Array.from({ length: 40 }, (_, j) => {
      const a = j / 40 * Math.PI * 2;
      if (shape === "orbit") {
        const x = 1.2 * Math.cos(a);
        return [x * Math.cos(angle), .48 * Math.sin(a), x * Math.sin(angle)];
      }
      const radius = .35 + i / 31 * .85;
      return [radius * Math.cos(a), .22 * Math.sin(a * 3 + i * .22), radius * Math.sin(a)];
    });
  });
}
export function wireVertices(shape: WireShape = "ribbon"): number[] {
  const vertices: number[] = [];
  for (const points of wireFrames(shape)) {
    for (let j = 0; j < points.length; j++) vertices.push(...points[j], ...points[(j + 1) % points.length]);
  }
  return vertices;
}
/** Orthographic projection, independent of GPU availability. */
export function ribbonPath(time: number, pointerX = 0, pointerY = 0, shape: WireShape = "ribbon", yawOffset = 0): string {
  const yaw = time * 0.16 + 0.25 + yawOffset;
  const pitch = 0.7 + Math.sin(time * 0.25) * 0.12 + pointerY;
  const roll = 0.15 + pointerX;
  const scale = 105 * (1 + Math.sin((time * Math.PI) / 5) * 0.045);
  const project = (x: number, y: number, z: number) => {
    const xx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const zz = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const yy = y * Math.cos(pitch) - zz * Math.sin(pitch);
    return `${(200 + (xx * Math.cos(roll) - yy * Math.sin(roll)) * scale).toFixed(2)},${(200 - (xx * Math.sin(roll) + yy * Math.cos(roll)) * scale).toFixed(2)}`;
  };
  return wireFrames(shape).map(frame => {
    const points = frame.map(([x, y, z]) => project(x, y, z));
    return `M${points.join("L")}Z`;
  }).join("");
}

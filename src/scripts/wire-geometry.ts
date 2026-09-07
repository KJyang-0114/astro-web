/** Orthographic projection of a breathing ribbon; shared deterministic fallback geometry. */
export function ribbonPath(time: number, pointerX = 0, pointerY = 0): string {
  const yaw = time * 0.16 + 0.25;
  const pitch = 0.7 + Math.sin(time * 0.25) * 0.12 + pointerY;
  const roll = 0.15 + pointerX;
  const scale = 105 * (1 + Math.sin((time * Math.PI) / 5) * 0.045);
  const project = (x: number, y: number, z: number) => {
    const xx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const zz = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const yy = y * Math.cos(pitch) - zz * Math.sin(pitch);
    return `${(200 + (xx * Math.cos(roll) - yy * Math.sin(roll)) * scale).toFixed(2)},${(200 - (xx * Math.sin(roll) + yy * Math.cos(roll)) * scale).toFixed(2)}`;
  };
  return Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    const twist = angle * 0.5;
    const points = [
      [-0.24, -0.38],
      [0.24, -0.38],
      [0.24, 0.38],
      [-0.24, 0.38],
    ].map(([x, y]) => {
      const radial = 1 + x * Math.cos(twist) - y * Math.sin(twist);
      return project(
        radial * Math.cos(angle),
        x * Math.sin(twist) + y * Math.cos(twist),
        radial * Math.sin(angle),
      );
    });
    return `M${points.join("L")}Z`;
  }).join("");
}

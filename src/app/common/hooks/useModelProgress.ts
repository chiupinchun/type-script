import { BASE_ATTACK_SPEED, BATTLE_FIELD_POSITION, MOVE_SPEED, RAW_CAMERA_POSITION } from "@game/constants/battle-ui"
import { modelActions } from "@/types/model"
import { RootState } from "@react-three/fiber"
import { Mesh, Vector3 } from "three"

type ProgressEffect = (mesh: Mesh, ctx: RootState) => void
export interface ModelProgress {
  action?: modelActions
  effect: ProgressEffect

  next: ModelProgress | null
}

/**
 * Set position and lookAt of camera, resolve immediately.
 */
class CameraProgress implements ModelProgress {
  effect: ProgressEffect
  next: ModelProgress | null = null

  constructor(
    resolve: () => void,
    lookAt: [number, number, number],
    position: [number, number, number]
  ) {
    this.effect = (_, { camera }) => {
      camera.position.set(...position)
      camera.lookAt(new Vector3(...lookAt))

      resolve()
    }
  }
}

/**
 * Set action of model, resolve immediately.
 */
class ActionProgress implements ModelProgress {
  effect: ProgressEffect
  next: ModelProgress | null = null

  constructor(
    resolve: () => void,
    public readonly action: modelActions
  ) {
    this.effect = resolve
  }
}

/**
 * keep moving model a few distance in 1 frame, until arriving, then resolve.
 */
class MoveProgress implements ModelProgress {
  effect: ProgressEffect
  next: ModelProgress | null = null

  constructor(resolve: () => void, to: [number, number, number]) {
    this.effect = (mesh) => {
      let canResolve = true
      if (mesh.position.x < to[0]) {
        mesh.position.x += Math.min(to[0] - mesh.position.x, MOVE_SPEED)
        canResolve = false
      } else if (mesh.position.x > to[0]) {
        mesh.position.x -= Math.min(mesh.position.x - to[0], MOVE_SPEED)
        canResolve = false
      }
      if (mesh.position.z < to[2]) {
        mesh.position.z += Math.min(to[2] - mesh.position.z, MOVE_SPEED)
        canResolve = false
      } else if (mesh.position.z > to[2]) {
        mesh.position.z -= Math.min(mesh.position.z - to[2], MOVE_SPEED)
        canResolve = false
      }

      canResolve && resolve()
    }
  }
}

/**
 * Set model action to attack for a while, then resolve.
 */
class AttackProgress implements ModelProgress {
  effect: ProgressEffect
  until?: number
  next: ModelProgress | null = null

  constructor(resolve: () => void) {
    this.effect = () => {
      const now = +new Date()

      if (!this.until) { this.until = now + BASE_ATTACK_SPEED }

      if (now >= this.until) {
        resolve()
      }
    }
  }
}

/**
 * Link linked lists.
 */
const link = (...linkable: (ModelProgress)[]) => {
  if (linkable.length < 2) { return linkable[0] ?? null }

  let prevNode: ModelProgress | null = null
  for (let i = linkable.length - 1; i >= 0; i--) {
    const node = linkable[i]
    node.next = prevNode
    prevNode = node
  }

  return prevNode
}

/**
 * Accepts resolve fn, self-position, target-position, and returns several linked list progresses.
 * 
 * Set state dispatcher to param: resolve, and pass progress to ally & enemy models.
 * @param resolve Execute when current progress finished.
 * Can be use to set next progress to react state.
 * @param selfPosition Progress may change model position, so record raw position.
 * @param targetPosition Record raw position.
 * @returns Several linked lists which define actions model should do.
 */
export const useModelProgress = (
  resolve: () => void,
  selfPosition: [number, number, number],
  targetPosition: [number, number, number]
) => {
  const closeAttack = link(
    new CameraProgress(resolve, targetPosition, [(selfPosition[0] + targetPosition[0]) / 2, RAW_CAMERA_POSITION[1], (selfPosition[2] + targetPosition[2]) / 2]),
    new ActionProgress(resolve, 'walk'),
    new MoveProgress(resolve, targetPosition),
    new ActionProgress(resolve, 'attack'),
    new AttackProgress(resolve),
    new CameraProgress(resolve, BATTLE_FIELD_POSITION, RAW_CAMERA_POSITION),
    new ActionProgress(resolve, 'walk'),
    new MoveProgress(resolve, selfPosition),
    new ActionProgress(resolve, 'standby')
  )

  return { closeAttack }
}